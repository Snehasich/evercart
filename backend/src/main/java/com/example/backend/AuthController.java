package com.example.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // IMPORTANT: Allows React to connect
public class AuthController {

    private final LoginRepo loginRepo; // Use final keyword

    // Constructor Injection: Spring automatically wires LoginRepo dependency
    public AuthController(LoginRepo loginRepo) {
        this.loginRepo = loginRepo;
    }

    // 1. SIGN-UP (POST /api/auth/register)
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody LoginDetails newUser) {
        
        // Check if username is already taken
        if (loginRepo.existsByUsername(newUser.getUsername())) {
            // Return HTTP 409 Conflict if username exists
            return new ResponseEntity<>("Username is already taken!", HttpStatus.CONFLICT);
        }
        
        // Save the new user to MySQL
        loginRepo.save(newUser);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    // 2. LOGIN (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDetails loginUser) {
        
        // Find the user by username
        Optional<LoginDetails> userOptional = loginRepo.findByUsername(loginUser.getUsername());

        // Check if user exists and password matches
        if (userOptional.isPresent() && 
            userOptional.get().getPassword().equals(loginUser.getPassword())) {
            
            // Success
            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        }
        
        // Failure
        return new ResponseEntity<>("Invalid username or password.", HttpStatus.UNAUTHORIZED);
    }
}