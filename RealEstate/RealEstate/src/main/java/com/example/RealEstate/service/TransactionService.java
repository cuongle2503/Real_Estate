package com.example.RealEstate.service;

import com.example.RealEstate.dto.request.TransactionRequest;
import com.example.RealEstate.dto.response.TransactionResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TransactionService {
    TransactionResponse createTransaction(TransactionRequest transactionRequest);
    List<TransactionResponse> getTransactionsByUser(String userId);
    List<TransactionResponse> getTransactionsByAgent(String agentId);
    void deleteTransaction(String transactionId);
    List<TransactionResponse> getAllTransactions();
    void approveTransaction(String transactionId);
}
