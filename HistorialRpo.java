


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
public class HistorialRpo {
    



    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<String> findDistinctSetWNamesByIdLogin(Long idLogin) {
        return jdbcTemplate.queryForList("SELECT DISTINCT setwname FROM Historial WHERE id_login = ?", String.class, idLogin);
    }
}

    

