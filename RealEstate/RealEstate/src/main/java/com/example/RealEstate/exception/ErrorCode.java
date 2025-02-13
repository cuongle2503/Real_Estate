package com.example.RealEstate.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor()
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    EMAIL_EXISTED("Your email have exist."),
    EMAIL_NOT_EXISTED("Your email not exist."),
    USERNAME_EXISTED("Your username have exist."),
    PASSWORD_INCORRECT("Incorrect password."),
    PASSWORD_INVALID_SIZE("Password must be at least 8 characters."),
    PASSWORD_INVALID_PATTERN("Password must contain at least one letter and one number."),
    INVALID_DOB("You must above 18 age."),
    USER_NOT_EXISTED("User not exist."),
    USER_NOT_APPROVE("User not approve create property."),
    PROPERTY_NOT_FOUND("Property not found."),
    TRANSACTION_NOT_FOUND("Transaction not found."),
    IMAGES_NOT_FOUND("No images found")
    ;
    String message;
}
