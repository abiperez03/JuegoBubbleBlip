document.addEventListener('DOMContentLoaded', function () {
    const text = "BUBBLE-BLIP";
    const container = document.getElementById("animated-text");

    function animateText() {
        container.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'letter';
            span.style.animationDelay = `${index * 0.2}s`;
            container.appendChild(span);
        });
    }

    animateText();
    setInterval(animateText, 4000); // Reinicia la animación cada 4 segundos
});
