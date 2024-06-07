


package com.EYA.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
/**
 *
 * @author EMmanuel
 */


@Repository
public class Historialpalabras {
    


    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<String> finpalListById(Long idLogin, String setWName, String idioma) {
        String sql = "SELECT PALABRA FROM historial WHERE id_login = ? AND SETWNAME = ? AND IDIOMA = ?";
        return jdbcTemplate.queryForList(sql, String.class, idLogin, setWName, idioma);
    }
    
    
    
    
}

    

