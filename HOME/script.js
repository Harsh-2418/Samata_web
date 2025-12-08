document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // Mobile Menu Toggle
  // -------------------------------
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }

  // -------------------------------
  // Hero Slider (Text + Image)
  // Images are controlled ONLY from HTML
  // -------------------------------
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

  // Elements
  const sliderTextContainer = document.getElementById("slider-text");
  if (!sliderTextContainer) {
    // If hero section isn't on this page, just stop here
    return;
  }

  const h1 = sliderTextContainer.querySelector("h1");
  const sub = sliderTextContainer.querySelector(".sub-headline");
  const desc = sliderTextContainer.querySelector(".description");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const heroImages = document.querySelectorAll(".hero-img-slide");
  const textElements = [h1, sub, desc];

  // -------------------------------
  // Helper: Update Hero Image (from HTML only)
  // -------------------------------
  function updateHeroImage() {
    if (!heroImages.length) return;

    heroImages.forEach((img) => {
      img.classList.remove("active");
      img.classList.remove("anim-img-enter");
    });

    // Safety: wrap index in case of mismatch
    if (currentImageIndex < 0 || currentImageIndex >= heroImages.length) {
      currentImageIndex = 0;
    }

    const activeImg = heroImages[currentImageIndex];
    if (!activeImg) return;

    // Force reflow so animation restarts
    void activeImg.offsetWidth;

    activeImg.classList.add("active");
    activeImg.classList.add("anim-img-enter");
  }

  // -------------------------------
  // Update Slider UI (Text + trigger image)
  // -------------------------------
  function updateSliderUI() {
    // Remove text animation classes
    textElements.forEach((el) => {
      if (!el) return;
      el.classList.remove("anim-text-enter");
    });

    // Brief fade-out for text
    sliderTextContainer.style.opacity = 0;

    setTimeout(() => {
      const slide = slides[currentSlide];

      if (h1) h1.innerHTML = slide.title;
      if (sub) sub.textContent = slide.sub;
      if (desc) desc.textContent = slide.desc;

      sliderTextContainer.style.opacity = 1;

      // Reflow for text animations
      void sliderTextContainer.offsetWidth;

      textElements.forEach((el, index) => {
        if (!el) return;
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add("anim-text-enter");
      });

      // Update hero image
      updateHeroImage();
    }, 50);
  }

  // -------------------------------
  // Slide Navigation
  // -------------------------------
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

  // -------------------------------
  // Auto-slide Timer
  // -------------------------------
  function startTimer() {
    slideInterval = setInterval(nextSlide, 5000); // 5 seconds
  }

  function stopTimer() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  // -------------------------------
  // Button Events
  // -------------------------------
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

  // -------------------------------
  // Initial State
  // -------------------------------
  textElements.forEach((el, index) => {
    if (!el) return;
    el.style.animationDelay = `${index * 0.1}s`;
    el.classList.add("anim-text-enter");
  });

  updateHeroImage();
  startTimer();
});
