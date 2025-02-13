package com.example.RealEstate.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor()
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    String userName;
    String password;
    String email;
    String phone;

    @ManyToMany
    Set<Role> roles;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    Set<Transaction> transactions;
}
