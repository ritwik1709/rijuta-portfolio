//////////////// Sticky navigation //////////////////////
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

//////////////// Show scrollup //////////////////////
function scrollUpfunc() {
  const scrollUp = document.getElementById("scroll-up");
  // Only proceed if scrollUp element exists
  if (scrollUp) {
    if (this.scrollY >= 680) scrollUp.classList.remove("hide");
    else scrollUp.classList.add("hide");
  }
}
window.addEventListener("scroll", scrollUpfunc);

////////////////////Changing theme Dark/light//////////////////
const darkbtn=document.querySelector(".dark-btn");
const lightbtn=document.querySelector(".light-btn");

function darkMode(){  
  darkbtn.addEventListener("click",function(e){
  e.preventDefault();
   darkbtn.classList.add("hide");
   document.body.classList.toggle("darkmode");
   lightbtn.classList.toggle("hide"); 
  })
}
function lightMode(){
  lightbtn.addEventListener("click",function(e){
    e.preventDefault();
    lightbtn.classList.add("hide");
    darkbtn.classList.toggle("hide"); 
   document.body.classList.toggle("darkmode");

  })
}
darkMode();
lightMode();

//////////////// SMOOTH scrolling //////////////////////

//////////////// SMOOTH scrolling //////////////////////

// Smooth scroll function
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition;
  const duration = 800;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Apply to all navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Main navigation
  document.querySelectorAll('.main-nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
      // Close mobile navigation if open
      document.querySelector('.header').classList.remove('nav-open');
    });
  });

  // Footer links
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });

  // Scroll up button
  const scrollUpBtn = document.querySelector('.scrollup');
  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScroll('#home');
    });
  }
});


//////////////// Mobile Navigation //////////////////////
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
////////////////Slider component //////////////////////

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();


//////////////// contact email sending //////////////////////
function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };


  if (params.name !== "" && params.email !== "" && params.message !== "") {

    //regular expression for email validation
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    //Invalid email
    if (!regex.test(params.email))
      alert("Please Enter a valid email address !");

    else {
      const serviceID = "service_yz5ghar";
      const templateID = "template_zb403l9";


      emailjs.send(serviceID, templateID, params)
        .then((res) => {
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
          console.log(res);
          alert("your message sent successfully !!");
        }
        )
        .catch((error) => console.log(error));
    }

  }

  else {
    alert("Please fill all the details !!");
  }

}