package com.example.promptmanager.Web.llm;

import com.example.promptmanager.application.llm.SendContentToLLM;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/llm")
public class LLMController {

    private SendContentToLLM sendContentToLLM;

    public LLMController(SendContentToLLM sendContentToLLM) {
        this.sendContentToLLM = sendContentToLLM;
    }

    @PostMapping
    public ResponseEntity<?> sendContentToLLM(@RequestParam UUID promptId) throws JsonProcessingException {

        return ResponseEntity.ok(sendContentToLLM.sendContentToLLM(promptId));
    }
}
