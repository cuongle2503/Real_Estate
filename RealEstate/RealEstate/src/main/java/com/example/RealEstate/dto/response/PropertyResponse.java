package com.example.RealEstate.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyResponse {
    String id;
    String name;
    String address;
    String description;
    Double price;
    Boolean approved;
    Double squares;
    String room;
    String bathroom;
    String type;
    @JsonFormat(pattern = "dd/MM/yyyy")
    LocalDateTime createdAt;
    Set<PropertyImagesResponse> propertyImages;
    UserResponse user;
}
