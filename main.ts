// Визначаємо типи
interface AnimatedElement extends HTMLElement {
    style: CSSStyleDeclaration;
}

// Клас для керування анімаціями
class AnimationController {
    private static readonly ANIMATION_SELECTOR: string = '.animate__animated';
    private static readonly BUTTON_HOVER_CLASS: string = 'button-hover';
    private static readonly BUTTON_CLICK_CLASS: string = 'button-click';

    public static handleScroll(): void {
        const elements: NodeListOf<AnimatedElement> = 
            document.querySelectorAll(this.ANIMATION_SELECTOR);
        
        elements.forEach((element: AnimatedElement): void => {
            const elementPosition: number = element.getBoundingClientRect().top;
            const screenPosition: number = window.innerHeight;
            
            if (elementPosition < screenPosition) {
                element.style.visibility = 'visible';
                element.style.opacity = '1';
            }
        });
    }

    public static initializeButtonAnimations(): void {
        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
        
        buttons.forEach((button: HTMLButtonElement): void => {
            // Додаємо ефект при наведенні
            button.addEventListener('mouseenter', (): void => {
                button.classList.add(this.BUTTON_HOVER_CLASS);
            });

            button.addEventListener('mouseleave', (): void => {
                button.classList.remove(this.BUTTON_HOVER_CLASS);
            });

            // Додаємо ефект при кліку
            button.addEventListener('mousedown', (): void => {
                button.classList.add(this.BUTTON_CLICK_CLASS);
            });

            button.addEventListener('mouseup', (): void => {
                button.classList.remove(this.BUTTON_CLICK_CLASS);
            });

            // Додаємо ripple ефект при кліку
            button.addEventListener('click', (e: MouseEvent): void => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.className = 'ripple';
                
                button.appendChild(ripple);
                
                setTimeout((): void => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Клас для керування навігацією
class NavigationController {
    public static initialize(): void {
        this.initializeCtaButton();
        this.initializeAuthButtons();
        this.initializeEnrollButtons();
    }

    private static initializeCtaButton(): void {
        const ctaButton = document.querySelector('.cta-btn') as HTMLButtonElement;
        if (ctaButton) {
            ctaButton.onclick = () => {
                window.location.href = 'register.html';
            };
        }
    }

    private static initializeAuthButtons(): void {
        const authButton = document.querySelector('.auth-btn') as HTMLButtonElement;
        const registerButton = document.querySelector('.register-btn') as HTMLButtonElement;

        if (authButton) {
            authButton.onclick = () => {
                window.location.href = 'login.html';
            };
        }

        if (registerButton) {
            registerButton.onclick = () => {
                window.location.href = 'register.html';
            };
        }
    }

    private static initializeEnrollButtons(): void {
        const enrollButtons: NodeListOf<HTMLButtonElement> = 
            document.querySelectorAll('.enroll-btn');
        
        enrollButtons.forEach((button: HTMLButtonElement): void => {
            button.addEventListener('click', (): void => {
                this.showEnrollModal();
            });
        });
    }

    private static showAuthModal(): void {
        // TODO: Реалізувати модальне вікно для авторизації
        alert('Функція входу буде доступна незабаром!');
    }

    private static showEnrollModal(): void {
        // TODO: Реалізувати модальне вікно для запису на курс
        alert('Форма запису буде доступна незабаром!');
    }

    private static showRegistrationModal(): void {
        const modal = document.getElementById('registrationModal');
        if (modal) {
            modal.classList.add('show');
            
            // Додаємо обробник для закриття модального вікна
            const closeBtn = modal.querySelector('.close-modal');
            const modalContent = modal.querySelector('.modal-content');

            if (closeBtn && modalContent) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('show');
                });

                // Закриваємо модальне вікно при кліку поза ним
                modal.addEventListener('click', (e: MouseEvent) => {
                    if (e.target === modal) {
                        modal.classList.remove('show');
                    }
                });
            }
        }
    }
}

// Клас для керування формами
class FormController {
    private static validateEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private static validatePhone(phone: string): boolean {
        const phoneRegex: RegExp = /^\+380\d{9}$/;
        return phoneRegex.test(phone);
    }

    public static handleFormSubmit(event: Event): void {
        event.preventDefault();
        // TODO: Реалізувати обробку відправки форми
    }

    public static handleRegistration(event: Event): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            course: formData.get('course'),
            password: formData.get('password')
        };

        if (this.validateEmail(data.email as string) && 
            this.validatePhone(data.phone as string)) {
            
            // TODO: Відправка даних на сервер
            console.log('Дані для реєстрації:', data);
            
            // Перенаправлення на сторінку входу після успішної реєстрації
            alert('Реєстрація успішна! Тепер ви можете увійти.');
            window.location.href = 'login.html';
        } else {
            alert('Будь ласка, перевірте правильність введених даних');
        }
    }

    public static handleLogin(event: Event): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            remember: formData.get('remember')
        };

