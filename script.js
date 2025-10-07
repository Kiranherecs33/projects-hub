document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORS ---
    const topBar = document.querySelector('.top-bar');
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle-btn');
    const mobileNavPanel = document.getElementById('mobile-nav');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const navLinks = document.querySelectorAll('header .nav-links a');
    const mobileNavPanelLinks = document.querySelectorAll('.mobile-nav-panel .mobile-nav-links a');
    const sliderWrapper = document.getElementById('hero-slider');
    let slidesContainer;
    const interactiveUnderlineElements = document.querySelectorAll('.interactive-underline');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const animatedElementsOnScroll = document.querySelectorAll('.animate-on-scroll');
    const ctaTextElements = document.querySelectorAll('.cta-section .animate-text');
    const techIndexAnimatedTextGroups = document.querySelectorAll('.tech-index-section .animate-text-group');
    const whatWeDoStatsBar = document.querySelector('.animated-stats-bar');
    const techTrendsAnimatedTextGroups = document.querySelectorAll('.tech-trends-section .animate-on-scroll-group');
    const skillItemsForProgressBar = document.querySelectorAll('.skill-item.animate-progress-bar');
    const contactInfoAnimatedTextGroups = document.querySelectorAll('.contact-info-left.animate-on-scroll-group');
    const contactForm = document.querySelector('.contact-form');
    const partnershipCTAAnimatedTextGroups = document.querySelectorAll('.partnership-cta-section .animate-on-scroll-group');
    const portfolioFilterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
    const portfolioGalleryItems = document.querySelectorAll('.portfolio-gallery-grid .gallery-item');


    // --- HERO SLIDER ---
    const slidesData = [
        { image: 'hero/slide/slide1.jpg', content: { subHeading: 'Welcome to Hurst Enterprises', mainHeading: 'Designs that Speak, Experiences that Connect', description: 'We are 100+ professional software engineers with more than 10 years of experience in delivering superior products.', } },
        { image: 'hero/slide/slide2.jpg', content: { subHeading: 'We Create Leading Digital Products', mainHeading: 'END-TO-END DEVELOPMENT', description: 'We are 100+ professional software engineers with more than 10 years of experience in delivering superior products.', } },
        { image: 'hero/slide/slide3.jpg', content: { subHeading: 'Only High-Quality Services', mainHeading: 'SOFTWARE IT OUTSOURCING', description: 'We are 100+ professional software engineers with more than 10 years of experience in delivering superior products.', } }
    ];
    let currentSlideIndex = 0;
    let autoSlideInterval;
    const autoSlideDelay = 5000;
    let totalSlides = 0;

    function createSlides() {
        if (!sliderWrapper) return false;
        slidesContainer = sliderWrapper.querySelector('.hero-slides-container');
        if (!slidesContainer) return false;
        slidesContainer.innerHTML = '';
        slidesData.forEach(slideItemData => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('hero-slide-item');
            slideDiv.style.backgroundImage = `url('${slideItemData.image}')`;
            const overlayDiv = document.createElement('div');
            overlayDiv.classList.add('hero-overlay');
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('hero-content');
            const subHeadingP = document.createElement('p');
            subHeadingP.classList.add('sub-heading');
            subHeadingP.textContent = slideItemData.content.subHeading;
            const mainHeadingH1 = document.createElement('h1');
            mainHeadingH1.classList.add('main-heading');
            mainHeadingH1.textContent = slideItemData.content.mainHeading;
            const descriptionP = document.createElement('p');
            descriptionP.classList.add('description');
            descriptionP.textContent = slideItemData.content.description;
            const buttonA = document.createElement('a');
            buttonA.href = "#";
            buttonA.classList.add('btn', 'btn-hero');
            buttonA.textContent = 'LEARN MORE';
            contentDiv.appendChild(subHeadingP);
            contentDiv.appendChild(mainHeadingH1);
            contentDiv.appendChild(descriptionP);
            contentDiv.appendChild(buttonA);
            slideDiv.appendChild(overlayDiv);
            slideDiv.appendChild(contentDiv);
            slidesContainer.appendChild(slideDiv);
        });
        totalSlides = slidesData.length;
        if (totalSlides > 0) {
            slidesContainer.style.width = `${totalSlides * 100}%`;
            const slideItems = slidesContainer.querySelectorAll('.hero-slide-item');
            slideItems.forEach(item => { item.style.width = `${100 / totalSlides}%`; });
        }
        return true;
    }

    function manageSlideContentAnimation(slideElement, action) {
        if (!slideElement) return;
        const contentElements = slideElement.querySelectorAll('.hero-content > *');
        contentElements.forEach(el => {
            el.classList.remove('content-animate-final', 'content-animate-init');
            void el.offsetWidth;
            if (action === 'animateIn') {
                el.classList.add('content-animate-init');
                setTimeout(() => { el.classList.remove('content-animate-init'); el.classList.add('content-animate-final'); }, 30);
            } else if (action === 'reset') {
                el.classList.add('content-animate-init');
            }
        });
    }

    function goToSlide(index) {
        if (!slidesContainer || totalSlides === 0) return;
        const percentagePerSlide = 100 / totalSlides;
        slidesContainer.style.transform = `translateX(-${index * percentagePerSlide}%)`;
        const allSlideItems = slidesContainer.querySelectorAll('.hero-slide-item');
        allSlideItems.forEach((slide, i) => { manageSlideContentAnimation(slide, i === index ? 'animateIn' : 'reset'); });
        currentSlideIndex = index;
    }

    function nextSlideAction() {
        if (totalSlides === 0) return;
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        goToSlide(currentSlideIndex);
    }

    function prevSlideAction() {
        if (totalSlides === 0) return;
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlideIndex);
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        if (totalSlides > 0) { autoSlideInterval = setInterval(nextSlideAction, autoSlideDelay); }
    }

    function initSlider() {
        if (sliderWrapper && slidesData.length > 0) {
            if (createSlides()) {
                setTimeout(() => { goToSlide(0); startAutoSlide(); }, 100);
                const prevButton = document.getElementById('hero-slider-prev');
                const nextButton = document.getElementById('hero-slider-next');
                if (prevButton && nextButton) {
                    prevButton.addEventListener('click', () => { prevSlideAction(); startAutoSlide(); });
                    nextButton.addEventListener('click', () => { nextSlideAction(); startAutoSlide(); });
                }
            }
        }
    }
    initSlider();

    // --- STICKY HEADER ---
    if (topBar) {
        window.addEventListener('scroll', () => {
            let currentTopBarHeight = getComputedStyle(topBar).display !== 'none' ? topBar.offsetHeight : 0;
            if (window.scrollY > currentTopBarHeight) { document.body.classList.add('scrolled'); }
            else { document.body.classList.remove('scrolled'); }
        });
    }

    // --- MOBILE MENU ---
    if (mobileMenuToggleBtn && mobileNavPanel && mobileMenuCloseBtn) {
        mobileMenuToggleBtn.addEventListener('click', () => { mobileNavPanel.classList.add('open'); document.body.style.overflow = 'hidden'; });
        mobileMenuCloseBtn.addEventListener('click', () => { mobileNavPanel.classList.remove('open'); document.body.style.overflow = ''; });
    }
    function closeMobileMenu() {
        if (mobileNavPanel) { mobileNavPanel.classList.remove('open'); document.body.style.overflow = ''; }
    }
    mobileNavPanelLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            setActiveLink(link, mobileNavPanelLinks);
            const desktopEquivalentHref = link.getAttribute('href');
            const desktopLink = document.querySelector(`header .nav-links a[href="${desktopEquivalentHref}"]`);
            if (desktopLink) setActiveLink(desktopLink, navLinks);
        });
    });

    // --- ACTIVE NAVIGATION LINK ---
    function setActiveLink(clickedLink, allLinks) {
        allLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    navLinks.forEach(link => { link.addEventListener('click', function () { setActiveLink(this, navLinks); }); });

    // --- INTERACTIVE UNDERLINE ---
    interactiveUnderlineElements.forEach(element => {
        element.addEventListener('click', function() {
            if (this.parentElement && this.parentElement.classList.contains('feature-item')) {
                const featureGroup = this.closest('.features-grid');
                if (featureGroup) { featureGroup.querySelectorAll('.feature-item h3.interactive-underline').forEach(h => h.classList.remove('active')); }
            }
            this.classList.add('active');
        });
    });

    // --- SCROLL TO TOP BUTTON ---
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) { scrollToTopBtn.classList.add('visible'); }
            else { scrollToTopBtn.classList.remove('visible'); }
        });
        scrollToTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // --- NUMBER COUNTING & SCROLL ANIMATION (GENERALIZED) ---
    function animateValue(element, start, end, duration, isStatNumber = false) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) { window.requestAnimationFrame(step); }
            else { element.textContent = end; }
        };
        window.requestAnimationFrame(step);
    }

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    const generalObserverOptions = { threshold: 0.25 };
    const textObserverOptions = { root: null, threshold: 0.3 };
    const techIndexTextObserverOptions = { root: null, threshold: 0.4 };
    const statsBarObserverOptions = { threshold: 0.5 };
    const techTrendsTextObserverOptions = { threshold: 0.2 };
    const progressBarObserverOptions = { threshold: 0.5 };
    const contactTextObserverOptions = { threshold: 0.2 };
    const partnershipCTAObserverOptions = { root: null, threshold: 0.3 };

    const observerCallback = (entries, observerInstance, isStat = false, isTextGroup = false, isProgressBar = false) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (isStat) {
                    const numberElement = entry.target.querySelector('.stat-number, .stat-number-large'); // Combined selector
                    if (numberElement && !numberElement.dataset.animated) {
                        const targetValue = parseInt(numberElement.dataset.target, 10);
                        if (!isNaN(targetValue)) {
                            animateValue(numberElement, 0, targetValue, isStat === 'fast' ? 1200 : 2000, true);
                            numberElement.dataset.animated = "true";
                        }
                    }
                }
                if (isProgressBar) {
                    const progressBarFill = entry.target.querySelector('.progress-bar-fill');
                    const percentageElement = entry.target.querySelector('.skill-percentage');
                    if (progressBarFill && percentageElement && !entry.target.dataset.animated) {
                        const targetWidth = progressBarFill.dataset.width;
                        const targetPercentage = parseInt(percentageElement.dataset.value, 10);
                        animateProgressBarLogic(progressBarFill, targetWidth, percentageElement, targetPercentage);
                        entry.target.dataset.animated = "true";
                    }
                }
                if (isTextGroup || entry.target.classList.contains('animate-text') || entry.target.classList.contains('animate-text-group') || entry.target.classList.contains('animate-on-scroll-group')) {
                     observerInstance.unobserve(entry.target); // Animate text once
                }
            }
        });
    };

    if (animatedElementsOnScroll.length > 0) {
        const statsObserver = new IntersectionObserver((entries, obs) => observerCallback(entries, obs, true), generalObserverOptions);
        animatedElementsOnScroll.forEach(el => statsObserver.observe(el));
    }
    if (ctaTextElements.length > 0) {
        const ctaTextObserver = new IntersectionObserver((entries, obs) => observerCallback(entries, obs, false, true), textObserverOptions);
        ctaTextElements.forEach(el => ctaTextObserver.observe(el));
    }
    if (techIndexAnimatedTextGroups.length > 0) {
        const techIndexObserver = new IntersectionObserver((entries, obs) => observerCallback(entries, obs, false, true), techIndexTextObserverOptions);
        techIndexAnimatedTextGroups.forEach(group => techIndexObserver.observe(group));
    }
    if (whatWeDoStatsBar) {
        let statsAnimated = false;
        const whatWeDoStatsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number-large');
                    statNumbers.forEach(numEl => {
                        const target = parseInt(numEl.dataset.target, 10);
                        if (!isNaN(target)) { animateValue(numEl, 0, target, 1200, true); } // Fast animation
                    });
                    statsAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, statsBarObserverOptions);
        whatWeDoStatsObserver.observe(whatWeDoStatsBar);
    }
    if (techTrendsAnimatedTextGroups.length > 0) {
        const techTrendsObserver = new IntersectionObserver((entries, obs) => observerCallback(entries, obs, false, true), techTrendsTextObserverOptions);
        techTrendsAnimatedTextGroups.forEach(group => techTrendsObserver.observe(group));
    }

    // --- PROGRESS BAR ANIMATION LOGIC ---
    function animateProgressBarLogic(barFill, targetWidth, percentageEl, targetPercentage) {
        barFill.style.width = targetWidth + '%';
        let currentPercentage = 0;
        const duration = 1500;
        const increment = targetPercentage / (duration / 16);
        function updatePercentage() {
            currentPercentage += increment;
            if (currentPercentage < targetPercentage) {
                percentageEl.textContent = Math.ceil(currentPercentage) + '%';
                requestAnimationFrame(updatePercentage);
            } else {
                percentageEl.textContent = targetPercentage + '%';
            }
        }
        requestAnimationFrame(updatePercentage);
    }
    if (skillItemsForProgressBar.length > 0) {
        const progressBarObs = new IntersectionObserver((entries, obs) => observerCallback(entries, obs, false, false, true), progressBarObserverOptions);
        skillItemsForProgressBar.forEach(item => progressBarObs.observe(item));
    }
    if (contactInfoAnimatedTextGroups.length > 0) {
        const contactTextObs = new IntersectionObserver((entries, obs) => observerCallback(entries, obs, false, true), contactTextObserverOptions);
        contactInfoAnimatedTextGroups.forEach(group => contactTextObs.observe(group));
    }

    // --- CONTACT FORM SUBMISSION ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = this.querySelector('#yourName').value;
            const email = this.querySelector('#yourEmail').value;
            const message = this.querySelector('#yourMessage').value;
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') { alert('Please fill in all required fields.'); return; }
            if (!validateEmail(email)) { alert('Please enter a valid email address.'); return; }
            alert('Message Sent! (This is a demo)');
            this.reset();
        });
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (partnershipCTAAnimatedTextGroups.length > 0) {
        const partnershipCTAObserver = new IntersectionObserver((entries, obs) => observerCallback(entries, obs, false, true), partnershipCTAObserverOptions);
        partnershipCTAAnimatedTextGroups.forEach(group => partnershipCTAObserver.observe(group));
    }

    // --- PORTFOLIO FILTER LOGIC ---
    if (portfolioFilterButtons.length > 0 && portfolioGalleryItems.length > 0) {
        portfolioFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filterValue = this.dataset.filter;
                portfolioGalleryItems.forEach(item => {
                    item.classList.add('hide');
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                    }
                });
            });
        });
    }
});







