package com.example.RealEstate.mapper;

import com.example.RealEstate.dto.request.TransactionRequest;
import com.example.RealEstate.dto.response.TransactionResponse;
import com.example.RealEstate.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    @Mapping(target = "property", ignore = true)
    @Mapping(target = "user", ignore = true)
    Transaction toTransaction(TransactionRequest transactionRequest);
    TransactionResponse toTransactionResponse(Transaction transaction);
}
