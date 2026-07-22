(function () {
  document.body.classList.add("js-loaded");

  var nav = document.querySelector(".site-nav");
  var hamburger = document.querySelector(".hamburger");
  var navLinks = document.querySelectorAll(".nav-links a");
  var backToTop = document.querySelector(".back-to-top");
  var branchItems = document.querySelectorAll(".branch-item");
  var sections = document.querySelectorAll("main section[id]");
  var lastScroll = window.scrollY;

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
    });
  });

  if ("IntersectionObserver" in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".fade-in").forEach(function (item) {
      fadeObserver.observe(item);
    });
  } else {
    document.querySelectorAll(".fade-in").forEach(function (item) {
      item.classList.add("visible");
    });
  }

  window.addEventListener("scroll", function () {
    var currentScroll = window.scrollY;

    if (nav) {
      if (currentScroll > lastScroll && currentScroll > 140) {
        nav.classList.add("nav-hidden");
      } else {
        nav.classList.remove("nav-hidden");
      }
    }

    lastScroll = currentScroll;
    setActiveLink();
  });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  branchItems.forEach(function (item) {
    item.addEventListener("click", function () {
      branchItems.forEach(function (branch) {
        branch.classList.remove("active");
      });
      item.classList.add("active");
    });
  });

  function setActiveLink() {
    var currentId = "";

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === "#" + currentId);
    });
  }

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitButton = form.querySelector("button[type='submit']");
      var originalText = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Form service unavailable");
          }
          form.reset();
          window.alert("Thanks. I will get back to you soon.");
        })
        .catch(function () {
          window.location.href =
            "https://wa.me/60167238148?text=Hi%20William%2C%20I%20would%20like%20to%20do%20a%20simple%20protection%20review.";
        })
        .finally(function () {
          if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          }
        });
    });
  }

  setActiveLink();
})();
