package com.example.RealEstate.entity;

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
public class PropertyImages {
    @Id
    String images;

    // Quan hệ nhiều-một với Property
    @ManyToMany(mappedBy = "propertyImages")
    Set<Property> properties;
}
