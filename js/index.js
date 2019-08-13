/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

/*
  Funcion que inicializa todos los procesos del Proyecto
*/
function init(){
    $("#mostrarTodos").on('click', ()=>{
        var reg = $(".registro").length;
        if(reg > 0){
            $(".registro").remove();
            showRecords();
        }else{
            showRecords();
        }
    })
    
    $("#formulario").submit((e)=>{
        e.preventDefault();
        
        var reg = $(".registro").length;
        if(reg > 0){
            $(".registro").remove();
            formSearch();
        }else{
            formSearch();
        }
      });
    
}

/*
  Funciones que crean las listas desplegables de Ciudad y Tipo
*/
function createOptions(){
        $.ajax({
        url: "./filtroOpciones.php",
        dataType: "json",
        type: 'POST',  
        success: function(response){
            $(".filtroCiudad select").remove();
            $(".filtroTipo .select-wrapper").remove();
            var selectorCiudad = $(".filtroCiudad");
            var selectorTipo = $(".filtroTipo");
            
            var opcionesCiudad = '<select name="ciudad" id="selectCiudad">'+
              '<option value="" disabled selected>Elige una ciudad</option>'+
              '<option value="'+response.opcionCiudad1+'">'+response.opcionCiudad1+'</option>'+
              '<option value="'+response.opcionCiudad2+'" >'+response.opcionCiudad2+'</option>'+
              '<option value="'+response.opcionCiudad3+'" >'+response.opcionCiudad3+'</option>'+
              '<option value="'+response.opcionCiudad4+'" >'+response.opcionCiudad4+'</option>'+
              '<option value="'+response.opcionCiudad5+'" >'+response.opcionCiudad5+'</option>'+
              '<option value="'+response.opcionCiudad6+'" >'+response.opcionCiudad6+'</option>'+    
            '</select>';
              
            var opcionesTipo = '<select name="tipo" id="selectTipo">'+
                '<option value="" disabled selected>Elige un tipo</option>'+
                '<option value="'+response.opcionTipo1+'">'+response.opcionTipo1+'</option>'+
                '<option value="'+response.opcionTipo2+'" >'+response.opcionTipo2+'</option>'+
                '<option value="'+response.opcionTipo3+'" >'+response.opcionTipo3+'</option>'+
                '</select>';
                
            $(selectorCiudad).append(opcionesCiudad);
            $(selectorTipo).append(opcionesTipo);

            $('.filtroCiudad select').material_select();
            $('.filtroTipo select').material_select();
        }
      })
      
}

/*
  Funcion que muestra todos los registros
*/
function showRecords(){
    for(var iterator=0; iterator<101; iterator++){
        $.ajax({
        url: "./buscador.php",
        dataType: "json",
        type: 'POST',
        data: {iterator:iterator},    
        success: function(response){
            createCard(response.Direccion, response.Ciudad, response.Telefono, response.Codigo_Postal, response.Tipo, response.Precio);
        }
      })
    }
}

//Funcion que crea el card que muestra el registro y lo añade al contenedor
function createCard(direccion, ciudad, telefono, codigoP, tipo, precio){
    var contenedor = $(".colContenido");
    var registro = '<div class="row registro">'+
                  '<div class="col s12">'+
                      '<div class="card componenteReg">'+
                          '<div class="card-image">'+
                              '<img src="img/home.jpg">'+
                          '</div>'+
                          '<div class="card-stacked ">'+
                            '<div class="card-content">'+
                                '<ul class="listaReg">'+
                                    '<li><strong>Dirección:</strong>'+direccion+'</li>'+
                                    '<li><strong>Ciudad:</strong>'+ciudad+'</li>'+
                                    '<li><strong>Teléfono:</strong>'+telefono+'</li>'+
                                    '<li><strong>Código Postal:</strong>'+codigoP+'</li>'+
                                    '<li><strong>Tipo:</strong>'+tipo+'</li>'+
                                    '<li><strong>Precio:</strong>'+precio+'</li>'+
                                '</ul>'+
                            '</div>'+
                            '<div class="card-action">'+
                              '<a href="#">VER MAS</a>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'   
    $(contenedor).append(registro);
}

/*
    Funcion que crea el card segun la informacion del formulario
*/
function formSearch(){
    var slider = $("#rangoPrecio").data("ionRangeSlider");

    var from = slider.result.from;
    var to = slider.result.to;
    var selectCiudad = $("#selectCiudad").val();
    var selectTipo = $("#selectTipo").val();
    
    for(var iterator=0; iterator<101; iterator++){
        $.ajax({
            url: "./buscador.php",
            dataType: "json",
            type: 'POST',
            data: {iterator:iterator},    
            success: function(response){
                var cadenaPrecio = response.Precio.split("");
                removeItemFromArr(cadenaPrecio, "$");
                removeItemFromArr(cadenaPrecio, ",");
                
                var precioReg = parseInt(cadenaPrecio.join(""));
                
                if(selectCiudad == null){
                    if(selectTipo == null){
                        if(precioReg > from && precioReg < to){
                            createCard(response.Direccion, response.Ciudad, response.Telefono, response.Codigo_Postal, response.Tipo, response.Precio);    
                        }
                    }
                }
                
                if(selectCiudad == null){
                    if(selectTipo == response.Tipo){
                        if(precioReg > from && precioReg < to){
                            createCard(response.Direccion, response.Ciudad, response.Telefono, response.Codigo_Postal, response.Tipo, response.Precio);    
                        }
                    }
                }
                
                if(selectCiudad == response.Ciudad){
                    if(selectTipo == null){
                        if(precioReg > from && precioReg < to){
                            createCard(response.Direccion, response.Ciudad, response.Telefono, response.Codigo_Postal, response.Tipo, response.Precio);    
                        }
                    }
                }
                
                if(selectCiudad == response.Ciudad){
                    if(selectTipo == response.Tipo){
                        if(precioReg > from && precioReg < to){
                            createCard(response.Direccion, response.Ciudad, response.Telefono, response.Codigo_Postal, response.Tipo, response.Precio);    
                        }
                    }
                }          
            }
      })
    }
}

/*
    Funcion que elimina un elemento de un array
*/
function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

inicializarSlider();
playVideoOnScroll();

$(document).ready(function(){
    $('select').material_select();
    init();
    createOptions();    
    
});