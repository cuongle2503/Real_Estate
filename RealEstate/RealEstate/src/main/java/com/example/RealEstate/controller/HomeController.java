package com.example.RealEstate.controller;

import com.example.RealEstate.dto.response.PropertyResponse;
import com.example.RealEstate.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {
    @Autowired
    private PropertyService propertyService;
    @GetMapping("/register")
    public String showRegisterPage() {
        return "signup";
    }

    @GetMapping("/login")
    public String showLoginPage() {
        return "signin";
    }

    @GetMapping("/admin/dashboard")
    public String showAdminPage() {
        return "admin/index";
    }

    @GetMapping("/agent/dashboard")
    public String showAgentPage() {
        return "agent/index";
    }

    @GetMapping("/home")
    public String showCustomerPage() {
        return "customer/index";
    }

    @GetMapping("/about")
    public String showAboutPage() {
        return "customer/about";
    }

    @GetMapping("/contact")
    public String showContactPage() {
        return "customer/contact";
    }

    @GetMapping("/property-details/{propertyId}")
    public String showPropertyDetails(@PathVariable("propertyId") String propertyId, Model model) {
        PropertyResponse property = propertyService.getPropertyById(propertyId);
        model.addAttribute("property", property);

        return "customer/property-detail";
    }


    @GetMapping("/error")
    public String showErrorPage() {
        return "/404";
    }
}
