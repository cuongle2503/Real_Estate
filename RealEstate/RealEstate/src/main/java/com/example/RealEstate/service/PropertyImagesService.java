package com.example.RealEstate.service;

import com.example.RealEstate.dto.request.PropertyImagesRequest;
import com.example.RealEstate.dto.response.PropertyImagesResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface PropertyImagesService {
    List<PropertyImagesResponse> create(PropertyImagesRequest propertyImagesRequest);
    List<PropertyImagesResponse> getAll();
    void delete(String propertyImages);
}