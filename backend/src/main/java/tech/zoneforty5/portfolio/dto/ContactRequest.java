package tech.zoneforty5.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank @Size(min = 2, max = 100) String name,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(min = 10, max = 2000) String message,
        String website
) {
    public ContactRequest {
        name = trim(name);
        email = trim(email);
        message = trim(message);
        website = trim(website);
    }

    private static String trim(String value) {
        return value == null ? null : value.trim();
    }
}
