package com.michell.devforo.service;

import com.michell.devforo.domain.courses.Course;
import com.michell.devforo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    public Course getCourse(Long id) {
        return courseRepository.findById(id).orElseThrow();
    }

    public List<Course> createCourses(List<Course> courses) {
        return courseRepository.saveAll(courses);
    }
}
