//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e) {});
let appenImages = [];

function appenProduct(lista) {

    let htmlContentToAppend = `
                       <div class="row">                        
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-5">` + lista.name + `</h4>
                                <small>` + lista.currency + lista.cost + ` </small>
                                <small class="text-muted">` + lista.soldCount + ` vendidos</small>
                            </div>
                            <div>
                                <p class="text-white bg-dark">` + "Descripción" + ` </p>
                            </div>
                                 <p class="mb-1">` + lista.description + `</p>
                            <div class>
                                <img src="` + lista.images + `" class="img-thumbnail">
                            </div>
                        </div>
                    </div>   
                    `
    document.getElementById("container p-5").innerHTML = htmlContentToAppend;
}




function listComment(array) {

    let htmlContentToAppend2 = "";
    for (let x = 0; x < array.length; x++) {
        let comment = array[x];

        htmlContentToAppend2 += `
        <div class="row center ">
        <ul class="list-unstyled">
        <li class="media my-comment">
          <img class="my-img" src="img/usuario.jpg">
          <div class="media-body">
            <h5 class="mt-0 mb-2 font-weight-bold">` + comment.user + `</h5>
            
            <i class="fas fa-star blue-text"> </i>
            <i class="fas fa-star blue-text"> </i>
            <i class="fas fa-star blue-text"> </i>
            <i class="fas fa-star blue-text"> </i>
            <i class="fas fa-star blue-text"> </i>
            <p>` + comment.description + `</p>
            <small>` + comment.dateTime + `</small>
          </div>
        </li>        
      </ul>
      </div>
        `
    }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend2;
};



document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            //Muestro las categorías ordenadas
            appenProduct(resultObj.data);

        }
    });
});

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            //Muestro las categorías ordenadas
            listComment(resultObj.data);
        }
    });
});