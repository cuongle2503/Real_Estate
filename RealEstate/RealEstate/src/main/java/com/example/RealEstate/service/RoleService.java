package com.example.RealEstate.service;

import com.example.RealEstate.dto.request.RoleRequest;
import com.example.RealEstate.dto.response.RoleResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    RoleResponse create(RoleRequest roleRequest);
    List<RoleResponse> getAll();
    void delete(String role);
}
