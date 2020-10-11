//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showListCart(list) {

    let htmlContentToAppend = "";
    for (i = 0; i < list.articles.length; i++) {
        let car = list.articles[i];

        htmlContentToAppend += `
        <table class="table">
            <div class="row">               
                <img class="img-thumbnail car" src="` + car.src + `"/>
                <p class="col-6">` + car.name + `</p>                
                <span class="col-1"><ACRONYM title="Eliminar"><img src="img/basura.ico" width="18em"></ACRONYM></span>
                    <div class="col-1 justify-content-between">
                        <select name="cant" id="cantidad` + i + `" onchange="calcular("` + i + `")">
                            <option value="1">1</option>
                            <option value="2" selected>2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>                            
                    </div>
                        <span class="col-1 "id="cost` + i + `">` + car.unitCost + `</span>
                        <span class="col-1 justify-content-between">` + car.currency + ` </span>                        
                        <p class="col-1" id="subtotalprod` + i + `" style="font-weight: bold;"></p>                                                   
            </div>            
        </table>
        `
    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
}
//Carga el subtotal al cargar la página
/*function showSubtotal() {
    window.open(subtotal());
};*/

//Calcula el subtotal por producto
function subtotal(posicion) {
    cantidad = document.getElementById("cantidad" + posicion).value;
    costo = document.getElementById("cost" + posicion).innerHTML;
    var result = cantidad * costo;
    document.getElementById("subtotalprod" + posicion).innerHTML = result;
    return result;
}

function total() {
    let env = document.getElementById("envío").innerHTML;
    let subt = subtotal();

    var tot = parseInt(env) + subt;
    document.getElementById("totalgeneral").innerHTML = tot;
}

function calcular(posicion) {
    subtotal(posicion);
    total();
}

//funcion para cargar JSON de paises
function paises(lista) {
    let resultado = "";
    for (x = 0; x < lista.countries.length; x++) {
        let country = lista.countries[x];
        if (country != null && country.id != null && country.id != '') {
            try {
                resultado += '<option value="' + country.id + '">' + country.name + '</option>';
            } catch (error) {
                console.log(error);
            }
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