package com.example.RealEstate.controller.API;

import com.example.RealEstate.dto.request.RoleRequest;
import com.example.RealEstate.dto.response.RoleResponse;
import com.example.RealEstate.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/role")
public class APIRoleController {
    RoleService roleService;

    @PostMapping("/create")
    RoleResponse create(@RequestBody RoleRequest roleRequest){
        return roleService.create(roleRequest);
    }

    @GetMapping("/getAll")
    List<RoleResponse> getAll(){
        return roleService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    void delete(@PathVariable("id") String roleId){
        roleService.delete(roleId);
    }
}
