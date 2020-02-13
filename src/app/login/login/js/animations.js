export function disenio(){
  $(document).ready(function() {
    //Inicializar de una vez
    //$("body").css({ height: $(window).height() });
    $("#container").css({ height: $(window).height() * 2 });
    $("#world").css("display", "block");
    $("#world").css({ bottom: -$(window).height() });
    $("#form").css("display", "block");
    $("#world").fadeOut();
    $("#form").fadeOut();
    $("#form").css("display", "none");
    $("#menu").css("display", "none");
    $("#title").css("display", "none");
    $("#elaborado").css("display", "none");
    //vete primero all mundo
    $("html, body").animate(
      {
        scrollTop: $("#mundo").offset().top
      },
      500
    );

    setTimeout(function() {
      $("#form").css("display", "block");
      setTimeout(function() {
        $("#world").fadeIn(1000);
      }, 1000);
    }, 1000);

    //disable scrolling
    window.onscroll = function() {
      window.scrollTo(0, $(window).height());
    };
  });

  $(function() {
    if ($(window).width() >= 3000) {
      $("#login").css("font-size", "35px");
      $("#password").css("font-size", "35px");
      $("#loginButton").css("font-size", "35px");
      $("#formContent").css("margin-top", "-110px");
    }
  });
}
export function next(callback) {
  $(document).ready(function() {
    window.onscroll = function() {};
    $("html, body").animate(
      {
        scrollTop: $("#constelacion").offset().top
      },
      4000,()=>{
        window.onscroll = function() {}; 
        callback();
      }
    );
  
    $("#menu").css("display", "block");
    $("#menu").fadeIn(5000);
    $("#title").css("display", "block");
    $("#elaborado").css("display", "block");
    //$(".menu").toggleClass("active");
    setTimeout(function() {
      $("#form").css("display", "none");
      $("#world").css("display", "none");
    }, 5000);
  
    //enable  disable scroll
    setTimeout(function() {
      window.onscroll = function() {
        window.scrollTo(0, 0);
      };
    }, 5000);
  });
}
export function OnDestroy(){
  window.onscroll = function() {}; 
}