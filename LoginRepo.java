/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.EYA.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author EMmanuel
 */


@Repository
public class LoginRepo {
    

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<String> validarUser(String usuario, String password) {
        return jdbcTemplate.queryForList("SELECT id_login FROM login WHERE usuario = ? AND password = ?", String.class, usuario, password);
    }    

}
