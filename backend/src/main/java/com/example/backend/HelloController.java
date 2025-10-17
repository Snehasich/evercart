package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    private final LoginRepo loginRepo;

    @Autowired
    public HelloController(LoginRepo loginRepo) {
        this.loginRepo = loginRepo;
    }
    
    @GetMapping("/get")
    public List<LoginDetails> getDetails() {
        return fetchAllUsers();
    }
    public List<LoginDetails> fetchAllUsers() {
        return loginRepo.findAll();
    }

    @DeleteMapping("/delete/id/{myid}")
    public ResponseEntity<?> delete(@PathVariable Long myid) {
        deleteUserById(myid);
        return ResponseEntity.ok("User with id " + myid + " deleted successfully.");
    }

    @DeleteMapping("/delete/username/{username}")
    public ResponseEntity<String> delete(@PathVariable String username) {
        deleteUserByName(username);
        return ResponseEntity.ok("User with username " + username + " deleted successfully.");
    }

    public void deleteUserByName(String username) {
        boolean exists = loginRepo.existsByUsername(username);
        if(!exists) {
            throw new IllegalStateException("User with username " + username + " does not exits");
        }
        loginRepo.deleteByUsername(username);
    }

    public void deleteUserById(Long studentId) {
        boolean exists = loginRepo.existsById(studentId);
        if(!exists) {
            throw new IllegalStateException("student with id " + studentId + " does not exits");
        }
        loginRepo.deleteById(studentId);
    }

}
