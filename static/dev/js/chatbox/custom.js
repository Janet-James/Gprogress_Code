// Drag and drop input file
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

// ---- Preloader
$(window).on("load", function () {
  $("#overlayer").delay(2000).fadeOut("slow");
  // $("#overlayer").hide();
  //   console.log('12');
});
var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
//console.log(innerHeight,innerWidth);
function responsive(maxWidth) {
  if (maxWidth.matches) {
    $(".product-sec .tab-1").click(function () {
      $(".navigator-logo.product .navbar-brand img").attr(
        "src",
        "dist/images/products/sunshine-logo.png"
      );
    });

    $(".product-sec .tab-2").click(function () {
      $(".navigator-logo.product .navbar-brand img").attr(
        "src",
        "dist/images/products/empower-logo.png"
      );
    });

    $(".product-sec .tab-3").click(function () {
      $(".navigator-logo.product .navbar-brand img").attr(
        "src",
        "dist/images/products/sun-smart-logo.png"
      );
    });

    $("#productsec").hover(
      function () {
        // console.log("Hi11");
        var productActivePath = $("#productsec .tab-list .active img").attr(
          "data-src"
        );
        // console.log(productActivePath);
        $("#fixed-top .navbar-brand img").attr("src", productActivePath);
      },
      function () {
        $("#fixed-top .navbar-brand img").attr(
          "src",
          "dist/images/green-logo.png"
        );
      }
    );
  } else {
    $(".product-sec .tab-1, .product-sec .tab-2, .product-sec .tab-3").click(
      function () {
        $("#fixed-top .navbar-brand img").attr(
          "src",
          "dist/images/green-logo.png"
        );
      }
    );

    $("#productsec").hover(
      function () {
        $("#fixed-top .navbar-brand img").attr(
          "src",
          "dist/images/green-logo.png"
        );
      },
      function () {
        $("#fixed-top .navbar-brand img").attr(
          "src",
          "dist/images/green-logo.png"
        );
      }
    );
  }
}
//  var maxWidth = window.matchMedia("(min-width: 1501px)");
var maxWidth = window.matchMedia("(min-width: 1501px)");

responsive(maxWidth);
maxWidth.addListener(responsive);

//  $(window).scroll(function(){
//     $(window).scroll(function(){
//         if ($('#productsec').offset().top > $(window).scrollTop()){
//             console.log("Hi");
//         }
//         else{
//             console.log("Hi2");
//         }
//     });
// });

// $(window).scroll(function() {
//     console.log("h221");
//     var hT = $('#productSec').offset().top,
//         hH = $('#productSec').outerHeight(),
//         wH = $(window).height(),
//         wS = $(this).scrollTop();
//      console.log((hT-wH) , wS);
//     if (wS > (hT+hH-wH)){
//       alert('you have scrolled to the h1!');
//     }
//  });

// document.addEventListener('scroll', function () {
//     console.log("hi");
//     var hT = $('#serviceSec').offset().top,
//         hH = $('#serviceSec').outerHeight(),
//         wH = $(window).height(),
//         wS = $(this).scrollTop();
//      console.log((hT-wH) , wS , (hT > wS) , (wS+wH > hT+hH));
//     if (wS == (hT+hH-wH)){
//       alert('you have scrolled to the h1!');
//     }
//     if (wS != (hT+hH-wH)) {
//         alert('hi');
//     }
// }, true /*Capture event*/);

// $(function(){
//     $(window).scroll(function(){
//         console.log("scroll");
//     //   var aTop = $('.ad').height();
//     //   if($(this).scrollTop()>=aTop){
//     //       alert('ad just passed.');
//     //   }
//     });
//   });

// $(window).scroll(function(){
//     var scroll = $(window).scrollTop();
//     if (scroll > 50) {
//      // $(".fixed-top").css("background" , "blue");
//     }else{
//         $(".fixed-top").addClass("green_nav");
//         console.log("21")
//     }
// });

// $(function(){
//     var navbar = $('.navbar');

//     $(window).scroll(function(){
//         if($(window).scrollTop() <= 40){
//             console.log("21")
//         } else {
//             console.log("2bbb1")
//         }
//     });
// });

// $(window).scroll(function(){
//         if($(window).scrollTop() <= 40){
//             console.log("21")
//         } else {
//             console.log("2bbb1")
//         }
//     });

// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     console.log("123")
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.getElementById("fixed-top").style.padding = "30px 10px";
//     document.getElementById("logo").style.fontSize = "25px";
//   } else {
//     document.getElementById("fixed-top").style.padding = "80px 10px";
//     document.getElementById("logo").style.fontSize = "35px";
//   }
// }

