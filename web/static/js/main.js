jQuery(document).ready(function ($) {
    // Активация табов в секции услуг
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Деактивация текущих активных табов
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Активация выбранного таба
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Активация FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // --- Callback Modal ---
    const callbackModal = document.getElementById('callbackModal');
    const callbackButtons = document.querySelectorAll('.callback-cta, .header-cta'); // Добавляем header-cta
    const closeModal = document.getElementById('closeModal');

    function openCallbackModal() {
        callbackModal.classList.add('active');
    }

    function closeCallbackModal() {
        callbackModal.classList.remove('active');
    }

    // Обработка всех кнопок
    callbackButtons.forEach(button => {
        button.addEventListener('click', openCallbackModal);
    });

    closeModal && closeModal.addEventListener('click', closeCallbackModal);

    callbackModal && callbackModal.addEventListener('click', (e) => {
        if (e.target === callbackModal) {
            closeCallbackModal();
        }
    });

    // --- Service Modal ---
    const serviceModal = document.getElementById('serviceModal');
    const serviceCtaButtons = document.querySelectorAll('.service-cta');
    const closeServiceModal = document.getElementById('closeServiceModal');

    // Скрытое поле формы
    const serviceInput = document.querySelector('input[name="your-service"]');

    function openServiceModal() {
        serviceModal.classList.add('active');
    }

    function closeServiceModalFunc() {
        serviceModal.classList.remove('active');
    }

    serviceCtaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceItem = button.closest('.service-item');
            const serviceName = serviceItem?.querySelector('.service-name')?.textContent.trim() || '';
            const servicePrice = serviceItem?.querySelector('.service-price')?.textContent.trim() || '';

            const fullValue = servicePrice ? `${serviceName} (${servicePrice})` : serviceName;

            if (serviceInput) {
                serviceInput.value = fullValue;
            }

            openServiceModal();
        });
    });

    closeServiceModal && closeServiceModal.addEventListener('click', closeServiceModalFunc);

    serviceModal && serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeServiceModalFunc();
        }
    });

    // Кнопка прокрутки наверх
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop && backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Плавная прокрутка для якорных ссылок (общий обработчик, исключая #callback-form)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#callback-form') return; // Пропускаем #callback-form

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Высота хедера
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Маска для телефона
    function initFormInput(selector = 'input[type=tel]') {
        let options = {
            placeholder: '+7 ___ ___ __ __',
            onKeyPress: function (cep, e, field, options) {
                var masks = ['+7-000-000-00-00', '8-000-000-00-00'];
                let first_symbol = Array.from(cep)[0] != '+' ? Array.from(cep)[0] : Array.from(cep)[1];

                let mask;
                if (first_symbol) {
                    if (first_symbol == 7) {
                        mask = masks[0];
                    } else {
                        mask = masks[1];
                    }
                } else {
                    mask = '0-000-000-00-00';
                }
                jQuery(selector).mask(mask, options);
            }
        };

        jQuery(selector).mask('0-000-000-00-00', options);
    }

    initFormInput();

    // Обработка меню
    const $mobileToggle = $('.mobile-toggle');
    const $mobileMenu = $('.mobile-menu');
    const $closeMenu = $('.mobile-menu-close');
    const $overlay = $('.overlay');
    const $body = $('body');
    const headerHeight = $('header').outerHeight() || 70;

    // Открытие/закрытие меню
    $mobileToggle.on('click', () => {
        $mobileToggle.toggleClass('active');
        $mobileMenu.toggleClass('active');
        $overlay.toggleClass('active');
        $body.css('overflow', $mobileMenu.hasClass('active') ? 'hidden' : '');
    });

    // Закрытие по клику на оверлей
    $overlay.on('click', () => {
        $mobileMenu.removeClass('active');
        $overlay.removeClass('active');
        $mobileToggle.removeClass('active');
        $body.css('overflow', '');
    });

    // Предотвращаем закрытие при клике внутри меню
    $mobileMenu.on('click', (e) => {
        e.stopPropagation();
    });

    // Закрытие по кнопке
    $closeMenu.on('click', () => {
        $mobileMenu.removeClass('active');
        $overlay.removeClass('active');
        $mobileToggle.removeClass('active');
        $body.css('overflow', '');
    });

    // Обработка якорей в мобильном меню (кроме #callback-form)
    $('.mobile-menu-links a[href*="#"]').not('[href="#callback-form"]').on('click', (e) => {
        e.preventDefault();
        const targetId = $(e.currentTarget).attr('href');
        const $target = $(targetId);

        if ($target.length) {
            $mobileMenu.removeClass('active');
            $overlay.removeClass('active');
            $mobileToggle.removeClass('active');
            $body.css('overflow', '');
            const targetOffset = $target.offset().top - headerHeight;
            $('html, body').animate({ scrollTop: targetOffset }, 800);
        }
    });

    // Обработка #callback-form в мобильном меню
    $('.mobile-menu-links a[href="#callback-form"]').on('click', (e) => {
        e.preventDefault();
        $mobileMenu.removeClass('active');
        $overlay.removeClass('active');
        $mobileToggle.removeClass('active');
        $body.css('overflow', '');
        openModal(); // Вызываем существующую функцию для открытия модального окна
    });
});