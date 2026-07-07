package tech.zoneforty5.portfolio.ratelimit;

import org.junit.jupiter.api.Test;
import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * FIND-001 regression: server.tomcat.remoteip.internal-proxies (application.yml) must only
 * trust Docker-internal/loopback peers to set CF-Connecting-IP via Tomcat's RemoteIpValve.
 * A caller reaching the backend from a public IP must never have its header trusted, so
 * ContactRateLimitInterceptor's request.getRemoteAddr() falls back to the real socket address.
 */
class RemoteIpTrustBoundaryTest {

    private static final Pattern INTERNAL_PROXIES = loadInternalProxiesPattern();

    private static Pattern loadInternalProxiesPattern() {
        try {
            List<PropertySource<?>> sources = new YamlPropertySourceLoader()
                    .load("application", new ClassPathResource("application.yml"));
            Object value = sources.get(0).getProperty("server.tomcat.remoteip.internal-proxies");
            return Pattern.compile((String) value);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    @Test
    void trustsDockerBridgeAndLoopbackPeers() {
        assertThat(INTERNAL_PROXIES.matcher("172.20.0.5").matches()).isTrue();
        assertThat(INTERNAL_PROXIES.matcher("192.168.1.10").matches()).isTrue();
        assertThat(INTERNAL_PROXIES.matcher("10.0.0.5").matches()).isTrue();
        assertThat(INTERNAL_PROXIES.matcher("127.0.0.1").matches()).isTrue();
    }

    @Test
    void rejectsPublicInternetPeers() {
        assertThat(INTERNAL_PROXIES.matcher("203.0.113.5").matches()).isFalse();
        assertThat(INTERNAL_PROXIES.matcher("8.8.8.8").matches()).isFalse();
        assertThat(INTERNAL_PROXIES.matcher("198.51.100.23").matches()).isFalse();
    }
}
