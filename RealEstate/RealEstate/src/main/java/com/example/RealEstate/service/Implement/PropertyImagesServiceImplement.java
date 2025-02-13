package com.example.RealEstate.service.Implement;

import com.example.RealEstate.dto.request.PropertyImagesRequest;
import com.example.RealEstate.dto.response.PropertyImagesResponse;
import com.example.RealEstate.entity.PropertyImages;
import com.example.RealEstate.mapper.PropertyImagesMapper;
import com.example.RealEstate.repository.PropertyImagesRepository;
import com.example.RealEstate.service.AwsS3Service;
import com.example.RealEstate.service.PropertyImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PropertyImagesServiceImplement implements PropertyImagesService {
    @Autowired
    PropertyImagesRepository propertyImagesRepository;
    @Autowired
    PropertyImagesMapper propertyImagesMapper;
    @Autowired
    AwsS3Service awsS3Service;

//    @Override
//    public PropertyImagesResponse create(PropertyImagesRequest propertyImagesRequest) {
//        // Ánh xạ request thành đối tượng PropertyImages
//        PropertyImages propertyImages = propertyImagesMapper.toPropertyImages(propertyImagesRequest);
//
//        // Lưu thông tin ảnh vào cơ sở dữ liệu
//        PropertyImages savedPropertyImages = propertyImagesRepository.save(propertyImages);
//
//        // Trả về response chứa thông tin ảnh đã được lưu
//        return propertyImagesMapper.toPropertyImagesResponse(savedPropertyImages);
//    }
@Override
public List<PropertyImagesResponse> create(PropertyImagesRequest propertyImagesRequest) {
    // Lưu URL của từng file sau khi upload lên S3
    List<String> uploadedUrls = propertyImagesRequest.getFiles().stream()
            .map(awsS3Service::saveImgToS3)
            .toList();

    // Lưu các thông tin vào database
    List<PropertyImages> savedImages = uploadedUrls.stream()
            .map(url -> {
                PropertyImages propertyImages = new PropertyImages();
                propertyImages.setImages(url);
                return propertyImagesRepository.save(propertyImages);
            })
            .toList();

    // Tạo danh sách response trả về
    return savedImages.stream()
            .map(image -> PropertyImagesResponse.builder()
                    .images(image.getImages())
                    .build())
            .toList();
}



    @Override
    public List<PropertyImagesResponse> getAll() {
        var propertyImages = propertyImagesRepository.findAll();
        return propertyImages.stream().map(propertyImagesMapper::toPropertyImagesResponse).toList();
    }

    @Override
    public void delete(String propertyImages) {
        propertyImagesRepository.deleteById(propertyImages);
    }
}
