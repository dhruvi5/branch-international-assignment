package com.example.Chat_App.Repository;

import com.example.Chat_App.Entity.Message;
import com.example.Chat_App.Entity.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
