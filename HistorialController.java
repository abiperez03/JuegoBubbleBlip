

package com.EYA.controller;

import com.EYA.repository.HistorialRepository;
import com.EYA.repository.LoginRepository;
import com.EYA.model.Historial;
import com.EYA.model.Login;
import com.EYA.repository.HistorialRpo;
import com.EYA.repository.Historialpalabras;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;



/**
 *
 * @author EMmanuel 09may24
 */




@RestController
@RequestMapping("/api/historial")
public class HistorialController {

    @Autowired
    private HistorialRepository historialRepository;

    @Autowired
    private LoginRepository loginRepository;
    


    
    @PostMapping("/saveW")
    public ResponseEntity<Void> createHistorial(@RequestBody Historial historial) {
    // Verificar que el Login esté presente en el Historial
    Login login = historial.getIdUsuario();
    if (login == null) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // Buscar la persona asociada al ID de usuario (si es necesario)
    // En este caso, no se busca la persona asociada al login, sino que se verifica que el login exista.
    Optional<Login> optionalLogin = loginRepository.findById(login.getIdLogin());
    if (!optionalLogin.isPresent()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Establecer el Login en el Historial
    historial.setIdUsuario(login);

    // Guardar el historial en la base de datos
    historialRepository.save(historial);

    return new ResponseEntity<>(HttpStatus.CREATED);
}
    
    @Autowired
    private HistorialRpo historialRpo;
   


    @GetMapping("/wSE")
    public ResponseEntity<List<String>> getDistinctSetWNamesByIdLogin(@RequestParam("idLogin") long idLogin) {
    List<String> distinctSetWNames = historialRpo.findDistinctSetWNamesByIdLogin(idLogin);
    System.out.println(distinctSetWNames);
    return ResponseEntity.ok().body(distinctSetWNames);
}
    
    
    
    @Autowired
    private Historialpalabras histopls;
    

@GetMapping("/palabras")
public ResponseEntity<List<String>> 
        getPalabrasByIdIdioma(@RequestBody Map<String, Object> requestParams) {
    long idLogin = Long.parseLong(requestParams.get("idLogin").toString());
    String setwName = (String) requestParams.get("setwName");
    String idioma = (String) requestParams.get("idioma");

    List<String> palabraList = histopls.finpalListById(idLogin, setwName, idioma);
    System.out.println(palabraList);
    
    return ResponseEntity.ok().body(palabraList);
}

    //    @GetMapping("/palabras")
//    
//    public ResponseEntity<List<String>> getPalabrasByIdIdioma(
//    @RequestParam long idLogin,
//    @RequestParam String setwName,
//    @RequestParam String idioma) {
//
//        System.out.println(idLogin + " "+setwName+" "+idioma);
//    List<String> palabraList = histopls.finpalListById(idLogin, setwName, idioma);
//    System.out.println(palabraList);
//    
//    return ResponseEntity.ok().body(palabraList);
//}

    
 
    




}//






