package com.example.RealEstate.service.Implement;

import com.example.RealEstate.dto.request.PropertyRequest;
import com.example.RealEstate.dto.response.PropertyResponse;
import com.example.RealEstate.entity.Property;
import com.example.RealEstate.entity.User;
import com.example.RealEstate.exception.AppException;
import com.example.RealEstate.exception.ErrorCode;
import com.example.RealEstate.mapper.PropertyMapper;
import com.example.RealEstate.repository.PropertyImagesRepository;
import com.example.RealEstate.repository.PropertyRepository;
import com.example.RealEstate.repository.UserRepository;
import com.example.RealEstate.service.PropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyServiceImplement implements PropertyService {
    private static final Logger log = LoggerFactory.getLogger(PropertyServiceImplement.class);
    @Autowired
    PropertyRepository propertyRepository;
    @Autowired
    PropertyMapper propertyMapper;
    @Autowired
    PropertyImagesRepository propertyImagesRepository;
    @Autowired
    UserRepository userRepository;

    @PreAuthorize("hasRole('AGENT')")
    @Override
    public PropertyResponse create(PropertyRequest propertyRequest) {
        var userOptional  = userRepository.findById(propertyRequest.getUser());
        if (userOptional.isEmpty()) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        User user = userOptional.get();
        boolean isAgent = user.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("AGENT"));

        if (!isAgent){
            throw new AppException(ErrorCode.USER_NOT_APPROVE);
        }

        Property property = propertyMapper.toProperty(propertyRequest);
//        log.info("Bathroom: " + property.getBathroom());

        var propertyImages = propertyImagesRepository.findAllById(propertyRequest.getPropertyImages());
        property.setPropertyImages(new HashSet<>(propertyImages));

        property.setUser(user);
        property.setApproved(false);
        return propertyMapper.toPropertyResponse(propertyRepository.save(property));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<PropertyResponse> getAll() {
        var properties = propertyRepository.findAll();
        return properties.stream().map(propertyMapper::toPropertyResponse).toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void approveProperty(String propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new AppException(ErrorCode.PROPERTY_NOT_FOUND));
        property.setApproved(true);
        propertyRepository.save(property);
    }

//    Không cần quyền
    @Override
    public List<PropertyResponse> getApprovedProperties() {
        List<Property> approvedProperties = propertyRepository.findByApprovedTrue();
        return approvedProperties.stream()
                .map(propertyMapper::toPropertyResponse)
                .collect(Collectors.toList());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public void deleteProperty(String propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new AppException(ErrorCode.PROPERTY_NOT_FOUND));
        propertyRepository.delete(property);
    }

    @Override
    @PreAuthorize("hasRole('AGENT')")
    public List<PropertyResponse> getPropertiesByUserId(String userId) {
        List<Property> properties = propertyRepository.findByUser_Id(userId);
        return properties.stream()
                .map(propertyMapper::toPropertyResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyResponse getPropertyById(String propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);
        return property
                .map(propertyMapper::toPropertyResponse)
                .orElseThrow(() -> new AppException(ErrorCode.PROPERTY_NOT_FOUND));

    }

    @PreAuthorize("hasRole('AGENT')")
    @Override
    public PropertyResponse updateProperty(String propertyId, PropertyRequest propertyRequest) {

        var userOptional = userRepository.findById(propertyRequest.getUser());
        if (userOptional.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        User user = userOptional.get();
        boolean isAgent = user.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("AGENT"));

        if (!isAgent) {
            throw new AppException(ErrorCode.USER_NOT_APPROVE);
        }
        var propertyOptional = propertyRepository.findById(propertyId);
        if(propertyOptional.isEmpty()){
            throw new AppException(ErrorCode.PROPERTY_NOT_FOUND);
        }
        Property propertyFound = propertyOptional.get();
        if(propertyFound.getName() != null) {propertyFound.setName(propertyRequest.getName());}
        if(propertyFound.getAddress() != null) {propertyFound.setAddress(propertyRequest.getAddress());}
        if(propertyFound.getDescription() != null) {propertyFound.setDescription(propertyRequest.getDescription());}
        if(propertyFound.getPrice() != null) {propertyFound.setPrice(propertyRequest.getPrice());}
        if(propertyFound.getSquares() != null) {propertyFound.setSquares(propertyRequest.getSquares());}
        if(propertyFound.getRoom() != null) {propertyFound.setRoom(propertyRequest.getRoom());}
        if(propertyFound.getBathroom() != null) {propertyFound.setBathroom(propertyRequest.getBathroom());}

        if(propertyFound.getType() != null) {propertyFound.setType(propertyRequest.getType());}

        //image
        if (propertyRequest.getPropertyImages() != null && !propertyRequest.getPropertyImages().isEmpty()) {
            var propertyImages = propertyImagesRepository.findAllById(propertyRequest.getPropertyImages());
            propertyFound.setPropertyImages(new HashSet<>(propertyImages));
        }
        propertyFound.setApproved(false);
        propertyFound.setUser(user);

        Property updatedProperty = propertyRepository.save(propertyFound);

        return propertyMapper.toPropertyResponse(propertyRepository.save(updatedProperty));
    }


}