setInterval(function () {
  // ----- Solution D2 Rotate Animation ------
  if ($("#solution-rotate-animation").hasClass("layout-1")) {
    $("#solution-rotate-animation").addClass("layout-2");
    $("#solution-rotate-animation").removeClass("layout-1");

    $(".block-1").fadeOut(300);
    setTimeout(function () {
      $(".block-1 .img").attr("src", "dist/images/solutions/solution-2.jpg");
      $(".block-1 .img").fadeIn(300);
      $(".block-1 h3").text("Powering agriculture");
      $(".block-1 h3").fadeIn(300);
    }, 300);
    setTimeout(function () {
      $(".block-1").fadeIn(300);
    }, 400);

    $(".block-2 .img").attr("src", "dist/images/solutions/solution-1.jpg");
    $(".block-2 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $(".block-2 h3").text("Powering home");
  } else if ($("#solution-rotate-animation").hasClass("layout-2")) {
    $("#solution-rotate-animation").addClass("layout-3");
    $("#solution-rotate-animation").removeClass("layout-2");

    $(".block-2 .img").attr("src", "dist/images/solutions/solution-2.jpg");
    $(".block-2 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-2.jpg"
    );
    $(".block-2 h3").text("Powering agriculture");

    // $(".block-1 .img").attr("src", "dist/images/solutions/solution-3.jpg");
    // $(".block-1 .zoom-ani").attr("src", "dist/images/solutions/solution-hover-3.jpg");
    // $(".block-1 h3").text("Powering education");

    $(".block-1 .zoom-ani").fadeOut();
    $(".block-1 .img").fadeOut(300);
    $(".block-1 h3").fadeOut(300);
    setTimeout(function () {
      $(".block-1 .img").attr("src", "dist/images/solutions/solution-3.jpg");
      $(".block-1 .img").fadeIn(300);
      $(".block-1 h3").text("Powering education");
      $(".block-1 h3").fadeIn(300);
    }, 300);
    setTimeout(function () {
      $(".block-1 .zoom-ani").fadeIn();
      $(".block-1 .zoom-ani").attr(
        "src",
        "dist/images/solutions/solution-hover-3.jpg"
      );
    }, 1000);

    $(".block-3 .img").attr("src", "dist/images/solutions/solution-1.jpg");
    $(".block-3 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $(".block-3 h3").text("Powering home");
  } else if ($("#solution-rotate-animation").hasClass("layout-3")) {
    $("#solution-rotate-animation").addClass("layout-4");
    $("#solution-rotate-animation").removeClass("layout-3");

    $(".block-3 .img").attr("src", "dist/images/solutions/solution-3.jpg");
    $(".block-3 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-3.jpg"
    );
    $(".block-3 h3").text("Powering education");

    // $(".block-1 .img").attr("src", "dist/images/solutions/solution-4.jpg");
    // $(".block-1 .zoom-ani").attr("src", "dist/images/solutions/solution-hover-4.jpg");
    // $(".block-1 h3").text("Powering corporates");

    $(".block-1 .zoom-ani").fadeOut();
    $(".block-1 .img").fadeOut(300);
    $(".block-1 h3").fadeOut(300);
    setTimeout(function () {
      $(".block-1 .img").attr("src", "dist/images/solutions/solution-4.jpg");
      $(".block-1 .img").fadeIn(300);
      $(".block-1 h3").text("Powering corporates");
      $(".block-1 h3").fadeIn(300);
    }, 300);
    setTimeout(function () {
      $(".block-1 .zoom-ani").fadeIn();
      $(".block-1 .zoom-ani").attr(
        "src",
        "dist/images/solutions/solution-hover-4.jpg"
      );
    }, 1000);

    $(".block-4 .img").attr("src", "dist/images/solutions/solution-1.jpg");
    $(".block-4 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $(".block-4 h3").text("Powering home");
  } else if ($("#solution-rotate-animation").hasClass("layout-4")) {
    $("#solution-rotate-animation").addClass("layout-5");
    $("#solution-rotate-animation").removeClass("layout-4");

    $(".block-4 .img").attr("src", "dist/images/solutions/solution-4.jpg");
    $(".block-4 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-4.jpg"
    );
    $(".block-4 h3").text("Powering corporates");

    // $(".block-1 .img").attr("src", "dist/images/solutions/solution-5.jpg");
    // $(".block-1 .zoom-ani").attr("src", "dist/images/solutions/solution-hover-5.jpg");
    // $(".block-1 h3").text("Powering HEALTHCARE");

    $(".block-1 .zoom-ani").fadeOut();
    $(".block-1 .img").fadeOut(300);
    $(".block-1 h3").fadeOut(300);
    setTimeout(function () {
      $(".block-1 .img").attr("src", "dist/images/solutions/solution-5.jpg");
      $(".block-1 .img").fadeIn(300);
      $(".block-1 h3").text("Powering HEALTHCARE");
      $(".block-1 h3").fadeIn(300);
    }, 300);
    setTimeout(function () {
      $(".block-1 .zoom-ani").fadeIn();
      $(".block-1 .zoom-ani").attr(
        "src",
        "dist/images/solutions/solution-hover-5.jpg"
      );
    }, 1000);

    $(".block-5 .img").attr("src", "dist/images/solutions/solution-1.jpg");
    $(".block-5 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $(".block-5 h3").text("Powering home");
  } else if ($("#solution-rotate-animation").hasClass("layout-5")) {
    $("#solution-rotate-animation").addClass("layout-6");
    $("#solution-rotate-animation").removeClass("layout-5");

    $(".block-5 .img").attr("src", "dist/images/solutions/solution-5.jpg");
    $(".block-5 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-5.jpg"
    );
    $(".block-5 h3").text("Powering HEALTHCARE");

    // $(".block-1 .img").attr("src", "dist/images/solutions/solution-6.jpg");
    // $(".block-1 .zoom-ani").attr("src", "dist/images/solutions/solution-hover-6.jpg");
    // $(".block-1 h3").text("Powering Telecom");

    $(".block-1 .zoom-ani").fadeOut();
    $(".block-1 .img").fadeOut(300);
    $(".block-1 h3").fadeOut(300);
    setTimeout(function () {
      $(".block-1 .img").attr("src", "dist/images/solutions/solution-6.jpg");
      $(".block-1 .img").fadeIn(300);
      $(".block-1 h3").text("Powering Telecom");
      $(".block-1 h3").fadeIn(300);
    }, 300);
    setTimeout(function () {
      $(".block-1 .zoom-ani").fadeIn();
      $(".block-1 .zoom-ani").attr(
        "src",
        "dist/images/solutions/solution-hover-6.jpg"
      );
    }, 1000);

    $(".block-6 .img").attr("src", "dist/images/solutions/solution-1.jpg");
    $(".block-6 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $(".block-6 h3").text("Powering home");
  } else if ($("#solution-rotate-animation").hasClass("layout-6")) {
    $("#solution-rotate-animation").addClass("layout-1");
    $("#solution-rotate-animation").removeClass("layout-6");

    $(".block-6 .img").attr("src", "dist/images/solutions/solution-6.jpg");
    $(".block-6 .zoom-ani").attr(
      "src",
      "dist/images/solutions/solution-hover-6.jpg"
    );
    $(".block-6 h3").text("Powering Telecom");

    // $(".block-1 .img").attr("src", "dist/images/solutions/solution-1.jpg");
    // $(".block-1 .zoom-ani").attr("src", "dist/images/solutions/solution-hover-1.jpg");
    // $(".block-1 h3").text("Powering home");

    $(".block-1 .zoom-ani").fadeOut();
    $(".block-1 .img").fadeOut(300);
    $(".block-1 h3").fadeOut(300);
    setTimeout(function () {
      $(".block-1 .img").attr("src", "dist/images/solutions/solution-1.jpg");
      $(".block-1 .img").fadeIn(300);
      $(".block-1 h3").text("Powering home");
      $(".block-1 h3").fadeIn(300);
    }, 300);
    setTimeout(function () {
      $(".block-1 .zoom-ani").fadeIn();
      $(".block-1 .zoom-ani").attr(
        "src",
        "dist/images/solutions/solution-hover-1.jpg"
      );
    }, 1000);
  }
}, 10000);

// setInterval(function () {
//     // ----- Solution D4 Rotate Animation ------
//     if($("#solution-rotate-animation-2").hasClass("layout-1")) {
//         $("#solution-rotate-animation-2").addClass("layout-2");
//         $("#solution-rotate-animation-2").removeClass("layout-1");

//         $("#solution-rotate-animation-2 .image-1").fadeOut(300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1 img").attr("src", "dist/images/solutions/solution-2.jpg");
//             $("#solution-rotate-animation-2 .image-1 h4").text("AGRICULTURE");
//         }, 300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1").fadeIn(300);
//         }, 400);

//         $("#solution-rotate-animation-2 .image-2 img").attr("src", "dist/images/solutions/solution-1.jpg");
//         $("#solution-rotate-animation-2 .image-2  h4").text("HOME");
//     } else if($("#solution-rotate-animation-2").hasClass("layout-2")) {
//         $("#solution-rotate-animation-2").addClass("layout-3");
//         $("#solution-rotate-animation-2").removeClass("layout-2");

//         $("#solution-rotate-animation-2 .image-1").fadeOut(300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1 img").attr("src", "dist/images/solutions/solution-3.jpg");
//             $("#solution-rotate-animation-2 .image-1 h4").text("EDUCATION");
//         }, 300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1").fadeIn(300);
//         }, 400);

//         $("#solution-rotate-animation-2 .image-2 img").attr("src", "dist/images/solutions/solution-2.jpg");
//         $("#solution-rotate-animation-2 .image-2  h4").text("AGRICULTURE");

//         $("#solution-rotate-animation-2 .image-3 img").attr("src", "dist/images/solutions/solution-1.jpg");
//         $("#solution-rotate-animation-2 .image-3  h4").text("HOME");
//     } else if($("#solution-rotate-animation-2").hasClass("layout-3")) {
//         $("#solution-rotate-animation-2").addClass("layout-4");
//         $("#solution-rotate-animation-2").removeClass("layout-3");

//         $("#solution-rotate-animation-2 .image-1").fadeOut(300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1 img").attr("src", "dist/images/solutions/solution-4.jpg");
//             $("#solution-rotate-animation-2 .image-1 h4").text("CORPORATES");
//         }, 300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1").fadeIn(300);
//         }, 400);

//         $("#solution-rotate-animation-2 .image-3 img").attr("src", "dist/images/solutions/solution-3.jpg");
//         $("#solution-rotate-animation-2 .image-3  h4").text("EDUCATION");

//         $("#solution-rotate-animation-2 .image-4 img").attr("src", "dist/images/solutions/solution-1.jpg");
//         $("#solution-rotate-animation-2 .image-4  h4").text("HOME");
//     } else if($("#solution-rotate-animation-2").hasClass("layout-4")) {
//         $("#solution-rotate-animation-2").addClass("layout-5");
//         $("#solution-rotate-animation-2").removeClass("layout-4");

//         $("#solution-rotate-animation-2 .image-1").fadeOut(300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1 img").attr("src", "dist/images/solutions/solution-5.jpg");
//             $("#solution-rotate-animation-2 .image-1 h4").text("HEALTHCARE");
//         }, 300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1").fadeIn(300);
//         }, 400);

//         $("#solution-rotate-animation-2 .image-4 img").attr("src", "dist/images/solutions/solution-4.jpg");
//         $("#solution-rotate-animation-2 .image-4  h4").text("CORPORATES");

//         $("#solution-rotate-animation-2 .image-5 img").attr("src", "dist/images/solutions/solution-1.jpg");
//         $("#solution-rotate-animation-2 .image-5  h4").text("HOME");
//     } else if($("#solution-rotate-animation-2").hasClass("layout-5")) {
//         $("#solution-rotate-animation-2").addClass("layout-6");
//         $("#solution-rotate-animation-2").removeClass("layout-5");

//         $("#solution-rotate-animation-2 .image-1").fadeOut(300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1 img").attr("src", "dist/images/solutions/solution-6.jpg");
//             $("#solution-rotate-animation-2 .image-1 h4").text("TELECOM");
//         }, 300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1").fadeIn(300);
//         }, 400);

//         $("#solution-rotate-animation-2 .image-5 img").attr("src", "dist/images/solutions/solution-5.jpg");
//         $("#solution-rotate-animation-2 .image-5  h4").text("HEALTHCARE");

//         $("#solution-rotate-animation-2 .image-6 img").attr("src", "dist/images/solutions/solution-1.jpg");
//         $("#solution-rotate-animation-2 .image-6  h4").text("HOME");
//     }  else if($("#solution-rotate-animation-2").hasClass("layout-6")) {
//         $("#solution-rotate-animation-2").addClass("layout-1");
//         $("#solution-rotate-animation-2").removeClass("layout-6");

//         $("#solution-rotate-animation-2 .image-1").fadeOut(300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1 img").attr("src", "dist/images/solutions/solution-1.jpg");
//             $("#solution-rotate-animation-2 .image-1 h4").text("HOME");
//         }, 300);
//         setTimeout(function(){
//             $("#solution-rotate-animation-2 .image-1").fadeIn(300);
//         }, 400);

//         $("#solution-rotate-animation-2 .image-6 img").attr("src", "dist/images/solutions/solution-6.jpg");
//         $("#solution-rotate-animation-2 .image-6  h4").text("TELECOM");

//         // $("#solution-rotate-animation-2 .image-6 img").attr("src", "dist/images/solutions/solution-1.jpg");
//         // $("#solution-rotate-animation-2 .image-6  h4").text("HOME");
//     }

//   }, 8000);

setInterval(function () {
  // ----- Solution D4 Rotate Animation ------
  if ($("#solution-rotate-animation-2").hasClass("layout-1")) {
    $("#solution-rotate-animation-2").addClass("layout-2");
    $("#solution-rotate-animation-2").removeClass("layout-1");

    $("#solution-rotate-animation-2 .image-1").fadeOut(300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1 .solu-hover").attr(
        "src",
        "dist/images/solutions/solution-hover-2.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 .solution-hover-img img").attr(
        "src",
        "dist/images/solutions/solution-2.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 h4").text("AGRICULTURE");
      // $(".solution-1-single-img").load(".solution-1-single-img");
    }, 300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1").fadeIn(300);
    }, 400);

    $("#solution-rotate-animation-2 .image-2 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-2 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-2  h4").text("HOME");
  } else if ($("#solution-rotate-animation-2").hasClass("layout-2")) {
    $("#solution-rotate-animation-2").addClass("layout-3");
    $("#solution-rotate-animation-2").removeClass("layout-2");

    $("#solution-rotate-animation-2 .image-1").fadeOut(300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1 .solu-hover").attr(
        "src",
        "dist/images/solutions/solution-hover-3.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 .solution-hover-img img").attr(
        "src",
        "dist/images/solutions/solution-3.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 h4").text("EDUCATION");
      // $(".solution-1-single-img").load(".solution-1-single-img");
    }, 300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1").fadeIn(300);
    }, 400);

    $("#solution-rotate-animation-2 .image-2 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-2.jpg"
    );
    $("#solution-rotate-animation-2 .image-2 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-2.jpg"
    );
    $("#solution-rotate-animation-2 .image-2  h4").text("AGRICULTURE");

    $("#solution-rotate-animation-2 .image-3 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-3 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-3  h4").text("HOME");
  } else if ($("#solution-rotate-animation-2").hasClass("layout-3")) {
    $("#solution-rotate-animation-2").addClass("layout-4");
    $("#solution-rotate-animation-2").removeClass("layout-3");

    $("#solution-rotate-animation-2 .image-1").fadeOut(300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1 .solu-hover").attr(
        "src",
        "dist/images/solutions/solution-hover-4.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 .solution-hover-img img").attr(
        "src",
        "dist/images/solutions/solution-4.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 h4").text("CORPORATES");
      // $(".solution-1-single-img").load(".solution-1-single-img");
    }, 300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1").fadeIn(300);
    }, 400);

    $("#solution-rotate-animation-2 .image-3 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-3.jpg"
    );
    $("#solution-rotate-animation-2 .image-3 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-3.jpg"
    );
    $("#solution-rotate-animation-2 .image-3  h4").text("EDUCATION");

    $("#solution-rotate-animation-2 .image-4 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-4 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-4  h4").text("HOME");
  } else if ($("#solution-rotate-animation-2").hasClass("layout-4")) {
    $("#solution-rotate-animation-2").addClass("layout-5");
    $("#solution-rotate-animation-2").removeClass("layout-4");

    $("#solution-rotate-animation-2 .image-1").fadeOut(300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1 .solu-hover").attr(
        "src",
        "dist/images/solutions/solution-hover-5.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 .solution-hover-img img").attr(
        "src",
        "dist/images/solutions/solution-5.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 h4").text("HEALTHCARE");
      // $(".solution-1-single-img").load(".solution-1-single-img");
    }, 300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1").fadeIn(300);
    }, 400);

    $("#solution-rotate-animation-2 .image-4 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-4.jpg"
    );
    $("#solution-rotate-animation-2 .image-4 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-4.jpg"
    );
    $("#solution-rotate-animation-2 .image-4  h4").text("CORPORATES");

    $("#solution-rotate-animation-2 .image-5 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-5 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-5  h4").text("HOME");
  } else if ($("#solution-rotate-animation-2").hasClass("layout-5")) {
    $("#solution-rotate-animation-2").addClass("layout-6");
    $("#solution-rotate-animation-2").removeClass("layout-5");

    $("#solution-rotate-animation-2 .image-1").fadeOut(300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1 .solu-hover").attr(
        "src",
        "dist/images/solutions/solution-hover-6.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 .solution-hover-img img").attr(
        "src",
        "dist/images/solutions/solution-6.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 h4").text("TELECOM");
      // $(".solution-1-single-img").load(".solution-1-single-img");
    }, 300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1").fadeIn(300);
    }, 400);

    $("#solution-rotate-animation-2 .image-5 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-5.jpg"
    );
    $("#solution-rotate-animation-2 .image-5 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-5.jpg"
    );
    $("#solution-rotate-animation-2 .image-5  h4").text("HEALTHCARE");

    $("#solution-rotate-animation-2 .image-6 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-6 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-1.jpg"
    );
    $("#solution-rotate-animation-2 .image-6  h4").text("HOME");
  } else if ($("#solution-rotate-animation-2").hasClass("layout-6")) {
    $("#solution-rotate-animation-2").addClass("layout-1");
    $("#solution-rotate-animation-2").removeClass("layout-6");

    $("#solution-rotate-animation-2 .image-1").fadeOut(300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1 .solu-hover").attr(
        "src",
        "dist/images/solutions/solution-hover-1.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 .solution-hover-img img").attr(
        "src",
        "dist/images/solutions/solution-1.jpg"
      );
      $("#solution-rotate-animation-2 .image-1 h4").text("HOME");
      // $(".solution-1-single-img").load(".solution-1-single-img");
    }, 300);
    setTimeout(function () {
      $("#solution-rotate-animation-2 .image-1").fadeIn(300);
    }, 400);

    $("#solution-rotate-animation-2 .image-6 .solu-hover").attr(
      "src",
      "dist/images/solutions/solution-hover-6.jpg"
    );
    $("#solution-rotate-animation-2 .image-6 .solution-hover-img img").attr(
      "src",
      "dist/images/solutions/solution-6.jpg"
    );
    $("#solution-rotate-animation-2 .image-6  h4").text("TELECOM");

    // $("#solution-rotate-animation-2 .image-6 img").attr("src", "dist/images/solutions/solution-1.jpg");
    // $("#solution-rotate-animation-2 .image-6  h4").text("HOME");
  }
}, 10000);

setInterval(function () {
  if ($(".solution-7 .solution-bg-main ").hasClass("layout-1")) {
    $(".solution-7 .solution-bg-main ").addClass("layout-2");
    $(".solution-7 .solution-bg-main").removeClass("layout-1");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-2.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("EDUCATION");
    $(".solution-7 .solution-bg-main .count").text("02");
    $(".onSolutionDetail").hide();
    $(".onGotoSolution02").show();
  } else if ($(".solution-7 .solution-bg-main ").hasClass("layout-2")) {
    $(".solution-7 .solution-bg-main").addClass("layout-3");
    $(".solution-7 .solution-bg-main").removeClass("layout-2");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-3.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("AGRICULTURE");
    $(".solution-7 .solution-bg-main .count").text("03");
    $(".onSolutionDetail").hide();
    $(".onGotoSolution03").show();
  } else if ($(".solution-7 .solution-bg-main ").hasClass("layout-3")) {
    $(".solution-7 .solution-bg-main ").addClass("layout-4");
    $(".solution-7 .solution-bg-main ").removeClass("layout-3");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-4.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("CORPORATES");
    $(".solution-7 .solution-bg-main .count").text("04");
    $(".onSolutionDetail").hide();
    $(".onGotoSolution04").show();
  } else if ($(".solution-7 .solution-bg-main ").hasClass("layout-4")) {
    $(".solution-7 .solution-bg-main").addClass("layout-5");
    $(".solution-7 .solution-bg-main ").removeClass("layout-4");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-5.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("TELECOM");
    $(".solution-7 .solution-bg-main .count").text("05");
    $(".onSolutionDetail").hide();
    $(".onGotoSolution05").show();
  } else if ($(".solution-7 .solution-bg-main ").hasClass("layout-5")) {
    $(".solution-7 .solution-bg-main").addClass("layout-6");
    $(".solution-7 .solution-bg-main ").removeClass("layout-5");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-6.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("HOME");
    $(".solution-7 .solution-bg-main .count").text("06");
    $(".onSolutionDetail").hide();
    $(".onGotoSolution06").show();
  } else if ($(".solution-7 .solution-bg-main ").hasClass("layout-6")) {
    $(".solution-7 .solution-bg-main ").addClass("layout-1");
    $(".solution-7 .solution-bg-main ").removeClass("layout-6");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-1.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("HEALTHCARE");
    $(".solution-7 .solution-bg-main .count").text("01");
    $(".onSolutionDetail").hide();
    $(".onGotoSolution01").show();
  }
}, 10000);

