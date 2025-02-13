package com.example.RealEstate.dto.response;

import jakarta.persistence.ManyToMany;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String name;
    String userName;
    String email;
    String phone;

    @ManyToMany
    Set<RoleResponse> roles;
}
