package com.example.RealEstate.repository;

import com.example.RealEstate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
    boolean existsByUserName(String userName);
    User findByUserName(String userName);
    List<User> findByRolesName(String roleName);
}
