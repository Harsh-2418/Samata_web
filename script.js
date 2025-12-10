document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. NAVBAR & DROPDOWN LOGIC
     ========================================= */
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

  // Close mobile menu when a link (not dropdown) is clicked
  document.querySelectorAll(".nav-link:not(.dropdown-toggle)").forEach((n) =>
    n.addEventListener("click", () => {
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    })
  );

  // Navbar Background Scroll Effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // FIXED: Mobile Dropdown Toggle
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      // Check if screen is mobile/tablet size
      if (window.innerWidth <= 992) {
        e.preventDefault(); // Stop the link from jumping to top
        
        const parentDropdown = toggle.closest(".dropdown");
        
        // Optional: Close other dropdowns if you have multiple
        document.querySelectorAll(".dropdown").forEach((d) => {
          if (d !== parentDropdown) {
            d.classList.remove("active");
          }
        });

        // Toggle the clicked dropdown
        parentDropdown.classList.toggle("active");
      }
    });
  });

  // Reset menu on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      if (navMenu) navMenu.classList.remove("active");
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
  });

  /* =========================================
     2. HERO SLIDER LOGIC
     ========================================= */
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

  // Only run slider logic if element exists
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