// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const signupForm = document.getElementById('signupForm');

// Mobile Navigation Toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    // Close menu when clicking outside
    if (navMenu.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});

// Close mobile menu when clicking outside
function closeMenuOnClickOutside(e) {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form Submission
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(signupForm);
        const name = formData.get('name') || document.querySelector('input[type="text"]').value;
        const email = formData.get('email') || document.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this data to a server
        // For this demo, we'll simulate a successful submission
        showSuccessMessage(name, email);
        
        // Reset form
        signupForm.reset();
    });
}

// Show success message
function showSuccessMessage(name, email) {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you, ${name}!</h3>
            <p>Your free Wealth-Building Starter Kit has been sent to ${email}.</p>
            <p>Check your inbox for the next steps.</p>
        </div>
    `;
    
    // Style the success message
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: fadeIn 0.3s ease;
    `;
    
    // Style the success content
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    `;
    
    // Style the icon
    const icon = successMessage.querySelector('.fa-check-circle');
    icon.style.cssText = `
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 16px;
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(successMessage);
    
    // Close on overlay click
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(successMessage);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
            document.body.removeChild(successMessage);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find current section and activate corresponding link
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// Add fade-in animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .value-item, .testimonial-card, .step').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add fade-in animation CSS
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(fadeInStyle);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll event to set active nav link
    window.dispatchEvent(new Event('scroll'));
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
