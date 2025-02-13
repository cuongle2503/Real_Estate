package com.example.RealEstate.service.Implement;

import com.example.RealEstate.dto.request.RoleRequest;
import com.example.RealEstate.dto.response.RoleResponse;
import com.example.RealEstate.entity.Role;
import com.example.RealEstate.mapper.RoleMapper;
import com.example.RealEstate.repository.PermissionRepository;
import com.example.RealEstate.repository.RoleRepository;
import com.example.RealEstate.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class RoleServiceImplement implements RoleService {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PermissionRepository permissionRepository;
    @Autowired
    RoleMapper roleMapper;

    @Override
    public RoleResponse create(RoleRequest roleRequest) {
        Role role = roleMapper.toRole(roleRequest);
        var permissions = permissionRepository.findAllById(roleRequest.getPermissions());
        role.setPermissions(new HashSet<>(permissions));
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    @Override
    public List<RoleResponse> getAll() {
        var roles = roleRepository.findAll();
        return roles.stream().map(roleMapper::toRoleResponse).toList();
    }

    @Override
    public void delete(String role) {
        roleRepository.deleteById(role);
    }
}
