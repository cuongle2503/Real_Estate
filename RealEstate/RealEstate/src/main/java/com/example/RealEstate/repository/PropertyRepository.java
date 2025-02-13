package com.example.RealEstate.repository;

import com.example.RealEstate.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String> {
    List<Property> findByApprovedTrue();
    List<Property> findByUser_Id(String userId);
}
