//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("profile").innerHTML = miStorage.getItem("keyUsuario")
    document.getElementById("email").innerHTML = miStorage.getItem("keyEmail")
        //document.getElementById("password").innerHTML = miStorage.getItem("keyPassword")
});

let miStorage = window.localStorage;

function modificarDatos() {
    var Jsonusuario = {
        "na": document.getElementById("nombre").value,
        "telefono": document.getElementById("noTelefono").value,
        "edad": document.getElementById("noEdad").value
    }
    console.log(Jsonusuario);
    miStorage.setItem("keyDatos", JSON.stringify(Jsonusuario));
};

//Funcion para agregar foto de perfil
function addImagen() {
    var archivo = document.getElementById("foto").files[0];
    var reader = new FileReader();
    if (foto) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function() {
            document.getElementById("agregar").src = reader.result;
        }
    }
};

function undisableTxt() {
    document.getElementById("nombre").disabled = false;
    document.getElementById("profile").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("noTelefono").disabled = false;
    document.getElementById("noEdad").disabled = false;
}

function disableTxt() {
    document.getElementById("nombre").disabled = true;
    document.getElementById("profile").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("noTelefono").disabled = true;
    document.getElementById("noEdad").disabled = true;
}