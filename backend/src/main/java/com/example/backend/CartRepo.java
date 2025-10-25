package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUsername(String username);

    // ✅ FIXED: Changed from Long to String
    Optional<CartItem> findByUsernameAndProductId(String username, String productId);

    @Transactional
    // ✅ FIXED: Changed from Long to String
    void deleteByUsernameAndProductId(String username, String productId);
}