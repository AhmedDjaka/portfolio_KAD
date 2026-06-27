// =====================
// NAVIGATION
// =====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// =====================
// SCROLL ANIMATIONS
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-category, .project-card, .timeline-content, .education-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// =====================
// NAVBAR SCROLL EFFECT
// =====================

let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (lastScrollY > 100) {
        navbar.style.background = 'rgba(5, 8, 16, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(5, 8, 16, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// =====================
// FORM SUBMISSION
// =====================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());

        if (!payload.name || !payload.email || !payload.message) {
            showNotification('Veuillez remplir tous les champs requis', 'error');
            return;
        }

        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Envoi en cours...';
        button.disabled = true;

        try {
            const res = await fetch('/.netlify/functions/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Erreur lors de l\'envoi');
            }

            showNotification('Message envoyé avec succès! Confirmation envoyée à votre adresse.', 'success');
            contactForm.reset();
            openContactModal('Message envoyé', 'Merci — votre message a bien été envoyé. Je reviendrai vers vous dès que possible. Vérifiez votre boîte mail pour la confirmation.');
        } catch (err) {
            console.error(err);
            showNotification('Erreur lors de l\'envoi du message. Réessayez plus tard.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

// =====================
// CONTACT MODAL LOGIC
// =====================

function openContactModal(title, message) {
    const modal = document.getElementById('contactModal');
    if (!modal) return;
    const t = modal.querySelector('#contactModalTitle');
    const m = modal.querySelector('#contactModalMessage');
    if (t) t.textContent = title;
    if (m) m.innerHTML = message.replace(/\n/g, '<br/>');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.target.classList.contains('contact-modal-close') || e.target.classList.contains('contact-modal-ok')) {
        closeContactModal();
    }
    if (e.target.classList.contains('contact-modal-backdrop')) {
        closeContactModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeContactModal();
});

// =====================
// NOTIFICATIONS
// =====================

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00d4ff' : '#ff006e'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =====================
// SMOOTH SCROLL BEHAVIOR
// =====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// =====================
// PARALLAX EFFECT
// =====================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (window.scrollY < window.innerHeight) {
        hero.style.backgroundPosition = `0% ${window.scrollY * 0.5}px`;
    }
});

// =====================
// ANIMATED COUNTER
// =====================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const number = parseInt(entry.target.textContent);
            animateCounter(entry.target, number);
            entry.target.dataset.animated = 'true';
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    statsObserver.observe(el);
});

// =====================
// SKILL PROGRESS ANIMATION
// =====================

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillBar 1s ease-out forwards';
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-progress').forEach(el => {
    progressObserver.observe(el);
});

// =====================
// MOUSE FOLLOW EFFECT
// =====================

const mouseFollower = document.createElement('div');
mouseFollower.className = 'mouse-follower';
mouseFollower.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    display: none;
`;
document.body.appendChild(mouseFollower);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseFollower.style.left = (mouseX - 25) + 'px';
    mouseFollower.style.top = (mouseY - 25) + 'px';
});

document.addEventListener('mouseenter', () => {
    mouseFollower.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    mouseFollower.style.display = 'none';
});

// =====================
// HERO STARS ANIMATION
// =====================

function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            background: white;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        starsContainer.appendChild(star);
    }
}

// Add twinkle animation to styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% {
            opacity: 0.3;
        }
        50% {
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Initialize
createStars();

// =====================
// ACTIVE LINK HIGHLIGHTING
// =====================

const updateActiveLink = () => {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

updateActiveLink();

// Add active link style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
`;
document.head.appendChild(activeStyle);

// =====================
// PAGE LOAD ANIMATION
// =====================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// =====================
// KEYBOARD SHORTCUTS
// =====================

document.addEventListener('keydown', (e) => {
    // Press "/" to focus on contact
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }

    // Press "Home" to go to top
    if (e.key === 'Home') {
        e.preventDefault();
        document.querySelector('#accueil').scrollIntoView({ behavior: 'smooth' });
    }
});

