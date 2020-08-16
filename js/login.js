//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});

var correo = document.getElementById("inputEmail");
var contra = document.getElementById("inputPassword");
var errorCorreo = document.getElementById("demo");
var errorContraseña = document.getElementById("demo1");

function validarForm() {

    var mensajeError = [];

    errorCorreo.innerHTML = "";
    errorContraseña.innerHTML = "";

    mensajeError["Correo"] = correo.value === null || correo.value === "";
    mensajeError["Contraseña"] = contra.value === null || contra.value === "";

    if (mensajeError["Correo"]) {
        errorCorreo.innerHTML = "Ingresa el correo";
    }

    if (mensajeError["Contraseña"]) {
        errorContraseña.innerHTML = "Ingresa la contraseña";
    }

    return !mensajeError["Correo"] && !mensajeError["Contraseña"];
};