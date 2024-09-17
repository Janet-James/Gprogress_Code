window.onload = function () {
    const svgElement = document.getElementById("myIcon");
    const svgElement1 = document.getElementById("myIcon1");
    const svgElement2 = document.getElementById("myIcon2");
    const svgElement3 = document.getElementById("myIcon3");
    const svgElement4 = document.getElementById("myIcon4");
    console.log(svgElement);
  };

  function svgClick() {
    const svgElement = document.getElementById("myIcon");
    svgElement.classList.toggle("red");
  }

  function svgClick() {
    const svgElement = document.getElementById("myIcon");
    svgElement.classList.toggle("red");
  }

  document.addEventListener("click", function (event) {
    const svgElement = document.getElementById("myIcon");

    if (!svgElement.contains(event.target)) {
      svgElement.classList.remove("red");
    }
  });


  function svgClick1() {
    const svgElement1 = document.getElementById("myIcon1");
    svgElement1.classList.toggle("orange");
  }

  document.addEventListener("click", function (event) {
    const svgElement1 = document.getElementById("myIcon1");

    if (!svgElement1.contains(event.target)) {
      svgElement1.classList.remove("orange");
    }
  });

  function svgClick2() {
    const svgElement2 = document.getElementById("myIcon2");
    svgElement2.classList.toggle("redOrange");
  }
  document.addEventListener("click", function (event) {
    const svgElement2 = document.getElementById("myIcon2");

    if (!svgElement2.contains(event.target)) {
      svgElement2.classList.remove("redOrange");
    }
  });


  function svgClick3() {
    const svgElement3 = document.getElementById("myIcon3");
    svgElement3.classList.toggle("green");
  }

  document.addEventListener("click", function (event) {
    const svgElement3 = document.getElementById("myIcon3");

    if (!svgElement3.contains(event.target)) {
      svgElement3.classList.remove("green");
    }
  });

  function svgClick4() {
    const svgElement4 = document.getElementById("myIcon4");
    svgElement4.classList.toggle("green");
  }

  document.addEventListener("click", function (event) {
    const svgElement4 = document.getElementById("myIcon4");

    if (!svgElement4.contains(event.target)) {
      svgElement4.classList.remove("green");
    }
  });