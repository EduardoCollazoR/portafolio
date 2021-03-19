//filter
const filterContainer = document.querySelector(".portfolio-filter"),
  filterBtns = filterContainer.children,
  totalFilterBtn = filterBtns.length,
  portfolioItems = document.querySelectorAll(".portfolio-item"),
  totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    for (let k = 0; k < totalPortfolioItem; k++) {
      if (filterValue === portfolioItems[k].getAttribute("data-category")) {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      } else {
        portfolioItems[k].classList.remove("show");
        portfolioItems[k].classList.add("hide");
      }

      if (filterValue === "all") {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      }
    }
  });
}

// portfolio lightbox

const lightbox = document.querySelector(".lightbox "),
  lightboxImg = lightbox.querySelector(".lightbox-img"),
  lightboxClose = lightbox.querySelector(".lightbox-close"),
  lightboxText = lightbox.querySelector(".caption-text"),
  lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalPortfolioItem; i++) {
  portfolioItems[i].addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLightbox();
  });
}

function nextItem() {
  if (itemIndex === totalPortfolioItem - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }
  changeItem();
}

function prevItem() {
  if (itemIndex === 0) {
    itemIndex = totalPortfolioItem - 1;
  } else {
    itemIndex--;
  }
  changeItem();
}

function toggleLightbox() {
  lightbox.classList.toggle("open");
  const body = document.querySelector("body");
  const scroll = document.querySelector(".scrollToTop-btn");
  body.appendChild(lightbox);
  scroll.classList.toggle("scrollToTop-none");
  body.classList.toggle("fixed-body");
}

function changeItem() {
  imgSrc = portfolioItems[itemIndex]
    .querySelector(".portfolio-img img")
    .getAttribute("src");
  lightboxImg.src = imgSrc;
  lightboxText.innerHTML = portfolioItems[itemIndex].querySelector(
    "h4"
  ).innerHTML;
  lightboxCounter.innerHTML = itemIndex + 1 + " de " + totalPortfolioItem;
}

// close lightbox
lightbox.addEventListener("click", function (event) {
  if (event.target === lightboxClose || event.target === lightbox) {
    toggleLightbox();
  }
});

//navigation bar effects on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//responsive navigation sidebar menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navigationItems = document.querySelectorAll(".navigation a");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

navigationItems.forEach((navigationItem) => {
  navigationItem.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navigation.classList.remove("active");
  });
});

//scroll to top button
const scrollBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function () {
  scrollBtn.classList.toggle("active", window.scrollY > 500);
});

//scroll back to top on click scroll-to-top button
scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

//reveal website elements on scroll
window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 50;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

// language
$(document).ready(function () {
  var selector = "#translate";
  $(selector).on("click", function (e) {
    e.preventDefault();
    startLang($(this));
  });
  var startLang = function (el) {
    var el = $(el);
    var text = el.attr("data-text");
    var file = el.attr("data-file");
    file = file.split(",");
    text = text.split(",");
    var index = el.attr("data-index");
    if (index >= file.length) {
      index = 0;
    }
    changeName(el, text[index]);
    changeIndex(el, index);
    loadLang(file[index]);
    $("html").attr("lang", file[index]);
  };

  var changeName = function (el, name) {
    $(el).html(name);
  };

  var changeIndex = function (el, index) {
    $(el).attr("data-index", ++index);
  };

  var loadLang = function (lang) {
    var processLang = function (data) {
      var arr = data.split("\n");
      for (var i in arr) {
        if (lineValid(arr[i])) {
          var obj = arr[i].split("=>");
          assignText(obj[0], obj[1]);
        }
      }
    };
    var assignText = function (key, value) {
      $('[data-lang="' + key + '"]').each(function () {
        var attr = $(this).attr("data-destine");
        if (typeof attr !== "undefined") {
          $(this).attr(attr, value);
        } else {
          $(this).html(value);
        }
      });
    };
    var lineValid = function (line) {
      return line.trim().length > 0;
    };
    $(".loading-lang").addClass("show");
    $.ajax({
      url: "lang/" + lang + ".txt",
      error: function () {
        alert("No se cargó traducción");
      },
      success: function (data) {
        $(".loading-lang").removeClass("show");
        processLang(data);
      },
    });
  };
});
