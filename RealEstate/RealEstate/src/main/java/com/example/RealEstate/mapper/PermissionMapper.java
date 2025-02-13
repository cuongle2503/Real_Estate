package com.example.RealEstate.mapper;

import com.example.RealEstate.dto.request.PermissionRequest;
import com.example.RealEstate.dto.response.PermissionResponse;
import com.example.RealEstate.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest permissionRequest);
    PermissionResponse toPermissionResponse(Permission permission);
}
