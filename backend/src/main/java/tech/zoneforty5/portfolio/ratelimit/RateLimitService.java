package tech.zoneforty5.portfolio.ratelimit;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import org.springframework.stereotype.Component;

import java.time.Duration;

/**
 * In-memory, Caffeine-backed token buckets keyed on client IP.
 * Single bucket combines an hourly cap with a short burst guard (see architecture.md §7).
 */
@Component
public class RateLimitService {

    private static final int HOURLY_CAPACITY = 5;
    private static final int BURST_CAPACITY = 1;
    private static final Duration BURST_WINDOW = Duration.ofSeconds(20);

    private final Cache<String, Bucket> buckets = Caffeine.newBuilder()
            .expireAfterAccess(Duration.ofHours(1))
            .maximumSize(10_000)
            .build();

    public ConsumptionProbe tryConsume(String key) {
        Bucket bucket = buckets.get(key, k -> newBucket());
        return bucket.tryConsumeAndReturnRemaining(1);
    }

    private Bucket newBucket() {
        return Bucket.builder()
                .addLimit(limit -> limit.capacity(HOURLY_CAPACITY).refillIntervally(HOURLY_CAPACITY, Duration.ofHours(1)))
                .addLimit(limit -> limit.capacity(BURST_CAPACITY).refillIntervally(BURST_CAPACITY, BURST_WINDOW))
                .build();
    }
}
