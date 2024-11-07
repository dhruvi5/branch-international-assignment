package com.example.Chat_App.Service;

import com.example.Chat_App.Entity.Agent;
import com.example.Chat_App.Entity.Customer;
import com.example.Chat_App.Entity.Message;
import com.example.Chat_App.Repository.AgentRepository;
import com.example.Chat_App.Repository.CustomerRepository;
import com.example.Chat_App.Repository.MessageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private AgentRepository agentRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public Message createMessage(Long customerId, String content) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));
        Message message = new Message();
        message.setCustomer(customer);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    @Transactional
    public void respondToMessage(Long id, Long agentId, String response) {
        if (agentId == null) {
            throw new IllegalArgumentException("Agent ID cannot be null");
        }

        Optional<Message> optionalMessage = messageRepository.findById(id);
        if (optionalMessage.isPresent()) {
            Message message = optionalMessage.get();

            // Retrieve the agent based on agentId
            Agent agent = agentRepository.findById(agentId)
                    .orElseThrow(() -> new RuntimeException("Agent not found with ID: " + agentId));

            // Set agent and response
            message.setAgent(agent);
            message.setResponse(response);
            message.setResolved(true);

            messageRepository.save(message);
        } else {
            throw new RuntimeException("Message not found with id: " + id);
        }
    }


    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }




}
