// src/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('show');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('show');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let valid = true;
      const inputs = contactForm.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          valid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (valid) {
        // For demo purposes only - would normally submit to server
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate sending
        setTimeout(() => {
          const formMessage = document.createElement('div');
          formMessage.className = 'form-message success';
          formMessage.textContent = 'Your message has been sent successfully!';
          
          contactForm.reset();
          contactForm.appendChild(formMessage);
          
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Remove message after 5 seconds
          setTimeout(() => {
            formMessage.remove();
          }, 5000);
        }, 1500);
      }
    });
  }
});
