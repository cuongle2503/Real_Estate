package com.example.RealEstate.mapper;

import com.example.RealEstate.dto.request.PropertyRequest;
import com.example.RealEstate.dto.response.PropertyResponse;
import com.example.RealEstate.entity.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PropertyMapper {
    @Mapping(target = "propertyImages", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "squares", source = "squares")
    @Mapping(target = "room", source = "room")
    @Mapping(target = "bathroom", source = "bathroom")
//    @Mapping(target = "type", source = "type")
    Property toProperty(PropertyRequest propertyRequest);
    PropertyResponse toPropertyResponse(Property property);
}
