package com.example.promptmanager.application.prompt;

import com.example.promptmanager.dto.PromptDTO;
import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.models.User;
import com.example.promptmanager.repositories.PromptRepository;
import com.example.promptmanager.repositories.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllPrompts {

    private PromptRepository promptRepository;
    private UserRepository userRepository;

    public GetAllPrompts(PromptRepository promptRepository, UserRepository userRepository) {
        this.promptRepository = promptRepository;
        this.userRepository = userRepository;
    }

    public List<PromptDTO> getAllPrompts(@AuthenticationPrincipal Jwt jwt) {
        String auth0id = jwt.getClaim("sub");

        User user = userRepository.findByAuth0id(auth0id).orElseThrow();

        return promptRepository.findAllByUser(user)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private PromptDTO mapToDTO(Prompt prompt) {
        PromptDTO promptDTO = new PromptDTO();
        promptDTO.setPromptId(prompt.getUuid());
        promptDTO.setTitle(prompt.getTitle());
        promptDTO.setContent(prompt.getContent());
        promptDTO.setPublic(prompt.isPublic());
        return promptDTO;
    }
}
