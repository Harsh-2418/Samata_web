document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Mobile Menu Toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-link:not(.dropdown-toggle)").forEach((n) =>
    n.addEventListener("click", () => {
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    })
  );

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault(); 
        
        const parentDropdown = toggle.closest(".dropdown");
        
        document.querySelectorAll(".dropdown").forEach((d) => {
          if (d !== parentDropdown) {
            d.classList.remove("active");
          }
        });

        parentDropdown.classList.toggle("active");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      if (navMenu) navMenu.classList.remove("active");
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
  });

  /* === 2. HERO SLIDER LOGIC === */
  const slides = [
    {
      title: 'Your Health, <br><span class="highlight">Our Priority</span>',
      sub: "Compassionate Care, Advanced Treatment",
      desc: "Experience world-class healthcare with compassionate professionals dedicated to your well-being. We are equipped with state-of-the-art technology to serve you better.",
    },
    {
      title: 'Expert Doctors, <br><span class="highlight-alt">Best Care</span>',
      sub: "Specialized Treatments for Complex Cases",
      desc: "Our team of over 50 expert specialists ensures that you receive the most accurate diagnosis and the most effective treatment plans available in modern medicine.",
    },
    {
      title: 'Advanced Tech, <br><span class="highlight">Better Results</span>',
      sub: "Leading the Way in Medical Innovation",
      desc: "Samata Hospital prides itself on housing the latest medical infrastructure, ensuring that every patient gets access to top-tier emergency and recovery facilities.",
    },
  ];

  let currentSlide = 0;
  let currentImageIndex = 0;
  let slideInterval;

  const sliderTextContainer = document.getElementById("slider-text");

  if (sliderTextContainer) {
    const h1 = sliderTextContainer.querySelector("h1");
    const sub = sliderTextContainer.querySelector(".sub-headline");
    const desc = sliderTextContainer.querySelector(".description");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const heroImages = document.querySelectorAll(".hero-img-slide");
    const textElements = [h1, sub, desc];

    function updateHeroImage() {
      if (!heroImages.length) return;
      heroImages.forEach((img) => {
        img.classList.remove("active");
        img.classList.remove("anim-img-enter");
      });
      if (currentImageIndex < 0 || currentImageIndex >= heroImages.length) {
        currentImageIndex = 0;
      }
      const activeImg = heroImages[currentImageIndex];
      if (!activeImg) return;
      void activeImg.offsetWidth; // Force reflow
      activeImg.classList.add("active");
      activeImg.classList.add("anim-img-enter");
    }

    function updateSliderUI() {
      textElements.forEach((el) => {
        if (!el) return;
        el.classList.remove("anim-text-enter");
      });
      sliderTextContainer.style.opacity = 0;

      setTimeout(() => {
        const slide = slides[currentSlide];
        if (h1) h1.innerHTML = slide.title;
        if (sub) sub.textContent = slide.sub;
        if (desc) desc.textContent = slide.desc;
        sliderTextContainer.style.opacity = 1;
        void sliderTextContainer.offsetWidth;

        textElements.forEach((el, index) => {
          if (!el) return;
          el.style.animationDelay = `${index * 0.1}s`;
          el.classList.add("anim-text-enter");
        });
        updateHeroImage();
      }, 50);
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      if (heroImages.length) {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
      }
      updateSliderUI();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      if (heroImages.length) {
        currentImageIndex =
          (currentImageIndex - 1 + heroImages.length) % heroImages.length;
      }
      updateSliderUI();
    }

    function startTimer() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopTimer() {
      if (slideInterval) clearInterval(slideInterval);
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetTimer();
      });
    }

    // Initial State
    textElements.forEach((el, index) => {
      if (!el) return;
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add("anim-text-enter");
    });
    updateHeroImage();
    startTimer();
  }
});
/* =========================================
   Testimonial Slider Logic
   ========================================= */
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".testimonial-slide");
  const nextBtn = document.getElementById("testNext");
  const prevBtn = document.getElementById("testPrev");
  const dotsContainer = document.getElementById("testDots");
  
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Initialize Dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlides() {
    // Remove active class from all
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlides();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
  }

  // Event Listeners
  if(nextBtn && prevBtn) {
      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);
  
      // Auto Play (Optional - 5 seconds)
      setInterval(nextSlide, 5000);
  }
});