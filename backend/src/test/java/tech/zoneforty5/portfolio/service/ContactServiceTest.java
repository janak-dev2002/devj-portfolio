package tech.zoneforty5.portfolio.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;
import software.amazon.awssdk.services.ses.model.SendEmailResponse;
import software.amazon.awssdk.services.ses.model.SesException;
import tech.zoneforty5.portfolio.dto.ContactRequest;
import tech.zoneforty5.portfolio.dto.ContactResponse;
import tech.zoneforty5.portfolio.exception.EmailDeliveryException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    private static final String RECIPIENT = "sangeeth.jdev@gmail.com";

    @Mock
    private SesClient sesClient;

    private ContactService contactService;

    @BeforeEach
    void setUp() {
        contactService = new ContactService(sesClient, RECIPIENT);
    }

    @Test
    void honeypotFieldSkipsSesEntirelyAndReturnsSuccess() {
        ContactRequest request = new ContactRequest("Bot", "bot@example.com", "This is spam content.", "https://spam.example");

        ContactResponse response = contactService.send(request);

        assertThat(response.success()).isTrue();
        verify(sesClient, never()).sendEmail(any(SendEmailRequest.class));
    }

    @Test
    void validSubmissionSendsViaSesWithReplyToVisitor() {
        when(sesClient.sendEmail(any(SendEmailRequest.class)))
                .thenReturn(SendEmailResponse.builder().messageId("msg-1").build());
        ContactRequest request = new ContactRequest("Jane Recruiter", "jane@example.com",
                "We have a DevOps role that fits your profile.", "");

        ContactResponse response = contactService.send(request);

        assertThat(response.success()).isTrue();
        ArgumentCaptor<SendEmailRequest> captor = ArgumentCaptor.forClass(SendEmailRequest.class);
        verify(sesClient).sendEmail(captor.capture());
        SendEmailRequest sent = captor.getValue();
        assertThat(sent.source()).isEqualTo(RECIPIENT);
        assertThat(sent.destination().toAddresses()).containsExactly(RECIPIENT);
        assertThat(sent.replyToAddresses()).containsExactly("jane@example.com");
        assertThat(sent.message().body().text().data()).contains("Jane Recruiter", "jane@example.com");
    }

    @Test
    void sesFailureIsWrappedAsEmailDeliveryExceptionWithUiSafeMessage() {
        when(sesClient.sendEmail(any(SendEmailRequest.class)))
                .thenThrow(SesException.builder().message("simulated SES outage").build());
        ContactRequest request = new ContactRequest("Jane", "jane@example.com", "Some message content here.", "");

        assertThatThrownBy(() -> contactService.send(request))
                .isInstanceOf(EmailDeliveryException.class)
                .hasMessageContaining(RECIPIENT);
    }

    @Test
    void headerFieldsAreSanitizedAgainstControlCharacters() {
        when(sesClient.sendEmail(any(SendEmailRequest.class)))
                .thenReturn(SendEmailResponse.builder().messageId("msg-1").build());
        ContactRequest request = new ContactRequest("Evil\r\nBcc: attacker@example.com", "jane@example.com",
                "Message body with enough length.", "");

        contactService.send(request);

        ArgumentCaptor<SendEmailRequest> captor = ArgumentCaptor.forClass(SendEmailRequest.class);
        verify(sesClient).sendEmail(captor.capture());
        String subject = captor.getValue().message().subject().data();
        assertThat(subject).doesNotContain("\r", "\n");
    }

    @Test
    void replyToAddressIsSanitizedAgainstCrlfHeaderInjection() {
        when(sesClient.sendEmail(any(SendEmailRequest.class)))
                .thenReturn(SendEmailResponse.builder().messageId("msg-1").build());
        ContactRequest request = new ContactRequest("Jane", "attacker@example.com\r\nBcc: victim@example.com",
                "Message body with enough length.", "");

        contactService.send(request);

        ArgumentCaptor<SendEmailRequest> captor = ArgumentCaptor.forClass(SendEmailRequest.class);
        verify(sesClient).sendEmail(captor.capture());
        String replyTo = captor.getValue().replyToAddresses().get(0);
        assertThat(replyTo).doesNotContain("\r", "\n");
        assertThat(replyTo).isEqualTo("attacker@example.com  Bcc: victim@example.com");
    }
}
