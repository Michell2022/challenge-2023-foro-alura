package com.michell.devforo.service;

import com.michell.devforo.domain.users.User;
import com.michell.devforo.domain.users.UserDto;
import com.michell.devforo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }


    public UserDto signup(User user) {
        try {
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            var newUser = userRepository.save(user);
            return new UserDto(newUser);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("El correo electrónico ya está registrado.");
        }

    }



    public Boolean validateUsername(String username) {
        var foundUser = userRepository.findByUsername(username);
        if(foundUser != null) {
            return true;
        } else {
            return false;
        }
    }



    public Boolean validateEmail(String email) {
        var fondUser = userRepository.findByEmail(email);
        System.out.println(fondUser);
        if(fondUser != null) {
            return true;
        } else {
            return false;
        }
    }


    public boolean isEmailAlreadyRegistered(String email) {
        UserDetails existingUser = userRepository.findByEmail(email);
        return existingUser != null;
    }

}
