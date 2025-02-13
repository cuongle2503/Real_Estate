package com.example.RealEstate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
    @GetMapping("/admin/user")
    public String showAdminUserPage() {
        return "admin/user";
    }

    @GetMapping("/admin/property")
    public String showAdminPropertyPage() {
        return "admin/property";
    }

    @GetMapping("/admin/transaction")
    public String showAdminTransactionPage() {
        return "admin/transaction";
    }

}
