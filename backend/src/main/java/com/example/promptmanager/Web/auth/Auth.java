package com.example.promptmanager.Web.auth;

import com.example.promptmanager.models.User;
import com.example.promptmanager.repositories.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class Auth {

    private final UserRepository userRepository;

    public Auth(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public void createNewUser(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getClaim("email");
        String auth0id = jwt.getClaim("sub");

        Optional<User> user = userRepository.findByAuth0id(auth0id);

        if (user.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setAuth0id(auth0id);
            userRepository.save(newUser);
        }
    }
}
