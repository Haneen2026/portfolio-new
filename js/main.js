/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';



   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: 0,
        duration: 300
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 300
    }, '-=150')
    .add({
        targets: '.s-intro .text-huge-title',
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(200)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(50, {direction: 'reverse'})}
        ],
        delay: anime.stagger(50, {direction: 'reverse'})
    });



   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* About Section Line Animation
    * ------------------------------------------------------ */
    const ssAboutLineAnimation = function() {
        const aboutSection = document.querySelector('#about');
        const staticLine = document.querySelector('.static-line');
        const aboutText = document.querySelector('.about-info__text');
        
        if (!aboutSection || !staticLine || !aboutText) return;
        
        let hasAnimated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    
                    // Trigger line animation
                    staticLine.classList.add('animated');
                    
                    // Trigger shimmer effect once
                    aboutText.style.setProperty('--shimmer-opacity', '1');
                    aboutText.classList.add('shimmer-active');
                    
                    // Remove shimmer after animation completes
                    setTimeout(() => {
                        aboutText.classList.remove('shimmer-active');
                    }, 3000);
                    
                    // Stop observing after animation
                    observer.unobserve(aboutSection);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(aboutSection);
    }; // end ssAboutLineAnimation


   /* Animate elements if in viewport - DISABLED
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {
        // Function disabled to prevent unwanted animations
        return;
        
        // const blocks = document.querySelectorAll("[data-animate-block]");
        
        // window.addEventListener("scroll", viewportAnimation);
        
        // function viewportAnimation() {
        //     
        //     let scrollY = window.pageYOffset;
        
        //     blocks.forEach(function(current) {
        
        //         const viewportHeight = window.innerHeight;
        //         const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
        //         const blockHeight = current.offsetHeight;
        //         const blockSpace = triggerTop + blockHeight;
        //         const inView = scrollY > triggerTop && scrollY <= blockSpace;
        //         const isAnimated = current.classList.contains("ss-animated");
        
        //         if (inView && (!isAnimated)) {
        //             anime({
        //                 targets: current.querySelectorAll("[data-animate-el]"),
        //                 opacity: [0, 1],
        //                 translateY: [100, 0],
        //                 delay: anime.stagger(400, {start: 200}),
        //                 duration: 800,
        //                 easing: 'easeInOutCubic',
        //                 begin: function(anim) {
        //                     current.classList.add("ss-animated");
        //                 }
        //             });
        //         }
        //     });
        // }
    }; // end ssViewAnimate


       /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        // Only initialize Swiper on mobile screens
        if (window.matchMedia('(max-width: 600px)').matches) {
            const mySwiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 100, // Ultra-fast transition speed (100ms)
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            });
        }

        // Handle resize events
        window.addEventListener('resize', function() {
            if (window.matchMedia('(max-width: 600px)').matches) {
                // Mobile: Initialize Swiper if not already initialized
                if (!window.testimonialSwiper) {
                    window.testimonialSwiper = new Swiper('.swiper-container', {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        speed: 100, // Ultra-fast transition speed (100ms)
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        }
                    });
                }
            } else {
                // Desktop: Destroy Swiper to restore grid layout
                if (window.testimonialSwiper) {
                    window.testimonialSwiper.destroy(true, true);
                    window.testimonialSwiper = null;
                }
            }
        });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
        }
    }

    // Regular smoothscroll elements (600ms duration)
    const triggers = document.querySelectorAll('.smoothscroll');
        
    const moveTo = new MoveTo({
        tolerance: 0,
        duration: 600, // Regular scroll duration
        easing: 'easeInOutCubic',
        container: window
    }, easeFunctions);

    triggers.forEach(function(trigger) {
        moveTo.registerTrigger(trigger);
    });

    // Faster scroll for back-to-top button specifically (100ms duration)
    const backToTopTrigger = document.querySelector('.ss-go-top a');
    if (backToTopTrigger) {
        const moveToFast = new MoveTo({
            tolerance: 0,
            duration: 100, // Ultra-fast duration for back-to-top (almost instant)
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);
        
        moveToFast.registerTrigger(backToTopTrigger);
    }
}; // end ssMoveTo


/* Theme Toggle
 * ------------------------------------------------------ */
const ssThemeToggle = function() {

    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
        
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
        
    // Apply the saved theme on page load
    if (currentTheme === 'light') {
        htmlElement.classList.add('light-mode');
        // In light mode, show dark mode icon (what it will switch to)
        themeToggle.classList.remove('light-mode');
    } else {
        // In dark mode, show light mode icon (what it will switch to)
        themeToggle.classList.add('light-mode');
    }
        
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isLightMode = htmlElement.classList.contains('light-mode');
                
            if (isLightMode) {
                // Switch to dark mode
                htmlElement.classList.remove('light-mode');
                themeToggle.classList.add('light-mode'); // Show light icon (will switch to light)
                localStorage.setItem('theme', 'dark');
            } else {
                // Switch to light mode
                htmlElement.classList.add('light-mode');
                themeToggle.classList.remove('light-mode'); // Show dark icon (will switch to dark)
                localStorage.setItem('theme', 'light');
            }
                
            // Add a subtle animation effect
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
            
        // Add keyboard support
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });
    }

}; // end ssThemeToggle


/* Initialize
 * ------------------------------------------------------ */
(function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssAboutLineAnimation();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();
        ssThemeToggle();

    })();

})(document.documentElement);