package com.example.Chat_App.Repository;

import com.example.Chat_App.Entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRepository extends JpaRepository<Agent, Long> { }