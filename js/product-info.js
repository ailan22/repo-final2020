//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e) {});
function validarComent() {
    var boton = document.getElementById("butt");
    var comentario = document.getElementById("comment").value;

    if (comentario == "") {
        document.getElementById("errorComent").innerHTML = "Debe ingrese un comentario";
        comment.style.borderColor = "red";
        boton.style.backgroundColor = "red";
        boton.style.borderColor = "red";
        return false;
    } else {
        document.getElementById("errorComent").innerHTML = "";
        comment.style.borderColor = "green";
        boton.style.backgroundColor = "green";
        boton.style.borderColor = "green";          
    }
};

function validateStars() {
    var radios = document.getElementsByName("estrellas");
    var formValid = false;

    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;
    }

    if (!formValid) {
        document.getElementById("errorEstrellas").innerHTML = "Debe ingresar su valoración";
        return formValid;
    } else {
        document.getElementById("errorEstrellas").innerHTML = "";          
    }
};

function appenProduct(lista) {

    let htmlContentToAppend = `
                       <div class="row">                           
                            <div="row">
                                <p class="text-black my-bg-dark">` + "Descripción" + ` </p>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-5 font-weight-bold">` + lista.name + `</h4>
                                <small class="font-weight-bold">` + lista.currency + lista.cost + ` </small>
                                <small class="text-muted font-weight-bold">` + lista.soldCount + ` vendidos</small>
                            </div>                            
                                 <p class="mb-1">` + lista.description + `</p>                            
                        </div>
                    </div>   
                    `
    listImages(lista.images);
    document.getElementById("descripcion").innerHTML = htmlContentToAppend;
}

function listComment(array) {

    let htmlContentToAppend2 = "";
    for (let x = 0; x < array.length; x++) {
        let comment = array[x];
        estrellas = "";
        for (let y = 1; y <= 5; y++) {
            if (y <= comment.score) {
                estrellas += `<i class = "fas fa-star blue-text checked"> </i>`
            } else {
                estrellas += `<i class = "fas fa-star blue-text"> </i>`
            }
        }

        htmlContentToAppend2 += `
    <div class="border border-top-0 mb-1">
      <ul class="list-unstyled">
        <li class="media">
            <img class="my-img" src="img/usuario-comentarios.jpg" />
            <div class="media-body">            
               <div class="container row">
                    <h5 class="col-7 font-weight-bold">` + comment.user + `</h5>   
                    <p class="col-5 text-right font-italic">` + "Fecha: " + comment.dateTime + `</p>          
                </div>
                <div class="row container">
                    <p class="align-text-top col-10">` + comment.description + `</p>                       
                    <div class="aling-right"> ` + estrellas + `
                    </div> 
                </div>                    
            </div>
        </li>        
      </ul>
    </div>`
    }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend2;
};

function listImages(array2) {

    let htmlContentToAppend3 = "";
    for (let z = 0; z < array2.length; z++) {
        let imag = array2[z];

        htmlContentToAppend3 += `    
    <div class="container">
      
        <ul>
            <li style="float: left;width: 20%;list-style-type:none;" class="loc-caption row">                
                <img class="my-column border border-secundary" src="` + imag + `"/> 
            </li> 
        </ul>    
      
    </div>  
        `
    }
    document.getElementById("imagenes").innerHTML = htmlContentToAppend3;
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



document.querySelectorAll(".modal-container img").forEach(el=>{
    el.addEventListener("click", function(ev){
        ev.stopPropagation();
        this.parentNode.classList.add("active");
    })
})

document.querySelectorAll(".modal-container").forEach(el=>{
    el.addEventListener("click", function(ev){
        this.classList.remove("active");
    })
})