let galleryLightboxState = {
    items: [],
    currentIndex: 0
};

function resolveGalleryImagePath(imagePath) {
    if (!imagePath) return '';
    if (/^https?:\/\//i.test(imagePath)) return imagePath;
    if (imagePath.startsWith('images_graphique/')) return imagePath;
    return `images_graphique/${imagePath}`;
}

function normalizeGalleryImages(item) {
    if (Array.isArray(item.images) && item.images.length > 0) {
        return item.images.map((image) => {
            const src = typeof image === 'string' ? image : image.file;
            return {
                src: resolveGalleryImagePath(src),
                title: (typeof image === 'string' ? item.title : image.title) || item.title,
                description: (typeof image === 'string' ? item.description : image.description) || item.description
            };
        });
    }

    return [{
        src: resolveGalleryImagePath(item.file),
        title: item.title,
        description: item.description
    }];
}

function loadGalleryCards() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    fetch('images_graphique/gallery-manifest.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Le manifeste de la galerie est introuvable.');
            }
            return response.json();
        })
        .then(items => {
            if (!Array.isArray(items) || items.length === 0) {
                galleryGrid.innerHTML = '<p class="gallery-empty">Aucune image disponible pour le moment. Ajoutez des fichiers dans images_graphique et mettez à jour gallery-manifest.json.</p>';
                return;
            }

            const cards = items.map(item => {
                const galleryImages = normalizeGalleryImages(item);
                const previewImage = galleryImages[0];
                const imageCount = galleryImages.length;
                const badge = imageCount > 1 ? `<span class="gallery-card-badge">${imageCount} photos</span>` : '';

                return `
                    <div class="gallery-card" data-gallery-images='${JSON.stringify(galleryImages)}'>
                        ${badge}
                        <img src="${previewImage.src}" alt="${previewImage.title}">
                        <div class="gallery-card-content">
                            <h3 class="gallery-card-title">${previewImage.title}</h3>
                            <p class="gallery-card-subtitle">${previewImage.description}</p>
                        </div>
                    </div>
                `;
            }).join('');

            galleryGrid.innerHTML = cards;
            document.querySelectorAll('.gallery-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(el);

                const img = el.querySelector('img');
                if (img) {
                    img.addEventListener('click', () => {
                        const images = JSON.parse(el.getAttribute('data-gallery-images') || '[]');
                        openGalleryLightbox(images, 0);
                    });
                }
            });
        })
        .catch(error => {
            galleryGrid.innerHTML = `<p class="gallery-empty">Erreur lors du chargement de la galerie : ${error.message}</p>`;
            console.error(error);
        });
}

