package com.example.RealEstate.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

@Service
@Slf4j
public class AwsS3Service {
    private final String bucketName = "lhoang-realestate";

    @Value("${aws.s3.access}")
    private String awsS3AccessKey;

    @Value("${aws.s3.secrete}")
    private String awsS3SecretKey;

    public String saveImgToS3(MultipartFile photoImg) {
        try {
            String s3FileName = photoImg.getOriginalFilename();
            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(Regions.AP_SOUTHEAST_2)
                    .build();

            InputStream inputStream = photoImg.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photoImg.getContentType()); // Đặt đúng content type
            metadata.setContentLength(photoImg.getSize()); // Chỉ định độ dài nội dung

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName, inputStream, metadata);
            s3Client.putObject(putObjectRequest);

            // Trả về URL của tệp đã upload
            URL fileUrl = s3Client.getUrl(bucketName, s3FileName);
            return fileUrl.toString();
        } catch (IOException e) {
            log.error("Error uploading image to S3: ", e);
            throw new RuntimeException("Unable to upload image to S3 bucket: " + e.getMessage());
        }
    }
}
