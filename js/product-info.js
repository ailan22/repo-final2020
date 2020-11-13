//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e) {});

//validación de comentarios
function validateComent() {
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
        return true;
    }

};

//validación de estrellas
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
        return true;
    }
};
//validación de comentarios y estrellas
function validateComentAndStars() {
    if (validateComent() && validateStars()) {
        document.getElementById("mensaje").innerHTML = "¡Mensaje enviado correctamente!";
        return true
    } else {
        document.getElementById("mensaje").innerHTML = "";
        return false
    }
}
//Función que valida que todo esté validado y muestre el comentario
function sendComment() {
    if (validateComentAndStars()) {
        saveComment()
        showComment()
    }
}

//Muestro imágenes
function listImages(array2) {

    let htmlContentToAppend3 = "";
    for (let z = 0; z < array2.length; z++) {
        let imag = array2[z];

        htmlContentToAppend3 += `            
        <div class="container">             
            <div style="float: left;width: 20%;list-style-type:none;" class="loc-caption row">                
             <img class="my-column border border-secundary zoom" src="` + imag + `"/> 
            </div>            
        </div>  
        
        `
    }
    document.getElementById("imagenes").innerHTML = htmlContentToAppend3;
};

//Muestro el información del producto
function appenProduct(lista) {

    let htmlContentToAppend = `
                       <div class="row">                           
                            <div="row">
                                <p class="text-black my-bg-dark">` + "Descripción" + ` </p>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-5 font-weight-bold">` + lista.name + `</h5>
                                <small class="font-weight">` + lista.currency + lista.cost + ` </small>
                                <small class="font-weight">` + lista.soldCount + ` vendidos</small>
                            </div>                            
                                 <p class="mb-1">` + lista.description + `</p>                            
                            </div>
                        </div>   
                    `
    listImages(lista.images);
    document.getElementById("descripcion").innerHTML = htmlContentToAppend;
}

//Muestro los comentarios sobre el producto
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
                       <div class="row container">
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

//Obtener puntaje
function getScore() {
    var ele = document.getElementsByName('estrellas');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].value;
        }
    }
}

//Guardar el nuevo comentario
miStorage = window.sessionStorage;

function saveComment() {
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    nuevo = {
        "score": getScore(),
        "description": document.getElementById("comment").value,
        "user": miStorage.getItem("keyUsuario"),
        "dateTime": formatted_date
    }
    miStorage.setItem("keyComment", JSON.stringify(nuevo));
};

//Mostrar el nuevo comentario
function showComment() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            el = JSON.parse(miStorage.getItem("keyComment"));
            comments.push(el);
            listComment(comments);
        }
    });
};


//Muestro productos relacionados
function productRelated(autos) {
    let htmlContentToAppend4 = "";
    for (i = 0; i < autos.length; i++) {
        let a = autos[i];
        if (i == 1 || i == 3) {
            htmlContentToAppend4 += `
                <div class="col">
                    <div class="card-deck col-5" style="float: left;">
                      <div class="card zoom"> 
                      <img class="card-img-top my-card-img-top img-fluid" src="img/PNTA8M.jpg">
                        <div class="text-center">
                          <img src=` + a.imgSrc + ` + class="img-fluid img-auto rounded-circle" height="150px" width="150px">
                        </div>
                        <div class="card-block">
                          <h4 class="card-title col-6">` + a.name + `</h4>
                          <small class="text-muted col-6">` + "Precio: " + a.currency + " " + a.cost + `</small>
                        </div>  
                        <div class="card-block">
                          <p class="card-text col">` + a.description + `</p>
                        </div>
                          <div class="card-footer my-card-footer text-center">
                            <small class="text-muted">` + a.soldCount + ` vendidos </small>                
                          </div>
                        </div>
                    </div>
                </div>
            `
        }
    }
    document.getElementById("product-relac").innerHTML = htmlContentToAppend4;
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            appenProduct(resultObj.data);

        }
    });
});

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            listComment(resultObj.data);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productRelated(resultObj.data);
        }
    });
});