function createGalleryLightbox() {
    if (document.querySelector('.gallery-lightbox')) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
        <div class="gallery-lightbox-inner">
            <button class="gallery-lightbox-close" aria-label="Fermer la galerie">&times;</button>
            <div class="gallery-lightbox-nav">
                <button class="gallery-lightbox-prev" aria-label="Image précédente">&#10094;</button>
                <button class="gallery-lightbox-next" aria-label="Image suivante">&#10095;</button>
            </div>
            <div class="gallery-lightbox-counter"></div>
            <img class="gallery-lightbox-image" src="" alt="">
            <div class="gallery-lightbox-caption">
                <h3></h3>
                <p></p>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const closeButton = lightbox.querySelector('.gallery-lightbox-close');
    const prevButton = lightbox.querySelector('.gallery-lightbox-prev');
    const nextButton = lightbox.querySelector('.gallery-lightbox-next');
    const image = lightbox.querySelector('.gallery-lightbox-image');
    const captionTitle = lightbox.querySelector('.gallery-lightbox-caption h3');
    const captionText = lightbox.querySelector('.gallery-lightbox-caption p');
    const counter = lightbox.querySelector('.gallery-lightbox-counter');

    const renderCurrentImage = () => {
        if (!galleryLightboxState.items.length) return;

        const item = galleryLightboxState.items[galleryLightboxState.currentIndex];
        image.src = item.src;
        image.alt = item.title || '';
        captionTitle.textContent = item.title || '';
        captionText.textContent = item.description || '';

        if (galleryLightboxState.items.length > 1) {
            counter.textContent = `${galleryLightboxState.currentIndex + 1} / ${galleryLightboxState.items.length}`;
            prevButton.style.display = 'flex';
            nextButton.style.display = 'flex';
        } else {
            counter.textContent = '';
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }

        prevButton.classList.toggle('disabled', galleryLightboxState.currentIndex === 0);
        nextButton.classList.toggle('disabled', galleryLightboxState.currentIndex === galleryLightboxState.items.length - 1);
    };

    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('open');
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove('open');
        }
    });

    prevButton.addEventListener('click', () => {
        if (galleryLightboxState.currentIndex > 0) {
            galleryLightboxState.currentIndex -= 1;
            renderCurrentImage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (galleryLightboxState.currentIndex < galleryLightboxState.items.length - 1) {
            galleryLightboxState.currentIndex += 1;
            renderCurrentImage();
        } else {
            lightbox.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('open')) return;

        if (event.key === 'Escape') {
            lightbox.classList.remove('open');
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (galleryLightboxState.currentIndex < galleryLightboxState.items.length - 1) {
                galleryLightboxState.currentIndex += 1;
                renderCurrentImage();
            } else {
                lightbox.classList.remove('open');
            }
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (galleryLightboxState.currentIndex > 0) {
                galleryLightboxState.currentIndex -= 1;
                renderCurrentImage();
            }
        }
    });
}

function openGalleryLightbox(images, startIndex = 0) {
    createGalleryLightbox();
    const lightbox = document.querySelector('.gallery-lightbox');

    galleryLightboxState.items = Array.isArray(images) ? images : [images];
    galleryLightboxState.currentIndex = Math.min(Math.max(0, startIndex), Math.max(0, galleryLightboxState.items.length - 1));

    const image = lightbox.querySelector('.gallery-lightbox-image');
    const captionTitle = lightbox.querySelector('.gallery-lightbox-caption h3');
    const captionText = lightbox.querySelector('.gallery-lightbox-caption p');
    const counter = lightbox.querySelector('.gallery-lightbox-counter');
    const prevButton = lightbox.querySelector('.gallery-lightbox-prev');
    const nextButton = lightbox.querySelector('.gallery-lightbox-next');

    if (!galleryLightboxState.items.length) {
        image.src = '';
        image.alt = '';
        captionTitle.textContent = '';
        captionText.textContent = '';
        counter.textContent = '';
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        lightbox.classList.add('open');
        return;
    }

    const currentItem = galleryLightboxState.items[galleryLightboxState.currentIndex];
    image.src = currentItem.src;
    image.alt = currentItem.title || '';
    captionTitle.textContent = currentItem.title || '';
    captionText.textContent = currentItem.description || '';

    if (galleryLightboxState.items.length > 1) {
        counter.textContent = `${galleryLightboxState.currentIndex + 1} / ${galleryLightboxState.items.length}`;
        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';
    } else {
        counter.textContent = '';
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }

    prevButton.classList.toggle('disabled', galleryLightboxState.currentIndex === 0);
    nextButton.classList.toggle('disabled', galleryLightboxState.currentIndex === galleryLightboxState.items.length - 1);
    lightbox.classList.add('open');
}

document.addEventListener('DOMContentLoaded', loadGalleryCards);

console.log('%c 🚀 Portfolio de KONE Ahmed Djakaridja', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%c Bienvenue! Merci de visiter mon portfolio.', 'color: #8338ec; font-size: 12px;');

// Remove horizontal projects navigation; section is now vertically stacked.

