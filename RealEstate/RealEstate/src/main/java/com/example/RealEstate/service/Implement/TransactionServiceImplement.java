package com.example.RealEstate.service.Implement;

import com.example.RealEstate.dto.request.TransactionRequest;
import com.example.RealEstate.dto.response.TransactionResponse;
import com.example.RealEstate.entity.Property;
import com.example.RealEstate.entity.Transaction;
import com.example.RealEstate.entity.User;
import com.example.RealEstate.exception.AppException;
import com.example.RealEstate.exception.ErrorCode;
import com.example.RealEstate.mapper.TransactionMapper;
import com.example.RealEstate.repository.PropertyRepository;
import com.example.RealEstate.repository.TransactionRepository;
import com.example.RealEstate.repository.UserRepository;
import com.example.RealEstate.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TransactionServiceImplement implements TransactionService {
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    TransactionMapper transactionMapper;
    @Autowired
    PropertyRepository propertyRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    @PreAuthorize("hasRole('CUSTOMER')")
    public TransactionResponse createTransaction(TransactionRequest transactionRequest) {
        var userOptional = userRepository.findById(transactionRequest.getUser());
        if (userOptional.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        User user = userOptional.get();
        log.info(String.valueOf(user));

        var propertyOptional = propertyRepository.findById(transactionRequest.getProperty());
        if (propertyOptional.isEmpty()) {
            throw new AppException(ErrorCode.PROPERTY_NOT_FOUND);
        }
        Property property = propertyOptional.get();

        Transaction transaction = Transaction.builder()
                .user(user)
                .property(property)
                .description(transactionRequest.getDescription())
                .transactionPlace("Transaction Place: " +
                        "20 Street 53, Binh Thuan Ward, District 7, Ho Chi Minh City")
                .status(false)
                .date(new Date())
                .totalAmount(property.getPrice())
                .build();

        transaction = transactionRepository.save(transaction);

        return transactionMapper.toTransactionResponse(transaction);
    }

//    Không cần quyền(để hiển thị)
    @Override
    public List<TransactionResponse> getTransactionsByUser(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        return transactions.stream()
                .map(transactionMapper::toTransactionResponse)
                .collect(Collectors.toList());
    }

//    Không cần quyền(để hiển thị)
    @Override
    public List<TransactionResponse> getTransactionsByAgent(String agentId) {
        List<Transaction> transactions = transactionRepository.findByPropertyUserId(agentId);

        return transactions.stream()
                .map(transactionMapper::toTransactionResponse)
                .collect(Collectors.toList());
    }

//    Ai cũng tự hủy được nên không cần quyền
    @Override
    public void deleteTransaction(String transactionId) {
        Optional<Transaction> transactionOpt = transactionRepository.findById(transactionId);
        if (transactionOpt.isPresent()) {
            transactionRepository.delete(transactionOpt.get());
        } else {
            throw new AppException(ErrorCode.TRANSACTION_NOT_FOUND);
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<TransactionResponse> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(transaction -> transactionMapper.toTransactionResponse(transaction))
                .collect(Collectors.toList());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void approveTransaction(String transactionId) {
        Optional<Transaction> transactionOpt = transactionRepository.findById(transactionId);
        if (transactionOpt.isPresent()) {
            Transaction transaction = transactionOpt.get();
            transaction.setStatus(true);
            transactionRepository.save(transaction);
        } else {
            throw new AppException(ErrorCode.TRANSACTION_NOT_FOUND);
        }
    }
}
