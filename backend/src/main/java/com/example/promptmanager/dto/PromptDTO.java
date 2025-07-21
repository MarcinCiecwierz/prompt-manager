package com.example.promptmanager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class PromptDTO {
    private UUID promptId;
    private String title;
    private String content;
    private boolean isPublic;
    private List<PromptVersionDTO> versions;
}
