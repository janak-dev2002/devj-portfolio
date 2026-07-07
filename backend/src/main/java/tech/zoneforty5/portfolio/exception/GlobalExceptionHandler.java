package tech.zoneforty5.portfolio.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import tech.zoneforty5.portfolio.dto.ErrorResponse;
import tech.zoneforty5.portfolio.dto.FieldErrorDto;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<FieldErrorDto> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .map(this::toFieldError)
                .toList();
        ErrorResponse body = ErrorResponse.of(400, "Bad Request",
                "Validation failed for " + fieldErrors.size() + " field(s).", request.getRequestURI(), fieldErrors);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleUnreadableBody(HttpMessageNotReadableException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.of(400, "Bad Request",
                "Request body is missing or malformed.", request.getRequestURI(), List.of());
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleUnsupportedMediaType(HttpMediaTypeNotSupportedException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.of(415, "Unsupported Media Type",
                "Content-Type must be application/json.", request.getRequestURI(), List.of());
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(body);
    }

    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<ErrorResponse> handleRateLimit(RateLimitExceededException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.of(429, "Too Many Requests", ex.getMessage(), request.getRequestURI(), List.of());
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .header(HttpHeaders.RETRY_AFTER, String.valueOf(ex.getRetryAfterSeconds()))
                .body(body);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NoResourceFoundException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.of(404, "Not Found",
                "The requested resource was not found.", request.getRequestURI(), List.of());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(EmailDeliveryException.class)
    public ResponseEntity<ErrorResponse> handleEmailDeliveryFailure(EmailDeliveryException ex, HttpServletRequest request) {
        ErrorResponse body = ErrorResponse.of(502, "Bad Gateway", ex.getMessage(), request.getRequestURI(), List.of());
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception while processing {}", request.getRequestURI(), ex);
        ErrorResponse body = ErrorResponse.of(500, "Internal Server Error",
                "An unexpected error occurred.", request.getRequestURI(), List.of());
        return ResponseEntity.internalServerError().body(body);
    }

    private FieldErrorDto toFieldError(FieldError fieldError) {
        return new FieldErrorDto(fieldError.getField(), fieldError.getDefaultMessage());
    }
}
