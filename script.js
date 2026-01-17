// script.js
// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Particles.js Configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6c63ff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // Animate counter numbers
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const suffix = element.textContent.includes('.') ? 10 : 1;
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (suffix === 10 ? '.0' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (suffix === 10 ? '.0' : '');
            }
        }, 30);
    }
    
    // Initialize counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
    
    // Game card interaction
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.game-glow');
            if (glow) glow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.game-glow');
            if (glow) glow.style.opacity = '0';
        });
    });
    
    // Navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'rgba(10, 14, 23, 0.95)';
            navMenu.style.padding = '1rem';
            navMenu.style.gap = '0.5rem';
            navMenu.style.backdropFilter = 'blur(10px)';
        });
    }
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
                document.body.style.setProperty('--dark', '#f0f2f5');
                document.body.style.setProperty('--darker', '#ffffff');
                document.body.style.setProperty('--light', '#0a0e17');
                document.body.style.setProperty('--gray', '#5a5f7a');
            } else {
                icon.className = 'fas fa-moon';
                document.body.style.setProperty('--dark', '#0a0e17');
                document.body.style.setProperty('--darker', '#050811');
                document.body.style.setProperty('--light', '#ffffff');
                document.body.style.setProperty('--gray', '#8a8fb5');
            }
        });
    }
    
    // Smooth scrolling for navigation links
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
    
    // Add active class to navigation links on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
    
    // Trail effect for mouse
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail';
    document.body.appendChild(trailContainer);
    
    let trailElements = [];
    const trailCount = 15;
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail-dot';
        trail.style.opacity = '0';
        trailContainer.appendChild(trail);
        trailElements.push(trail);
    }
    
    let currentTrail = 0;
    let lastX = 0, lastY = 0;
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        const trail = trailElements[currentTrail];
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.opacity = '0.5';
        trail.style.transform = `scale(${1 - (currentTrail / trailCount)})`;
        
        currentTrail = (currentTrail + 1) % trailCount;
        
        // Add line between points for smooth effect
        if (Math.abs(x - lastX) > 5 || Math.abs(y - lastY) > 5) {
            lastX = x;
            lastY = y;
        }
    });
    
    // Add CSS for mouse trail
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        .mouse-trail {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        }
        .trail-dot {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #6c63ff, #36d1dc);
            border-radius: 50%;
            pointer-events: none;
            transition: opacity 0.3s, transform 0.3s;
            transform-origin: center;
        }
        .light-theme .trail-dot {
            background: linear-gradient(45deg, #ff3366, #ff6584);
        }
    `;
    document.head.appendChild(trailStyle);
    
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Audio hover effect for buttons
    const buttons = document.querySelectorAll('button, .btn-explore, .play-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.05)', '');
        });
    });
    
    // Initialize with counters if already in viewport
    if (statsSection.getBoundingClientRect().top < window.innerHeight) {
        const counters = statsSection.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }
});
// Add to your existing script.js

// Toggle password visibility
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password strength indicator
function initializePasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        const width = (strength / 5) * 100;
        strengthFill.style.width = `${width}%`;
        
        // Update color and text
        if (strength <= 2) {
            strengthFill.style.background = 'var(--danger)';
            strengthText.textContent = 'Weak password';
        } else if (strength <= 4) {
            strengthFill.style.background = 'var(--warning)';
            strengthText.textContent = 'Good password';
        } else {
            strengthFill.style.background = 'var(--success)';
            strengthText.textContent = 'Strong password!';
        }
    });
}

// Form validation
function initializeFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would make an API call here
            console.log('Login attempt:', { email, password });
            
            // Simulate successful login
            alert('Login successful! Redirecting to dashboard...');
            // window.location.href = 'index.html';
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.querySelector('input[name="terms"]').checked;
            
            // Basic validation
            if (!username || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!terms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            // In a real app, you would make an API call here
            console.log('Signup attempt:', { 
                username, 
                email, 
                password,
                platform: document.getElementById('gamingPlatform').value,
                games: document.getElementById('favoriteGames').value
            });
            
            // Simulate successful signup
            alert('Account created successfully! Welcome to GameVerse!');
            // window.location.href = 'index.html';
        });
    }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializePasswordToggle();
    initializePasswordStrength();
    initializeFormValidation();
    
    // Initialize particles if on auth pages
    if (document.querySelector('.auth-container')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#2563eb" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#2563eb",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }
});