//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showListCart(list) {

    let htmlContentToAppend = "";
    for (i = 0; i < list.articles.length; i++) {
        let car = list.articles[i];

        htmlContentToAppend = `
        <table class="table">
            <div class="row">
                <div class="col row">
                    <img class="img-thumbnail car" src="` + car.src + `"/>
                    <p class="col-5">` + car.name + `</p>                
                </div>
                <div class="col-3">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="">` + car.count + `</p>
                        <p class="col-2">` + car.unitCost + `</p>
                        <p class="">` + car.currency + ` </p>
                    </div>                               
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("car").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showListCart(resultObj.data);
        }
    });
});