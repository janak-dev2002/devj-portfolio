package tech.zoneforty5.portfolio.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tech.zoneforty5.portfolio.dto.ContactResponse;
import tech.zoneforty5.portfolio.exception.EmailDeliveryException;
import tech.zoneforty5.portfolio.exception.GlobalExceptionHandler;
import tech.zoneforty5.portfolio.exception.RateLimitExceededException;
import tech.zoneforty5.portfolio.service.ContactService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ContactControllerTest {

    private ContactService contactService;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        contactService = mock(ContactService.class);
        ContactController controller = new ContactController(contactService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void validSubmissionReturns200WithSuccessBody() throws Exception {
        when(contactService.send(any())).thenReturn(new ContactResponse(true, "Message sent successfully."));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Jane Recruiter","email":"jane@example.com","message":"We have a DevOps role that fits your profile.","website":""}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void blankNameReturns400WithFieldErrors() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"","email":"jane@example.com","message":"We have a DevOps role that fits your profile.","website":""}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("name"));
    }

    @Test
    void invalidEmailReturns400() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Jane","email":"not-an-email","message":"We have a DevOps role that fits your profile.","website":""}
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void sesFailurePropagatesAs502() throws Exception {
        when(contactService.send(any()))
                .thenThrow(new EmailDeliveryException("Failed to send message. Please email sangeeth.jdev@gmail.com directly."));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Jane","email":"jane@example.com","message":"We have a DevOps role that fits your profile.","website":""}
                                """))
                .andExpect(status().isBadGateway())
                .andExpect(jsonPath("$.status").value(502));
    }

    @Test
    void rateLimitExceededReturns429WithRetryAfterHeader() throws Exception {
        when(contactService.send(any())).thenThrow(new RateLimitExceededException(1800));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Jane","email":"jane@example.com","message":"We have a DevOps role that fits your profile.","website":""}
                                """))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().string("Retry-After", "1800"));
    }
}
