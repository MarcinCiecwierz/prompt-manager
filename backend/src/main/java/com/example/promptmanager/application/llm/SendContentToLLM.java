package com.example.promptmanager.application.llm;

import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.repositories.PromptRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class SendContentToLLM {

    @Value("${OPENROUTER_API}")
    private String OPENROUTER_API;
    private final String URL = "https://openrouter.ai/api/v1/chat/completions";
    private PromptRepository promptRepository;

    public SendContentToLLM(PromptRepository promptRepository) {
        this.promptRepository = promptRepository;
    }

    public String sendContentToLLM(UUID promptId) throws JsonProcessingException {
        Prompt prompt = promptRepository.findById(promptId).orElseThrow();
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(OPENROUTER_API);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "tngtech/deepseek-r1t2-chimera:free");

        List<Map<String, String>> messages = new ArrayList<>();

        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt.getContent());
        messages.add(message);

        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        String response = restTemplate.exchange(
                URL,
                HttpMethod.POST,
                entity,
                String.class
        ).getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response);

        String content = jsonNode.get("choices").get(0).get("message").get("content").asText();

        System.out.println(response);
        return content;
    }
}