$(document).ready(function () {

  $(".header-accordion").click(function(){
    if($(this).hasClass("active")){
      $(this).removeClass("active");
      $(".headingOneView").removeClass("show")
    } else{
      $(this).addClass("active");
      $(".headingOneView").addClass("show")
    }
  });

  $(".sub-tab-title").click(function(){
  
    var clientParnetSubTabId = $(this).attr("id");
    $(".sub-tab-title, .sub-tab-detail").removeClass("active");
    $("."+clientParnetSubTabId+"-view").addClass("active");
    $(this).addClass("active");
    // console.log("."+clientParnetSubTabId+"-view")
  });

  $("#service-1-tab-1, #service-1-tab-2").click(function(){
    $("#map").addClass("show");
    $("#faq").removeClass("show");
  });
  $("#service-1-tab-3").click(function(){
    $("#map").removeClass("show");
    $("#faq").addClass("show");
  });

  $(".faq-item").click(function(){
    $(".faq-item").removeClass("active");
    $(this).addClass("active");
  });

  $(".partner-form-tab li").click(function(){
    var partnerId = $(this).attr("id");
    // console.log(partnerId);
    if($(this).hasClass("enable")){
      $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
      $(this).addClass("active");
      $("."+partnerId+"-view").addClass("active");
    }
  });

  $(".onGotoStakeholdersDetails").click(function(){
    $("#tab-2").removeClass("disable");
    $("#tab-2").addClass("enable");
    $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
    $("#tab-2, .tab-2-view").addClass("active");
  });

  $(".onGotoBusinessDetails").click(function(){
    $("#tab-3").removeClass("disable");
    $("#tab-3").addClass("enable");
    $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
    $("#tab-3, .tab-3-view").addClass("active");
  });

  $(".onBacktoCompanyDetails").click(function(){
    $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
    $("#tab-1, .tab-1-view").addClass("active");
  });

  $(".onBacktoStakeholdersDetails").click(function(){
    $(".partner-form-tab li, .partner-form-tab-detail").removeClass("active");
    $("#tab-2, .tab-2-view").addClass("active");
  });

  var txt= $(".data01detail").text();
  $(".data01detail").text(txt.substring(0, 30) + '...');

  $(".onShowData").click(function(){
    var showDataID = $(this).attr("id");
    if($(this).hasClass("active")){
      $("#"+showDataID).removeClass("active");
      $("."+showDataID+"detail").removeClass("show");
      $("."+showDataID+"detail").text(txt.substring(0, 30) + '...');
      // console.log(showDataID);
    }else{      
      $("#"+showDataID).addClass("active");
      $("."+showDataID+"detail").addClass("show");
      $("."+showDataID+"detail").text(txt.substring(0, txt.length));
      // console.log(showDataID);
    }
    
  });





  var elementToHighlight = $(".home-fixed-nav-bar");

  $(window).scroll(function () {
    // console.log("scroll");
    var scrollPositionToTrigger = 400; // Adjust this value as needed

    if ($(this).scrollTop() > scrollPositionToTrigger) {
      // console.log("scroll123");
      elementToHighlight.addClass("highlight");
    } else {
      // console.log("scrol456");
      elementToHighlight.removeClass("highlight");
    }
  });

  $(".onMaxMin").click(function () {
    if ($(this).hasClass("activeMax")) {
      $(this).removeClass("activeMax");
      $(this).attr("src", "dist/images/maximize-icon.png");
      $(".contact-form").removeClass("maximize-form");
    } else {
      $(this).addClass("activeMax");
      $(this).attr("src", "dist/images/minimize-icon.png");
      $(".contact-form").addClass("maximize-form");
    }
  });

  // $('.carousel').carousel({
  //     interval: false,
  // });

  // $(".select2").select2();
  // $("#DashboardPositionDropdown").select2({ dropdownCssClass: "dashboardpositionoption" });
  $(".mob-chart-product .canvasjs-chart-canvas").css({
    width: "100%",
    height: "300px",
  });
  $(".mob-chart-product").css({ width: "100%", height: "300px" });
  $(".ongotonextsection").click(function () {
    $("html, .wrapper").animate(
      {
        scrollTop: $("#cleansec").offset().top,
      },
      500
    );
  });

  $(".grn-nav").click(function () {
    // console.log("Hi");
    $(".sm-sec").addClass("hide-sm");
  });

  $(".nav-close-dsn .btn-close").click(function () {
    $(".sm-sec").removeClass("hide-sm");
  });

  $(".offcanvas .nav-link").click(function () {
    $(".offcanvas, .offcanvas-backdrop").removeClass("show");
    setTimeout(function () {
      history.replaceState(
        "",
        document.title,
        window.location.origin +
          window.location.pathname +
          window.location.search
      );
    }, 5);
  });

  $(".banner_img_sec").hover(function () {
    $(".banner_img_sec").removeClass("active");
    $(this).addClass("active");
  });

  $(".service-v1-dsn").hover(function () {
    $(".service-v1-dsn").removeClass("active");
    $(this).addClass("active");
  });

  $(".ul-sm-link a").hover(
    function () {
      $(this).find(".link").hide();
      $(this).find(".hover").show();
    },
    function () {
      $(this).find(".link").show();
      $(this).find(".hover").hide();
    }
  );

  $(".solution-4-single-img").hover(function () {
    var soluImg = $(this).find("img").attr("src");
    $(".solution-4").attr(
      "style",
      "background: url('" +
        soluImg +
        "') no-repeat center;background-size: cover;"
    );
    var soluTitle = $(this).find("h4").text();
    $(".onSoluTitle").text(soluTitle);
    var soluPara = $(this).find(".d-none").text();
    $(".onSoluPara").text(soluPara);
    // console.log(soluTitle);
  });

  // Product page
  $(".product-sec .tab-1").click(function () {
    $(".product-sec li").removeClass("active");
    $(this).addClass("active");
    $(".tab-details").removeClass("active");
    $(".tab-1-view").addClass("active");
    //$('#fixed-top .navbar-brand img').attr("src", "dist/images/products/sunshine-logo.png");
  });

  $(".product-sec .tab-2").click(function () {
    $(".product-sec li").removeClass("active");
    $(this).addClass("active");
    $(".tab-details").removeClass("active");
    $(".tab-2-view").addClass("active");
    //$('#fixed-top .navbar-brand img').attr("src", "dist/images/products/empower-logo.png");
  });

  $(".product-sec .tab-3").click(function () {
    $(".product-sec li").removeClass("active");
    $(this).addClass("active");
    $(".tab-details").removeClass("active");
    $(".tab-3-view").addClass("active");
    //$('#fixed-top .navbar-brand img').attr("src", "dist/images/products/sun-smart-logo.png");
  });

  $("#productSunshineCarousel").on("slide.bs.carousel", function (e) {
    $("#productSunshineCarouselTwo").carousel(e.to);
  });

  $("#productSmartCarousel").on("slide.bs.carousel", function (e) {
    $("#productSmartCarouselTwo").carousel(e.to);
  });

  $("#productEmpawaCarousel").on("slide.bs.carousel", function (e) {
    $("#productEmpawaCarouselTwo").carousel(e.to);
  });

  $(".productImg, .productImgTwo").carousel({
    interval: 2000,
  });

  $(".productImg, .productImgTwo").carousel("pause");

  $(".productImg, .productImgTwo").hover(function () {
    $(".productImg, .productImgTwo").carousel("pause");
  });

  $(".productImg, .productImgTwo").mouseleave(function () {
    $(".productImg, .productImgTwo").carousel("cycle");
  });

  //
  $(".onProductSunshine01").click(function () {
    $(".product-sunshine-details-01").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-01").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  $(".backToProductSunshine").click(function () {
    $(".product-sunshine-detail-show").addClass("d-none");
    $(".product-sunshine-details-title").removeClass(
      "product-sunshine-detail-show"
    );
    $(".sunshine-slider02 , .sunshine-slider03").removeClass("d-none");
    $(".product-sunshine-info").removeClass("d-none");
    $(".backToProductSunshine").addClass("d-none");
  });

  //   $('.productgrpSunshine01 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine01').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  // 2.3
  $(".onProductSunshine02").click(function () {
    $(".product-sunshine-details-02").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-02").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  //   $('.productgrpSunshine02 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine02').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  $(".onProductSunshine03").click(function () {
    $(".product-sunshine-details-03").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-03").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  //   $('.productgrpSunshine03 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine03').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  //   $('.backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine03').removeClass('d-none');
  //     $(this).addClass('d-none');
  //   });

  $(".onProductSunshine04").click(function () {
    $(".product-sunshine-details-04").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-04").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  //   $('.productgrpSunshine04 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine04').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  //   $('.backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine04').removeClass('d-none');
  //     $(this).addClass('d-none');
  //   });

  $(".onProductSunshine05").click(function () {
    $(".product-sunshine-details-05").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-05").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  //   $('.productgrpSunshine05 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine05').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  //   $('.backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine05').removeClass('d-none');
  //     $(this).addClass('d-none');
  //   });

  $(".onProductSunshine06").click(function () {
    $(".product-sunshine-details-06").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-06").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  //   $('.productgrpSunshine06 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine06').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  //   $('.backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine06').removeClass('d-none');
  //     $(this).addClass('d-none');
  //   });

  $(".onProductSunshine07").click(function () {
    $(".product-sunshine-details-07").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-07").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  //   $('.productgrpSunshine07 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine07').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  //   $('.backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine07').removeClass('d-none');
  //     $(this).addClass('d-none');
  //   });

  $(".onProductSunshine08").click(function () {
    $(".product-sunshine-details-08").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-08").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductSunshine09").click(function () {
    $(".product-sunshine-details-09").removeClass("d-none");
    $(".sunshine-slider02 , .sunshine-slider03").addClass("d-none");
    $(".backToProductSunshine").removeClass("d-none");
    $(".product-sunshine-details-09").addClass("product-sunshine-detail-show");
    $(this).addClass("d-none");
  });

  //   $('.productgrpSunshine08 .backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.product-sunshine-details-title').removeClass('product-sunshine-detail-show');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine08').removeClass('d-none');
  //     $('.backToProductSunshine').addClass('d-none');
  //   });

  //   $('.backToProductSunshine').click(function () {
  //     $('.product-sunshine-detail-show').addClass('d-none');
  //     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
  //     $('.onProductSunshine08').removeClass('d-none');
  //     $(this).addClass('d-none');
  //   });

  setInterval(function () {
    //Product details click event
    if ($(".sunshine01").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      // console.log("1");
      $(".productgrpSunshine01").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-01").removeClass("d-none");
        $(".product-sunshine-details-01").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine02").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      // console.log("2");
      $(".productgrpSunshine02").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-02").removeClass("d-none");
        $(".product-sunshine-details-02").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine03").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      // console.log("3");
      $(".productgrpSunshine03").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-03").removeClass("d-none");
        $(".product-sunshine-details-03").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine04").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      // console.log("4");
      $(".productgrpSunshine04").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-04").removeClass("d-none");
        $(".product-sunshine-details-04").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine05").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      $(".productgrpSunshine05").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-05").removeClass("d-none");
        $(".product-sunshine-details-05").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine06").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      $(".productgrpSunshine06").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-06").removeClass("d-none");
        $(".product-sunshine-details-06").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine07").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      $(".productgrpSunshine07").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-07").removeClass("d-none");
        $(".product-sunshine-details-07").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine08").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      $(".productgrpSunshine08").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-08").removeClass("d-none");
        $(".product-sunshine-details-08").addClass(
          "product-sunshine-detail-show"
        );
      }
    } else if ($(".sunshine09").hasClass("active")) {
      $(".prosunshinegrp").addClass("d-none");
      $(".productgrpSunshine09").removeClass("d-none");
      if (
        $(".product-sunshine-details-title").hasClass(
          "product-sunshine-detail-show"
        )
      ) {
        $(".product-sunshine-details-title").addClass("d-none");
        $(".product-sunshine-details-title").removeClass(
          "product-sunshine-detail-show"
        );
        $(".product-sunshine-details-09").removeClass("d-none");
        $(".product-sunshine-details-09").addClass(
          "product-sunshine-detail-show"
        );
      }
    }
  }, 500);

  //   setInterval(function () {
  //     //Product details click event
  //     if($(".sunshine01").hasClass("active")) {
  //         console.log("1");
  //     } else if($(".sunshine02").hasClass("active")) {
  //         console.log("2");
  //     } else if($(".sunshine03").hasClass("active")) {
  //         console.log("3");
  //     } else if($(".sunshine04").hasClass("active")) {
  //         console.log("4");
  //     } else if($(".sunshine05").hasClass("active")) {
  //         console.log("5");
  //     } else if($(".sunshine06").hasClass("active")) {
  //         console.log("6");
  //     } else if($(".sunshine07").hasClass("active")) {
  //         console.log("7");
  //     } else if($(".sunshine08").hasClass("active")) {
  //         console.log("8");
  //     }

  //   }, 1000);

  // Smart
  $(".onProductsunsmart01").click(function () {
    $(".product-sunsmart-details-01").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-01").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart02").click(function () {
    $(".product-sunsmart-details-02").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-02").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart03").click(function () {
    $(".product-sunsmart-details-03").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-03").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart04").click(function () {
    $(".product-sunsmart-details-04").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-04").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart05").click(function () {
    $(".product-sunsmart-details-05").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-05").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart06").click(function () {
    $(".product-sunsmart-details-06").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-06").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart07").click(function () {
    $(".product-sunsmart-details-07").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-07").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart08").click(function () {
    $(".product-sunsmart-details-08").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-08").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".onProductsunsmart09").click(function () {
    $(".product-sunsmart-details-09").removeClass("d-none");
    $(".sunsmart-slider02 , .sunsmart-slider03").addClass("d-none");
    $(".backToProductsunsmart").removeClass("d-none");
    $(".product-sunsmart-details-09").addClass("product-sunsmart-detail-show");
    $(this).addClass("d-none");
  });

  $(".backToProductsunsmart").click(function () {
    $(".product-sunsmart-detail-show").addClass("d-none");
    $(".product-sunsmart-details-title").removeClass(
      "product-sunsmart-detail-show"
    );
    $(".sunsmart-slider02 , .sunsmart-slider03").removeClass("d-none");
    $(".product-sunsmart-info").removeClass("d-none");
    $(".backToProductsunsmart").addClass("d-none");
  });

  setInterval(function () {
    //Product details click event
    if ($(".sunsmart01").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      // console.log("1");
      $(".productgrpsunsmart01").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-01").removeClass("d-none");
        $(".product-sunsmart-details-01").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart02").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      // console.log("2");
      $(".productgrpsunsmart02").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-02").removeClass("d-none");
        $(".product-sunsmart-details-02").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart03").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      // console.log("3");
      $(".productgrpsunsmart03").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-03").removeClass("d-none");
        $(".product-sunsmart-details-03").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart04").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      // console.log("4");
      $(".productgrpsunsmart04").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-04").removeClass("d-none");
        $(".product-sunsmart-details-04").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart05").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      $(".productgrpsunsmart05").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-05").removeClass("d-none");
        $(".product-sunsmart-details-05").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart06").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      $(".productgrpsunsmart06").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-06").removeClass("d-none");
        $(".product-sunsmart-details-06").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart07").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      $(".productgrpsunsmart07").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-07").removeClass("d-none");
        $(".product-sunsmart-details-07").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart08").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      $(".productgrpsunsmart08").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-08").removeClass("d-none");
        $(".product-sunsmart-details-08").addClass(
          "product-sunsmart-detail-show"
        );
      }
    } else if ($(".sunsmart09").hasClass("active")) {
      $(".prosunsmartgrp").addClass("d-none");
      $(".productgrpsunsmart09").removeClass("d-none");
      if (
        $(".product-sunsmart-details-title").hasClass(
          "product-sunsmart-detail-show"
        )
      ) {
        $(".product-sunsmart-details-title").addClass("d-none");
        $(".product-sunsmart-details-title").removeClass(
          "product-sunsmart-detail-show"
        );
        $(".product-sunsmart-details-09").removeClass("d-none");
        $(".product-sunsmart-details-09").addClass(
          "product-sunsmart-detail-show"
        );
      }
    }
  }, 500);

  //Sun Empawa
  $(".onProductSunempawa01").click(function () {
    $(".product-sunempawa-details-01").removeClass("d-none");
    $(".sunempawa-slider02 , .sunempawa-slider03").addClass("d-none");
    $(".backToProductSunempawa").removeClass("d-none");
    $(".product-sunempawa-details-01").addClass(
      "product-sunempawa-detail-show"
    );
    $(this).addClass("d-none");
  });

  $(".onProductSunempawa02").click(function () {
    $(".product-sunempawa-details-02").removeClass("d-none");
    $(".sunempawa-slider02 , .sunempawa-slider03").addClass("d-none");
    $(".backToProductSunempawa").removeClass("d-none");
    $(".product-sunempawa-details-02").addClass(
      "product-sunempawa-detail-show"
    );
    $(this).addClass("d-none");
  });
  $(".onProductSunempawa03").click(function () {
    $(".product-sunempawa-details-03").removeClass("d-none");
    $(".sunempawa-slider02 , .sunempawa-slider03").addClass("d-none");
    $(".backToProductSunempawa").removeClass("d-none");
    $(".product-sunempawa-details-03").addClass(
      "product-sunempawa-detail-show"
    );
    $(this).addClass("d-none");
  });
  $(".onProductSunempawa04").click(function () {
    $(".product-sunempawa-details-04").removeClass("d-none");
    $(".sunempawa-slider02 , .sunempawa-slider03").addClass("d-none");
    $(".backToProductSunempawa").removeClass("d-none");
    $(".product-sunempawa-details-04").addClass(
      "product-sunempawa-detail-show"
    );
    $(this).addClass("d-none");
  });
  $(".onProductSunempawa05").click(function () {
    $(".product-sunempawa-details-05").removeClass("d-none");
    $(".sunempawa-slider02 , .sunempawa-slider03").addClass("d-none");
    $(".backToProductSunempawa").removeClass("d-none");
    $(".product-sunempawa-details-05").addClass(
      "product-sunempawa-detail-show"
    );
    $(this).addClass("d-none");
  });
  $(".onProductSunempawa06").click(function () {
    $(".product-sunempawa-details-06").removeClass("d-none");
    $(".sunempawa-slider02 , .sunempawa-slider03").addClass("d-none");
    $(".backToProductSunempawa").removeClass("d-none");
    $(".product-sunempawa-details-06").addClass(
      "product-sunempawa-detail-show"
    );
    $(this).addClass("d-none");
  });

  $(".backToProductSunempawa").click(function () {
    $(".product-sunempawa-detail-show").addClass("d-none");
    $(".product-sunempawa-details-title").removeClass(
      "product-sunempawa-detail-show"
    );
    $(".sunempawa-slider02 , .sunempawa-slider03").removeClass("d-none");
    $(".product-sunempawa-info").removeClass("d-none");
    $(".backToProductSunempawa").addClass("d-none");
  });

  setInterval(function () {
    //Product details click event
    if ($(".sunempawa01").hasClass("active")) {
      $(".prosunempawagrp").addClass("d-none");
      // console.log("1");
      $(".productgrpsunempawa01").removeClass("d-none");
      if (
        $(".product-sunempawa-details-title").hasClass(
          "product-sunempawa-detail-show"
        )
      ) {
        $(".product-sunempawa-details-title").addClass("d-none");
        $(".product-sunempawa-details-title").removeClass(
          "product-sunempawa-detail-show"
        );
        $(".product-sunempawa-details-01").removeClass("d-none");
        $(".product-sunempawa-details-01").addClass(
          "product-sunempawa-detail-show"
        );
      }
    } else if ($(".sunempawa02").hasClass("active")) {
      $(".prosunempawagrp").addClass("d-none");
      // console.log("2");
      $(".productgrpsunempawa02").removeClass("d-none");
      if (
        $(".product-sunempawa-details-title").hasClass(
          "product-sunempawa-detail-show"
        )
      ) {
        $(".product-sunempawa-details-title").addClass("d-none");
        $(".product-sunempawa-details-title").removeClass(
          "product-sunempawa-detail-show"
        );
        $(".product-sunempawa-details-02").removeClass("d-none");
        $(".product-sunempawa-details-02").addClass(
          "product-sunempawa-detail-show"
        );
      }
    } else if ($(".sunempawa03").hasClass("active")) {
      $(".prosunempawagrp").addClass("d-none");
      // console.log("3");
      $(".productgrpsunempawa03").removeClass("d-none");
      if (
        $(".product-sunempawa-details-title").hasClass(
          "product-sunempawa-detail-show"
        )
      ) {
        $(".product-sunempawa-details-title").addClass("d-none");
        $(".product-sunempawa-details-title").removeClass(
          "product-sunempawa-detail-show"
        );
        $(".product-sunempawa-details-03").removeClass("d-none");
        $(".product-sunempawa-details-03").addClass(
          "product-sunempawa-detail-show"
        );
      }
    } else if ($(".sunempawa04").hasClass("active")) {
      $(".prosunempawagrp").addClass("d-none");
      // console.log("4");
      $(".productgrpsunempawa04").removeClass("d-none");
      if (
        $(".product-sunempawa-details-title").hasClass(
          "product-sunempawa-detail-show"
        )
      ) {
        $(".product-sunempawa-details-title").addClass("d-none");
        $(".product-sunempawa-details-title").removeClass(
          "product-sunempawa-detail-show"
        );
        $(".product-sunempawa-details-04").removeClass("d-none");
        $(".product-sunempawa-details-04").addClass(
          "product-sunempawa-detail-show"
        );
      }
    } else if ($(".sunempawa05").hasClass("active")) {
      $(".prosunempawagrp").addClass("d-none");
      $(".productgrpsunempawa05").removeClass("d-none");
      if (
        $(".product-sunempawa-details-title").hasClass(
          "product-sunempawa-detail-show"
        )
      ) {
        $(".product-sunempawa-details-title").addClass("d-none");
        $(".product-sunempawa-details-title").removeClass(
          "product-sunempawa-detail-show"
        );
        $(".product-sunempawa-details-05").removeClass("d-none");
        $(".product-sunempawa-details-05").addClass(
          "product-sunempawa-detail-show"
        );
      }
    } else if ($(".sunempawa06").hasClass("active")) {
      $(".prosunempawagrp").addClass("d-none");
      $(".productgrpsunempawa06").removeClass("d-none");
      if (
        $(".product-sunempawa-details-title").hasClass(
          "product-sunempawa-detail-show"
        )
      ) {
        $(".product-sunempawa-details-title").addClass("d-none");
        $(".product-sunempawa-details-title").removeClass(
          "product-sunempawa-detail-show"
        );
        $(".product-sunempawa-details-06").removeClass("d-none");
        $(".product-sunempawa-details-06").addClass(
          "product-sunempawa-detail-show"
        );
      }
    }
  }, 500);

  // Service
  $("#ServiceSevenImgTwoCarousal").on("slide.bs.carousel", function (e) {
    $("#ServiceSevenImgCarousal, #ServiceSevenTitleCarousal").carousel(e.to);
  });

  $(".ServiceSevenCategory button").click(function () {
    $(".ServiceSevenCategory button").removeClass("active");
    $(this).addClass("active");
    $(".ServiceSevenCategory button img").attr(
      "src",
      "dist/images/services/d7/arrow_right_blk.png"
    );
    $(this)
      .children("img")
      .attr("src", "dist/images/services/d7/arrow_right_grn.png");
    if ($(this).hasClass("onSlideService01")) {
      $(".service-arrow").removeClass(
        "onService01  onService02  onService03 onService04"
      );
      $(".service-arrow").addClass("onService01");
    } else if ($(this).hasClass("onSlideService02")) {
      $(".service-arrow").removeClass(
        "onService01 onService02  onService03  onService04"
      );
      $(".service-arrow").addClass("onService02");
    } else if ($(this).hasClass("onSlideService03")) {
      $(".service-arrow").removeClass(
        "onService01  onService02  onService03  onService04"
      );
      $(".service-arrow").addClass("onService03");
    } else if ($(this).hasClass("onSlideService04")) {
      $(".service-arrow").removeClass(
        "onService01  onService02  onService03  onService04"
      );
      $(".service-arrow").addClass("onService04");
    }
  });

  $(".service-arrow").click(function () {
    $(
      ".mainService, .single-service-main-title, .single-service-details"
    ).removeClass("show");
    $(".tab-service button").removeClass("active");
    $(".service-detail").addClass("show");
    if ($(".mainService").css("display") === "flex") {
      $(".mainService").css("display", "none");
      // $("..mainService").css("display", "none");
    }

    if ($(this).hasClass("onService01")) {
      $(
        ".single-service-details.service-1, .single-service-main-title.service-1 "
      ).addClass("show");
      $(".tab-service .service-1").addClass("active");
      if ($(".service-detail ").css("display") === "none") {
        $(".service-detail ").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
    } else if ($(this).hasClass("onService02")) {
      $(
        ".single-service-details.service-2, .single-service-main-title.service-2 "
      ).addClass("show");
      $(".tab-service .service-2").addClass("active");
      if ($(".service-detail ").css("display") === "none") {
        $(".service-detail ").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
    } else if ($(this).hasClass("onService03")) {
      $(
        ".single-service-details.service-3, .single-service-main-title.service-3 "
      ).addClass("show");
      $(".tab-service .service-3").addClass("active");
      if ($(".service-detail ").css("display") === "none") {
        $(".service-detail ").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
    } else if ($(this).hasClass("onService04")) {
      $(
        ".single-service-details.service-4, .single-service-main-title.service-4 "
      ).addClass("show");
      $(".tab-service .service-4").addClass("active");
      if ($(".service-detail ").css("display") === "none") {
        $(".service-detail ").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
    }
  });
  $(".service-arrow-back").click(function () {
    $(".service-detail").removeClass("show");
    $(".mainService").addClass("show");
    $(
      "#ServiceSevenTitleCarousal .carousel-item, #ServiceSevenImgCarousal  .carousel-item, #ServiceSevenImgTwoCarousal .carousel-item, .ServiceSevenCategory button"
    ).removeClass("active");

    if ($(this).hasClass("backToService01")) {
      $(
        "#ServiceSevenTitleCarousal .item-1, #ServiceSevenImgCarousal  .item-1, #ServiceSevenImgTwoCarousal .item-1, .ServiceSevenCategory .onSlideService01"
      ).addClass("active");
      if ($(".mainService").css("display") === "none") {
        $(".mainService").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
      if ($(".service-detail ").css("display") === "flex") {
        $(".service-detail ").css("display", "none");
        // $("..mainService").css("display", "none");
      }
    } else if ($(this).hasClass("backToService02")) {
      $(
        "#ServiceSevenTitleCarousal .item-2, #ServiceSevenImgCarousal  .item-2, #ServiceSevenImgTwoCarousal .item-2, .ServiceSevenCategory .onSlideService02"
      ).addClass("active");
      if ($(".mainService").css("display") === "none") {
        $(".mainService").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
      if ($(".service-detail ").css("display") === "flex") {
        $(".service-detail ").css("display", "none");
        // $("..mainService").css("display", "none");
      }
    } else if ($(this).hasClass("backToService03")) {
      $(
        "#ServiceSevenTitleCarousal .item-3, #ServiceSevenImgCarousal  .item-3, #ServiceSevenImgTwoCarousal .item-3, .ServiceSevenCategory .onSlideService03"
      ).addClass("active");
      if ($(".mainService").css("display") === "none") {
        $(".mainService").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
      if ($(".service-detail ").css("display") === "flex") {
        $(".service-detail ").css("display", "none");
        // $("..mainService").css("display", "none");
      }
    } else if ($(this).hasClass("backToService04")) {
      $(
        "#ServiceSevenTitleCarousal .item-4, #ServiceSevenImgCarousal  .item-4, #ServiceSevenImgTwoCarousal .item-4, .ServiceSevenCategory .onSlideService04"
      ).addClass("active");
      if ($(".mainService").css("display") === "none") {
        $(".mainService").css("display", "flex");
        // $("..mainService").css("display", "none");
      }
      if ($(".service-detail ").css("display") === "flex") {
        $(".service-detail ").css("display", "none");
        // $("..mainService").css("display", "none");
      }
    }
  });

  $("#servicesec .carousel").carousel({
    interval: false,
  });

  $(".tab-service button").click(function () {
    $(".single-service-details, .single-service-main-title").removeClass(
      "show"
    );
    $(".tab-service button").removeClass("active");
    $(".service-arrow-back").removeClass("active");

    if ($(this).hasClass("service-1")) {
      $(
        ".single-service-details.service-1, .single-service-main-title.service-1"
      ).addClass("show");
      $(".tab-service button.service-1").addClass("active");
    } else if ($(this).hasClass("service-2")) {
      $(
        ".single-service-details.service-2, .single-service-main-title.service-2"
      ).addClass("show");
      $(".tab-service button.service-2").addClass("active");
    } else if ($(this).hasClass("service-3")) {
      $(
        ".single-service-details.service-3, .single-service-main-title.service-3"
      ).addClass("show");
      $(".tab-service button.service-3").addClass("active");
    } else if ($(this).hasClass("service-4")) {
      $(
        ".single-service-details.service-4, .single-service-main-title.service-4"
      ).addClass("show");
      $(".tab-service button.service-4").addClass("active");
    }
    // console.log('hover');
  });

  $(".service-1 .service-item").hover(function () {
    if ($(this).hasClass("item-1")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-1.png"
      );
    } else if ($(this).hasClass("item-2")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-2.png"
      );
    } else if ($(this).hasClass("item-3")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-3.png"
      );
    } else if ($(this).hasClass("item-4")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-4.png"
      );
    } else if ($(this).hasClass("item-5")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-5.png"
      );
    }
    // console.log('hover');
  });

  $(".service-1 .service-item").mouseleave(function () {
    $(".engineering-img img").attr(
      "src",
      "dist/images/services/d7/02Jun_Artboard_1.png"
    );
  });

  $(".service-2 .service-item").hover(function () {
    if ($(this).hasClass("item-1")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/procurement_details_page_images/item-1.jpg"
      );
    }
  });

  $(".service-2 .service-item").mouseleave(function () {
    $(".engineering-img img").attr(
      "src",
      "dist/images/services/d7/02Jun_Artboard_2.png"
    );
  });

  $(".service-3 .service-item").hover(function () {
    if ($(this).hasClass("item-1")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/construction_details_page_images/item-1.jpg"
      );
    } else if ($(this).hasClass("item-2")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/construction_details_page_images/item-2.jpg"
      );
    } else if ($(this).hasClass("item-3")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/construction_details_page_images/item-3.jpg"
      );
    } else if ($(this).hasClass("item-4")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/construction_details_page_images/item-4.jpg"
      );
    }
  });

  $(".service-3 .service-item").mouseleave(function () {
    $(".engineering-img img").attr(
      "src",
      "dist/images/services/d7/02Jun_Artboard_1.png"
    );
  });

  $(".service-4 .service-item").hover(function () {
    if ($(this).hasClass("item-1")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-1.png"
      );
    } else if ($(this).hasClass("item-2")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-2.png"
      );
    } else if ($(this).hasClass("item-3")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-3.png"
      );
    } else if ($(this).hasClass("item-4")) {
      $(".engineering-img img").attr(
        "src",
        "dist/images/services/engg_details_page_images/item-4.png"
      );
    }
    // console.log('hover');
  });

  $(".service-4 .service-item").mouseleave(function () {
    $(".engineering-img img").attr(
      "src",
      "dist/images/services/d7/02Jun_Artboard_2.png"
    );
  });

  //Solution 7

  $(".solution-single-data-btn").click(function () {
    $(".solution-rgt-dsn").fadeIn("slow");
    $(".solution-single-data").fadeOut("slow");
    // console.log('123');
  });

  $(".onGotoSolution01").click(function () {
    $(".solution-item-1").fadeIn("slow");
    console.log("ll 11");
  });

  $(".onGotoSolution02").click(function () {
    $(".solution-item-2").fadeIn("slow");
    console.log("ll 22");
  });

  $(".onGotoSolution03").click(function () {
    $(".solution-item-3").fadeIn("slow");
  });

  $(".onGotoSolution04").click(function () {
    $(".solution-item-4").fadeIn("slow");
  });

  $(".onGotoSolution05").click(function () {
    $(".solution-item-5").fadeIn("slow");
  });

  $(".onGotoSolution06").click(function () {
    $(".solution-item-6").fadeIn("slow");
  });

  $(".onSolutionDetail").click(function () {
    if ($(".onSolutionDetail").hasClass("back")) {
      // solution-bg-main moving animation
      $(".solution-7").removeClass("single-solution");
      $(".solution-bg-main").addClass("col-md-4");
      $(".solution-bg-main").removeClass("col-md-3");
      $(".onSolutionDetail").removeClass("back");

      // Solution category
      $(".solu-category").fadeOut("slow");

      // button animation
      $(".onSolutionDetail .text").attr(
        "src",
        "dist/images/solutions/icons/explore.png"
      );
      $(".onSolutionDetail .arrow").removeClass("rotate-180");

      // solution-rgt-dsn-sec
      $(".solution-rgt-dsn-sec").addClass("col-md-8");
      $(".solution-rgt-dsn-sec").removeClass("col-md-9");
      $(".solution-rgt-dsn").fadeIn("slow");

      $(".solution-single-data").fadeOut("slow");

      // Start solution-bg-main animation
      $(".solution-bg-main").addClass("layout-1");
      $(".solution-7 .solution-bg-main .main").attr(
        "style",
        "background: url('dist/images/solutions/solution-1.jpg') no-repeat center; background-size: cover;"
      );
      $(".solution-7 .solution-bg-main h3 span").text("HEALTHCARE");
      $(".solution-7 .solution-bg-main .count").text("01");
      $(".onSolutionDetail").hide();
      $(".onGotoSolution01").show();

      setTimeout(function () {
        $(".solution-item-1").fadeOut("slow");
        $(".solution-item-2").fadeOut("slow");
        $(".solution-item-3").fadeOut("slow");
        $(".solution-item-4").fadeOut("slow");
        $(".solution-item-5").fadeOut("slow");
        $(".solution-item-6").fadeOut("slow");
      }, 200);

      $(".onSolutionDetail.onGotoSolution01").show();

      //console.log('clicked back')
    } else {
      // solution-bg-main moving animation
      $(".solution-7").addClass("single-solution");
      $(".solution-bg-main").removeClass("col-md-4");
      $(".solution-bg-main").addClass("col-md-3");
      $(".onSolutionDetail").addClass("back");

      // Solution category
      $(".solu-category").fadeIn("slow");

      // button animation
      $(".onSolutionDetail .text").attr(
        "src",
        "dist/images/solutions/icons/back.png"
      );
      $(".onSolutionDetail .arrow").addClass("rotate-180");

      // solution-rgt-dsn-sec
      $(".solution-rgt-dsn-sec").removeClass("col-md-8");
      $(".solution-rgt-dsn-sec").addClass("col-md-9");
      $(".solution-rgt-dsn").fadeOut("slow");
      //$('.solution-item-1').fadeIn("slow");

      // Stop solution-bg-main animation
      $(".solution-bg-main").removeClass(
        "layout-1 , layout-2 , layout-3 , layout-4 , layout-5 , layout-6"
      );

      // Solution detail remove
      // $('.solution-item-1').fadeOut("slow");
      // $('.solution-item-2').fadeOut("slow");
      // $('.solution-item-3').fadeOut("slow");
      // $('.solution-item-4').fadeOut("slow");
      // $('.solution-item-5').fadeOut("slow");
      // $('.solution-item-6').fadeOut("slow");
      $(".onSolutionDetail").hide("onGotoSolution01");

      $(".onSolutionDetail.back.arrow").show();

      //console.log('single solution')
    }
  });

  $(".onSolution01").click(function () {
    $(".solution-single-data, .solution-rgt-dsn").fadeOut("slow");
    $(".solution-item-1").fadeIn("slow");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-1.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("HEALTHCARE");
    $(".solution-7 .solution-bg-main .count").text("01");
  });
  $(".onSolution02").click(function () {
    $(".solution-single-data, .solution-rgt-dsn").fadeOut("slow");
    $(".solution-item-2").fadeIn("slow");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-2.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("EDUCATION");
    $(".solution-7 .solution-bg-main .count").text("02");
  });
  $(".onSolution03").click(function () {
    $(".solution-single-data, .solution-rgt-dsn").fadeOut("slow");
    $(".solution-item-3").fadeIn("slow");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-3.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("AGRICULTURE");
    $(".solution-7 .solution-bg-main .count").text("03");
  });
  $(".onSolution04").click(function () {
    $(".solution-single-data, .solution-rgt-dsn").fadeOut("slow");
    $(".solution-item-4").fadeIn("slow");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-4.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("CORPORATES");
    $(".solution-7 .solution-bg-main .count").text("04");
  });
  $(".onSolution05").click(function () {
    $(".solution-single-data, .solution-rgt-dsn").fadeOut("slow");
    $(".solution-item-5").fadeIn("slow");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-5.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("TELECOM");
    $(".solution-7 .solution-bg-main .count").text("05");
  });
  $(".onSolution06").click(function () {
    $(".solution-single-data, .solution-rgt-dsn").fadeOut("slow");
    $(".solution-item-6").fadeIn("slow");
    $(".solution-7 .solution-bg-main .main").attr(
      "style",
      "background: url('dist/images/solutions/solution-6.jpg') no-repeat center; background-size: cover;"
    );
    $(".solution-7 .solution-bg-main h3 span").text("HOME");
    $(".solution-7 .solution-bg-main .count").text("06");
  });

  $(".onSolutionBack").click(function () {
    // solution-bg-main moving animation
    $(".solution-7").addClass("single-solution");
    $(".solution-bg-main").removeClass("col-md-4");
    $(".solution-bg-main").addClass("col-md-3");
    $(".onSolutionDetail").addClass("back");

    // Solution category
    $(".solu-category").fadeIn("slow");

    // button animation
    $(".onSolutionDetail .text").attr(
      "src",
      "dist/images/solutions/icons/back.png"
    );
    $(".onSolutionDetail .arrow").addClass("rotate-180");

    // solution-rgt-dsn-sec
    $(".solution-rgt-dsn-sec").removeClass("col-md-8");
    $(".solution-rgt-dsn-sec").addClass("col-md-9");
    $(".solution-rgt-dsn").fadeOut("slow");
    //$('.solution-item-1').fadeIn("slow");

    // Stop solution-bg-main animation
    $(".solution-bg-main").removeClass(
      "layout-1 , layout-2 , layout-3 , layout-4 , layout-5 , layout-6"
    );
  });

  // Conatct Form Function
  $(".onContactForm").click(function () {
    $(".contact-form").addClass("show");
  });

  $(".onClose").click(function () {
    $(".contact-form").removeClass("show");
    $(".onMaxMin").removeClass("activeMax");
    $(".onMaxMin").attr("src", "dist/images/maximize-icon.png");
    $(".contact-form").removeClass("maximize-form");
  });

  $(".onminimize").click(function () {
    $(".address-details, #contactSlider").hide(500);
  });

  $(".address-block").hover(function () {
    $(".address-details, #contactSlider").show(500);
  });

  $("#uk").hover(
    function () {
      $(".icon-uk").addClass("icon-animation-uk");
    },
    function () {
      $(".icon-uk").removeClass("icon-animation-uk");
    }
  );

  $("#ind").hover(
    function () {
      $(".icon-ind").addClass("icon-animation-ind");
    },
    function () {
      $(".icon-ind").removeClass("icon-animation-ind");
    }
  );

  $("#sin").hover(
    function () {
      $(".icon-sin").addClass("icon-animation-sin");
    },
    function () {
      $(".icon-sin").removeClass("icon-animation-sin");
    }
  );

  $("#png").hover(
    function () {
      $(".icon-png").addClass("icon-animation-png");
    },
    function () {
      $(".icon-png").removeClass("icon-animation-png");
    }
  );

  $("#aus").hover(
    function () {
      $(".icon-aus").addClass("icon-animation-aus");
    },
    function () {
      $(".icon-aus").removeClass("icon-animation-aus");
    }
  );

  var contactHeight = $("#contactSlider .address-height").height();
  console.log(contactHeight);
  $("#contactSlider .carousel-item").css("height", contactHeight + 12);

  $(" .fgt-pass").click(function () {
    $(".login-module").hide(100);
    $(".reg-module").show(100);
  });
  $(".fgt-log").click(function () {
    $(".login-module").show(100);
    $(".reg-module").hide(100);
  });

  $(".onApply").click(function () {
    $(".singlejobdetailsdata").hide(100);
    $(".applyform").show(100);
  });

  $(".map-address").hover(
    function () {
      $(this).children(".address-details").show();
      $(this).removeClass("uk_map_dynamic");
    },
    function () {
      $(this).children(".address-details").hide();
      $(this).addClass("uk_map_dynamic");
    }
  );

  $(".cl_tab_li.enable").click(function () {
    var tabid = $(this).attr("id");
    console.log(tabid);
    $(".cl_tab_detial").removeClass("active");
    $("#" + tabid + "_view").addClass("active");
  });

  $("#accept_offer").click(function () {
    $("#tab_4").addClass("enable");
    $(".cl_tab_detial").removeClass("active");
    $("#tab_4_view").addClass("active");
  });
});

setInterval(function () {
  //News feed
  if ($(".project .flip-card-front").hasClass("active")) {
    setTimeout(function () {
      $(".project .flip-card-inner").css("transform", "rotateY(180deg)");
      $(".project .flip-card-front").removeClass("active");
      $(".project .flip-card-back").addClass("active");
    }, 1000);
  }

  if ($(".project .flip-card-back").hasClass("active")) {
    setTimeout(function () {
      $(".project .flip-card-inner").css("transform", "rotateY(0deg)");
      $(".project .flip-card-back").removeClass("active");
      $(".project .flip-card-front").addClass("active");
    }, 1000);
  }
}, 7000);

setInterval(function () {
  //News feed
  if ($(".project1 .flip-card-front").hasClass("active")) {
    setTimeout(function () {
      $(".project1 .flip-card-inner").css("transform", "rotateY(180deg)");
      $(".project1 .flip-card-front").removeClass("active");
      $(".project1 .flip-card-back").addClass("active");
    }, 1000);
  }

  if ($(".project1 .flip-card-back").hasClass("active")) {
    setTimeout(function () {
      $(".project1 .flip-card-inner").css("transform", "rotateY(0deg)");
      $(".project1 .flip-card-back").removeClass("active");
      $(".project1 .flip-card-front").addClass("active");
    }, 1000);
  }
}, 10000);

setInterval(function () {
  //News feed
  if ($(".project2 .flip-card-front").hasClass("active")) {
    setTimeout(function () {
      $(".project2 .flip-card-inner").css("transform", "rotateY(180deg)");
      $(".project2 .flip-card-front").removeClass("active");
      $(".project2 .flip-card-back").addClass("active");
    }, 1000);
  }

  if ($(".project2 .flip-card-back").hasClass("active")) {
    setTimeout(function () {
      $(".project2 .flip-card-inner").css("transform", "rotateY(0deg)");
      $(".project2 .flip-card-back").removeClass("active");
      $(".project2 .flip-card-front").addClass("active");
    }, 1000);
  }
}, 13000);

//   $('.onProductSunshine01').click(function () {
//     $('.product-sunshine-details-01').removeClass('d-none');
//     $('.sunshine-slider02 , .sunshine-slider03').addClass('d-none');
//     $('.backToProductSunshine01').removeClass('d-none');
//     $(this).addClass('d-none');
//   });

//   $('.backToProductSunshine01').click(function () {
//     $('.product-sunshine-details-01').addClass('d-none');
//     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
//     $('.onProductSunshine01').removeClass('d-none');
//     $(this).addClass('d-none');
//   });

// $('.onProductSunshine01').click(function () {
//     $('.product-sunshine-details-08').removeClass('d-none');
//     $('.sunshine-slider02 , .sunshine-slider03').addClass('d-none');
//     $('.backToProductSunshine01').removeClass('d-none');
//     $(this).addClass('d-none');
//   });

//   $('.backToProductSunshine01').click(function () {
//     $('.product-sunshine-details-08').addClass('d-none');
//     $('.sunshine-slider02 , .sunshine-slider03').removeClass('d-none');
//     $('.onProductSunshine01').removeClass('d-none');
//     $(this).addClass('d-none');
//   });

// window.onload = function () {

//     var chart = new CanvasJS.Chart("chartContainer1", {
//         animationEnabled: true,
//         title:{
//             text: " "
//         },
//         axisY :{
//             includeZero: false,
//             prefix: "$"
//         },
//         toolTip: {
//             shared: true
//         },
//         legend: {
//             fontSize: 13
//         },
//         data: [{
//             type: "splineArea",
//             showInLegend: true,
//             name: "Production Power",
//             yValueFormatString: "###0",
//             xValueFormatString: "03",
//             dataPoints: [
//                 { x: 06, y: 3 },
//                 { x: 08, y: 6 },
//             ]
//          },
//         {
//             type: "splineArea",
//             showInLegend: true,
//             name: "Consumption Power",
//             yValueFormatString: "###0",
//             dataPoints: [
//                 { x: 08, y: 6 },
//                 { x: 10, y: 9 },
//             ]
//          }]
//     });
//     chart.render();

//     }

var selector = document.querySelector(".tab-service.ser-hid-mob");

function addStyleClass() {
  $(".tab-service.ser-hid-mob").addClass("dynamic-button-1");
}

const subscribeInput = document.querySelector(".subcription-form");
const form_arrow = document.querySelector(".subscribe_input");
const arrowElement = document.querySelector(".subcription-form .arrow");

subscribeInput.addEventListener("click", function (event) {
  form_arrow.style.display = "block";
  arrowElement.style.setProperty("left", "570px", "important");
  arrowElement.style.filter = "brightness(1) invert(0)";
  arrowElement.style.zIndex = "1";
  arrowElement.style.width = "30px";
});
document.addEventListener("click", (event) => {
  if (!subscribeInput.contains(event.target)) {
    form_arrow.style.display = "none";
    arrowElement.style.setProperty("left", "15px");
    arrowElement.style.filter = "brightness(0) invert(1)";
    arrowElement.style.width = "30px";
  }
});

let imagecontent1 = document.querySelector(".image_left_1");
let imagecontent2 = document.querySelector(".image_left_2");
let imagecontent3 = document.querySelector(".image_left_3");
let imagecontent4 = document.querySelector(".image_left_4");

let textContent = document.querySelector(".engineering_content");
let textContent1 = document.querySelector(".procurement_content");
let textContent2 = document.querySelector(".construction_content");
let textContent3 = document.querySelector(".operation_content");
let serviceSec_1 = document.querySelector("#servicesec");

function updateContent() {
  const imageContentArray = [
    imagecontent1,
    imagecontent2,
    imagecontent3,
    imagecontent4,
  ];
  const textContentArray = [
    textContent,
    textContent1,
    textContent2,
    textContent3,
  ];

  for (let i = 0; i < imageContentArray.length; i++) {
    if (imageContentArray[i].style.opacity === "1") {
      textContentArray[i].classList.remove("hide_text");
    } else {
      textContentArray[i].classList.add("hide_text");
    }
  }
}

let currentIndex = 0;
const images1 = document.querySelectorAll(".image1_service");
const indicators = document.querySelectorAll(".image_indicator1");

function updateOpacity() {
  images1.forEach((image, index) => {
    const zIndex = index === currentIndex ? 1 : 0;
    const opacity = 1 - Math.abs(currentIndex - index) * 0.2;

    const spacing = 32; // Adjust the spacing as needed

    // Calculate the left position differently based on the swipe direction
    let left = spacing * (index - currentIndex); // Set the initial left position to be to the right of the top image
    if (Number.isInteger(left) && left < 0) {
      left = -left + 15;
    }
    const transform = `scale(${1 - Math.abs(currentIndex - index) * 0.2}`;

    image.style.zIndex = zIndex;
    image.style.transition = "opacity 0.3s, transform 0.3s";
    image.style.opacity = opacity;
    image.style.transform = transform;
    image.style.transformOrigin = "center center"; // Set transform origin to the center for a better effect

    // Apply the calculated left position
    image.style.setProperty("left", `${left}px`, "important");
  });
}

function updateIndicators() {
  console.log("called");
  indicators.forEach((indicator) => indicator.classList.remove("active"));
  indicators[currentIndex].classList.add("active");
}

let isDragging = false;
let startX = 0;
let isTouching = false; // Flag to check if touch event is in progress

// Mobile touch events
serviceSec_1.addEventListener("touchstart", (event) => {
  isDragging = true;
  isTouching = true;
  startX = event.touches[0].clientX;
});

serviceSec_1.addEventListener("touchmove", (event) => {
  if (isDragging) {
    const diffX = event.touches[0].clientX - startX;
    if (Math.abs(diffX) > 10) {
      // Prevent scrolling on mobile devices
      event.preventDefault();
    }
  }
});

serviceSec_1.addEventListener("touchend", (event) => {
  isTouching = false;
  if (isDragging) {
    const diffX = startX - event.changedTouches[0].clientX;
    if (diffX > 30 && currentIndex < images1.length - 1) {
      // Swiping right
      currentIndex++;
      updateOpacity();
      updateIndicators();
      updateContent();
    } else if (diffX < -30 && currentIndex > 0) {
      // Swiping left
      currentIndex--;
      updateOpacity();
      updateIndicators();
      updateContent();
    }
  }
  isDragging = false;
});

// Initialize the image display
updateOpacity();
updateIndicators();
updateContent();

// const engineering1 = document.querySelector('.eng_container1');

$(document).ready(function () {
  $(".onSolutionDetails a").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).removeClass("hide");
    $(".solutionDetailMob").removeClass("show");
  });

  $(".solu01Bg .bgImgSec .img span").click(function () {
    $(".solu01Bg .bgImgSec .img").removeClass("active");
    $(this).parent(".img").addClass("active");
    var pro01Img = $(this).children("img").attr("src");
    $(".solu01Bg").css({
      background: "url(" + pro01Img + ") no-repeat center",
      "background-size": "cover",
    });
    // console.log(pro01Img)
  });
  $(".solu02Bg .bgImgSec .img span").click(function () {
    $(".solu02Bg .bgImgSec .img").removeClass("active");
    $(this).parent(".img").addClass("active");
    var pro02Img = $(this).children("img").attr("src");
    $(".solu02Bg").css({
      background: "url(" + pro02Img + ") no-repeat center",
      "background-size": "cover",
    });
    // console.log(pro01Img)
  });
  $(".solu03Bg .bgImgSec .img span").click(function () {
    $(".solu03Bg .bgImgSec .img").removeClass("active");
    $(this).parent(".img").addClass("active");
    var pro03Img = $(this).children("img").attr("src");
    $(".solu03Bg").css({
      background: "url(" + pro03Img + ") no-repeat center",
      "background-size": "cover",
    });
    // console.log(pro01Img)
  });
  $(".solu04Bg .bgImgSec .img span").click(function () {
    $(".solu04Bg .bgImgSec .img").removeClass("active");
    $(this).parent(".img").addClass("active");
    var pro04Img = $(this).children("img").attr("src");
    $(".solu04Bg").css({
      background: "url(" + pro04Img + ") no-repeat center",
      "background-size": "cover",
    });
    // console.log(pro01Img)
  });
  $(".solu05Bg .bgImgSec .img span").click(function () {
    $(".solu05Bg .bgImgSec .img").removeClass("active");
    $(this).parent(".img").addClass("active");
    var pro05Img = $(this).children("img").attr("src");
    $(".solu05Bg").css({
      background: "url(" + pro05Img + ") no-repeat center",
      "background-size": "cover",
    });
    // console.log(pro01Img)
  });
  $(".solu06Bg .bgImgSec .img span").click(function () {
    $(".solu06Bg .bgImgSec .img").removeClass("active");
    $(this).parent(".img").addClass("active");
    var pro06Img = $(this).children("img").attr("src");
    $(".solu06Bg").css({
      background: "url(" + pro06Img + ") no-repeat center",
      "background-size": "cover",
    });
    // console.log(pro01Img)
  });

  $(".menu-dot").click(function () {
    $(".menu-dot-list").toggleClass("show");
  });

  $(".onBacktoProduct").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).removeClass("hide");
    $(".solutionDetailMob").removeClass("show");
    $(".menu-dot-list").hide();
    $("html, .wrapper").animate(
      {
        scrollTop: $("#solutionseven").offset().top,
      },
      0
    );
  });

  $(".onSolution01Details").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).addClass("hide");
    $(".solution01").addClass("show");
    $("html, .wrapper").animate(
      {
        scrollTop: $(".solutionDetailMob").offset().top,
      },
      500
    );
  });

  $(".onSolution02Details").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).addClass("hide");
    $(".solution02").addClass("show");
    $("html, .wrapper").animate(
      {
        scrollTop: $(".solutionDetailMob").offset().top,
      },
      500
    );
  });

  $(".onSolution03Details").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).addClass("hide");
    $(".solution03").addClass("show");
    $("html, .wrapper").animate(
      {
        scrollTop: $(".solutionDetailMob").offset().top,
      },
      500
    );
  });

  $(".onSolution04Details").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).addClass("hide");
    $(".solution04").addClass("show");
    $("html, .wrapper").animate(
      {
        scrollTop: $(".solutionDetailMob").offset().top,
      },
      500
    );
  });

  $(".onSolution05Details").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).addClass("hide");
    $(".solution05").addClass("show");
    $("html, .wrapper").animate(
      {
        scrollTop: $(".solutionDetailMob").offset().top,
      },
      500
    );
  });

  $(".onSolution06Details").click(function () {
    $(
      ".banner-mob, #cleansec, #servicesec, .solutionMob, #productsec, #projectsec"
    ).addClass("hide");
    $(".solution06").addClass("show");
    $("html, .wrapper").animate(
      {
        scrollTop: $(".solutionDetailMob").offset().top,
      },
      500
    );
  });

  $(".onGotoMobSolution01").click(function () {
    $(".solutionDetailMob, .menu-dot-list").removeClass("show");
    $(".solution01").addClass("show");
  });

  $(".onGotoMobSolution02").click(function () {
    $(".solutionDetailMob, .menu-dot-list").removeClass("show");
    $(".solution02").addClass("show");
  });

  $(".onGotoMobSolution03").click(function () {
    $(".solutionDetailMob, .menu-dot-list").removeClass("show");
    $(".solution03").addClass("show");
  });

  $(".onGotoMobSolution04").click(function () {
    $(".solutionDetailMob, .menu-dot-list").removeClass("show");
    $(".solution04").addClass("show");
  });

  $(".onGotoMobSolution05").click(function () {
    $(".solutionDetailMob, .menu-dot-list").removeClass("show");
    $(".solution05").addClass("show");
  });

  $(".onGotoMobSolution06").click(function () {
    $(".solutionDetailMob, .menu-dot-list").removeClass("show");
    $(".solution06").addClass("show");
  });

  $(".image_left_1 .eng_view").click(function () {
    $("#projectsec, #productsec, #solutionseven,#home-slider,#cleansec").hide();
    $("#servicesec").show();
    $("#servicesec > div").not("#eng_div_1").hide(); // Hide all divs inside servicesec except eng_div_1
    $(".eng_container1").show();
    $(".pro_container1").hide();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
    const engContainer = $(".header_section_eng");
    const engContainer4 = $(".dynamic_menu1");
    engContainer.css("z-index", 99999);
    engContainer4.css("z-index", 99999);
    $("html, .wrapper").animate(
      {
        scrollTop: $(".header_section_eng").offset().top,
      },
      500
    );
  });
});

