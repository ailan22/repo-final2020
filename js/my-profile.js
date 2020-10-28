//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("profile").innerHTML = miStorage.getItem("keyUsuario")
    document.getElementById("email").innerHTML = miStorage.getItem("keyEmail")
    document.getElementById("password").innerHTML = miStorage.getItem("keyPassword")

});

miStorage = window.sessionStorage;

function modificarDatos() {
    var nombreYApellido = document.getElementById("NombreYApellidos").value;
    var telefono = document.getElementById("telefono").value
    var edad = document.getElementById("edad").value
    miStorage.setItem("keyNombre", nombreYApellido);
    miStorage.setItem("keyTelefono", telefono);
    miStorage.setItem("keyEdad", edad);
    document.getElementById("nombre").innerHTML = miStorage.getItem("keyNombre")
    document.getElementById("noTelefono").innerHTML = miStorage.getItem("keyTelefono")
    document.getElementById("NoEdad").innerHTML = miStorage.getItem("keyEdad")
};



//Función que al pasar el mouse por la imagen muestra texto para cambiarla
window.onload = function() {
    var elemento = document.getElementById("agregar");
    elemento.onmouseover = function(e) {
        document.getElementById("ocultar").innerHTML = " + Agregar foto de perfil";
        agregar.style.background = "rgb(205, 205, 255)";
    };
    elemento.onmouseout = function(e) {
        document.getElementById("ocultar").innerHTML = "Foto";
        agregar.style.background = "white";
    };
};