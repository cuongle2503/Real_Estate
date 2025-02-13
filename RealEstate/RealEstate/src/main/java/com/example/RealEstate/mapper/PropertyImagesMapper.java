package com.example.RealEstate.mapper;

import com.example.RealEstate.dto.request.PropertyImagesRequest;
import com.example.RealEstate.dto.response.PropertyImagesResponse;
import com.example.RealEstate.entity.PropertyImages;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PropertyImagesMapper {
    PropertyImages toPropertyImages(PropertyImagesRequest propertyImagesRequest);
    PropertyImagesResponse toPropertyImagesResponse(PropertyImages propertyImages);
}
