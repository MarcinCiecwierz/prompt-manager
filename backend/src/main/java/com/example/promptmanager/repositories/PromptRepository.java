package com.example.promptmanager.repositories;

import com.example.promptmanager.models.Prompt;
import com.example.promptmanager.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PromptRepository extends JpaRepository<Prompt, UUID> {
    List<Prompt> findAllByUser(User user);
    List<Prompt> findAllByIsPublic(boolean isPublic);
}
