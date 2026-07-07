package tech.zoneforty5.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tech.zoneforty5.portfolio.ratelimit.ContactRateLimitInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final ContactRateLimitInterceptor contactRateLimitInterceptor;
    private final String[] allowedOrigins;

    public WebConfig(ContactRateLimitInterceptor contactRateLimitInterceptor,
                      @Value("${app.cors.allowed-origins}") String[] allowedOrigins) {
        this.contactRateLimitInterceptor = contactRateLimitInterceptor;
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("Content-Type")
                .allowCredentials(false);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(contactRateLimitInterceptor)
                .addPathPatterns("/api/contact");
    }
}
