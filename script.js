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

// Отправка формы
document.getElementById("catForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Котик успешно записан! Мяу :)");
  modal.style.display = 'none';
  this.reset();
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

