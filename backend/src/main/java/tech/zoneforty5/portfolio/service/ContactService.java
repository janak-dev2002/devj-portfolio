package tech.zoneforty5.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Message;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;
import software.amazon.awssdk.services.ses.model.SesException;
import tech.zoneforty5.portfolio.dto.ContactRequest;
import tech.zoneforty5.portfolio.dto.ContactResponse;
import tech.zoneforty5.portfolio.exception.EmailDeliveryException;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private static final String SUCCESS_MESSAGE = "Message sent successfully.";

    private final SesClient sesClient;
    private final String recipientEmail;

    public ContactService(SesClient sesClient, @Value("${app.mail.recipient}") String recipientEmail) {
        this.sesClient = sesClient;
        this.recipientEmail = recipientEmail;
    }

    public ContactResponse send(ContactRequest request) {
        if (StringUtils.hasText(request.website())) {
            log.debug("Contact form honeypot triggered; dropping submission silently");
            return new ContactResponse(true, SUCCESS_MESSAGE);
        }

        try {
            SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
                    .source(recipientEmail)
                    .destination(Destination.builder().toAddresses(recipientEmail).build())
                    .replyToAddresses(sanitizeHeader(request.email()))
                    .message(Message.builder()
                            .subject(textContent("devj-portfolio contact: " + sanitizeHeader(request.name())))
                            .body(Body.builder().text(textContent(buildBody(request))).build())
                            .build())
                    .build();

            sesClient.sendEmail(sendEmailRequest);
            return new ContactResponse(true, SUCCESS_MESSAGE);
        } catch (SesException e) {
            log.error("AWS SES failed to send contact-form message: {}", e.getMessage());
            throw new EmailDeliveryException("Failed to send message. Please email " + recipientEmail + " directly.");
        }
    }

    private Content textContent(String data) {
        return Content.builder().data(data).charset("UTF-8").build();
    }

    private String buildBody(ContactRequest request) {
        return "New portfolio contact form submission" + System.lineSeparator() + System.lineSeparator()
                + "Name: " + sanitizeHeader(request.name()) + System.lineSeparator()
                + "Email: " + sanitizeHeader(request.email()) + System.lineSeparator() + System.lineSeparator()
                + "Message:" + System.lineSeparator() + sanitizeBody(request.message());
    }

    /** Single-line fields (name/email used in subject/headers): strip CR/LF/TAB and angle brackets. */
    private String sanitizeHeader(String value) {
        return value.replaceAll("[\\r\\n\\t]", " ").replace("<", "").replace(">", "");
    }

    /** Multi-line message body: strip CR and angle brackets, keep newlines for readability. */
    private String sanitizeBody(String value) {
        return value.replace("\r", "").replace("<", "").replace(">", "");
    }
}
