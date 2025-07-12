AOS.init();

// Модальное окно
const modal = document.getElementById('modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');

openModal.addEventListener('click', () => modal.style.display = 'flex');
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Валидация формы
const catName = document.getElementById("catName");
const ownerName = document.getElementById("ownerName");
const phone = document.getElementById("phone");

const catNameError = document.getElementById("catNameError");
const ownerNameError = document.getElementById("ownerNameError");
const phoneError = document.getElementById("phoneError");

const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;

// Проверка имени котика
catName.addEventListener("input", () => {
  if (!nameRegex.test(catName.value.trim())) {
    catName.classList.add("invalid");
    catNameError.textContent = "Имя должно содержать только буквы";
    catNameError.style.display = "block";
  } else {
    catName.classList.remove("invalid");
    catNameError.textContent = "";
    catNameError.style.display = "none";
  }
});

// Проверка имени владельца
ownerName.addEventListener("input", () => {
  if (!nameRegex.test(ownerName.value.trim())) {
    ownerName.classList.add("invalid");
    ownerNameError.textContent = "Имя должно содержать только буквы";
    ownerNameError.style.display = "block";
  } else {
    ownerName.classList.remove("invalid");
    ownerNameError.textContent = "";
    ownerNameError.style.display = "none";
  }
});

// Проверка телефона и автоформат
phone.addEventListener("input", onPhoneInput);
phone.addEventListener("keydown", onPhoneKeyDown);
phone.addEventListener("focus", onPhoneFocus);
phone.addEventListener("blur", onPhoneBlur);

let previousValue = "";
let previousCursorPos = 0;

function onPhoneFocus(e) {
  if (!e.target.value) {
    e.target.value = "+7 (";
    setCursorPosition(e.target, 4);
    previousValue = e.target.value;
    previousCursorPos = 4;
  }
}

function onPhoneInput(e) {
  const input = e.target;
  let rawValue = input.value;
  let digits = rawValue.replace(/\D/g, "");

  if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }
  digits = digits.slice(0, 11);

  const formatted = formatPhone(digits);

  // Позиция курсора до изменений
  let cursorPos = input.selectionStart;

  // Защита от захода курсора в префикс
  if (cursorPos < 4) {
    cursorPos = 4;
    setCursorPosition(input, cursorPos);
    return; 
  }

  // Количество цифр до курсора в старом значении
  let digitsBeforeCursor = 0;
  for (let i = 0; i < cursorPos; i++) {
    if (/\d/.test(rawValue[i])) digitsBeforeCursor++;
  }

  input.value = formatted;

  let newCursorPos = 0;
  let digitsCount = 0;
  while (digitsCount < digitsBeforeCursor && newCursorPos < formatted.length) {
    if (/\d/.test(formatted[newCursorPos])) digitsCount++;
    newCursorPos++;
  }

  // Защита от выхода за пределы и захода в префикс
  if (newCursorPos < 4) newCursorPos = 4;
  if (newCursorPos > formatted.length) newCursorPos = formatted.length;

  setCursorPosition(input, newCursorPos);

  // Валидация
  if (digits.length < 11) {
    phone.classList.add("invalid");
    phoneError.textContent = "Введите полный номер";
    phoneError.style.display = "block";
  } else {
    phone.classList.remove("invalid");
    phoneError.textContent = "";
    phoneError.style.display = "none";
  }

  previousValue = formatted;
  previousCursorPos = newCursorPos;
}

function onPhoneKeyDown(e) {
  const input = e.target;
  const prefixLength = 4;
  const pos = input.selectionStart;

  // Запретить удаление в префиксе
  if ((e.key === "Backspace" && pos <= prefixLength) ||
      (e.key === "Delete" && pos < prefixLength)) {
    e.preventDefault();
    return;
  }

  // Запретить перемещение курсора в префикс стрелкой влево
  if (e.key === "ArrowLeft" && pos <= prefixLength) {
    e.preventDefault();
    setCursorPosition(input, prefixLength);
    return;
  }

  previousCursorPos = pos;
  previousValue = input.value;
}

function formatPhone(digits) {
  let formatted = "+7 (";

  if (digits.length > 1) formatted += digits.slice(1, 4);
  if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
  if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
  if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);

  return formatted;
}

function setCursorPosition(el, pos) {
  requestAnimationFrame(() => {
    el.setSelectionRange(pos, pos);
  });
}

function onPhoneBlur(e) {
  if (e.target.value === "+7 (" || e.target.value === "+7") {
    e.target.value = "";
    previousValue = "";
    previousCursorPos = 0;
  }
}

// Финальная проверка перед отправкой
document.getElementById("catForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    nameRegex.test(catName.value.trim()) &&
    nameRegex.test(ownerName.value.trim()) &&
    phone.value.replace(/\D/g, '').length === 11;

  if (!isValid) {
    return;
  }

  // Показать сообщение
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';

  // Скрыть модальное окно и очистить форму через 2.5 секунды
  setTimeout(() => {
    successMessage.style.display = 'none';
    modal.style.display = 'none';
    this.reset();

    // Сброс ошибок
    [catNameError, ownerNameError, phoneError].forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
    [catName, ownerName, phone].forEach((el) => el.classList.remove("invalid"));
  }, 2500);
});

// Автоматическая смена отзывов
let currentReview = 0;
const reviews = document.querySelectorAll('.review');

function showNextReview() {
  reviews[currentReview].classList.remove('active');
  currentReview = (currentReview + 1) % reviews.length;
  reviews[currentReview].classList.add('active');
}
setInterval(showNextReview, 5000); 

// Слайдер "Наши гости"
const track = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const container = document.querySelector('.slider-container');

let currentIndex = 0;

const updateSlider = () => {
  const slideWidth = container.clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
};

nextBtn.addEventListener('click', () => {
  const totalSlides = document.querySelectorAll('.guest').length;
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

