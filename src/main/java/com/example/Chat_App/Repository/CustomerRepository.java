package com.example.Chat_App.Repository;

import com.example.Chat_App.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> { }