//-------form------------
document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORS (Consolidated - Ensure these match your HTML) ---
    
    // General UI Elements
    const topBar = document.querySelector('.top-bar');
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle-btn');
    const mobileNavPanel = document.getElementById('mobile-nav');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const navLinks = document.querySelectorAll('header .nav-links a'); // Desktop nav links
    const mobileNavPanelLinks = document.querySelectorAll('.mobile-nav-panel .mobile-nav-links a');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Hero Slider (if on this page)
    const sliderWrapper = document.getElementById('hero-slider');
    let slidesContainer; 
    
    // Elements for various animations (copy from your full script)
    const interactiveUnderlineElements = document.querySelectorAll('.interactive-underline');
    const animatedElementsOnScroll = document.querySelectorAll('.animate-on-scroll');
    // ... (add other selectors for animated groups like ctaTextElements, techIndexAnimatedTextGroups, etc.)

    // --- AUTHENTICATION MODAL & FORM SELECTORS ---
    const authModal = document.getElementById('authModal');
    const closeAuthModalBtn = document.getElementById('closeAuthModal');
    
    // Navbar Buttons to open modal
    const signInBtnNav = document.getElementById('signInBtnNav');
    const signUpBtnNav = document.getElementById('signUpBtnNav');
    const signInBtnMobile = document.getElementById('signInBtnMobile');
    const signUpBtnMobile = document.getElementById('signUpBtnMobile');

    // Auth Form Specific Elements (inside #authModal)
    const authTitleText = document.querySelector("#authModal .title-text"); 
    const authFormInner = document.querySelector("#authModal .form-inner"); 
    
    const loginRadioAuth = document.getElementById('loginRadioAuth'); 
    const signupRadioAuth = document.getElementById('signupRadioAuth'); 
    
    const loginLabelAuth = document.querySelector("#authModal label.slide.login[for='loginRadioAuth']");
    const signupLabelAuth = document.querySelector("#authModal label.slide.signup[for='signupRadioAuth']");
    
    const switchToSignupLinkModal = document.getElementById('authSwitchToSignupLink');
    const switchToLoginLinkModal = document.getElementById('authSwitchToLoginLink');

    const authLoginForm = document.getElementById('authLoginForm');
    const authSignupForm = document.getElementById('authSignupForm');

    // Forgot Password Modal Selectors
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const forgotPasswordLinkFromLogin = document.getElementById('authForgotPasswordLink'); 
    const closeForgotPasswordModalBtn = document.getElementById('closeForgotPasswordModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');


    // --- MODAL VISIBILITY FUNCTIONS ---
    function openAuthModal(showSignup = false) {
        if (authModal) {
            authModal.classList.add('show');
            document.body.style.overflow = 'hidden';

            if (showSignup) {
                if (signupRadioAuth) signupRadioAuth.checked = true;
                // Trigger click on label to also handle visual tab slide via CSS
                if (signupLabelAuth) signupLabelAuth.dispatchEvent(new Event('click', {bubbles:true})); 
            } else {
                if (loginRadioAuth) loginRadioAuth.checked = true;
                if (loginLabelAuth) loginLabelAuth.dispatchEvent(new Event('click', {bubbles:true}));
            }
        }
    }

    function closeAuthModal() {
        if (authModal && authModal.classList.contains('show')) {
            authModal.classList.remove('show');
            if (!forgotPasswordModal || !forgotPasswordModal.classList.contains('show')) {
                document.body.style.overflow = '';
            }
        }
    }

    function openForgotPasswordModal() {
        if (forgotPasswordModal) {
            closeAuthModal(); 
            forgotPasswordModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeForgotPasswordModal() {
        if (forgotPasswordModal && forgotPasswordModal.classList.contains('show')) {
            forgotPasswordModal.classList.remove('show');
            document.body.style.overflow = ''; 
        }
    }

    // --- EVENT LISTENERS FOR MODAL TRIGGERS ---
    if (signInBtnNav) signInBtnNav.addEventListener('click', (e) => { e.preventDefault(); openAuthModal(false); });
    if (signUpBtnNav) signUpBtnNav.addEventListener('click', (e) => { e.preventDefault(); openAuthModal(true); });
    
    // Ensure closeMobileMenu function is defined if you use it here
    // function closeMobileMenu() { ... } 
    if (signInBtnMobile) signInBtnMobile.addEventListener('click', (e) => { 
        e.preventDefault(); 
        if (typeof closeMobileMenu === 'function') closeMobileMenu(); 
        openAuthModal(false); 
    });
    if (signUpBtnMobile) signUpBtnMobile.addEventListener('click', (e) => { 
        e.preventDefault(); 
        if (typeof closeMobileMenu === 'function') closeMobileMenu(); 
        openAuthModal(true); 
    });

    if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', closeAuthModal);
    if (authModal) {
        authModal.addEventListener('click', (e) => { if (e.target === authModal) closeAuthModal(); });
    }

    // Forgot Password Modal Triggers
    if (forgotPasswordLinkFromLogin) forgotPasswordLinkFromLogin.addEventListener('click', (e) => { e.preventDefault(); openForgotPasswordModal(); });
    if (closeForgotPasswordModalBtn) closeForgotPasswordModalBtn.addEventListener('click', closeForgotPasswordModal);
    if (forgotPasswordModal) {
        forgotPasswordModal.addEventListener('click', (e) => { if (e.target === forgotPasswordModal) closeForgotPasswordModal(); });
    }

    // --- AUTH FORM TAB SWITCHING LOGIC ---
    // The JavaScript for direct style manipulation of formInner and titleText is now controlled by clicking labels.
    // We just need to ensure labels correctly check their respective radio buttons.

    if (signupLabelAuth && authFormInner && authTitleText && signupRadioAuth) {
        signupLabelAuth.addEventListener('click', () => {
            // Radio button will be checked by label click. CSS will handle slider-tab.
            authFormInner.style.marginLeft = "-100%"; // Slides the form content
            authTitleText.style.marginLeft = "-50%";  // Slides the title "Login Form / Signup Form"
        });
    }
    if (loginLabelAuth && authFormInner && authTitleText && loginRadioAuth) {
        loginLabelAuth.addEventListener('click', () => {
            authFormInner.style.marginLeft = "0%";
            authTitleText.style.marginLeft = "0%";
        });
    }

    // Links inside the form to switch tabs
    if (switchToSignupLinkModal && signupRadioAuth) { // Check signupRadioAuth for label click
        switchToSignupLinkModal.addEventListener('click', (e) => {
            e.preventDefault();
            signupRadioAuth.checked = true; // Directly check the radio
            // Manually trigger style changes if label click isn't enough or if label is hidden
            if (authFormInner) authFormInner.style.marginLeft = "-100%";
            if (authTitleText) authTitleText.style.marginLeft = "-50%";
        });
    }
    if (switchToLoginLinkModal && loginRadioAuth) { // Check loginRadioAuth for label click
        switchToLoginLinkModal.addEventListener('click', (e) => {
            e.preventDefault();
            loginRadioAuth.checked = true; // Directly check the radio
            if (authFormInner) authFormInner.style.marginLeft = "0%";
            if (authTitleText) authTitleText.style.marginLeft = "0%";
        });
    }
    
    // --- FORM SUBMISSION (Placeholder for PHP integration) ---
    if (authLoginForm) {
        authLoginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            console.log("Login Attempt Data:", data);
            
            // Example PHP Fetch Call:
            try {
                const response = await fetch('api/login.php', { 
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify(data) 
                });
                if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
                const result = await response.json();
                
                alert(result.message); // Display message from backend
                if (result.success && result.user) {
                    localStorage.setItem('user', JSON.stringify(result.user));
                    localStorage.setItem('isLoggedIn', 'true');
                    closeAuthModal();
                    if (typeof updateNavOnLogin === 'function') updateNavOnLogin(result.user.username); // Update UI
                    // window.location.reload(); // or redirect
                } else {
                    // Handle login failure (e.g., show error in form)
                }
            } catch (error) { 
                console.error('Login error:', error);
                alert('Login failed. Please try again or check console.'); 
            }
        });
    }

    if (authSignupForm) {
        authSignupForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            if (data.password !== data.confirm_password) {
                alert("Passwords do not match!");
                return;
            }
            console.log("Signup Attempt Data:", data);

            // Example PHP Fetch Call:
            try {
                const response = await fetch('api/signup.php', { 
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({ username: data.username, email: data.email, password: data.password })
                });
                if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
                const result = await response.json();

                alert(result.message);
                if (result.success) {
                    // Switch to login tab
                    if (loginRadioAuth) loginRadioAuth.checked = true;
                    if (authFormInner) authFormInner.style.marginLeft = "0%";
                    if (authTitleText) authTitleText.style.marginLeft = "0%";
                } else {
                    // Handle signup failure (e.g., display error message in form)
                }
            } catch (error) { 
                console.error('Signup error:', error);
                alert('Signup failed. Please try again or check console.'); 
            }
        });
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async function(event){
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            console.log("Forgot Password Email:", data.forgot_email);
            
            // Example PHP Fetch Call:
            try {
                const response = await fetch('api/forgot_password.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: data.forgot_email })
                });
                if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
                const result = await response.json();

                alert(result.message);
                if (result.success) {
                    closeForgotPasswordModal();
                }
            } catch (error) {
                console.error('Forgot password error:', error);
                alert('An error occurred. Please try again or check console.');
            }
        });
    }

    // --- UI UPDATE FUNCTIONS FOR LOGIN/LOGOUT (Define them or ensure they are defined) ---
    const mainAuthButtonsDiv = document.querySelector('header .auth-buttons'); // For desktop nav
    const mobileNavAuthButtonsDiv = document.querySelector('.mobile-nav-panel .mobile-auth-buttons'); // For mobile nav

    function updateNavOnLogin(username) {
        const welcomeMessage = `Hi, ${username}!`;
        const logoutButtonHTML = `<a href="#" class="btn btn-outline" id="logoutBtn">Logout</a>`; // Single ID for logout

        if (mainAuthButtonsDiv) {
            mainAuthButtonsDiv.innerHTML = `<span class="nav-username">${welcomeMessage}</span> ${logoutButtonHTML}`;
        }
        if (mobileNavAuthButtonsDiv) {
            mobileNavAuthButtonsDiv.innerHTML = `<span class="nav-username mobile-username">${welcomeMessage}</span> ${logoutButtonHTML}`;
        }
        // Add event listener to the new logout button(s)
        // It's better to use event delegation if these are frequently re-created,
        // but for simplicity, re-adding listener after innerHTML change.
        const logoutBtns = document.querySelectorAll('#logoutBtn');
        logoutBtns.forEach(btn => btn.addEventListener('click', handleLogout));
    }

    function updateNavOnLogout() {
        const signInHTML = `<a href="#" class="btn btn-outline" id="signInBtnNav">Sign In</a>`;
        const signUpHTML = `<a href="#" class="btn btn-primary" id="signUpBtnNav">Sign Up</a>`;
        const mobileSignInHTML = `<a href="#" class="btn btn-outline" id="signInBtnMobile">Sign In</a>`;
        const mobileSignUpHTML = `<a href="#" class="btn btn-primary" id="signUpBtnMobile">Sign Up</a>`;

        if (mainAuthButtonsDiv) {
            mainAuthButtonsDiv.innerHTML = `${signInHTML} ${signUpHTML}`;
            // Re-attach listeners to newly created buttons
            document.getElementById('signInBtnNav')?.addEventListener('click', (e) => { e.preventDefault(); openAuthModal(false); });
            document.getElementById('signUpBtnNav')?.addEventListener('click', (e) => { e.preventDefault(); openAuthModal(true); });
        }
        if (mobileNavAuthButtonsDiv) {
            mobileNavAuthButtonsDiv.innerHTML = `${mobileSignInHTML} ${mobileSignUpHTML}`;
            document.getElementById('signInBtnMobile')?.addEventListener('click', (e) => { e.preventDefault(); if(typeof closeMobileMenu === 'function') closeMobileMenu(); openAuthModal(false); });
            document.getElementById('signUpBtnMobile')?.addEventListener('click', (e) => { e.preventDefault(); if(typeof closeMobileMenu === 'function') closeMobileMenu(); openAuthModal(true); });
        }
    }

    async function handleLogout(event) {
        event.preventDefault();
        // Call backend logout if necessary (e.g., to invalidate session/token)
        // try {
        //     const response = await fetch('api/logout.php', { method: 'POST' });
        //     const result = await response.json();
        //     if (!result.success) console.warn("Backend logout issue:", result.message);
        // } catch (error) {
        //     console.error('Error calling backend logout:', error);
        // }

        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false'); // Set to false
        alert("Logged out successfully.");
        updateNavOnLogout();
    }

    // Check login state on page load
    function checkLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userString = localStorage.getItem('user');
        if (isLoggedIn === 'true' && userString) {
            try {
                const user = JSON.parse(userString);
                if (user && user.username) {
                    updateNavOnLogin(user.username);
                } else {
                    localStorage.setItem('isLoggedIn', 'false'); // Invalid user data
                    updateNavOnLogout();
                }
            } catch(e) {
                console.error("Error parsing user data from localStorage", e);
                localStorage.removeItem('user');
                localStorage.setItem('isLoggedIn', 'false');
                updateNavOnLogout();
            }
        } else {
            updateNavOnLogout(); // Ensure correct buttons if not logged in or no data
        }
    }
    checkLoginState();


 

}); 

