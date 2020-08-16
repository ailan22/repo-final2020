//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showProductsList(lista) {

    let htmlContentToAppend = "";
    for (let i = 0; i < lista.length; i++) {
        let producto = lista[i];

        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + producto.name + `</h4>
                        <small class="text-muted">` + producto.soldCount + ` artículos</small>
                    </div>
                    <div>` + producto.currency + "" + producto.cost + `</div>
                    <p class="mb-1">` + producto.description + `</p>
                </div>
            </div>
        </div>
        `
    };
    //    document.getElementById("lista_producto").innerHTML += htmlContentToAppend;
    document.getElementsByClassName("container p-5")[0].innerHTML += htmlContentToAppend;

};

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            //Muestro las categorías ordenadas
            showProductsList(resultObj.data);
        }
    });
});