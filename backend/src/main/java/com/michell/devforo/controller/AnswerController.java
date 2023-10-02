package com.michell.devforo.controller;


import com.michell.devforo.domain.answers.Answer;
import com.michell.devforo.domain.answers.AnswerDto;
import com.michell.devforo.service.AnswerService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
@SecurityRequirement(name = "bearer-key")
public class AnswerController {

    @Autowired
    private AnswerService answerService;


    @GetMapping
    public ResponseEntity<List<AnswerDto>> getAnswers() {
        return ResponseEntity.ok(
                answerService.getAnswers()
        );
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<AnswerDto>> getUserAnswers(@PathVariable Long id) {
        return ResponseEntity.ok(
                answerService.getUserAnswers(id)
        );
    }

    @GetMapping("/topic/{id}")
    public ResponseEntity<List<AnswerDto>> getTopicAnswers(@PathVariable Long id) {
        return ResponseEntity.ok(
                answerService.getTopicAnswers(id)
        );
    }

    @PostMapping
    public ResponseEntity<AnswerDto> createAnswer(@RequestBody @Valid Answer answer) {
        return ResponseEntity.ok(
                answerService.createAnswer(answer)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }

}
