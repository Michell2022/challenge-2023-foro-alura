package com.michell.devforo.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.michell.devforo.domain.users.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            return JWT.create()
                    .withIssuer("devforo")
                    .withSubject(user.getUsername())
                    .withClaim("id", user.getId())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error generating token");
        }
    }



    public String getSubject(String token) {
        if (token == null) {
            throw new RuntimeException("Invalid token");
        }
        DecodedJWT verifier = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            verifier = JWT.require(algorithm)
                    .withIssuer("devforo")
                    .build()
                    .verify(token);
            return verifier.getSubject(); // Retorna el sujeto del token
        } catch (JWTVerificationException exception) {
            System.out.println(exception.toString());
            throw new RuntimeException("Invalid token");
        }
    }



    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-05:00"));
    }
}
