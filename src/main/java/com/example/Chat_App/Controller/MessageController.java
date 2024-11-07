package com.example.Chat_App.Controller;

import com.example.Chat_App.Entity.Message;
import com.example.Chat_App.Service.CsvImportService;
import com.example.Chat_App.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private CsvImportService csvImportService;

    @PostMapping("/send")
    public Message sendMessage(@RequestParam Long customerId, @RequestParam String content) {
        return messageService.createMessage(customerId, content);
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @PutMapping("/{id}/respond")
    public ResponseEntity<?> respondToMessage(@PathVariable Long id, @RequestParam Long agentId, @RequestParam String response) {
        messageService.respondToMessage(id, agentId, response);
        return ResponseEntity.ok("Message responded to and marked as resolved");
    }

    @PostMapping("/import")
    public ResponseEntity<?> importMessages() {
        try {
            csvImportService.importMessagesFromCsv();
            return ResponseEntity.ok("Messages imported successfully");
        } catch (IOException e) {
            e.printStackTrace(); // Print the full stack trace in the console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to import messages: " + e.getMessage());
        }
    }


}
