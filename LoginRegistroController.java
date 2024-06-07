

package com.EYA.controller;

import com.EYA.repository.LoginRepo;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author EMmanuel
 */

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/sesion")
public class LoginRegistroController {
 
     @Autowired
     
    private LoginRepo LoginRepo;
    
    @PostMapping("/login")

    public ResponseEntity<List<String>> 
        getDistinctSetWNamesByIdLogin(@RequestBody Map<String, Object> requestParams) {
         
      String username = requestParams.get("usuario").toString();
      String password = requestParams.get("password").toString();
            
      List<String> result = LoginRepo.validarUser(username, password);
       
      System.out.println(result);
      
      
      return ResponseEntity.ok().body(result);  
    }
 
    
    
}
