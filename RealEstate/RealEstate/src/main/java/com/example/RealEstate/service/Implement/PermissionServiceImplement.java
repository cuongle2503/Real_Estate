package com.example.RealEstate.service.Implement;

import com.example.RealEstate.dto.request.PermissionRequest;
import com.example.RealEstate.dto.response.PermissionResponse;
import com.example.RealEstate.entity.Permission;
import com.example.RealEstate.mapper.PermissionMapper;
import com.example.RealEstate.repository.PermissionRepository;
import com.example.RealEstate.service.PermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionServiceImplement implements PermissionService {
    private static final Logger log = LoggerFactory.getLogger(PermissionServiceImplement.class);
    @Autowired
    PermissionRepository permissionRepository;
    @Autowired
    PermissionMapper permissionMapper;

    @Override
    public PermissionResponse create(PermissionRequest permissionRequest) {
        Permission permission = permissionMapper.toPermission(permissionRequest);
        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    public List<PermissionResponse> getAll() {
        var permissions = permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    @Override
    public void delete(String permission) {
        permissionRepository.deleteById(permission);
    }
}
