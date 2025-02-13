package com.example.RealEstate.controller.API;

import com.example.RealEstate.dto.request.PermissionRequest;
import com.example.RealEstate.dto.request.PropertyImagesRequest;
import com.example.RealEstate.dto.response.PermissionResponse;
import com.example.RealEstate.dto.response.PropertyImagesResponse;
import com.example.RealEstate.service.AwsS3Service;
import com.example.RealEstate.service.PermissionService;
import com.example.RealEstate.service.PropertyImagesService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/propertyimages")
public class APIPropertyImagesController {
    @Autowired
    PropertyImagesService propertyImagesService;
    @Autowired
    AwsS3Service awsS3Service;

    @PostMapping("/create")
    public ResponseEntity<List<PropertyImagesResponse>> createPropertyImages(
            @RequestPart("files") List<MultipartFile> files // Nhận nhiều file ảnh từ form-data
    ) {
        // Tạo đối tượng PropertyImagesRequest chứa danh sách file
        PropertyImagesRequest propertyImagesRequest = PropertyImagesRequest.builder()
                .files(files) // Gán danh sách file
                .build();

        // Gọi service để xử lý và lưu ảnh
        List<PropertyImagesResponse> responses = propertyImagesService.create(propertyImagesRequest);

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/getAll")
    List<PropertyImagesResponse> getAll(){
        return propertyImagesService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    void delete(@PathVariable("id") String propertyImage){
        propertyImagesService.delete(propertyImage);
    }
}
