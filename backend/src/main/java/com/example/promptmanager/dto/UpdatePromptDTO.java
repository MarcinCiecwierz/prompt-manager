package com.example.promptmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePromptDTO {
    private UUID promptId;
    private String title;
    private String content;
    private Boolean isPublic;
}
