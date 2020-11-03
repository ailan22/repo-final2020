const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART2_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const COUNTRY = "https://raw.githubusercontent.com/millan2993/countries/master/json/countries.json";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
miStorage = window.localStorage;
document.addEventListener("DOMContentLoaded", function(e) {

    Jsonusuario = JSON.parse(miStorage.getItem("keyDatos"))


    document.getElementById("user").value = localStorage.getItem("keyUsuario")
    document.getElementById("profile").value = localStorage.getItem("keyUsuario")
    document.getElementById("email").value = localStorage.getItem("keyEmail")
        //document.getElementById("password").value = localStorage.getItem("keyPassword")
    document.getElementById("nombre").value = Jsonusuario.na
    document.getElementById("noTelefono").value = Jsonusuario.telefono
    document.getElementById("NoEdad").value = Jsonusuario.edad

});


function signOff() {
    localStorage.removeItem("keyUsuario");
    localStorage.removeItem("keyEmail");
    localStorage.removeItem("keyPassword");
};

const currentURL = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const logged = urlParams.get('gmail')
if (logged == null && currentURL.endsWith("index.html")) {
    window.location.replace('login.html');
}

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}