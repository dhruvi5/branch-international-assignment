package com.example.Chat_App.Service;

import com.example.Chat_App.Entity.Customer;
import com.example.Chat_App.Entity.Message;
import com.example.Chat_App.Repository.CustomerRepository;
import com.example.Chat_App.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CsvImportService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    public void importMessagesFromCsv() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:data/yourfile.csv");

        if (!resource.exists()) {
            throw new IOException("CSV file not found at specified path.");
        }

        BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
        String line;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd[ H:mm:ss][ HH:mm:ss]");

        br.readLine();

        while ((line = br.readLine()) != null) {
            String[] values = line.split(",");

            if (values.length < 3) {
                System.out.println("Skipping incomplete line: " + line);
                continue;
            }

            String userId = values[0];             // User ID
            String timestamp = values[1];          // Timestamp (e.g., "2017-02-01 19:29:05")
            String messageBody = values[2];        // Message Body

            Customer customer = customerRepository.findById(Long.parseLong(userId))
                    .orElseGet(() -> {
                        Customer newCustomer = new Customer();
                        newCustomer.setName("Unknown");
                        newCustomer.setEmail("unknown@example.com");
                        return customerRepository.save(newCustomer);
                    });

            // Parse the timestamp using the custom formatter
            LocalDateTime parsedTimestamp = LocalDateTime.parse(timestamp, formatter);

            Message message = new Message();
            message.setCustomer(customer);
            message.setContent(messageBody);
            message.setTimestamp(parsedTimestamp);
            messageRepository.save(message);
        }
        System.out.println("CSV file imported successfully.");
    }
}
