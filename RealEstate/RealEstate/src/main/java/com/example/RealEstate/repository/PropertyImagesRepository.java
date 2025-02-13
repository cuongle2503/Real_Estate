package com.example.RealEstate.repository;

import com.example.RealEstate.entity.PropertyImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyImagesRepository extends JpaRepository<PropertyImages, String> {
}
