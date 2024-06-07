

package com.EYA.repository;

import com.EYA.model.Historial;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author EMmanuel
 */

@Repository

public interface HistorialRepository extends JpaRepository<Historial, Long>  {

    public List<Historial> findByIdUsuario(long id);
    
   
}

