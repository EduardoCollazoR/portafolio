window.addEventListener("load", function () {
  document.querySelector(".preloader").classList.add("opacity-0");

  setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

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

// portfolio leightbox
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

// aside nav

const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");

  a.addEventListener("click", function () {
    //remove back-section
    removeBackSectionClass();

    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        //add back-section
        addBackSectionClass(j);
      }
      navList[j].querySelector("a").classList.remove("active");
    }

    this.classList.add("active");
    showSection(this);

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function removeBackSectionClass() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}

function addBackSectionClass(num) {
  allSection[num].classList.add("back-section");
}

function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }

  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}

const navToggleBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navToggleBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navToggleBtn.classList.toggle("open");

  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

// Contact
const data = {
  name: "",
  email: "",
  affair: "",
  message: "",
};

const form = document.querySelector(".contact-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const affair = document.querySelector("#affair");
const message = document.querySelector("#message");

name.addEventListener("input", readText);
email.addEventListener("input", readText);
affair.addEventListener("input", readText);
message.addEventListener("input", readText);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  //form validation
  const { name, email, affair, message } = data;

  if (name === "" || email === "" || affair === "" || message === "") {
    //alert
    showAlert("Todos los campos son obligatorios", "error");
    return;
  } else {
    //send email
    let tempParams = {
      from_name: document.getElementById("name").value,
      affair: document.getElementById("affair").value,
      message: document.getElementById("message").value,
      email: document.getElementById("email").value,
      reply_to: document.getElementById("email").value,
    };

    emailjs
      .send("service_dvxgwk8", "template_53rsgoe", tempParams)
      .then(function (res) {
        console.log("success", res.status);
        //alert
        showAlert("Mensaje enviado correctamente");
        clearForm();

        return;
      });
  }
});

function readText(e) {
  data[e.target.id] = e.target.value;
}
//alerts
function showAlert(message, error = null) {
  const alert = document.createElement("P");
  alert.textContent = message;

  if (error) {
    alert.classList.add("error");
  } else {
    alert.classList.add("correct");
  }
  form.appendChild(alert);
  // desaparecer despues de 5 segundos

  setTimeout(() => {
    alert.remove();
  }, 5000);
}
function clearForm() {
  name.value = "";
  email.value = "";
  affair.value = "";
  message.value = "";
}
