package com.michell.devforo.controller;

import com.michell.devforo.domain.users.User;
import com.michell.devforo.domain.users.UserAuthDto;
import com.michell.devforo.domain.users.UserLogin;
import com.michell.devforo.infra.security.TokenService;
import com.michell.devforo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<UserAuthDto> authenticate(@RequestBody @Valid UserLogin userLogin) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password());
        var authUser = authenticationManager.authenticate(authToken);
        var user = (User) authUser.getPrincipal();
        var JWTToken = tokenService.generateToken(user); // Incluye el objeto 'user' en el token

        return ResponseEntity.ok(new UserAuthDto(user, JWTToken));
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody @Valid User user) {

        if (authService.isEmailAlreadyRegistered(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo electrónico ya está registrado.");
        }
        return ResponseEntity.ok(authService.signup(user));
    }




    @GetMapping("/validate-token")
    public ResponseEntity validateToken(@RequestParam String token) {
        if(token != null) {
            if(tokenService.getSubject(token) != null){
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/validate-username")
    public ResponseEntity validateUsername(@RequestParam String username) {
        Boolean isUsed = authService.validateUsername(username);
        if(isUsed) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/validate-email")
    public ResponseEntity validateEmail(@RequestParam String email) {
        Boolean isUsed = authService.validateEmail(email);
        if(isUsed) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok().build();
        }
    }


}