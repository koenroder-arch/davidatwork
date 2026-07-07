// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active-menu');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active-menu');
    });
});

// Scroll Spy Logic
window.addEventListener('scroll', function() {
    let current = '';
    // Select all sections and the hero header
    const sections = document.querySelectorAll('section, header.hero');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // If the scroll position is passed the top of the section (with a 200px offset)
        if (window.scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    // If we are at the very top, map the hero section 'home' (Videomaker) to 'over-mij'
    if (window.scrollY < 200 || current === 'home') {
        current = 'over-mij';
    }

    // Map projecten to werkwijze since it has no nav link
    if (current === 'projecten') {
        current = 'werkwijze';
    }

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let targetHref = this.getAttribute('href');

        // When clicking "Over mij", scroll to the top "VIDEOMAKER" home section instead
        if (targetHref === '#over-mij') {
            targetHref = '#home';
        }

        document.querySelector(targetHref).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Copy contact information to clipboard
function copyText(text, element, event) {
    event.preventDefault(); // Prevent scrolling up due to href="#"

    navigator.clipboard.writeText(text).then(function() {
        // Find the label span inside the button
        var label = element.querySelector('.label');
        var originalText = label.innerText;

        // Show copied feedback
        label.innerText = '✔️ Gekopieerd!';
        label.style.color = '#3B7E7A'; // Teal mid color
        label.style.fontWeight = 'bold';

        // Revert back after 2 seconds
        setTimeout(function() {
            label.innerText = originalText;
            label.style.color = '';
            label.style.fontWeight = '';
        }, 2000);
    }).catch(function(err) {
        console.error('Kopiëren mislukt: ', err);
    });
}

// Video Modal logic
function openVideoModal(videoId) {
    var modal = document.getElementById('videoModal');
    var iframe = document.getElementById('youtubeIframe');
    // Add autoplay to URL
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
    modal.style.display = 'flex';
    // Disable body scrolling
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    var modal = document.getElementById('videoModal');
    var iframe = document.getElementById('youtubeIframe');
    iframe.src = ''; // stop playing
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scroll
}

// Image Modal logic
function openImageModal(imgSrc) {
    var modal = document.getElementById('imageModal');
    document.getElementById('modalImage').src = imgSrc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    var modal = document.getElementById('imageModal');
    document.getElementById('modalImage').src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Local video modal logic (shorts)
function openLocalVideoModal(src) {
    var modal = document.getElementById('localVideoModal');
    var video = document.getElementById('localVideo');
    video.src = src;
    video.play();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLocalVideoModal() {
    var modal = document.getElementById('localVideoModal');
    var video = document.getElementById('localVideo');
    video.pause();
    video.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}