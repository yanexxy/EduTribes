document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MOBILE MENU LOGIC ---
    const hamburger = document.getElementById('hamburgerMenu');
    const closeBtn = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            console.log("Hamburger Clicked"); // Debugging check
            navLinks.classList.add('open');
        });
    } else {
        console.error("Hamburger menu or NavLinks not found!");
    }

    if (closeBtn && navLinks) {
        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    }

    // --- 2. STICKY NAVBAR ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- 3. DONATION FORM ---
    const donateForm = document.getElementById('donate-form');
    if (donateForm) {
        donateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'thank_you.html';
        });
    }

    // --- 4. VOLUNTEER FORM ---
    const volForm = document.getElementById('volunteer-form');
    if (volForm) {
        volForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'volunteer_thank_you.html';
        });
    }

    // --- 5. ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 6. NUMBER COUNTERS ---
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});

// --- HELPER FUNCTIONS (Must be outside) ---
function openTab(tabName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) contents[i].style.display = "none";
    
    const tabs = document.getElementsByClassName("pill-tab");
    for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");
    
    const target = document.getElementById(tabName);
    if (target) target.style.display = "grid";
    if (event) event.currentTarget.classList.add("active");
}

function logoutUser() {
    if(confirm("Are you sure you want to log out?")) {
        window.location.href = 'login.html';
    }
}

// Login/Signup Validation
function validateLogin() {
    // Add logic here or link to previous code
    window.location.href = 'usersprofile.html'; 
}
function validateSignup() {
    window.location.href = 'usersprofile.html';
}




// 1. Sticky Navbar Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. Scroll Reveal Animation using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// 3. Number Counter Animation
const counters = document.querySelectorAll('.count');
const speed = 200; // The lower the slower

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const updateCount = () => {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText.replace(/,/g, ''); // remove commas if any
                
                // Lower inc to slow and higher to slow
                const inc = target / speed;

                if (count < target) {
                    entry.target.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 20);
                } else {
                    entry.target.innerText = target.toLocaleString() + "+";
                    observer.unobserve(entry.target); // Stop observing once target is reached
                }
            };

            updateCount();
        }
    });
}, { threshold: 0.7 }); // Trigger when 70% of counter is visible

counters.forEach(counter => {
    counterObserver.observe(counter);
});

/* ---------------------------------------------------------------------- */
// 4. Donation Form & Button Logic (Handles index/donate page elements)
/* ---------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const donateForm = document.getElementById('donate-form');
    
    // Function to handle donation amount selection
    if (amountButtons.length > 0) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove 'selected' class from all buttons
                amountButtons.forEach(btn => btn.classList.remove('selected'));
                
                // Add 'selected' class to the clicked button
                this.classList.add('selected');

                // Set the custom input value to the selected amount
                customAmountInput.value = this.getAttribute('data-amount');
                customAmountInput.readOnly = true; // Disable editing if a button is selected
            });
        });

        // Enable custom input when clicked, deselect buttons
        customAmountInput.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            customAmountInput.readOnly = false;
        });
    }

    // Simple Form Submission Handler
    if (donateForm) {
        donateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation check
            const customAmount = document.getElementById('custom-amount').value;
            const firstName = document.getElementById('first-name').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!customAmount || parseFloat(customAmount) < 100) {
                alert('Please select or enter a donation amount (minimum ₱100).');
                return;
            }
            if (!firstName || !email) {
                alert('Please fill in your name and email address.');
                return;
            }
            
            // **CRITICAL FIX: REDIRECT TO THANK YOU PAGE**
            window.location.href = 'thank_you.html';
        });
    }

    /* ---------------------------------------------------------------------- */
    // 5. Hamburger Menu Toggle Functionality (NEW)
    /* ---------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            // Toggle the 'open' class to slide the menu in/out
            navLinks.classList.toggle('open');
            
            // Toggle the icon between bars (menu) and times (close)
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Use 'X' icon when open
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Use 'Hamburger' icon when closed
            }
        });
        
        // OPTIONAL: Close menu when a link is clicked (improves mobile UX)
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    // Reset icon after closing
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ---------------------------------------------------------------------- */
    // 6. Progress Bar Animation (NEW)
    /* ---------------------------------------------------------------------- */
    const progressContainers = document.querySelectorAll('.progress-container');

    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const progressBar = container.querySelector('.progress-bar');
                const progressValue = container.getAttribute('data-progress'); // e.g., "70"
                
                // Set the width of the progress bar using the inline style
                progressBar.style.width = progressValue + '%';
                
                observer.unobserve(container); // Stop observing once it's animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the container is visible

    progressContainers.forEach(container => {
        progressObserver.observe(container);
    });

    /* ---------------------------------------------------------------------- */
    // 7. Volunteer Form Submission Handler (RENAMED FROM 6)
    /* ---------------------------------------------------------------------- */
    const volunteerForm = document.getElementById('volunteer-form');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Volunteer form submitted. Redirecting to thank you page...');
            window.location.href = 'volunteer_thank_you.html';
        });
    }


}); // END of main DOMContentLoaded

// --- 6. AUTHENTICATION LINK LOGIC (LOGIN/LOGOUT) ---
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');
    if (!authLink) return;

    // A simple check: if the user is on their profile page, they are logged in.
    // In a real application, this would check a cookie/session variable.
    const isProfilePage = window.location.pathname.includes('usersprofile.html');

    if (isProfilePage) {
        // If on the profile page, ensure it says "Logout" and runs the logout function.
        authLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
        authLink.href = '#'; // Prevent navigation, let the onclick handle it
        authLink.onclick = logoutUser;
    } else {
        // For all other pages, it defaults to "Login" (as set in the HTML)
        // unless a real logged-in flag is available. For now, we'll keep the HTML default.
        // We will just ensure the icon is correct for the default "Login" state.
        authLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        authLink.href = 'login.html';
        authLink.onclick = null;
    }
}

// Call the new function on page load
document.addEventListener('DOMContentLoaded', updateAuthLink);
