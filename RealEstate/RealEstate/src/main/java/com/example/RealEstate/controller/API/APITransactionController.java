package com.example.RealEstate.controller.API;

import com.example.RealEstate.dto.request.TransactionRequest;
import com.example.RealEstate.dto.response.TransactionResponse;
import com.example.RealEstate.service.TransactionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/transaction")
public class APITransactionController {
    @Autowired
    TransactionService transactionService;

    @PostMapping("/create")
    TransactionResponse create(@RequestBody TransactionRequest transactionRequest) {
        return transactionService.createTransaction(transactionRequest);
    }

    @GetMapping("/getByUser/{userId}")
    List<TransactionResponse> getTransactionsByUser(@PathVariable String userId) {
        return transactionService.getTransactionsByUser(userId);
    }

    @GetMapping("/getByAgent/{agentId}")
    List<TransactionResponse> getTransactionsByAgent(@PathVariable String agentId) {
        return transactionService.getTransactionsByAgent(agentId);
    }

    @GetMapping("/getAll")
    List<TransactionResponse> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @DeleteMapping("delete/{transactionId}")
    void deleteTransaction(@PathVariable String transactionId){
        transactionService.deleteTransaction(transactionId);
    }

    @PutMapping("/approve/{transactionId}")
    void approveTransaction(@PathVariable String transactionId) {
        transactionService.approveTransaction(transactionId);
    }
}