        if (this.validateEmail(data.email as string)) {
            // TODO: Відправка даних на сервер
            console.log('Дані для входу:', data);
            
            // Перенаправлення на головну сторінку після успішного входу
            alert('Вхід успішний!');
            window.location.href = 'index.html';
        } else {
            alert('Будь ласка, введіть коректний email');
        }
    }
}

// Додамо новий клас для керування курсами
class CoursesController {
    private static currentSlide = 0;
    private static courses = [
        {
            image: 'photo/math.jpg',
            title: 'Математика',
            description: 'Підготовка до ЗНО з математики',
            category: 'math',
            duration: '6 місяців',
            lessons: '48 занять',
            tasks: '200+ завдань',
            level: 'Базовий рівень'
        },
        {
            image: 'photo/ukr.jpg',
            title: 'Українська мова',
            description: 'Підготовка до ЗНО з української мови',
            category: 'ukrainian',
            duration: '6 місяців',
            lessons: '48 занять',
            tasks: '180+ завдань',
            level: 'Базовий рівень'
        },
        {
            image: 'photo/eng.jpg',
            title: 'Англійська мова',
            description: 'Підготовка до ЗНО з англійської мови',
            category: 'english',
            duration: '6 місяців',
            lessons: '48 занять',
            tasks: '150+ завдань',
            level: 'Базовий рівень'
        }
    ];

    public static initialize(): void {
        if (document.querySelector('.courses-grid')) {
            this.initializeFilters();
            this.initializeEnrollButtons();
            this.showInitialCourse();
            this.startAutoSlide();
        }
    }

    private static showInitialCourse(): void {
        const coursesGrid = document.querySelector('.courses-grid');
        if (!coursesGrid) return;

        coursesGrid.innerHTML = this.createCourseCard(this.courses[0]);
    }

    private static initializeEnrollButtons(): void {
        const enrollButtons = document.querySelectorAll('.enroll-btn');
        enrollButtons.forEach(button => {
            button.addEventListener('click', () => this.showDemoMessage());
        });
    }

    private static showDemoMessage(): void {
        alert('Це демонстраційний сайт, створений в навчальних цілях. Реальна реєстрація на курси не здійснюється.');
    }

    private static initializeFilters(): void {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const filter = target.dataset.filter;

                filterButtons.forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');

                this.filterCourses(filter || 'all');
            });
        });
    }

    private static filterCourses(category: string): void {
        const coursesGrid = document.querySelector('.courses-grid');
        if (!coursesGrid) return;

        const filteredCourses = category === 'all' 
            ? this.courses 
            : this.courses.filter(course => course.category === category);

        coursesGrid.innerHTML = filteredCourses
            .map(course => this.createCourseCard(course))
            .join('');

        this.initializeEnrollButtons();
    }

    private static createCourseCard(course: any): string {
        return `
            <div class="course-card animate__animated animate__fadeInUp" data-category="${course.category}">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                    <div class="course-overlay">
                        <span class="course-level">${course.level}</span>
                    </div>
                </div>
                <div class="course-content">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <ul class="course-features">
                        <li><i class="fas fa-clock"></i> ${course.duration}</li>
                        <li><i class="fas fa-video"></i> ${course.lessons}</li>
                        <li><i class="fas fa-tasks"></i> ${course.tasks}</li>
                    </ul>
                    <button class="enroll-btn">
                        Записатись на курс
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    private static startAutoSlide(): void {
        let currentIndex = 0;
        setInterval(() => {
            const coursesGrid = document.querySelector('.courses-grid');
            if (!coursesGrid) return;

            currentIndex = (currentIndex + 1) % this.courses.length;
            const newCard = this.createCourseCard(this.courses[currentIndex]);

            coursesGrid.innerHTML = newCard;
            const card = coursesGrid.querySelector('.course-card');
            if (card) {
                card.classList.add('animate__animated', 'animate__fadeIn');
            }

            this.initializeEnrollButtons();
        }, 10000);
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', (): void => {
    NavigationController.initialize();
    AnimationController.initializeButtonAnimations();
    CoursesController.initialize();

    window.addEventListener('scroll', (): void => {
        AnimationController.handleScroll();
    });

    AnimationController.handleScroll();
});
