package com.example.RealEstate.controller.API;

import com.example.RealEstate.dto.request.PermissionRequest;
import com.example.RealEstate.dto.response.PermissionResponse;
import com.example.RealEstate.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/permission")
public class APIPermissionController {
    @Autowired
    PermissionService permissionService;

    @PostMapping("/create")
    PermissionResponse create(@RequestBody PermissionRequest permissionRequest){
        return permissionService.create(permissionRequest);
    }

    @GetMapping("/getAll")
    List<PermissionResponse> getAll(){
        return permissionService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    void delete(@PathVariable("id") String permissionId){
        permissionService.delete(permissionId);
    }
}
