package com.example.RealEstate.controller.API;

import com.example.RealEstate.dto.request.UserRequest;
import com.example.RealEstate.dto.response.UserResponse;
import com.example.RealEstate.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/user")
public class APIUserController {
    private static final Logger log = LoggerFactory.getLogger(APIUserController.class);
    @Autowired
    UserService userService;

    @PostMapping("/create")
    UserResponse create(@Valid @RequestBody UserRequest userRequest) {
        return userService.create(userRequest);
    }

    @GetMapping("/getAll")
    List<UserResponse> getAll() {
        return userService.getAll();
    }

    @PostMapping("/signIn")
    String signIn(@Valid @RequestBody UserRequest userRequest) {
        return userService.signIn(userRequest.getUserName(), userRequest.getPassword());
    }

    @GetMapping("/getAgents")
    List<UserResponse> getAgents() {
        return userService.getAgents();
    }
}
