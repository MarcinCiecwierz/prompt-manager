package com.example.promptmanager.application.prompt;

import com.example.promptmanager.dto.UpdatePromptDTO;
import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.models.PromptVersion;
import com.example.promptmanager.models.User;
import com.example.promptmanager.repositories.PromptRepository;
import com.example.promptmanager.repositories.PromptVersionRepository;
import com.example.promptmanager.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class UpdatePrompt {

    private PromptRepository promptRepository;
    private PromptVersionRepository promptVersionRepository;
    private UserRepository userRepository;

    public UpdatePrompt(PromptRepository promptRepository, PromptVersionRepository promptVersionRepository,
                        UserRepository userRepository) {
        this.promptRepository = promptRepository;
        this.promptVersionRepository = promptVersionRepository;
        this.userRepository = userRepository;
    }

    public void updatePrompt(@AuthenticationPrincipal Jwt jwt, UpdatePromptDTO updatePromptDTO) {
        if (updatePromptDTO.getPromptId() == null) {
            throw new IllegalArgumentException("Prompt ID cannot be null");
        }

        Prompt prompt = promptRepository.findById(updatePromptDTO.getPromptId()).orElseThrow();

        String auth0id = jwt.getClaim("sub");

        User user = userRepository.findByAuth0id(auth0id).orElseThrow();

        if(!prompt.getUser().equals(user)) {
            throw new IllegalArgumentException("Prompt " + updatePromptDTO.getPromptId().toString() + " does not belong to user " + user.getUuid());
        }

        PromptVersion promptVersion = new PromptVersion();

        promptVersion.setPrompt(prompt);
        promptVersion.setTitleVersion(prompt.getTitle());
        promptVersion.setContentVersion(prompt.getContent());
        promptVersion.setPublicVersion(prompt.isPublic());
        promptVersionRepository.save(promptVersion);

        if(updatePromptDTO.getTitle() != null && !updatePromptDTO.getTitle().isBlank()){
            prompt.setTitle(updatePromptDTO.getTitle());
        }

        if(updatePromptDTO.getContent() != null && !updatePromptDTO.getContent().isBlank()){
            prompt.setContent(updatePromptDTO.getContent());
        }

        prompt.setPublic(updatePromptDTO.getIsPublic());
        prompt.setUpdatedAt(LocalDateTime.now());
        promptRepository.save(prompt);
    }

    @Transactional
    public void update(@AuthenticationPrincipal Jwt jwt, UUID promptId, Map<String, Object> promptData) {
        if(promptId == null || promptId.toString().isBlank()) {
            throw new IllegalArgumentException("promptId is null or empty");
        }

        Prompt prompt = promptRepository.findById(promptId).orElseThrow();

        String auth0id = jwt.getClaim("sub");

        User user = userRepository.findByAuth0id(auth0id).orElseThrow();

        if(prompt.getUser() != user){
            throw new IllegalArgumentException("promptId " + promptId.toString()
                    + " does not belong to user " + user.toString());
        }

        PromptVersion promptVersion = new PromptVersion();

        promptVersion.setPrompt(prompt);
        promptVersion.setTitleVersion(prompt.getTitle());
        promptVersion.setContentVersion(prompt.getContent());
        promptVersion.setPublicVersion(prompt.isPublic());
        promptVersionRepository.save(promptVersion);

        promptData.forEach((field, value) -> {
            switch (field) {
                case "promptId":
                    break;
                case "title":
                    prompt.setTitle(value.toString());
                    break;
                case "content":
                    prompt.setContent(value.toString());
                    break;
                case "isPublic":
                    prompt.setPublic((boolean) value);
                    break;
                default:
                    throw new IllegalArgumentException("field " + field + " not recognized");
            }
        });

        prompt.setUpdatedAt(LocalDateTime.now());
        promptRepository.save(prompt);

    }
}
