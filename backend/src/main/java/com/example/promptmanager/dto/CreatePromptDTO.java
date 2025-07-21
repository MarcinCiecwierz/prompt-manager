package com.example.promptmanager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePromptDTO {
    private String title;
    private String content;

    @JsonProperty("isPublic")
    private boolean isPublic;
}
