package com.example.promptmanager.Web.prompt;

import com.example.promptmanager.application.prompt.*;
import com.example.promptmanager.dto.CreatePromptDTO;
import com.example.promptmanager.dto.UpdatePromptDTO;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/prompt")
public class PromptController {

    private CreatePrompt createPrompt;
    private UpdatePrompt updatePrompt;
    private GetPrompt getPrompt;
    private GetAllPrompts getAllPrompts;
    private GetAllPublicPrompts getAllPublicPrompts;
    private DeletePrompt deletePrompt;

    public PromptController(CreatePrompt createPrompt, UpdatePrompt updatePrompt, GetPrompt getPrompt,
                            GetAllPrompts getAllPrompts, GetAllPublicPrompts getAllPublicPrompts,
                            DeletePrompt deletePrompt) {
        this.createPrompt = createPrompt;
        this.updatePrompt = updatePrompt;
        this.getPrompt = getPrompt;
        this.getAllPrompts = getAllPrompts;
        this.getAllPublicPrompts = getAllPublicPrompts;
        this.deletePrompt = deletePrompt;
    }

    @PostMapping
    public ResponseEntity<?> createPrompt(@RequestBody CreatePromptDTO createPromptDTO,
                                          @AuthenticationPrincipal Jwt jwt) {
        String auth0id = jwt.getClaim("sub");

        createPrompt.createPrompt(createPromptDTO, auth0id);

        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<?> updatePrompt(@AuthenticationPrincipal Jwt jwt, @RequestParam UUID promptId,
                                          @RequestBody Map<String, Object> promptData) {
        updatePrompt.update(jwt, promptId, promptData);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<?> getPrompt(@AuthenticationPrincipal Jwt jwt,
                                       @RequestParam UUID promptId) {

        return ResponseEntity.ok(getPrompt.getPrompt(jwt, promptId));
    }

    @DeleteMapping
    public ResponseEntity<?> deletePrompt(@AuthenticationPrincipal Jwt jwt, @RequestParam UUID promptId) {
        deletePrompt.deletePrompt(jwt, promptId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getPrompts(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(getAllPrompts.getAllPrompts(jwt));
    }

    @GetMapping("/public")
    public ResponseEntity<?> getPublicPrompts() {
        return ResponseEntity.ok(getAllPublicPrompts.getAllPublicPrompts());
    }
}
