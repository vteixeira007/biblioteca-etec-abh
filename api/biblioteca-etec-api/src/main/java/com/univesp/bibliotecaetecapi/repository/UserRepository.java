package com.univesp.bibliotecaetecapi.repository;

import com.univesp.bibliotecaetecapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User,String> {
    UserDetails findByLogin(String login);
}
