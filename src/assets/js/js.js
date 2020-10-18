
window.onload = function() {
    setTimeout(function(){ 
        var loader= document.getElementById("my00loader");
        var mensaje= document.getElementById("my00msn-loader");
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
        if (mensaje.parentNode) {
            mensaje.parentNode.removeChild(mensaje);
        }
        
        document.getElementById("app-root").style.visibility = "visible"; 

    }, 1000);
};