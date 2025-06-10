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
  
  // Create a mailto: URL from the form
  function createMailtoUrl(form) {
    const recipientName = encodeURIComponent('Tea and Scones Press');
    const recipientEmail = encodeURIComponent('info@teaandsconespress.com');
	const selectedIndex = form.subject.selectedIndex;
    const subject = encodeURIComponent(form.subject.options[selectedIndex].value);
    const body = encodeURIComponent(form.name.value.trim() + "(" + form.email.value.trim() + "): \n\n" + form.message.value.trim());
  
    // Create the mailto URL with proper encoding
    const mailtoUrl = `mailto:${recipientName} <${recipientEmail}>?subject=${subject}&body=${body}`;
  
    return mailtoUrl;
  }
  
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
		const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
		
	    event.preventDefault(); // Prevent the default form submission
  
	    const mailtoUrl = createMailtoUrl(contactForm);

		// Open the email client
		window.location.href = mailtoUrl;
        
        // Construct a mailto: URL and use the user's email client to send the message.
        setTimeout(() => {
		  const formMessage = document.createElement('div');
		  formMessage.className = 'form-message success';
		  formMessage.textContent = 'Your message has been sent to your email client!';

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
