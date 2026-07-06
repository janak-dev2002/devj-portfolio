package tech.zoneforty5.portfolio.ratelimit;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;

/**
 * Resolves the real visitor IP behind Cloudflare + Tunnel + Nginx (R-6, architecture.md §8).
 * Trusts CF-Connecting-IP first since Nginx is configured to forward it; falls back to
 * X-Forwarded-For and finally the socket address for local/dev requests with neither header.
 */
public final class ClientIpResolver {

    private ClientIpResolver() {
    }

    public static String resolve(HttpServletRequest request) {
        String cfConnectingIp = request.getHeader("CF-Connecting-IP");
        if (StringUtils.hasText(cfConnectingIp)) {
            return cfConnectingIp.trim();
        }
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (StringUtils.hasText(forwardedFor)) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
