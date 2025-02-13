package com.example.RealEstate.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Value("${jwt.signerKey}")
    private String signerKey;

    private final String[] PUBLIC_ENDPOINTS_API = {
            "/api/user/signIn",
            "/api/user/create",
            "/api/property/getApproved",
            "/api/user/getAgents",
            "api/property/getProperty/**",
            "api/transaction/create",
            "api/transaction/getByUser/**",

    };

    private final String[] PUBLIC_FONT_END = {
            "static/**",
            "templates/**",
            "admin/css/**", "admin/js/**", "admin/img/**", "admin/lib/**",
            "/admin/css/**", "/admin/js/**", "/admin/img/**",
            "property/css/**", "property/js/**", "property/img/**", "property/lib/**",
            "/property/css/**", "/property/js/**", "/property/img/**",
            "property-detail/assets/**", "property-detail/forms/**",
            "/fetchapi/**",
            "customer/**"
    };

    private final String[] PUBLIC_URL = {
            "/login",
            "/register",
            "/admin/dashboard",
            "/admin/user",
            "/admin/property",
            "/admin/transaction",
            "/error",
            "agent/dashboard",
            "agent/create",
            "agent/create-image",
            "agent/property",
            "/agent/transaction",
            "/home",
            "property-details/**",
            "/about",
            "/contact"

    };
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        HttpSecurity httpSecurity1 = httpSecurity
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request ->
                        request.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS_API).permitAll()
                                .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS_API).permitAll()
                                .requestMatchers(PUBLIC_FONT_END).permitAll()
                                .requestMatchers(PUBLIC_URL).permitAll()
                                .requestMatchers("/admin/**").hasRole("ADMIN")
                                .anyRequest().authenticated()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/homepage")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                );
        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder())
                        .jwtAuthenticationConverter(jwtAuthenticationConverter()))
        );
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

    @Bean
    JwtDecoder jwtDecoder(){
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }
}