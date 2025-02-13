package com.example.RealEstate.dto.response;

import com.example.RealEstate.entity.Property;
import com.example.RealEstate.entity.User;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionResponse {
    String id;
    Date date;
    String description;
    Boolean status;
    Double totalAmount;
    String transactionPlace;

    PropertyResponse property;
    UserResponse user;
}