//procurement
$(document).ready(function () {
  $(".image_left_2 .eng_view").click(function () {
    $("#projectsec, #productsec, #solutionseven,#home-slider,#cleansec").hide();
    $("#servicesec").show();
    $("#servicesec > div").not("#eng_div_1").hide(); // Hide all divs inside servicesec except eng_div_1
    $(".eng_container1").hide();
    $(".pro_container1").show();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
    const engContainer = $(".header_section_eng");
    const engContainer4 = $(".dynamic_menu1");
    engContainer.css("z-index", 99999);
    engContainer4.css("z-index", 99999);
    $("html, .wrapper").animate(
      {
        scrollTop: $(".header_section_eng").offset().top,
      },
      500
    );
  });
});

// Construction

$(document).ready(function () {
  $(".image_left_3 .eng_view").click(function () {
    $("#projectsec, #productsec, #solutionseven,#home-slider,#cleansec").hide();
    $("#servicesec").show();
    $("#servicesec > div").not("#eng_div_1").hide(); // Hide all divs inside servicesec except eng_div_1
    $(".eng_container1").hide();
    $(".pro_container1").hide();
    $(".cons_container1").show();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
    const engContainer = $(".header_section_eng");
    const engContainer4 = $(".dynamic_menu1");
    engContainer.css("z-index", 99999);
    engContainer4.css("z-index", 99999);
    $("html, .wrapper").animate(
      {
        scrollTop: $(".header_section_eng").offset().top,
      },
      500
    );
  });
});

