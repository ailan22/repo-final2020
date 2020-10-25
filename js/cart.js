//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showListCart(list) {

    let htmlContentToAppend = "";
    for (i = 0; i < list.articles.length; i++) {
        let car = list.articles[i];
        if (car.currency == 'USD') {
            car.unitCost = car.unitCost * 40;
        }
        vsubtotal = car.unitCost * car.count;
        htmlContentToAppend += `
            <tr>
                <td>
                    <img class="img-thumbnail car" src="` + car.src + `"/>
                </td>
                <td>
                    <p>` + car.name + `</p>
                </td>
                <td>
                    <span><ACRONYM title="Eliminar"><img src="img/basura.ico" width="18em"></ACRONYM></span>
                </td>
                <td>
                    <input type="number" min="1" class="form-control prodCount" id="cantidad` + i + `" value="` + car.count + `" onchange="calcular(` + i + `)">
                </td>
                <td>
                    <p id="cost` + i + `">` + car.unitCost + `</p>
                </td>
                <td>
                    <p>UYU</p>
                </td>
                <td>
                    <p id="subtotalprod` + i + `" style="font-weight: bold;">` + vsubtotal + `</p>
                </td>
            </tr>
        `
    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
}

//Calcula el subtotal por producto
function subtotal_prod(posicion) {
    cantidad = document.getElementById("cantidad" + posicion).value;
    costo = document.getElementById('cost' + posicion).innerHTML;
    var result = parseInt(cantidad) * parseInt(costo);
    document.getElementById("subtotalprod" + posicion).innerHTML = result;
    return result;
}
//Calcula el subtotal de todos los productos
function subtotal_total() {
    var table = document.getElementById("tablacarrito");
    var filas = table.rows.length - 1;
    var st = 0;
    for (i = 0; i < filas; i++) {
        cantidad = parseInt(document.getElementById("subtotalprod" + i).innerHTML);
        st += cantidad;
    }
    return st;
}

//Calcula el total a pagar
function total() {
    let env = document.getElementById("envío").innerHTML;
    let subt = subtotal_total();

    document.getElementById("subtotal2").innerHTML = subt;
    var tot = parseInt(env) + subt;
    document.getElementById("totalgeneral").innerHTML = tot;
}

function calcular(posicion) {
    subtotal_prod(posicion);
    document.getElementById("envío").innerHTML = "0";
    total();
    numberWithCommas();
}

