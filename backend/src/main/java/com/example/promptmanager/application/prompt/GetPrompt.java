package com.example.promptmanager.application.prompt;

import com.example.promptmanager.dto.PromptDTO;
import com.example.promptmanager.dto.PromptVersionDTO;
import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.models.PromptVersion;
import com.example.promptmanager.models.User;
import com.example.promptmanager.repositories.PromptRepository;
import com.example.promptmanager.repositories.PromptVersionRepository;
import com.example.promptmanager.repositories.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GetPrompt {

    private PromptRepository promptRepository;
    private UserRepository userRepository;
    private PromptVersionRepository promptVersionRepository;

    public GetPrompt(PromptRepository promptRepository, UserRepository userRepository,
                     PromptVersionRepository promptVersionRepository) {
        this.promptRepository = promptRepository;
        this.userRepository = userRepository;
        this.promptVersionRepository = promptVersionRepository;
    }

    public PromptDTO getPrompt(@AuthenticationPrincipal Jwt jwt, UUID promptId) {
        String auth0id = jwt.getClaim("sub");

        User user = userRepository.findByAuth0id(auth0id).orElseThrow();

        Prompt prompt = promptRepository.findById(promptId).orElseThrow();

        if(!prompt.isPublic()) {
            if(!prompt.getUser().equals(user)) {
                throw new IllegalArgumentException("Prompt " + promptId.toString() + " does not belong to user " + user.getUuid());
            }
        }


        PromptDTO promptDTO = new PromptDTO();

        promptDTO.setPromptId(promptId);
        promptDTO.setTitle(prompt.getTitle());
        promptDTO.setContent(prompt.getContent());
        promptDTO.setPublic(prompt.isPublic());

        List<PromptVersionDTO> promptVersionDTOS = promptVersionRepository.findAllByPrompt(prompt)
                .stream()
                .map(this::mapToPromptVersionDTO)
                .toList();

        promptDTO.setVersions(promptVersionDTOS);

        return promptDTO;
    }

    private PromptVersionDTO mapToPromptVersionDTO(PromptVersion promptVersion){
        return new PromptVersionDTO(promptVersion.getTitleVersion(), promptVersion.getContentVersion(),
                promptVersion.isPublicVersion(), promptVersion.getCreatedAt());
    }
}
