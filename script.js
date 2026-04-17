document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');

    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('mobile-menu-active');
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    navbar.classList.remove('mobile-menu-active');
                }
            }
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }

            // 使用mailto链接打开默认邮件客户端
            const subject = encodeURIComponent('君兰中学创客空间留言');
            const body = encodeURIComponent(`姓名: ${name}\n邮箱: ${email}\n留言内容:\n${message}`);
            const mailtoLink = `mailto:3238226563@qq.com?subject=${subject}&body=${body}`;
            
            window.location.href = mailtoLink;
            alert('正在打开邮件客户端，请发送邮件完成留言。');
            contactForm.reset();
        });
    }

    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = '#2c3e50';
            header.style.boxShadow = 'none';
        }
    });
});