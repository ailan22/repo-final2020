//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let miStorage = window.localStorage;
var selector = document.getElementById("foto");
const imageKey = "recent-image";

document.addEventListener("DOMContentLoaded", function(e) {
    Jsonusuario = JSON.parse(miStorage.getItem("keyDatos"))
    document.getElementById("nombre").value = Jsonusuario.nom
    document.getElementById("noTelefono").value = Jsonusuario.telefono
    document.getElementById("profile").value = Jsonusuario.usuario
    document.getElementById("email").value = Jsonusuario.email
    document.getElementById("noEdad").value = Jsonusuario.edad
    const imageData = localStorage.getItem(imageKey);
    if (imageData) {
        loadImage(imageData);
    }
});


function modificarDatos() {
    var Jsonusuario = {
        "nom": document.getElementById("nombre").value,
        "telefono": document.getElementById("noTelefono").value,
        "edad": document.getElementById("noEdad").value,
        "usuario": document.getElementById("profile").value,
        "email": document.getElementById("email").value
    }
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

//Muestro los campos solo lectuta
function undisableTxt() {
    document.getElementById("nombre").disabled = false;
    document.getElementById("profile").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("noTelefono").disabled = false;
    document.getElementById("noEdad").disabled = false;
};

//Puedo modificar los campos del usuario
function disableTxt() {
    document.getElementById("nombre").disabled = true;
    document.getElementById("profile").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("noTelefono").disabled = true;
    document.getElementById("noEdad").disabled = true;
};

//Guardar foto en localStorange

selector.addEventListener("change", function() {
    //Creamos el reader
    const reader = new FileReader();
    //Primero cargamos en el reader el evento de carga
    //INdicando que un vez este cargado pongaen el storage el resultado d la carga
    //luego que lo guarda en el storage lo posiciona en el img que corresponde
    reader.addEventListener('load', (event) => {
        localStorage.setItem(imageKey, event.target.result);
        loadImage(localStorage.getItem(imageKey));
    });
    //ahora si le decimos al reader que lea el archivo indicado por el usuario
    //al hacer esto se ejecutara el bloque anterior
    reader.readAsDataURL(this.files[0]);
});

function loadImage(urlOrBase64) {
    document.querySelector("#agregar").setAttribute("src", urlOrBase64);
}