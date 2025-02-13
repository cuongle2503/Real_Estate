package com.example.RealEstate.controller.API;

import com.example.RealEstate.dto.request.PropertyRequest;
import com.example.RealEstate.dto.response.PropertyResponse;
import com.example.RealEstate.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/property")
public class APIPropertyController {
    @Autowired
    PropertyService propertyService;

    @PostMapping("/create")
    PropertyResponse create(@RequestBody PropertyRequest propertyRequest) {
        return propertyService.create(propertyRequest);
    }
    @PutMapping("/update/{propertyId}")
    PropertyResponse update(@PathVariable String propertyId, @RequestBody PropertyRequest propertyRequest) {
        return propertyService.updateProperty(propertyId, propertyRequest);
    }

    @GetMapping("/getAll")
    List<PropertyResponse> getAll() {
        return propertyService.getAll();
    }

    @PostMapping("/approve/{propertyId}")
    ResponseEntity<Void> approveProperty(@PathVariable String propertyId) {
        try {
            propertyService.approveProperty(propertyId);
            return ResponseEntity.ok().build();  // Trả về 200 OK nếu thành công
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // Trả về 500 nếu có lỗi
        }
    }


    @GetMapping("/getApproved")
    List<PropertyResponse> getApprovedProperties() {
        return propertyService.getApprovedProperties();
    }

    @DeleteMapping("/delete/{propertyId}")
    void deleteProperty(@PathVariable String propertyId) {
        propertyService.deleteProperty(propertyId);
    }

    @GetMapping("/getProperties/{userId}")
    List<PropertyResponse> getPropertiesByAgent(@PathVariable String userId) {
        return propertyService.getPropertiesByUserId(userId);
    }
    @GetMapping("/getProperty/{propertyId}")
    PropertyResponse getProperty(@PathVariable String propertyId) {
        return propertyService.getPropertyById(propertyId);
    }
}
