package tech.zoneforty5.portfolio.dto;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

public record ErrorResponse(
        String timestamp,
        int status,
        String error,
        String message,
        String path,
        List<FieldErrorDto> fieldErrors
) {
    public static ErrorResponse of(int status, String error, String message, String path, List<FieldErrorDto> fieldErrors) {
        return new ErrorResponse(Instant.now().truncatedTo(ChronoUnit.SECONDS).toString(), status, error, message, path, fieldErrors);
    }
}