// Operation

$(document).ready(function () {
  $(".image_left_4 .eng_view").click(function () {
    $("#projectsec, #productsec, #solutionseven,#home-slider,#cleansec").hide();
    $("#servicesec").show();
    $("#servicesec > div").not("#eng_div_1").hide();
    $(".eng_container1").hide();
    $(".pro_container1").hide();
    $(".cons_container1").hide();
    $(".operation_container1").show();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
    const engContainer = $(".header_section_eng");
    const engContainer4 = $(".dynamic_menu1");
    engContainer.css("z-index", 99999);
    engContainer4.css("z-index", 99999);
    $("html, .wrapper").animate(
      {
        scrollTop: $(".header_section_eng").offset().top,
      },
      500
    );
  });
});

// navigation Menu
$(document).ready(function () {
  $(".engineering_sec_align1").click(function () {
    // $('#projectsec, #productsec, #solutionseven,#home-slider,#cleansec').hide();
    // $('#servicesec').show();
    // $('#servicesec > div').not('#eng_div_1').hide();
    $(".eng_container1").show();
    $(".pro_container1").hide();
    $(".cons_container1").hide();
    $(".operation_container1").hide();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
  });
});

$(document).ready(function () {
  $(".pro_service").click(function () {
    // $('#projectsec, #productsec, #solutionseven,#home-slider,#cleansec').hide();
    // $('#servicesec').show();
    // $('#servicesec > div').not('#eng_div_1').hide();
    $(".eng_container1").hide();
    $(".pro_container1").show();
    $(".cons_container1").hide();
    $(".operation_container1").hide();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tickIcon = document.querySelector(".engineering_sec_align1 .tick_ser");
  const tickIcon1 = document.querySelector(".pro_service .tick_ser");
  const pro_header = document.querySelector(".pro_sec");
  const eng_header = document.querySelector(".eng_sec");
  const tickIcon2 = document.querySelector(".pro_service1 .tick_ser");
  const con_header = document.querySelector(".con_sec");
  const tickIcon3 = document.querySelector(".pro_service2 .tick_ser");
  const ope_header = document.querySelector(".ope_sec");

  // for procurement
  document.querySelector(".pro_service").addEventListener("click", function () {
    // Replace the content of the SVG element with the new SVG data
    tickIcon.innerHTML = `
    <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
  </svg>    `;
    tickIcon1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <g clip-path="url(#clip0_12175_17136)">
      <path d="M5.99993 11.2999L3.19993 8.49994L2.2666 9.43328L5.99993 13.1666L13.9999 5.16661L13.0666 4.23328L5.99993 11.2999Z" fill="#23B14D" />
  </g>
  <defs>
      <clipPath id="clip0_12175_17136">
          <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
      </clipPath>
  </defs>
</svg>`;
    tickIcon2.innerHTML = ` <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg>`;
    tickIcon3.innerHTML = ` <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg>`;
    pro_header.style.color = "#23B14D";
    eng_header.style.color = "black";
    con_header.style.color = "black";
    ope_header.style.color = "black";
  });
});

$(document).ready(function () {
  const engContainer = $(".header_section_eng");
  // const engContainer1 = $('.pro_container1');
  // const engContainer2 = $('.cons_container1');
  // const engContainer3 = $('.operation_container1');
  const engContainer4 = $(".dynamic_menu1");
  const serMobNav = $(".ser_mob_nav");

  serMobNav.on("click", function () {
    engContainer.css("z-index", 0);
    // engContainer1.css('z-index', 0);
    // engContainer2.css('z-index', 0);
    // engContainer3.css('z-index', 0);
    engContainer4.css("z-index", 0);
  });
});

$(document).ready(function () {
  const engContainer = $(".header_section_eng");
  const engContainer4 = $(".dynamic_menu1");
  // const engContainer1 = $('.pro_container1');
  // const engContainer2 = $('.cons_container1');
  // const engContainer3 = $('.operation_container1');
  const close = $(".btn-close");

  close.on("click", function () {
    engContainer.css("z-index", 99999);
    engContainer4.css("z-index", 99999);
    // engContainer1.css('z-index', 0);
    // engContainer2.css('z-index', 0);
    // engContainer3.css('z-index', 0);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tickIcon = document.querySelector(".engineering_sec_align1 .tick_ser");
  const tickIcon1 = document.querySelector(".pro_service .tick_ser");
  const pro_header = document.querySelector(".pro_sec");
  const eng_header = document.querySelector(".eng_sec");
  const tickIcon2 = document.querySelector(".pro_service1 .tick_ser");
  const con_header = document.querySelector(".con_sec");
  const tickIcon3 = document.querySelector(".pro_service2 .tick_ser");
  const ope_header = document.querySelector(".ope_sec");
  // for engineering
  document
    .querySelector(".engineering_sec_align1")
    .addEventListener("click", function () {
      // Replace the content of the SVG element with the new SVG data
      tickIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <g clip-path="url(#clip0_12175_17136)">
        <path d="M5.99993 11.2999L3.19993 8.49994L2.2666 9.43328L5.99993 13.1666L13.9999 5.16661L13.0666 4.23328L5.99993 11.2999Z" fill="#23B14D" />
    </g>
    <defs>
        <clipPath id="clip0_12175_17136">
            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
        </clipPath>
    </defs>
  </svg>`;
      tickIcon1.innerHTML = `
    <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
  </svg>    `;
      tickIcon2.innerHTML = `<svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg> `;
      tickIcon3.innerHTML = `<svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg> `;
      pro_header.style.color = "black";
      eng_header.style.color = "#23B14D";
      con_header.style.color = "black";
      ope_header.style.color = "black";
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const tickIcon = document.querySelector(".engineering_sec_align1 .tick_ser");
  const tickIcon1 = document.querySelector(".pro_service .tick_ser");
  const tickIcon2 = document.querySelector(".pro_service1 .tick_ser");
  const pro_header = document.querySelector(".pro_sec");
  const eng_header = document.querySelector(".eng_sec");
  const con_header = document.querySelector(".con_sec");
  const tickIcon3 = document.querySelector(".pro_service2 .tick_ser");
  const ope_header = document.querySelector(".ope_sec");

  // for engineering
  document
    .querySelector(".pro_service1")
    .addEventListener("click", function () {
      // Replace the content of the SVG element with the new SVG data
      tickIcon2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <g clip-path="url(#clip0_12175_17136)">
        <path d="M5.99993 11.2999L3.19993 8.49994L2.2666 9.43328L5.99993 13.1666L13.9999 5.16661L13.0666 4.23328L5.99993 11.2999Z" fill="#23B14D" />
    </g>
    <defs>
        <clipPath id="clip0_12175_17136">
            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
        </clipPath>
    </defs>
  </svg>`;
      tickIcon1.innerHTML = `
    <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
  </svg>    `;
      tickIcon.innerHTML = `
  <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg>    `;
      tickIcon3.innerHTML = `
<svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg>    `;
      pro_header.style.color = "black";
      eng_header.style.color = "black";
      con_header.style.color = "#23B14D";
      ope_header.style.color = "black";
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const tickIcon = document.querySelector(".engineering_sec_align1 .tick_ser");
  const tickIcon1 = document.querySelector(".pro_service .tick_ser");
  const tickIcon2 = document.querySelector(".pro_service1 .tick_ser");
  const tickIcon3 = document.querySelector(".pro_service2 .tick_ser");
  const ope_header = document.querySelector(".ope_sec");
  const pro_header = document.querySelector(".pro_sec");
  const eng_header = document.querySelector(".eng_sec");
  const con_header = document.querySelector(".con_sec");
  // for engineering
  document
    .querySelector(".pro_service2")
    .addEventListener("click", function () {
      // Replace the content of the SVG element with the new SVG data
      tickIcon3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <g clip-path="url(#clip0_12175_17136)">
        <path d="M5.99993 11.2999L3.19993 8.49994L2.2666 9.43328L5.99993 13.1666L13.9999 5.16661L13.0666 4.23328L5.99993 11.2999Z" fill="#23B14D" />
    </g>
    <defs>
        <clipPath id="clip0_12175_17136">
            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
        </clipPath>
    </defs>
  </svg>`;
      tickIcon1.innerHTML = `
    <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
  </svg>    `;
      tickIcon.innerHTML = `
  <svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg>    `;
      tickIcon2.innerHTML = `
<svg id="tickIcon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.659 11.2201C10.5853 11.2887 10.5262 11.3715 10.4852 11.4635C10.4442 11.5555 10.4222 11.6548 10.4204 11.7555C10.4186 11.8562 10.4372 11.9563 10.4749 12.0497C10.5126 12.143 10.5687 12.2279 10.64 12.2991C10.7112 12.3703 10.796 12.4265 10.8894 12.4642C10.9828 12.5019 11.0828 12.5204 11.1835 12.5187C11.2842 12.5169 11.3835 12.4948 11.4755 12.4538C11.5675 12.4128 11.6503 12.3537 11.719 12.2801L14.97 9.03006L15.5 8.50006L14.97 7.97006L11.72 4.72006C11.5786 4.58337 11.3892 4.50769 11.1925 4.5093C10.9959 4.51092 10.8078 4.58971 10.6686 4.7287C10.5295 4.86769 10.4505 5.05576 10.4487 5.25241C10.4469 5.44906 10.5224 5.63854 10.659 5.78006L12.629 7.75006L2.25 7.75006C2.05109 7.75006 1.86032 7.82908 1.71967 7.96973C1.57902 8.11038 1.5 8.30115 1.5 8.50006C1.5 8.69897 1.57902 8.88974 1.71967 9.03039C1.86032 9.17104 2.05109 9.25006 2.25 9.25006L12.629 9.25006L10.659 11.2201Z" fill="#303030"/>
</svg>    `;
      pro_header.style.color = "black";
      eng_header.style.color = "black";
      con_header.style.color = "black";
      ope_header.style.color = "#23B14D";
    });
});

$(document).ready(function () {
  $(".pro_service1").click(function () {
    // $('#projectsec, #productsec, #solutionseven,#home-slider,#cleansec').hide();
    // $('#servicesec').show();
    // $('#servicesec > div').not('#eng_div_1').hide();
    $(".eng_container1").hide();
    $(".pro_container1").hide();
    $(".cons_container1").show();
    $(".operation_container1").hide();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
  });
});

$(document).ready(function () {
  $(".pro_service2").click(function () {
    // $('#projectsec, #productsec, #solutionseven,#home-slider,#cleansec').hide();
    // $('#servicesec').show();
    // $('#servicesec > div').not('#eng_div_1').hide();
    $(".eng_container1").hide();
    $(".pro_container1").hide();
    $(".cons_container1").hide();
    $(".operation_container1").show();
    $("#eng_div_1").show(); // Show the specific eng_div_1 element
  });
});

// $(document).ready(function() {
//   $(document).on('click', '.header_back_icon', function() {
//       // Your code here
//   });
// });

// $(document).ready(function () {
//   $("#svg_back, .back_svg").click(function () {
//     // Select the #servicesec .servicesMob element
//     var servicesMob = $("#servicesec");

//     if (servicesMob.length > 0) {
//       // Override existing CSS properties
//       servicesMob.css({
//         "display": "block",
//         "position": "relative", // or "static" based on your layout
//         "top": 0
//       });

//       // Calculate the target offset
//       var targetOffset = servicesMob.offset().top;

//       // Scroll to the target offset
//       window.scrollTo({
//         top: targetOffset,
//         behavior: "smooth"
//       });
//     }
//   });
// });

$(document).ready(function () {
  $("#svg_back, .back_svg").click(function () {
    // Show and hide elements as needed
    $(
      "#projectsec, #productsec, #servicesec, #solutionseven, #home-slider, #cleansec"
    ).show();
    $("#servicesec .servicesMob").show();
    $(".eng_container1").hide();
    $("#eng_div_1").hide();
    $(".dynamic_menu1").hide();

    // Scroll to the target element
    $("html, .wrapper").animate(
      {
        scrollTop: $("#servicesec").offset().top,
      },
      0
    );
  });
});

// procurement

// $(document).ready(function () {
//   $("#svg_back,.back_svg").click(function () {
//     $(
//       "#projectsec, #productsec, #servicesec, #solutionseven,#home-slider, #cleansec"
//     ).show();
//     $("#servicesec .servicesMob").show();
//     $(".pro_container1").hide();
//     $("#eng_div_1").hide();
//   });
// });

// // construction

// $(document).ready(function () {
//   $("#svg_back,.back_svg").click(function () {
//     $(
//       "#projectsec, #productsec, #servicesec, #solutionseven,#home-slider, #cleansec"
//     ).show();
//     $("#servicesec .servicesMob").show();
//     $(".pro_container1").hide();
//     $("#eng_div_1").hide();
//     $(".cons_container1").hide();
//   });
// });

// Operation

// $(document).ready(function () {
//   $("#svg_back,.back_svg").click(function () {
//     $(
//       "#projectsec, #productsec, #servicesec, #solutionseven,#home-slider, #cleansec"
//     ).show();
//     $("#servicesec .servicesMob").show();
//     $(".pro_container1").hide();
//     $("#eng_div_1").hide();
//     $(".cons_container1").hide();
//     $(".operation_container1").hide();
//   });
// });

const dynamicMenu = $(".menu_container_ser");

$(document).ready(function () {
  $(".ser_menu svg").click(function () {
    if (dynamicMenu.css("display") === "none") {
      // $(".dynamic_menu1").show();
      $(".menu_container_ser").show();
    }
    $(".dynamic_menu1").toggle();
   
  });
});

$(document).ready(function () {
  $(".menu_container_ser").click(function () {
    $(".dynamic_menu1").addClass("hide_menu");
    $(".dynamic_menu1").toggleClass("hide_menu");
      $(".dynamic_menu1").hide();
  });
});

$(document).ready(function () {
  const engIcon = $(".eng_container1 .initial_icon");
  const engIcon1 = $(".eng_container1 .overlap_icon");
  const backgroundEng = $(".background_eng");

  engIcon.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_eng").addClass("background_eng1");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });

  engIcon1.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_eng1").addClass("background_eng");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });
});

$(document).ready(function () {
  const engIcon = $(".pro_container1 .initial_icon");
  const engIcon1 = $(".pro_container1 .overlap_icon");
  const backgroundEng = $(".background_pro1");

  engIcon.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_pro1").addClass("background_eng1");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });

  engIcon1.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_eng1").addClass("background_pro1");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });
});

$(document).ready(function () {
  const engIcon = $(".cons_container1 .initial_icon");
  const engIcon1 = $(".cons_container1 .overlap_icon");
  const backgroundEng = $(".background_cons1");

  engIcon.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_cons1").addClass("background_eng1");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });

  engIcon1.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_eng1").addClass("background_cons1");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });
});

$(document).ready(function () {
  const engIcon = $(".operation_container1 .initial_icon");
  const engIcon1 = $(".operation_container1 .overlap_icon");
  const backgroundEng = $(".background_opr1");

  engIcon.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_opr1").addClass("background_eng1");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });

  engIcon1.on("click", function () {
    // Smoothly remove the current class and add the new class
    backgroundEng.fadeOut(300, function () {
      backgroundEng.removeClass("background_eng1").addClass("background_opr1");
      backgroundEng.fadeIn(300); // Adjust the duration as needed
    });
  });
});

$(document).ready(function () {
  // Function to handle the initial and resized window state
  function handleWindowResize() {
    if ($(window).width() >= 1000) {
      // Window width is greater than or equal to 768px
      $(
        "#projectsec, #productsec, #servicesec, #solutionseven, #home-slider, #cleansec"
      ).show();
      $("#servicesec .servicesMob").show();
      $(".eng_container1").hide();
      $("#eng_div_1").hide();
      if ($(".mainService").css("display") === "none") {
        // $(".mainService").css("display", "flex");
      }
    } else {
      console.log("mobile view");
      if ($(".service-detail.show").length > 0) {
        $(".service-detail.show").removeClass("show");
      }
      if ($(".service-detail ").css("display") === "flex") {
        $(".service-detail ").css("display", "none");
        // $("..mainService").css("display", "none");
      }
    }
  }

  // Initial call to handle window state
  handleWindowResize();

  // Attach the handleWindowResize function to the window's resize event
  $(window).resize(handleWindowResize);
});

// solutions

let simagecontent1 = document.querySelector(".simage_left_1");
let simagecontent2 = document.querySelector(".simage_left_2");
let simagecontent3 = document.querySelector(".simage_left_3");
let simagecontent4 = document.querySelector(".simage_left_4");
let simagecontent5 = document.querySelector(".simage_left_5");
let simagecontent6 = document.querySelector(".simage_left_6");
let solutionSec_1 = document.querySelector("#solutionseven");

let stextContent = document.querySelector(".sengineering_content");
let stextContent1 = document.querySelector(".sprocurement_content");
let stextContent2 = document.querySelector(".sconstruction_content");
let stextContent3 = document.querySelector(".soperation_content");
let stextContent4 = document.querySelector(".soperation_content5");
let stextContent5 = document.querySelector(".soperation_content6");

function supdateContent() {
  const simageContentArray = [
    simagecontent1,
    simagecontent2,
    simagecontent3,
    simagecontent4,
    simagecontent5,
    simagecontent6,
  ];
  const stextContentArray = [
    stextContent,
    stextContent1,
    stextContent2,
    stextContent3,
    stextContent4,
    stextContent5,
  ];

  for (let n = 0; n < simageContentArray.length; n++) {
    if (simageContentArray[n].style.opacity === "1") {
      stextContentArray[n].classList.remove("hide_text");
    } else {
      stextContentArray[n].classList.add("hide_text");
    }
  }
}

let scurrentIndex = 0;
const simages1 = document.querySelectorAll(".simage1_service");
const sindicators = document.querySelectorAll(".simage_indicator1");

function supdateOpacity() {
  simages1.forEach((image, index) => {
    const szIndex = index === scurrentIndex ? 1 : 0;
    const opacity = 1 - Math.abs(scurrentIndex - index) * 0.2;

    const sspacing = 32; // Adjust the sspacing as needed

    // Calculate the sleft position differently based on the swipe direction
    let sleft = sspacing * (index - scurrentIndex); // Set the initial sleft position to be to the right of the top image
    if (Number.isInteger(sleft) && sleft < 0) {
      sleft = -sleft + 15;
    }
    const stransform = `scale(${1 - Math.abs(scurrentIndex - index) * 0.2})`;

    image.style.zIndex = szIndex;
    image.style.transition = "opacity 0.3s, transform 0.3s";
    image.style.opacity = opacity;
    image.style.transform = stransform;
    image.style.transformOrigin = "center center"; // Set stransform origin to the center for a better effect

    // Apply the calculated sleft position
    image.style.setProperty("left", `${sleft}px`, "important");
  });
}

function supdateIndicators() {
  console.log("called");
  sindicators.forEach((sindicator) => sindicator.classList.remove("active"));
  sindicators[scurrentIndex].classList.add("active");
}

let sisDragging = false;
let sstartX = 0;

// Mobile touch events
solutionSec_1.addEventListener("touchstart", (event) => {
  sisDragging = true;
  sstartX = event.touches[0].clientX;
});

solutionSec_1.addEventListener("touchmove", (event) => {
  if (sisDragging) {
    const sdiffX = event.touches[0].clientX - sstartX;
    if (Math.abs(sdiffX) > 10) {
      // Prevent scrolling on mobile devices
      event.preventDefault();
    }
  }
});

solutionSec_1.addEventListener("touchend", (event) => {
  if (sisDragging) {
    const sdiffX = sstartX - event.changedTouches[0].clientX;
    if (sdiffX > 30 && scurrentIndex < simages1.length - 1) {
      scurrentIndex++;
      supdateOpacity();
      supdateIndicators();
      supdateContent();
    } else if (sdiffX < -30 && scurrentIndex > 0) {
      scurrentIndex--;
      supdateOpacity();
      supdateIndicators();
      supdateContent();
    }
  }
  sisDragging = false;
});

// Initialize the image display
supdateOpacity();
supdateIndicators();
supdateContent();

const second_content = document.querySelector(".eng_container1");
const second_content1 = document.querySelector(".eng_container");
const first_image = document.querySelector(".overlap_icon");
const second_image = document.querySelector(".initial_icon");

second_image.addEventListener("click", function (event) {
  console.log("initial");
});

$(".super_link").click(function () {
  $("#projectsec, #productsec, #solutionseven, #cleansec,#home-slider").show();
  $("#servicesec > div").show(); // Show all divs inside servicesec
  $(".menu_container_ser").hide();
  $(".navigator-logo").hide();
  $(".eng_container1").hide();
  $(".row.service-detail").hide();
  $(".operation_container1").hide();
  $(".pro_container1 ").hide();
  $(".cons_container1  ").hide();
});


$(document).ready(function(){
  $('.input-field input').blur(function(){
    console.log("blur");
      if(!$(this).val()){
          $(this).addClass("error");
      } else{
          $(this).removeClass("error");
      }
  });
});