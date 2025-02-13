package com.example.RealEstate.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {
    String name;
    String userName;
    String password;
    String email;
    String phone;

    Set<String> roles;
}
