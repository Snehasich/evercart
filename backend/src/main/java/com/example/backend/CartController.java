package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepo cartRepo;

    // GET all cart items for a user
    @GetMapping
    public List<CartItem> getCart(@RequestParam String username) {
        return cartRepo.findByUsername(username);
    }

    // ✅ FIXED: This logic now correctly handles ADDING a new item
    // and UPDATING the quantity of an existing item.
    @PostMapping
    public CartItem addOrUpdateCartItem(@RequestParam String username, @RequestBody CartItem item) {
        
        Optional<CartItem> existing = cartRepo.findByUsernameAndProductId(username, item.getProductId());
        
        if (existing.isPresent()) {
            // Item exists: update its quantity from the request
            CartItem cartItem = existing.get();
            cartItem.setQuantity(item.getQuantity());
            return cartRepo.save(cartItem);
        } else {
            // Item is new: set the username and save it
            item.setUsername(username);
            // Ensure quantity is 1 if it's a new item (like from Inside_items.jsx)
            if (item.getQuantity() == null || item.getQuantity() < 1) {
                item.setQuantity(1);
            }
            return cartRepo.save(item);
        }
    }

    // DELETE product from cart
    @DeleteMapping("/{productId}")
    // ✅ FIXED: Changed from Long to String
    public void removeFromCart(@RequestParam String username, @PathVariable String productId) {
        cartRepo.deleteByUsernameAndProductId(username, productId);
    }
}