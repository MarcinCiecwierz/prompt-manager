package com.example.promptmanager.application.prompt;

import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.models.User;
import com.example.promptmanager.repositories.PromptRepository;
import com.example.promptmanager.repositories.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DeletePrompt {

    private PromptRepository promptRepository;
    private UserRepository userRepository;

    public DeletePrompt(PromptRepository promptRepository, UserRepository userRepository) {
        this.promptRepository = promptRepository;
        this.userRepository = userRepository;
    }

    public void deletePrompt(@AuthenticationPrincipal Jwt jwt, UUID promptId) {
        String auth0id = jwt.getClaim("sub");

        User user = userRepository.findByAuth0id(auth0id).orElseThrow();

        Prompt prompt = promptRepository.findById(promptId).orElseThrow();

        if(!prompt.getUser().equals(user)) {
            throw new IllegalArgumentException("You are not the owner of this prompt");
        }
        promptRepository.delete(prompt);
    }
}
