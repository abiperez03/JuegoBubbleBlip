

package com.EYA.controller;



import com.EYA.repository.LoginRepository;
import com.EYA.model.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


/**
 *
 * @author EMmanuel 09may24
 */

@RestController
@RequestMapping("/api/logins")
public class LoginController {

    @Autowired
    private LoginRepository loginRepository;

    @PostMapping
    public ResponseEntity<Login> createLogin(@RequestBody Login login) {
        Login nuevoLogin = loginRepository.save(login);
        return new ResponseEntity<>(nuevoLogin, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Login>> getAllLogins() {
        List<Login> logins = loginRepository.findAll();
        return new ResponseEntity<>(logins, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Login> getLoginById(@PathVariable Long id) {
        Optional<Login> login = loginRepository.findById(id);
        return login.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Login> updateLogin(@PathVariable Long id, @RequestBody Login loginDetails) {
        Optional<Login> optionalLogin = loginRepository.findById(id);
        if (optionalLogin.isPresent()) {
            Login login = optionalLogin.get();
            login.setUsuario(loginDetails.getUsuario());
            login.setPassword(loginDetails.getPassword());
            loginRepository.save(login);
            return new ResponseEntity<>(login, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogin(@PathVariable Long id) {
        loginRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}



