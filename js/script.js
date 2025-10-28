// Menu Category Switching
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(mi => mi.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Get category
            const category = this.getAttribute('data-category');

            // Set slideIndex based on category to show relevant cards
            if (category === 'pizza') {
                slideIndex = 0;
            } else if (category === 'burger') {
                slideIndex = 2;
            } else {
                slideIndex = 0; // Default for categories without cards
            }

            updateCarousel();
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Menu Navigation Arrows & Carousel (global so filtering can call it)
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let slideIndex = 0;

const track = document.querySelector('.menu-track');

function getVisibleCards() {
    if (!track) return [];
    return Array.from(track.children).filter(c => c.style.display !== 'none');
}

function updateCarousel() {
    const visibleCards = getVisibleCards();
    if (!track || visibleCards.length === 0) return;

    const gap = parseInt(getComputedStyle(track).gap) || 30;
    const cardWidth = visibleCards[0].getBoundingClientRect().width;
    const viewport = window.innerWidth;
    const visible = viewport <= 768 ? 1 : 2;

    const maxIndex = Math.max(0, visibleCards.length - visible);
    slideIndex = Math.min(slideIndex, maxIndex);

    const offset = (cardWidth + gap) * slideIndex;
    track.style.transform = `translateX(-${offset}px)`;
}

if (nextBtn) {
    nextBtn.addEventListener('click', function() {
        const viewport = window.innerWidth;
        const visible = viewport <= 768 ? 1 : 2;
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, visibleCards.length - visible);
        slideIndex = Math.min(maxIndex, slideIndex + visible);
        updateCarousel();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', function() {
        const viewport = window.innerWidth;
        const visible = viewport <= 768 ? 1 : 2;
        slideIndex = Math.max(0, slideIndex - visible);
        updateCarousel();
    });
}

window.addEventListener('resize', function() {
    updateCarousel();
});

// Initialize after a short delay so CSS has applied
setTimeout(updateCarousel, 60);

// Add to Cart Animation
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '✓ Added!';
        this.style.background = '#4CAF50';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '#FF6B6B';
        }, 2000);
    });
});

// Email Subscription
const emailForm = document.querySelector('.email-input');
if (emailForm) {
    const emailButton = emailForm.querySelector('button');
    const emailInput = emailForm.querySelector('input');
    
    emailButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
            alert('Thank you for subscribing! 🎉');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navbar.style.background = '#FFF';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = '#FFF8F5';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, menu cards, etc.
document.querySelectorAll('.service-card, .menu-card, .testimonial-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});