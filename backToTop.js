document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.querySelector('.back-to-top');

    // Scroll back to the hero section
    backToTopButton.addEventListener('click', () => {
        document.querySelector('.logo').scrollIntoView({ behavior: 'smooth' });
    });
});