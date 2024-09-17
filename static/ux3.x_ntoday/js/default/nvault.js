// Waiting For Approval Slider
  $(document).ready(function() {
      var owl = $('#approved.owl-carousel');
      owl.owlCarousel({
        items: 3,
        loop: true,
        nav: false,
        dots: false,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
    })
// Edited Document Slider
    $(document).ready(function() {
        var owl = $('#edited.owl-carousel');
        owl.owlCarousel({
          items: 1,
          loop: true,
          nav: false,
          dots: false,
          margin: 10,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true
        });
      })

    /*$('.top_left_menu').on('click', function(){
      $(this).toggleClass("active");
    });*/

    $(".document-add").click( function (){
      $(this).parent().toggleClass("active");
    });

    $(".expand").click( function (){
      $(this).parent().toggleClass("active");
    });

    $('.share').on('click', function(){
      $(this).toggleClass("active");
    });

    $(".search_btn").click( function (){
      $(this).parent().toggleClass("current");
    });

  // Folder Structure Scripts
    $(document).ready(function() {
      $("#folder_structure a").click(function() {
        var link = $(this);
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active")
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;

        closest_ul.find("ul").slideUp(function() {
            if (++count == closest_ul.find("ul").length)
                parallel_active_links.removeClass("active");
        });

        if (!link_status) {
            closest_li.children("ul").slideDown();
            closest_li.addClass("active");
        }
      })
    })

  // Notification Calendar
    $("#calendar").calendar({
      // date: new Date("2019/01/01"),
      offset: 1,
      events: {
          // "2017/12/12": $("<div>jQueryScript Event</div>"),
          "2017/12/12": $("<div>jQueryScript Event</div>"),
          "2017/12/28": $("<div>jQueryScript Event</div>"),
          "2017/12/30": $("<div>jQueryScript Events</div>"),
          "2019/4/12": $("<div>jQueryScript device-width Events</div>")
      }
    });