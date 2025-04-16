// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('fade-in');
    });

    // Initialize skill progress bars with animation
    const progressBars = document.querySelectorAll('.progress-bar');
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }, 1000);
    // Typing animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');

    const textArray = ['Web Developer', 'Frontend Developer', 'UI/UX Designer', 'Freelancer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        }
        else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        }
        else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navItems.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navItems.classList.remove('active');
    }));

    // Sticky Header
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
            scrollTopBtn.classList.add('active');
        } else {
            header.classList.remove('sticky');
            scrollTopBtn.classList.remove('active');
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', { name, email, subject, message });

            // Reset form
            contactForm.reset();

            // Show success message (you can replace this with a more sophisticated notification)
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced animation on scroll
    const animateElements = document.querySelectorAll('.animate, .skill-item, .project-card, .contact-item');

    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;

        animateElements.forEach((element, index) => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;

            // Check if element is in view
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                // Add staggered animation delay based on element index
                setTimeout(() => {
                    element.classList.add('animated');
                }, 150 * (index % 4)); // Stagger effect for elements in the same row
            }
        });
    }

    // Run once to check for elements already in view on page load
    checkIfInView();

    // Add event listener for scrolling
    window.addEventListener('scroll', checkIfInView);

    // Parallax effect for hero section
    const heroImage = document.querySelector('.hero-image img');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 600) { // Only apply effect near the top of the page
            heroImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${scrollPosition * 0.05}px)`;
        }
    });

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Add custom cursor effect (optional)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-active');
    });
});
