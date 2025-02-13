package com.example.RealEstate.mapper;

import com.example.RealEstate.dto.request.RoleRequest;
import com.example.RealEstate.dto.response.RoleResponse;
import com.example.RealEstate.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest roleRequest);
    RoleResponse toRoleResponse(Role role);
}
