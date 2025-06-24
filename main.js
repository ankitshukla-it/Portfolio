document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentTestimonial = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    document.querySelector('.prev').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    document.querySelector('.next').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Scroll animations
    const animateElements = document.querySelectorAll('[data-animate]');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check on load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log('Form submitted:', { name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});



// Detect Chrome desktop mode on mobile
function isMobileDesktopMode() {
    return window.innerWidth < 1024 && 
           navigator.userAgent.match(/Mobile/i) && 
           matchMedia('(pointer:fine)').matches;
}

if (isMobileDesktopMode()) {
    document.documentElement.classList.add('desktop-mode-mobile');
    
    // Force responsive layout
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // After 4 seconds (time for terminal animation), remove loading class and add loaded
    setTimeout(function() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 4000); // 4000ms = 4 seconds
});


document.querySelector('.logo').addEventListener('click', function() {
    this.classList.add('active');
    setTimeout(() => {
        this.classList.remove('active');
    }, 300); // Remove after 300ms
});



// Add this to your main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Add touch event listeners for better mobile desktop mode experience
    if (matchMedia('(hover: none) and (pointer: coarse)').matches) {
        const sections = ['experience', 'skills', 'courses'];
        
        sections.forEach(sectionId => {
            const container = document.querySelector(`#${sectionId} .container`);
            if (container) {
                container.addEventListener('touchstart', handleTouchStart, false);
                container.addEventListener('touchmove', handleTouchMove, false);
            }
        });
        
        let xDown = null;
        
        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
        }
        
        function handleTouchMove(evt) {
            if (!xDown) return;
            
            const xUp = evt.touches[0].clientX;
            const xDiff = xDown - xUp;
            
            if (Math.abs(xDiff) > 5) { // threshold
                evt.preventDefault();
                const container = evt.currentTarget.querySelector('.exp-cards-container, .skills-container, .courses-grid');
                if (container) {
                    container.scrollBy({ 
                        left: xDiff > 0 ? 100 : -100,
                        behavior: 'smooth'
                    });
                }
            }
            xDown = null;
        }
    }
});


