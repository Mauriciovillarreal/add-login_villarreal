const logo = document.getElementById('logo');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 0) {
    logo.style.transform = 'scale(0.9)'; // adjust the scale value to your liking
  } else {
    logo.style.transform = 'scale(1)';
  }
});

document.getElementById('menu-open-btn').onclick = function() {
  document.getElementById('menu-offcanvas').style.transform = 'translateX(-400px)';
  document.body.style.overflow = 'hidden'; // Prevent background from scrolling
  document.addEventListener('click', closeMenuOnClickOutside);
};

document.getElementById('menu-close-btn').onclick = function() {
  closeMenu();
};

document.getElementById('cart-open-btn').onclick = function() {
  document.getElementById('cart-offcanvas').style.transform = 'translateX(-600px)';
  document.body.style.overflow = 'hidden'; // Prevent background from scrolling
  document.addEventListener('click', closeCartOnClickOutside);
};

document.getElementById('cart-close-btn').onclick = function() {
  closeCart();
};

function closeMenu() {
  document.getElementById('menu-offcanvas').style.transform = 'translateX(0)';
  document.body.style.overflow = 'auto'; // Allow background to scroll
  document.removeEventListener('click', closeMenuOnClickOutside);
}

function closeCart() {
  document.getElementById('cart-offcanvas').style.transform = 'translateX(0)';
  document.body.style.overflow = 'auto'; // Allow background to scroll
  document.removeEventListener('click', closeCartOnClickOutside);
}

function closeMenuOnClickOutside(event) {
  if (!event.target.closest('#menu-offcanvas') && !event.target.closest('#menu-open-btn')) {
      closeMenu();
  }
}

function closeCartOnClickOutside(event) {
  if (!event.target.closest('#cart-offcanvas') && !event.target.closest('#cart-open-btn')) {
      closeCart();
  }
}
