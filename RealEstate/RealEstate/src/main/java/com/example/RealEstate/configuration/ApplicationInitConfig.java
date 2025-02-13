package com.example.RealEstate.configuration;

import com.example.RealEstate.entity.Role;
import com.example.RealEstate.entity.User;
import com.example.RealEstate.repository.RoleRepository;
import com.example.RealEstate.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicationInitConfig {
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    @Autowired
    RoleRepository roleRepository;
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            Optional<Role> adminRoleOpt = roleRepository.findById("ADMIN");

            Role adminRole = adminRoleOpt.orElseGet(() -> {
                Role role = new Role();
                role.setName("ADMIN");
                role.setDescription("Admin roles");
                return roleRepository.save(role);
            });

            if (userRepository.findByUserName("admin") == null) {
                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);

                User user = User.builder()
                        .userName("admin")
                        .password(passwordEncoder.encode("admin"))
                        .build();

                user.setRoles(roles);
                userRepository.save(user);
            }
        };
    }
}
