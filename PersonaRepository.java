

package com.EYA.repository;

import com.EYA.model.Persona;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author EMmanuel
 */


public interface PersonaRepository extends JpaRepository<Persona, Long> {
    @Override
    Optional<Persona> findById(Long id);
}

