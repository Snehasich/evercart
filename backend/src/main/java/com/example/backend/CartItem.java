package com.example.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productId; // ✅ FIXED: Changed from Long to String
    private String name;
    private Double price;
    private Integer quantity;
    private String username;

    public CartItem() {}

    // ✅ FIXED: Constructor now accepts String productId
    public CartItem(String productId, String name, Double price, Integer quantity, String username) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.username = username;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // ✅ FIXED: Getter and setter updated for String
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}