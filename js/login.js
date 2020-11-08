//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var boton = document.getElementById("bot");
var input = document.getElementById("inputPassword");
var input2 = document.getElementById("inputPassword2");

boton.addEventListener("click", mostrarContraseña);

function mostrarContraseña() {
    if (input.type == "password" && input2.type == "password") {
        input.type = "text";
        input2.type = "text";
        boton.src = "img/eye-solid.svg";
    } else {
        input.type = "password";
        input2.type = "password";
        boton.src = "img/eye-slash-solid.svg";
    }
};

var usuario2 = document.getElementById("inputUsuario");
var usuario = document.getElementById("inputUsuario");
var correo = document.getElementById("inputEmail");
var contra = document.getElementById("inputPassword");
var contra2 = document.getElementById("inputPassword2");
var errorUsuario = document.getElementById("demo");
var errorCorreo = document.getElementById("demo1");
var errorContraseña = document.getElementById("demo2");

function validarForm() {

    var mensajeError = [];

    errorUsuario.innerHTML = "";
    errorCorreo.innerHTML = "";
    errorContraseña.innerHTML = "";

    mensajeError["Usuario"] = usuario.value === null || usuario.value === "";
    mensajeError["Correo"] = correo.value === null || correo.value === "";
    mensajeError["Contraseña"] = contra.value === null || contra.value === "";
    mensajeError["Contraseña2"] = contra2.value === null || contra2.value === "";
    mensajeError["CantCaract"] = contra.value.length <= 6;
    mensajeError["CantCaract2"] = contra2.value.length <= 6;
    mensajeError["ContraseñasIguales"] = contra.value !== contra2.value;

    if (mensajeError["Usuario"]) {
        errorUsuario.innerHTML = "Ingresa un nombre de usuario";
        usuario.style.borderColor = "red";
    } else {
        usuario.style.borderColor = "green";
    }

    if (mensajeError["Correo"]) {
        errorCorreo.innerHTML = "Ingresa la dirección del correo";
        correo.style.borderColor = "red";
    } else {
        correo.style.borderColor = "green";
    }

    if (mensajeError["ContraseñasIguales"]) {
        errorContraseña.innerHTML = "Las contraseñas no coinciden";
        contra.style.borderColor = "red";
        contra2.style.borderColor = "red";
    } else {
        contra.style.borderColor = "green";
        contra2.style.borderColor = "green";
    }
    if (mensajeError["Contraseña"]) {
        errorContraseña.innerHTML = "Ingresa la contraseña";
        contra.style.borderColor = "red";
    } else {
        if (mensajeError["CantCaract"]) {
            errorContraseña.innerHTML = "La contraseña debe tener mas de 6 caracteres";
            contra.style.borderColor = "red";
        } else {
            contra.style.borderColor = "green";
        }
    }
    if (mensajeError["Contraseña2"]) {
        errorContraseña.innerHTML = "Ingresa la contraseña";
        contra2.style.borderColor = "red";
    } else {
        if (mensajeError["CantCaract2"]) {
            errorContraseña.innerHTML = "La contraseña debe tener mas de 6 caracteres";
            contra2.style.borderColor = "red";
        } else {
            contra2.style.borderColor = "green";
        }
    }


    return !mensajeError["Usuario"] && !mensajeError["Correo"] && !mensajeError["Contraseña"] && !mensajeError["CantCaract"] && !mensajeError["ContraseñasIguales"];

};
//mostrar nombre de usuario 
miStorage = window.localStorage;


function mostrarUsuario() {
    var usuario2 = document.getElementById("inputUsuario").value;
    var email2 = document.getElementById("inputEmail").value;
    var Jsonusuario = {
        "nom": "",
        "telefono": "",
        "edad": "",
        "usuario": usuario2,
        "email": email2
    }
    miStorage.setItem("keyDatos", JSON.stringify(Jsonusuario));
};