//Funcion para poner comas al total
function numberWithCommas() {
    let a = document.getElementById("totalgeneral").innerHTML
    document.getElementById("totalgeneral").innerHTML = (a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}



//funcion para cargar JSON de paises
function paises(lista) {
    let resultado = "";
    for (x = 0; x < lista.countries.length; x++) {
        let country = lista.countries[x];
        if (country != null && country.id != null && country.id != '') {
            s = "";
            if (country.name == "Uruguay") {
                s = "selected";
            }
            resultado += '<option value="' + country.id + '" ' + s + '>' + country.name + '</option>';
        }
    }
    document.getElementById("pais").innerHTML = resultado;
    if (lista != null && lista.length > 0) {
        document.getElementById("pais").value = lista[1].id;
    }
};

//función validar tipo de envio
function validarTipoEnvio() {
    var tipoEnvio = document.getElementsByName("Premium");
    var formValid = false;

    var i = 0;
    while (!formValid && i < tipoEnvio.length) {
        if (tipoEnvio[i].checked)
            formValid = true;
        i++;
    }
    if (formValid == false) {
        document.getElementById("error2").innerHTML = "Debe seleccionar un tipo de envío";
        return formValid;
    } else {
        document.getElementById("error2").innerHTML = "";
        return true;
    }
};

//Función valida forma de envío
function validarEnvio() {
    var envio = document.getElementsByName("envios");
    var formValid = false;

    var i = 0;
    while (!formValid && i < envio.length) {
        if (envio[i].checked)
            formValid = true;
        i++;
    }

    if (formValid == false) {
        document.getElementById("error").innerHTML = "Debe seleccionar una forma de envío";
        return formValid;
    } else {
        document.getElementById("error").innerHTML = "";
        return true;
    }
};

//Funcion que calcula el porciento del envío 
function calcularEnvioSubtotal() {
    let a = document.getElementById("subtotal2").innerHTML;
    let premium = document.getElementById("Premium");
    let express = document.getElementById("Express");
    let standar = document.getElementById("Standard");
    let porciento;

    if (premium.checked) {
        porciento = 15;
    } else if (express.checked) {
        porciento = 7;
    } else if (standar.checked) {
        porciento = 5;
    }
    var resultado = parseInt(a * porciento) / 100
    document.getElementById("envío").innerHTML = resultado;
};

//Funcion que valida la seleción de una forma de pago
function formaDePago() {
    var pago = document.getElementsByName("tcredito");
    var formValid = false;

    var i = 0;
    while (!formValid && i < pago.length) {
        if (pago[i].checked)
            formValid = true;
        i++;
    }
    if (formValid == false) {
        document.getElementById("error5").innerHTML = "Debe seleccionar una forma de pago";
        return formValid;
    } else {
        document.getElementById("error5").innerHTML = "";
        return true;
    }
};

//Funcion valida que estén correctos los campos de tarjeta de crédito
function validaTarjetaCredito() {
    var form = document.getElementsByClassName("req1");
    let tar = document.getElementById("visa");
    let master = document.getElementById("mastercard");
    var formValid = true;

    for (i = 0; i < form.length; i++) {
        formValid = formValid && form[i].value != "" || form[i].value != null;
    }
    if (formValid == false || (!tar.checked) && (!master.checked)) {
        document.getElementById("error4").innerHTML = "Debe completar todos los datos";
        return false;
    }
    document.getElementById("error4").innerHTML = "";
    return true;
};

//Función valida transferencia bancaria
function validarTransferenciaBancaria() {
    var addrElem = document.getElementsByClassName("req2");
    var formValid = true;
    for (var i = 0; i < addrElem.length; i++) {
        formValid = formValid && addrElem[i].value != "";
    }
    if (formValid == false) {
        document.getElementById("error6").innerHTML = "Debe completar todos los datos";
        return false;
    } else {
        document.getElementById("error6").innerHTML = "";
        return true;
    }
};

//Función valida datos de envío
function validarDatosEnvio() {
    var addrElem = document.getElementsByClassName("req");
    var formValid = true;
    for (var i = 0; i < addrElem.length; i++) {
        formValid = formValid && addrElem[i].value != "";
    }
    if (formValid == false) {
        document.getElementById("error3").innerHTML = "Debe completar todos los datos de envío";
        return false;
    } else {
        document.getElementById("error3").innerHTML = "";
        return true;
    }
};

//Función valida pago en efectivo
function validarPagoEfectivo() {
    let efectivo = document.getElementById("tienda");

    if (!efectivo.checked) {
        document.getElementById("error5").innerHTML = "Debe seleccionar forma de pago"
        return false;
    } else {
        document.getElementById("error5").innerHTML = "";
        return true;
    }

};

function validarForm() {
    validarEnvio();
    if (validarTipoEnvio()) {
        calcularEnvioSubtotal();
        total();
        numberWithCommas();
    }
    if (formaDePago()) {
        validaTarjetaCredito();
    }
    validarTransferenciaBancaria();
    validarPagoEfectivo()
    validarDatosEnvio();

}
// funciones para mostrar y ocultar contenedores de datos
function showShipping0() {
    div = document.getElementById("flotante0");
    div.style.display = "block";
}

function hideShipping0() {
    div = document.getElementById("flotante0");
    div.style.display = "none";
}

function showShipping1() {
    div = document.getElementById("flotante1");
    div.style.display = "block";
}

function hideShipping1() {
    div = document.getElementById("flotante1");
    div.style.display = "none";
}

function showShipping2() {
    div = document.getElementById("flotante2");
    div.style.display = "block";
}

function hideShipping2() {
    div = document.getElementById("flotante2");
    div.style.display = "none";
}

function show() {
    showShipping0()
    showShipping1()
    showShipping2()
};

function Hidden() {
    hideShipping0()
    hideShipping2()
    showShipping1()
};

function showShippingCredito() {
    div = document.getElementById("flotanteCredito");
    div.style.display = "block";
};

function hideShippingCredito() {
    div = document.getElementById("flotanteCredito");
    div.style.display = "none";
};

function showShippingTransferencia() {
    div = document.getElementById("flotanteTransferencia");
    div.style.display = "block";
};

function hideShippingTransferencia() {
    div = document.getElementById("flotanteTransferencia");
    div.style.display = "none";
};

function showShippingEfectivo() {
    div = document.getElementById("flotanteEnvio");
    div.style.display = "block";
};

function hideShippingEfectivo() {
    div = document.getElementById("flotanteEnvio");
    div.style.display = "none";
};

function showCredito() {
    showShippingCredito();
    hideShippingTransferencia();
    hideShippingEfectivo();
};

function showTransferencia() {
    hideShippingCredito();
    showShippingTransferencia();
    hideShippingEfectivo()
};

function showEfectivo() {
    hideShippingCredito();
    hideShippingTransferencia();
    showShippingEfectivo();
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART2_BUY_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showListCart(resultObj.data);
            total();
            numberWithCommas();
        }
    });
});
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(COUNTRY).then(function(resultObj) {
        if (resultObj.status === "ok") {
            paises(resultObj.data);
        }
    });
});