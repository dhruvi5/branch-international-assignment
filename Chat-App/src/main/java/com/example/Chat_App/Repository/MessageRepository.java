package com.example.Chat_App.Repository;

import com.example.Chat_App.Entity.Message;
import com.example.Chat_App.Entity.Priority;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long>{
    Optional<Message> findById(Long id);

}
