package com.example.promptmanager.repositories;

import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.models.PromptVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PromptVersionRepository extends JpaRepository<PromptVersion, UUID> {
    List<PromptVersion> findAllByPrompt(Prompt prompt);
}
