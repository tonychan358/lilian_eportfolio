document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('is-active'); // For optional animation
        });

        // Close menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll animation observer
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // Trigger earlier on mobile
        rootMargin: "0px 0px -20px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Active state to navbar links on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // --- Viewer Modal Logic (Gallery & PDF) ---
    const viewerModal = document.getElementById('viewer-modal');
    const viewerImg = document.querySelector('.viewer-image');
    const viewerIframe = document.querySelector('.viewer-iframe');
    const viewerCounter = document.querySelector('.viewer-counter');
    const viewerPrev = document.querySelector('.viewer-prev');
    const viewerNext = document.querySelector('.viewer-next');
    const viewerClose = document.querySelector('.viewer-close');

    let currentGallery = [];
    let currentIdx = 0;

    function openViewer(type, data) {
        if (!viewerModal) return;
        viewerModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (type === 'gallery') {
            currentGallery = data;
            currentIdx = 0;
            showGalleryImage(0);
            viewerImg.style.display = 'block';
            viewerIframe.style.display = 'none';
            if (viewerPrev) viewerPrev.style.display = currentGallery.length > 1 ? 'block' : 'none';
            if (viewerNext) viewerNext.style.display = currentGallery.length > 1 ? 'block' : 'none';
            if (viewerCounter) viewerCounter.style.display = currentGallery.length > 1 ? 'block' : 'none';
        } else if (type === 'pdf' || type === 'video') {
            let url = data;
            if (type === 'pdf') {
                url = `${data}#toolbar=0&navpanes=0`;
            } else if (type === 'video') {
                // Convert YouTube links to embed format
                if (url.includes('youtube.com/shorts/')) {
                    url = url.replace('youtube.com/shorts/', 'youtube.com/embed/').split('?')[0];
                } else if (url.includes('youtu.be/')) {
                    url = url.replace('youtu.be/', 'youtube.com/embed/');
                } else if (url.includes('youtube.com/watch?v=')) {
                    url = url.replace('youtube.com/watch?v=', 'youtube.com/embed/');
                }
            }
            viewerIframe.src = url;
            viewerImg.style.display = 'none';
            viewerIframe.style.display = 'block';
            if (viewerPrev) viewerPrev.style.display = 'none';
            if (viewerNext) viewerNext.style.display = 'none';
            if (viewerCounter) viewerCounter.style.display = 'none';
        }
    }

    function showGalleryImage(idx) {
        if (!viewerImg) return;
        viewerImg.src = currentGallery[idx];
        if (viewerCounter) viewerCounter.textContent = `${idx + 1} / ${currentGallery.length}`;
    }

    function closeViewer() {
        if (!viewerModal) return;
        viewerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        viewerIframe.src = '';
    }

    if (viewerClose) viewerClose.addEventListener('click', closeViewer);

    if (viewerPrev) {
        viewerPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIdx = (currentIdx - 1 + currentGallery.length) % currentGallery.length;
            showGalleryImage(currentIdx);
        });
    }

    if (viewerNext) {
        viewerNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIdx = (currentIdx + 1) % currentGallery.length;
            showGalleryImage(currentIdx);
        });
    }

    document.addEventListener('click', (e) => {
        const galleryBtn = e.target.closest('[data-gallery]');
        const pdfBtn = e.target.closest('[data-pdf]');
        const videoBtn = e.target.closest('[data-video]');

        if (galleryBtn) {
            e.preventDefault();
            try {
                const images = JSON.parse(galleryBtn.getAttribute('data-gallery'));
                openViewer('gallery', images);
            } catch (err) {
                console.error("Gallery data error", err);
            }
        } else if (pdfBtn) {
            e.preventDefault();
            const url = pdfBtn.getAttribute('data-pdf');
            openViewer('pdf', url);
        } else if (videoBtn) {
            e.preventDefault();
            const url = videoBtn.getAttribute('data-video');
            openViewer('video', url);
        } else if (e.target === viewerModal) {
            closeViewer();
        }
    });

    if (viewerImg) {
        viewerImg.addEventListener('contextmenu', e => e.preventDefault());
        viewerImg.addEventListener('dragstart', e => e.preventDefault());
    }
});
