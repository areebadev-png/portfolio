document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            if (!this.name.value || !this.email.value || !this.message.value) {
                alert('Please fill all fields');
                return;
            }

            fetch(this.action, {
                method: 'POST',
                body: new FormData(this)
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById('successModal').classList.add('active');
                    this.reset();
                } else {
                    alert('Error sending message. Please try again.');
                }
            })
            .catch(error => {
                alert('Network error. Please check your connection.');
            });
        });
    }

    // Close modal
    document.querySelector('.modal-close').addEventListener('click', function() {
        document.getElementById('successModal').classList.remove('active');
    });

    // Highlight active navigation item on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    // Typing Animation
const phrases = [
    "I'm a Full Stack Developer.",
    "I'm a Project Manager.",
    "I'm a Web Developer.",
];

const companyPartners = [
    // Add a company entry here when you want to show a partner logo below the hero.
    // Example:
    // { name: 'Satech', url: 'https://satech.com', logo: 'images/satech-logo.png' }
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function renderCompanyLogos(companies) {
    const logosContainer = document.querySelector('.company-logos');
    if (!logosContainer) return;
    if (!companies || companies.length === 0) {
        logosContainer.style.display = 'none';
        return;
    }

    logosContainer.style.display = 'flex';
    logosContainer.innerHTML = companies.map(company => `
        <a href="${company.url}" target="_blank" rel="noopener noreferrer" class="company-logo-link" title="${company.name}">
            <img src="${company.logo}" alt="${company.name} logo">
        </a>
    `).join('');
}

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

if (typingElement) {
    typeEffect();
}

renderCompanyLogos(companyPartners);

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-box, .experience-item, .education-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
