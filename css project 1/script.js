// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initProductInteractions();
    initNewsletterSignup();
    initSearchFunctionality();
    initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background change on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Product Interactions
function initProductInteractions() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    // Add to Cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Animation effect
            this.textContent = 'Added!';
            this.style.background = '#28a745';
            
            // Show notification
            showNotification(`${productName} added to cart!`, 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#000000';
            }, 2000);
        });
    });
    
    // Quick View functionality
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            showQuickViewModal(productName, productPrice, productImage);
        });
    });
}

// Quick View Modal
function showQuickViewModal(name, price, image) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="modal-info">
                        <h3>${name}</h3>
                        <p class="modal-price">${price}</p>
                        <p>Premium quality sunglasses with 100% UV protection. Perfect for everyday wear and outdoor activities.</p>
                        <div class="modal-actions">
                            <button class="modal-add-to-cart">Add to Cart</button>
                            <button class="modal-view-details">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            background: rgba(0,0,0,0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            z-index: 1;
        }
        
        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            padding: 30px;
        }
        
        .modal-image img {
            width: 100%;
            border-radius: 10px;
        }
        
        .modal-info h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #000000;
        }
        
        .modal-price {
            font-size: 1.8rem;
            font-weight: 700;
            color: #ff6600;
            margin-bottom: 15px;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .modal-add-to-cart,
        .modal-view-details {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .modal-add-to-cart {
            background: #000000;
            color: white;
        }
        
        .modal-view-details {
            background: #f5f5f5;
            color: #000000;
        }
        
        .modal-add-to-cart:hover {
            background: #333;
        }
        
        .modal-view-details:hover {
            background: #e0e0e0;
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
                gap: 20px;
                padding: 20px;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
        modalStyles.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
            modalStyles.remove();
        }
    });
    
    // Modal add to cart
    const modalAddToCart = modal.querySelector('.modal-add-to-cart');
    modalAddToCart.addEventListener('click', () => {
        showNotification(`${name} added to cart!`, 'success');
        modal.remove();
        modalStyles.remove();
    });
}

// Newsletter Signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-signup');
    
    if (newsletterForm) {
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = input.value.trim();
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing!', 'success');
                input.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    if (query.trim()) {
        showNotification(`Searching for: ${query}`, 'info');
        // Here you would typically implement actual search functionality
        console.log('Searching for:', query);
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .feature, .about-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        }
        
        .notification-success {
            background: #28a745;
        }
        
        .notification-error {
            background: #dc3545;
        }
        
        .notification-info {
            background: #17a2b8;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(notificationStyles);
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
            notificationStyles.remove();
        }, 300);
    }, 3000);
}

// Add slideOutRight animation
const slideOutStyles = document.createElement('style');
slideOutStyles.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideOutStyles);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading(); 