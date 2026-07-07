package tech.zoneforty5.portfolio.exception;

public class EmailDeliveryException extends RuntimeException {

    public EmailDeliveryException(String message) {
        super(message);
    }
}
