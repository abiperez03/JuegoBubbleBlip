package com.EYA;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@SpringBootApplication

public class Bubbleblip_ProMain {

   

    public static void main(String[] args) {
        SpringApplication.run(Bubbleblip_ProMain.class, args);
        System.out.println("HOla mundo!");
    }

 
}
    
    
    

