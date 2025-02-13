package com.example.RealEstate.service;

import com.example.RealEstate.dto.request.PermissionRequest;
import com.example.RealEstate.dto.response.PermissionResponse;
import com.example.RealEstate.repository.PermissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PermissionService {
    PermissionResponse create(PermissionRequest permissionRequest);
    List<PermissionResponse> getAll();
    void delete(String permission);
}
