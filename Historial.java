package com.EYA.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author EMmanuel 09may24
 */


@Entity
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHistorial;

    // como puedo relacionar esto
    @ManyToOne
    @JoinColumn(name = "id_login")
    private Login idUsuario;

    
    private String palabra;
    private String idioma;
    private String setWName;
    private Integer puntajeHigher;

    // constructor

    public Historial() {
    }

//getter and setter

    public Long getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(Long idHistorial) {
        this.idHistorial = idHistorial;
    }

    public Login getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Login idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getPalabra() {
        return palabra;
    }

    public void setPalabra(String palabra) {
        this.palabra = palabra;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }

    public String getSetWName() {
        return setWName;
    }

    public void setSetWName(String setWName) {
        this.setWName = setWName;
    }

    public Integer getPuntajeHigher() {
        return puntajeHigher;
    }

    public void setPuntajeHigher(Integer puntajeHigher) {
        this.puntajeHigher = puntajeHigher;
    }
    
    

    
    
    
    
    
    
    
}//fin

