package com.example.RealEstate.service;

import com.example.RealEstate.dto.request.PropertyRequest;
import com.example.RealEstate.dto.response.PropertyResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PropertyService {
    PropertyResponse create(PropertyRequest propertyRequest);
    List<PropertyResponse> getAll();
    void approveProperty(String propertyId);
    List<PropertyResponse> getApprovedProperties();
    void deleteProperty(String propertyId);
    List<PropertyResponse> getPropertiesByUserId(String userId);
    PropertyResponse getPropertyById(String propertyId);
    PropertyResponse updateProperty(String propertyId, PropertyRequest propertyRequest);
}
