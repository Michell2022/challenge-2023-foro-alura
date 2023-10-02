package com.michell.devforo.repository;

import com.michell.devforo.domain.courses.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
