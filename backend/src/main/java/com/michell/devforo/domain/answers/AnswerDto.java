package com.michell.devforo.domain.answers;

import com.michell.devforo.domain.topics.TopicAnswerDto;
import com.michell.devforo.domain.users.UserDto;

import java.time.LocalDateTime;

public record AnswerDto(

        Long id,
        String answer,
        LocalDateTime created_at,
        UserDto user,
        TopicAnswerDto topic
) {

    public AnswerDto(Answer answer) {

        this(
                answer.getId(),
                answer.getAnswer(),
                answer.getCreated_at(),
                new UserDto(
                        answer.getUser().getId(),
                        answer.getUser().getUsername()
                ),
                new TopicAnswerDto(
                        answer.getTopic().getId(),
                        answer.getTopic().getTitle()
                )
        );
    }
}
