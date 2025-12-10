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

// --- INSERT THIS INTO script.js ---

    // 1. Select elements
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customInput = document.getElementById('custom-amount');

    // 2. Add click events to buttons
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove 'selected' class from all buttons
            amountBtns.forEach(b => b.classList.remove('selected'));
            
            // Add 'selected' class to clicked button (for styling)
            this.classList.add('selected');
            
            // THE FIX: Take the value from the button and put it in the required input
            const amount = this.getAttribute('data-amount');
            customInput.value = amount;
        });
    });

    // 3. If user types manually, remove the highlight from buttons
    if (customInput) {
        customInput.addEventListener('input', function() {
            amountBtns.forEach(btn => btn.classList.remove('selected'));
        });
    }    