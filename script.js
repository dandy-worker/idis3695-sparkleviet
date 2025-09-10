// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// FAQ toggle functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('span:last-child');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('span:last-child').textContent = '+';
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
    icon.textContent = faqItem.classList.contains('active') ? '−' : '+';
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    // Simple form validation and success message
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        form.reset();
    }, 500);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Header scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Add hamburger click event
document.getElementById('hamburger').addEventListener('click', toggleMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add loading state to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact') {
            return; // Let normal navigation happen
        }
        
        // Add loading effect for other CTAs
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.style.opacity = '0.7';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.opacity = '1';
        }, 1500);
    });
});

// Dynamic pricing based on location (demo)
const pricing = {
    'vietnam': '₫2,490,000',
    'default': '$99 USD'
};

// Add floating action button for mobile
if (window.innerWidth <= 768) {
    const fab = document.createElement('div');
    fab.innerHTML = '<a href="#contact" class="cta-button">Get Started</a>';
    fab.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50px;
        box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
    `;
    document.body.appendChild(fab);
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    z-index: 1000;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});