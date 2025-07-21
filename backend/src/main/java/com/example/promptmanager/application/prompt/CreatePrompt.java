package com.example.promptmanager.application.prompt;

import com.example.promptmanager.dto.CreatePromptDTO;
import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.models.User;
import com.example.promptmanager.repositories.PromptRepository;
import com.example.promptmanager.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CreatePrompt {

    private final PromptRepository promptRepository;
    private final UserRepository userRepository;

    public CreatePrompt(PromptRepository promptRepository, UserRepository userRepository) {
        this.promptRepository = promptRepository;
        this.userRepository = userRepository;
    }

    public void createPrompt(CreatePromptDTO createPromptDTO, String auth0Id) {
        System.out.println(createPromptDTO.toString());
        User user = userRepository.findByAuth0id(auth0Id).orElseThrow();

        Prompt prompt = new Prompt();

        prompt.setTitle(createPromptDTO.getTitle());
        prompt.setContent(createPromptDTO.getContent());
        prompt.setPublic(createPromptDTO.isPublic());
        prompt.setUser(user);

        promptRepository.save(prompt);
    }
}