//--------------------------------------------
//--------contact-submit-backend----------


  // --- MAIN CONTACT PAGE FORM SUBMISSION ---
const mainContactPageForm = document.getElementById('mainContactPageForm');
console.log("DEBUG: Attempting to select contact form. Element found:", mainContactPageForm); // DEBUG LOG 1

if (mainContactPageForm) {
    console.log("DEBUG: Contact form element (mainContactPageForm) was found. Adding submit event listener."); // DEBUG LOG 2
    mainContactPageForm.addEventListener('submit', async function(event) {
        console.log("DEBUG: Contact form SUBMIT event triggered!"); // DEBUG LOG 3
        event.preventDefault(); // Default form submission rokein
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        console.log("DEBUG: Submit button text changed to 'Sending...' and disabled."); // DEBUG LOG 4

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        console.log("DEBUG: Form data prepared:", data); // DEBUG LOG 5

        try {
            console.log("DEBUG: Attempting fetch call to 'api/submit_contact_form.php'"); // DEBUG LOG 6
            const response = await fetch('api/submit_contact_form.php', { // Path to your PHP script
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("DEBUG: Fetch call made. Raw response object:", response); // DEBUG LOG 7a
            console.log(`DEBUG: Response status: ${response.status}, OK: ${response.ok}`); // DEBUG LOG 7b


            if (!response.ok) {
                let errorDetail = `Server responded with status: ${response.status}`;
                try {
                    // Attempt to get more details from the response body if it's JSON
                    const errorResult = await response.json(); // This might throw if not JSON
                    errorDetail = errorResult.message || JSON.stringify(errorResult) || errorDetail;
                } catch (e) {
                    // If response is not JSON, try to get it as text
                    try {
                       const textError = await response.text();
                       errorDetail = textError || errorDetail;
                    } catch (textE) {
                        // If reading as text also fails, stick to status.
                    }
                }
                console.error('DEBUG: HTTP error from server:', errorDetail); // DEBUG LOG
                throw new Error(errorDetail);
            }

            const result = await response.json();
            console.log("DEBUG: Response from PHP (parsed JSON):", result); // DEBUG LOG 8

            alert(result.message);

            if (result.success) {
                this.reset(); 
                console.log("DEBUG: Form reset successfully."); // DEBUG LOG
            } else {
                console.warn("DEBUG: PHP script reported failure:", result.message); // DEBUG LOG
            }
        } catch (error) {
            console.error('DEBUG: Contact Form Submit CATCH Error:', error); // DEBUG LOG
            alert('An error occurred: ' + error.message + '. Please check the console for more details.');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            console.log("DEBUG: Submit button text restored and enabled."); // DEBUG LOG 9
        }
    });
} else {
    console.error("DEBUG ERROR: Contact form with ID 'mainContactPageForm' was NOT found. Event listener NOT added."); // DEBUG LOG 10
}



//--------------------plans+ form---------

// --- ORDER FORM MODAL & PRICING PLAN CLICK LOGIC ---
// Ensure these elements exist in your HTML with these exact IDs and classes
const orderFormModal = document.getElementById('orderFormModal');
const closeOrderModalBtn = document.getElementById('closeOrderModal');
const planOrderForm = document.getElementById('planOrderForm'); 
const selectedPlanNameModalElement = document.getElementById('selectedPlanNameModal');
const orderFormPlanNameInput = document.getElementById('orderFormPlanName');
const orderFormPlanPriceInput = document.getElementById('orderFormPlanPrice');

const pricingCards = document.querySelectorAll('.pricing-card');
const choosePlanButtons = document.querySelectorAll('.btn-choose-plan');

function openOrderModal(planName, planPrice) {
    // Optional: Close mobile menu if it's open
    if (typeof closeMobileMenu === 'function' && typeof mobileNavPanel !== 'undefined' && mobileNavPanel.classList.contains('open')) {
        closeMobileMenu();
    }

    if (orderFormModal && selectedPlanNameModalElement && orderFormPlanNameInput && orderFormPlanPriceInput) {
        selectedPlanNameModalElement.textContent = planName;
        orderFormPlanNameInput.value = planName;
        orderFormPlanPriceInput.value = planPrice; // Storing price with currency symbol
        
        orderFormModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Order modal critical elements not found for opening! Check IDs: orderFormModal, selectedPlanNameModal, orderFormPlanName, orderFormPlanPrice.");
    }
}

function closeOrderModal() {
    if (orderFormModal && orderFormModal.classList.contains('show')) {
        orderFormModal.classList.remove('show');
        // Only restore body scroll if no other modal (like authModal) is currently shown
        const authModal = document.getElementById('authModal'); // Assuming authModal ID
        if (!authModal || !authModal.classList.contains('show')) { 
            document.body.style.overflow = '';
        }
    }
}

// Event listeners for pricing cards
if (pricingCards.length > 0) {
    pricingCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // If the click is on the button inside the card, let the button's listener handle it
            if (event.target.closest('.btn-choose-plan')) {
                return;
            }
            const planName = this.dataset.planName;
            const planPrice = this.dataset.planPrice; // e.g., "$150.99"
            if (planName) { // Check if planName is successfully retrieved
                openOrderModal(planName, planPrice);
            } else {
                console.warn("Clicked card does not have data-plan-name attribute or it's empty.");
            }
        });
    });
} else {
    console.warn("No .pricing-card elements found on the page.");
}

