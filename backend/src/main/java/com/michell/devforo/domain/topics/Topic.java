package com.michell.devforo.domain.topics;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.michell.devforo.domain.courses.Course;
import com.michell.devforo.domain.users.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "topics")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Message is required")
    @Column(length = 2000)
    private String message;


    private Boolean solved;

    private LocalDateTime created_at;

    @ManyToOne
    private User user;

    @ManyToOne
    private Course course;

    public void setCreated_at(LocalDateTime now) {
        this.created_at = now;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
        System.out.println("Received solved value: " + solved);

    }

}
