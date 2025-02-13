package com.example.RealEstate.service;

import com.example.RealEstate.dto.request.UserRequest;
import com.example.RealEstate.dto.response.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserResponse create(UserRequest userRequest);
    List<UserResponse> getAll();
    UserResponse getMyInfo();
    String signIn(String username, String password);
    List<UserResponse> getAgents();
}
