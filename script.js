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
phone.addEventListener("input", () => {
  let digits = phone.value.replace(/\D/g, '');

  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;

  digits = digits.slice(0, 11); // максимум 11 цифр

  phone.value = '+7' + digits.slice(1);

  if (digits.length !== 11) {
    phone.classList.add("invalid");
    phoneError.textContent = "Введите 9 цифр после +7 (например: 9231234567)";
    phoneError.style.display = "block";
  } else {
    phone.classList.remove("invalid");
    phoneError.textContent = "";
    phoneError.style.display = "none";
  }
});

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

  alert("Котик успешно записан! Мяу :)");
  modal.style.display = "none";
  this.reset();

  // Сброс ошибок
  [catNameError, ownerNameError, phoneError].forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
  [catName, ownerName, phone].forEach((el) => el.classList.remove("invalid"));
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

