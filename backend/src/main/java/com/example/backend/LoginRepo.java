package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LoginRepo extends JpaRepository<LoginDetails, Long> {
    
    // Finds a user by username for login
    Optional<LoginDetails> findByUsername(String username);

    // Checks if a username already exists for registration
    boolean existsByUsername(String username); 
}