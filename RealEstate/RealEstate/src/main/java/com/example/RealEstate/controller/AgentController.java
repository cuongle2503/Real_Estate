package com.example.RealEstate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AgentController {
    @GetMapping("/agent/create")
    public String showAgentCreateProperty() {
        return "agent/create";
    }

    @GetMapping("/agent/property")
    public String showAgentPropertyPage() {
        return "agent/property";
    }

    @GetMapping("/agent/create-image")
    public String showAgentPropertyImagePage() {
        return "agent/createImage";
    }

    @GetMapping("/agent/transaction")
    public String showAgentTransactionPage() {
        return "agent/transaction";
    }
}
