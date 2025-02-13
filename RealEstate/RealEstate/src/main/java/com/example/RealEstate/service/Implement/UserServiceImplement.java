package com.example.RealEstate.service.Implement;

import com.example.RealEstate.configuration.JwtConfig;
import com.example.RealEstate.dto.request.UserRequest;
import com.example.RealEstate.dto.response.UserResponse;
import com.example.RealEstate.entity.Role;
import com.example.RealEstate.entity.User;
import com.example.RealEstate.exception.AppException;
import com.example.RealEstate.exception.ErrorCode;
import com.example.RealEstate.mapper.UserMapper;
import com.example.RealEstate.repository.RoleRepository;
import com.example.RealEstate.repository.UserRepository;
import com.example.RealEstate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImplement implements UserService {
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private JwtConfig jwtConfig;

    @Override
    public UserResponse create(UserRequest userRequest) {
        // Kiểm tra xem người dùng đã tồn tại hay chưa
        checkExistingUser(userRequest.getEmail(), userRequest.getUserName());

        // Chuyển đổi từ UserRequest sang User entity
        User user = userMapper.toUser(userRequest);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Xử lý các vai trò
        Set<Role> roles = getOrCreateRoles(userRequest.getRoles());
        user.setRoles(roles);

        // Lưu người dùng vào cơ sở dữ liệu và trả về UserResponse
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public List<UserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Override
    public UserResponse getMyInfo() {
        return null;
    }

    @Override
    public String signIn(String userName, String password) {
        User user = userRepository.findByUserName(userName);
        if (user == null) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_INCORRECT);
        }
        return jwtConfig.generateToken(user);
    }

    @Override
    public List<UserResponse> getAgents() {
        return userRepository.findByRolesName("AGENT").stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    private void checkExistingUser(String email, String username) {
        if (userRepository.existsByEmail(email)) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        if (userRepository.existsByUserName(username)) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }
    }

    private Set<Role> getOrCreateRoles(Set<String> roleNames) {
        // Duyệt qua từng vai trò trong set và kiểm tra hoặc tạo mới vai trò nếu cần
        Set<Role> roles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findById(roleName)
                    .orElseGet(() -> createRole(roleName));
            roles.add(role);
        }
        return roles;
    }
    private Role createRole(String roleName) {
        // Tạo vai trò mới nếu chưa tồn tại
        Role role = new Role();
        role.setName(roleName);
        role.setDescription(roleName + " role description");  // Mô tả vai trò tùy chỉnh
        return roleRepository.save(role);
    }
}
