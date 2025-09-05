// Marble Moorti Shop - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== ADMIN PASSWORD TOGGLE =====
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('adminPassword');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // ===== ADMIN SIDEBAR NAVIGATION =====
    const sidebarLinks = document.querySelectorAll('.sidebar-nav .nav-item');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // ===== PRODUCT ENQUIRY MODAL =====
    const enquiryModal = document.getElementById('enquiryModal');
    if (enquiryModal) {
        enquiryModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const productCard = button.closest('.product-card') || button.closest('.modal');
            const productTitle = productCard.querySelector('.product-title, .modal-title');
            
            if (productTitle) {
                const productInput = enquiryModal.querySelector('#enquiryProduct');
                if (productInput) {
                    productInput.value = productTitle.textContent.trim();
                }
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== FORM VALIDATION =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailPattern.test(field.value)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                }
            });
            
            // Phone validation
            const phoneFields = form.querySelectorAll('input[type="tel"]');
            phoneFields.forEach(field => {
                const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
                if (field.value && !phonePattern.test(field.value.replace(/\s/g, ''))) {
                    field.classList.add('is-invalid');
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
    });

    // ===== LOADING ANIMATION =====
    function showLoader(button) {
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
            button.disabled = true;
            
            // Store original text for restoration
            button.dataset.originalText = originalText;
        }
    }

    function hideLoader(button) {
        if (button && button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
            button.disabled = false;
        }
    }

    // ===== IMAGE PREVIEW FOR FILE UPLOADS =====
    const fileInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Create or update image preview
                    let preview = input.parentNode.querySelector('.image-preview');
                    if (!preview) {
                        preview = document.createElement('div');
                        preview.className = 'image-preview mt-2';
                        input.parentNode.appendChild(preview);
                    }
                    
                    preview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <button type="button" class="btn btn-sm btn-danger ms-2" onclick="this.parentNode.remove(); document.getElementById('${input.id}').value='';">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // ===== PRODUCT CARD ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe product cards and feature cards
    const animatedElements = document.querySelectorAll('.product-card, .feature-card, .service-card, .stat-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ===== WHATSAPP INTEGRATION =====
    function openWhatsApp(phoneNumber, message = '') {
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }

    // Custom WhatsApp function for dynamic messages
    window.openCustomWhatsApp = function() {
        const customMessage = prompt('आप क्या पूछना चाहते हैं? (What would you like to ask?)');
        if (customMessage) {
            const defaultMessage = `नमस्ते! मैं मार्बल मूर्ति के बारे में पूछना चाहता हूँ:\n\n${customMessage}`;
            openWhatsApp('919876543210', defaultMessage);
        }
    };

    // WhatsApp for specific products
    window.whatsappProduct = function(productName, price) {
        const message = `नमस्ते! मुझे "${productName}" के बारे में जानकारी चाहिए।\n\nPrice: ${price}\n\nकृपया इसके बारे में विस्तार से बताएं।`;
        openWhatsApp('919876543210', message);
    };

    // WhatsApp for custom order
    window.whatsappCustomOrder = function() {
        const message = `नमस्ते! मुझे कस्टम मार्बल मूर्ति बनवानी है।\n\nकृपया निम्नलिखित जानकारी दें:\n- Size और डिज़ाइन\n- Price और delivery time\n- Quality और material की जानकारी\n\nधन्यवाद!`;
        openWhatsApp('919876543210', message);
    };

    // Quick WhatsApp buttons for different purposes
    window.quickWhatsApp = function(type) {
        let message = '';
        switch(type) {
            case 'general':
                message = 'नमस्ते! मुझे मार्बल मूर्ति के बारे में जानकारी चाहिए।';
                break;
            case 'pricing':
                message = 'नमस्ते! कृपया अलग-अलग मूर्तियों की pricing list भेजें।';
                break;
            case 'catalog':
                message = 'नमस्ते! कृपया आपका complete catalog भेजें।';
                break;
            case 'delivery':
                message = 'नमस्ते! मुझे delivery charges और time के बारे में जानना है।';
                break;
            case 'custom':
                message = 'नमस्ते! मुझे custom design की मूर्ति बनवानी है।';
                break;
            default:
                message = 'नमस्ते! मुझे आपकी सेवाओं के बारे में जानकारी चाहिए।';
        }
        openWhatsApp('919876543210', message);
    };

    // Toggle WhatsApp Menu
    window.toggleWhatsAppMenu = function() {
        const menu = document.getElementById('whatsappMenu');
        if (menu) {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            } else {
                menu.classList.add('active');
            }
            
            // Close menu when clicking outside
            setTimeout(() => {
                document.addEventListener('click', function closeMenu(e) {
                    if (!e.target.closest('.whatsapp-float') && !e.target.closest('.whatsapp-menu')) {
                        menu.classList.remove('active');
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 100);
        }
    };

    // ===== SEARCH FUNCTIONALITY (for admin) =====
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.card').querySelector('table tbody');
            
            if (table) {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    });

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // ===== PRICE FORMATTING =====
    function formatPrice(price) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(price);
    }

    // ===== CACHE BUSTING =====
    function bustCache() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            const href = link.href;
            const separator = href.includes('?') ? '&' : '?';
            link.href = href + separator + 'v=' + Date.now();
        });
    }

    // ===== PRODUCT GALLERY FUNCTIONS =====
    window.changeMainImage = function(thumbnailElement) {
        // Remove active class from all thumbnails
        const thumbnails = thumbnailElement.closest('.thumbnail-gallery').querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        thumbnailElement.classList.add('active');
        
        // Update main image (in real implementation, you would change the src)
        const mainImage = thumbnailElement.closest('.product-gallery').querySelector('.main-preview');
        const icon = thumbnailElement.querySelector('i').className;
        mainImage.querySelector('i').className = icon;
        
        // Add animation
        mainImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            mainImage.style.transform = 'scale(1)';
        }, 150);
    };

    window.zoomImage = function(buttonElement) {
        const mainImage = buttonElement.closest('.main-image-container').querySelector('.main-preview');
        
        // Create zoom overlay
        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        
        // Clone the main image for zoom
        const zoomedContent = mainImage.cloneNode(true);
        zoomedContent.classList.add('zoomed-image');
        zoomedContent.style.transform = 'scale(2)';
        
        overlay.appendChild(zoomedContent);
        document.body.appendChild(overlay);
        
        // Close on click
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Close on ESC key
        const handleKeyPress = function(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                document.removeEventListener('keydown', handleKeyPress);
            }
        };
        document.addEventListener('keydown', handleKeyPress);
    };

    // ===== 360 DEGREE VIEW (Future Enhancement) =====
    window.init360View = function(containerElement) {
        // Placeholder for 360-degree product view
        // This would integrate with 360-degree image viewers
        showNotification('360° view feature coming soon!', 'info');
    };

    // ===== PRODUCT COMPARISON =====
    window.toggleCompare = function(productId, productName) {
        let compareList = JSON.parse(localStorage.getItem('compareProducts') || '[]');
        
        const existingIndex = compareList.findIndex(item => item.id === productId);
        
        if (existingIndex > -1) {
            // Remove from comparison
            compareList.splice(existingIndex, 1);
            showNotification(`${productName} removed from comparison`, 'info');
        } else {
            // Add to comparison (max 3 products)
            if (compareList.length >= 3) {
                showNotification('You can compare maximum 3 products', 'warning');
                return;
            }
            compareList.push({ id: productId, name: productName });
            showNotification(`${productName} added to comparison`, 'success');
        }
        
        localStorage.setItem('compareProducts', JSON.stringify(compareList));
        updateCompareButton(productId, compareList.some(item => item.id === productId));
    };

    function updateCompareButton(productId, isInCompare) {
        const buttons = document.querySelectorAll(`[onclick*="${productId}"]`);
        buttons.forEach(button => {
            if (isInCompare) {
                button.classList.add('btn-warning');
                button.classList.remove('btn-outline-secondary');
                button.innerHTML = '<i class="fas fa-check me-1"></i>In Compare';
            } else {
                button.classList.add('btn-outline-secondary');
                button.classList.remove('btn-warning');
                button.innerHTML = '<i class="fas fa-balance-scale me-1"></i>Compare';
            }
        });
    }

    // ===== WISHLIST FUNCTIONALITY =====
    window.toggleWishlist = function(productId, productName) {
        let wishlist = JSON.parse(localStorage.getItem('wishlistProducts') || '[]');
        
        const existingIndex = wishlist.findIndex(item => item.id === productId);
        
        if (existingIndex > -1) {
            wishlist.splice(existingIndex, 1);
            showNotification(`${productName} removed from wishlist`, 'info');
        } else {
            wishlist.push({ 
                id: productId, 
                name: productName, 
                addedAt: new Date().toISOString() 
            });
            showNotification(`${productName} added to wishlist`, 'success');
        }
        
        localStorage.setItem('wishlistProducts', JSON.stringify(wishlist));
        updateWishlistButton(productId, wishlist.some(item => item.id === productId));
    };

    function updateWishlistButton(productId, isInWishlist) {
        const buttons = document.querySelectorAll(`[onclick*="toggleWishlist('${productId}']`);
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            if (isInWishlist) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'text-danger');
            } else {
                icon.classList.remove('fas', 'text-danger');
                icon.classList.add('far');
            }
        });
    }

    // ===== UTILITY FUNCTIONS =====
    window.MarbleMoortiUtils = {
        showLoader,
        hideLoader,
        showNotification,
        formatPrice,
        openWhatsApp,
        bustCache,
        changeMainImage,
        zoomImage,
        toggleCompare,
        toggleWishlist
    };

    // ===== INITIALIZE TOOLTIPS AND POPOVERS =====
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    // Lazy load images when they come into view
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    console.log('Marble Moorti Shop - Website initialized successfully!');
});