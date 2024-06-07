
package com.EYA.model;

import javax.persistence.Entity;


/**
 *
 * @author EMmanuel 09may24
 */



public class Registro {


    private Long id;

    private String nombre;
    private String apellido;
    private String correo;
    private String usuario;
    private String password;

    // Constructor vacío
    public Registro() {
    }

    // Constructor con parámetros
    public Registro(String nombre, String apellido, String correo, String usuario, String password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.usuario = usuario;
        this.password = password;
    }

    // Métodos Getter y Setter para todos los campos
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

