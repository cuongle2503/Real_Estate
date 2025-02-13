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
public class PropertyRequest {
    String name;
    String address;
    String description;
    Double price;
    Double squares;
    String room;
    String bathroom;
    String type;
    Set<String> propertyImages;
    String user;
}
