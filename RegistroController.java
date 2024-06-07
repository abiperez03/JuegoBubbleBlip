
package com.EYA.controller;


import com.EYA.repository.LoginRepository;
import com.EYA.repository.PersonaRepository;
import com.EYA.model.Login;
import com.EYA.model.Persona;
import com.EYA.model.Registro;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


/**
 *
 * @author EMmanuel
 */



@RestController
@RequestMapping("/api/registro")
public class RegistroController {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private LoginRepository loginRepository;

    @PostMapping
public ResponseEntity<Void> createRegistro(@RequestBody Registro registroRequest) {
    // Extraer los datos de persona del registroRequest
    String nombre = registroRequest.getNombre();
    String apellido = registroRequest.getApellido();
    String correo = registroRequest.getCorreo();

    // Guardar los datos en la tabla Persona
    Persona persona = new Persona();
    persona.setNombre(nombre);
    persona.setApellido(apellido);
    persona.setCorreo(correo);
    Persona nuevaPersona = personaRepository.save(persona);

    // Obtener el ID generado para la nueva persona
    Long personaId = nuevaPersona.getIdPersona();

    // Extraer los datos de login del registroRequest
    String usuario = registroRequest.getUsuario();
    String password = registroRequest.getPassword();

    // Guardar los datos en la tabla Login
    Login login = new Login();
    login.setUsuario(usuario);
    login.setPassword(password);
    login.setPersona(nuevaPersona); // Establecer el ID de la persona en el login
    loginRepository.save(login);

    return new ResponseEntity<>(HttpStatus.CREATED);
}

    
   /* 
    
    @PostMapping
public ResponseEntity<Void> createRegistro(@RequestParam String nombre,
                                            @RequestParam String apellido,
                                            @RequestParam String correo,
                                            @RequestParam String usuario,
                                            @RequestParam String password) {
    // Guardar los datos en la tabla Persona
    Persona persona = new Persona();
    persona.setNombre(nombre);
    persona.setApellido(apellido);
    persona.setCorreo(correo);
    Persona nuevaPersona = personaRepository.save(persona);

    // Guardar los datos en la tabla Login
    Login login = new Login();
    login.setUsuario(usuario);
    login.setPassword(password);
    login.setPersona(nuevaPersona);
    loginRepository.save(login);

    return new ResponseEntity<>(HttpStatus.CREATED);
}

    
      
    
    @PostMapping
    public ResponseEntity<Void> createRegistro(@RequestBody Registro registro) {
        // Guardar los datos en la tabla Persona
        Persona persona = new Persona();
        persona.setNombre(registro.getNombre());
        persona.setApellido(registro.getApellido());
        persona.setCorreo(registro.getCorreo());
        Persona nuevaPersona = personaRepository.save(persona);

        // Guardar los datos en la tabla Login
        Login login = new Login();
        login.setUsuario(registro.getUsuario());
        login.setPassword(registro.getPassword());
        login.setPersona(nuevaPersona);
        loginRepository.save(login);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Registro> getRegistroByPersonaId(@PathVariable Long id) {
        // Buscar la persona por su ID
        Optional<Persona> optionalPersona = personaRepository.findById(id);
        if (optionalPersona.isPresent()) {
            Persona persona = optionalPersona.get();
            // Buscar el login asociado a la persona
            Optional<Login> optionalLogin = loginRepository.findByPersona(persona);
            if (optionalLogin.isPresent()) {
                Login login = optionalLogin.get();
                // Crear y devolver el registro completo
                Registro registro = new Registro();
                registro.setId(persona.getId()); // ID de la persona
                registro.setNombre(persona.getNombre());
                registro.setApellido(persona.getApellido());
                registro.setCorreo(persona.getCorreo());
                registro.setUsuario(login.getUsuario());
                registro.setPassword(login.getPassword());
                return new ResponseEntity<>(registro, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

  
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRegistro(@PathVariable Long id, @RequestBody Registro registro) {
        // Buscar la persona por su ID
        Optional<Persona> optionalPersona = personaRepository.findById(id);
        if (optionalPersona.isPresent()) {
            Persona persona = optionalPersona.get();
            // Actualizar los datos de la persona
            persona.setNombre(registro.getNombre());
            persona.setApellido(registro.getApellido());
            persona.setCorreo(registro.getCorreo());
            personaRepository.save(persona);

            // Buscar y actualizar el login asociado a la persona
            Optional<Login> optionalLogin = loginRepository.findByPersona(persona);
            if (optionalLogin.isPresent()) {
                Login login = optionalLogin.get();
                login.setUsuario(registro.getUsuario());
                login.setPassword(registro.getPassword());
                loginRepository.save(login);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistro(@PathVariable Long id) {
        // Buscar la persona por su ID
        Optional<Persona> optionalPersona = personaRepository.findById(id);
        if (optionalPersona.isPresent()) {
            Persona persona = optionalPersona.get();
            // Eliminar la persona y el login asociado
            personaRepository.delete(persona);
            Optional<Login> optionalLogin = loginRepository.findByPersona(persona);
            if (optionalLogin.isPresent()) {
                Login login = optionalLogin.get();
                loginRepository.delete(login);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    */
    
    
}
