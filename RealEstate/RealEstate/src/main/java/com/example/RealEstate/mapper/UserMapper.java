package com.example.RealEstate.mapper;

import com.example.RealEstate.dto.request.UserRequest;
import com.example.RealEstate.dto.response.UserResponse;
import com.example.RealEstate.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", ignore = true)
    User toUser(UserRequest userRequest);
    UserResponse toUserResponse(User user);
}
