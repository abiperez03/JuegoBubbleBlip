

package com.EYA.repository;

/**
 *
 * @author EMmanuel
 */
import com.EYA.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {
}

