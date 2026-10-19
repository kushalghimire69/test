
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;

    cursorOutline.animate({
        transform: `translate(${posX}px, ${posY}px)`
    }, { duration: 300, fill: "forwards" });
});

const interactiveElements = document.querySelectorAll("a, button, .feature-card");
interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "scale(1.5)";
        cursorOutline.style.borderColor = "#c084fc";
        cursorOutline.style.backgroundColor = "rgba(192, 132, 252, 0.05)";
    });
    el.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "scale(1)";
        cursorOutline.style.borderColor = "rgba(99, 102, 241, 0.5)";
        cursorOutline.style.backgroundColor = "transparent";
    });
});

const actionBtn = document.getElementById("actionBtn");
const pulseBtn = document.getElementById("pulseBtn");
const counterValue = document.getElementById("counterValue");

let count = 0;

function triggerPulse() {
    count++;
    counterValue.textContent = count;
    
    counterValue.style.transform = "scale(1.3)";
    setTimeout(() => {
        counterValue.style.transform = "scale(1)";
    }, 200);
}

actionBtn.addEventListener("click", triggerPulse);
pulseBtn.addEventListener("click", () => {
    document.getElementById("explore").scrollIntoView({ behavior: 'smooth' });
});

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".feature-card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(card);
});
