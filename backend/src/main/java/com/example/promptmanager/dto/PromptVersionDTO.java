package com.example.promptmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PromptVersionDTO {
    private String title;
    private String content;
    private boolean isPublic;
    private LocalDateTime createdAt;
}
