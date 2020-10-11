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
    total();
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

}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART2_BUY_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showListCart(resultObj.data);
            total();
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