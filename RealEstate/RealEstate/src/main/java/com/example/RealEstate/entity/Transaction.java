package com.example.RealEstate.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor()
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    Date date;
    String description;
    Boolean status = false;
    Double totalAmount;
    String transactionPlace;

    @ManyToOne
    @JoinColumn(name = "property_id")
    @JsonManagedReference
    Property property;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    User user;
}
