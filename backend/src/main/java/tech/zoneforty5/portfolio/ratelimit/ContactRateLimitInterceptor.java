package tech.zoneforty5.portfolio.ratelimit;

import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import tech.zoneforty5.portfolio.exception.RateLimitExceededException;

@Component
public class ContactRateLimitInterceptor implements HandlerInterceptor {

    private final RateLimitService rateLimitService;

    public ContactRateLimitInterceptor(RateLimitService rateLimitService) {
        this.rateLimitService = rateLimitService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String clientIp = request.getRemoteAddr();
        ConsumptionProbe probe = rateLimitService.tryConsume(clientIp);
        if (!probe.isConsumed()) {
            long retryAfterSeconds = Math.max(1, probe.getNanosToWaitForRefill() / 1_000_000_000L);
            throw new RateLimitExceededException(retryAfterSeconds);
        }
        return true;
    }
}
