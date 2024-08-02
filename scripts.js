document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const prevButton = document.getElementById('prev-card');
    const nextButton = document.getElementById('next-card');
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('nav');
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let currentCard = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }

    function handleButtonClick(button, direction) {
        button.style.backgroundColor = '#111'; // Change color on click

        setTimeout(() => {
            button.style.backgroundColor = '#16233b'; // Revert to default color after 200ms
        }, 200);

        if (direction === 'prev') {
            currentCard = (currentCard > 0) ? currentCard - 1 : cards.length - 1;
        } else {
            currentCard = (currentCard < cards.length - 1) ? currentCard + 1 : 0;
        }

        showCard(currentCard);
    }

    prevButton.addEventListener('click', function() {
        handleButtonClick(prevButton, 'prev');
    });

    nextButton.addEventListener('click', function() {
        handleButtonClick(nextButton, 'next');
    });

    // Initialize the first card to be shown
    showCard(currentCard);

    // Toggle mobile navbar
    hamburger.addEventListener('click', function() {
        navbar.classList.toggle('show');
    });

    // Theme toggle functionality
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            themeToggle.classList.add('dark');
            themeToggle.classList.remove('light');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            themeToggle.classList.add('light');
            themeToggle.classList.remove('dark');
        }
    }

    // Check if a theme is saved in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Use the device's preferred color scheme
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    // Listen for changes to the theme toggle
    themeToggle.addEventListener('click', function() {
        const theme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(theme);
        localStorage.setItem('theme', theme);
    });

    // Listen for changes to the device's color scheme preference
    prefersDarkScheme.addEventListener('change', function(e) {
        setTheme(e.matches ? 'dark' : 'light');
        localStorage.setItem('theme', e.matches ? 'dark' : 'light');
    });
});
