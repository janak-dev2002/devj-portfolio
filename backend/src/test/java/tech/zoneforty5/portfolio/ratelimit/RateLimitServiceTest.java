package tech.zoneforty5.portfolio.ratelimit;

import io.github.bucket4j.ConsumptionProbe;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class RateLimitServiceTest {

    private final RateLimitService rateLimitService = new RateLimitService();

    @Test
    void firstRequestForNewIpIsConsumed() {
        ConsumptionProbe probe = rateLimitService.tryConsume("203.0.113.10");

        assertThat(probe.isConsumed()).isTrue();
    }

    @Test
    void immediateSecondRequestFromSameIpIsRejectedByBurstGuard() {
        rateLimitService.tryConsume("203.0.113.20");

        ConsumptionProbe second = rateLimitService.tryConsume("203.0.113.20");

        assertThat(second.isConsumed()).isFalse();
        assertThat(second.getNanosToWaitForRefill()).isGreaterThan(0);
    }

    @Test
    void differentIpsHaveIndependentBuckets() {
        rateLimitService.tryConsume("203.0.113.30");

        ConsumptionProbe otherIp = rateLimitService.tryConsume("203.0.113.31");

        assertThat(otherIp.isConsumed()).isTrue();
    }
}
