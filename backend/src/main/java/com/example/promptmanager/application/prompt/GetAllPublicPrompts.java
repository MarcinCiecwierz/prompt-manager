package com.example.promptmanager.application.prompt;

import com.example.promptmanager.dto.PromptDTO;
import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.repositories.PromptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllPublicPrompts {

    private PromptRepository promptRepository;

    public GetAllPublicPrompts(PromptRepository promptRepository) {
        this.promptRepository = promptRepository;
    }

    public List<PromptDTO> getAllPublicPrompts() {
        return promptRepository.findAllByIsPublic(true).stream().map(this::mapToDTO).collect(Collectors.toList());
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