// Event listeners for "CHOOSE PLAN" buttons
if (choosePlanButtons.length > 0) {
    choosePlanButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            event.stopPropagation(); // Prevent the card's click listener from also firing
            const planName = this.dataset.planName;
            const planPrice = this.dataset.planPrice;
            if (planName) {
                openOrderModal(planName, planPrice);
            } else {
                console.warn("Clicked button does not have data-plan-name attribute or it's empty.");
            }
        });
    });
} else {
    console.warn("No .btn-choose-plan elements found on the page.");
}


// Modal close functionality
if (closeOrderModalBtn) {
    closeOrderModalBtn.addEventListener('click', closeOrderModal);
}
if (orderFormModal) {
    orderFormModal.addEventListener('click', (e) => { 
        if (e.target === orderFormModal) { // Clicked on the overlay itself
            closeOrderModal(); 
        }
    });
}

// Order Form Submission
if (planOrderForm) {
    planOrderForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'SUBMITTING...';
        submitButton.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries()); 

        console.log("Order Data to be sent to PHP:", data); // For debugging

        try {
            const response = await fetch('api/submit_plan_order.php', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // Try to parse as JSON regardless of ok status, but handle errors
            let result;
            const responseText = await response.text(); // Get response as text first
            try {
                result = JSON.parse(responseText); // Try to parse as JSON
            } catch (e) {
                // If JSON parsing fails, the response was likely not JSON (e.g., HTML error page from PHP)
                console.error("Failed to parse server response as JSON:", responseText);
                throw new Error(`Server returned non-JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 100)}...`); // Show first 100 chars
            }

            if (!response.ok) { // Now check status after attempting to parse
                const errorMsg = result.message || `Order submission failed! Status: ${response.status}`;
                throw new Error(errorMsg);
            }
            
            // Assuming result always has a 'message' field from your PHP script
            alert(result.message); 

            if (result.success) {
                this.reset(); 
                closeOrderModal(); 
            }
        } catch (error) {
            console.error('Plan Order Submit Error (Catch Block):', error);
            alert('An error occurred while submitting your order. ' + error.message);
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
} else {
    console.warn("Order form with ID 'planOrderForm' not found.");
}

//-----------------




