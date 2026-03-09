// ===== DINO DATA =====
const dinoData = {
  'baby-dina': {
    name: 'BABY DINA',
    type: 'Brachiosaurus',
    age: 8, sex: 'F',
    desc: 'Tall, sweet, and always hungry! Loves munching on treetop leaves and making new dino friends.',
    img: ''
  },
  'bumpy': {
    name: 'BUMPY',
    type: 'Ankylosaurus',
    age: 11, sex: 'M',
    desc: 'Tough outside, soft inside! A walking tank who loves snacks and tail-smashing fun.',
    img: ''
  },
  'alpha': {
    name: 'ALPHA',
    type: 'Raptor',
    age: 15, sex: 'M',
    desc: 'Fast, fierce, and a little dramatic. Loves racing the wind and leading the pack.',
    img: ''
  },
  'dino': {
    name: 'DINO',
    type: 'Tyrannosaurus',
    age: 29, sex: 'M',
    desc: "Loud roar, big appetite, bigger attitude! Thinks he's scary… but secretly loves belly rubs.",
    img: ''
  },
  'omen': {
    name: 'OMEN',
    type: 'Pterodactyle',
    age: 7, sex: 'M',
    desc: 'Sky explorer with endless energy! Loves soaring high and dive-bombing his friends for fun.',
    img: ''
  },
  'zil': {
    name: 'ZIL',
    type: 'Baryonyx',
    age: 25, sex: 'F',
    desc: 'Cool, calm, and fish-obsessed! Always found near the water hunting her favorite snack.',
    img: ''
  },
  'bok': {
    name: 'BOK',
    type: 'Carnotaurus',
    age: 30, sex: 'M',
    desc: 'Wild, competitive, and super speedy! Loves showing off his horns and winning every chase.',
    img: ''
  },
  'rehd': {
    name: 'REHD',
    type: 'Tsintaosaurus',
    age: 48, sex: 'F',
    desc: 'Quirky and proud of her fancy head crest! Loves singing loud dino tunes at sunset.',
    img: ''
  },
  'sage': {
    name: 'SAGE',
    type: 'Stegosaurus',
    age: 55, sex: 'F',
    desc: 'Wise and gentle with a spiky style! Loves peaceful walks and sunny naps.',
    img: ''
  }
};

// ===== PRODUCT DATA =====
const prodData = {
  'dino-food-herb': {
    name: 'FOOD - HERBIVORE',
    type: 'Plants, Tree seed, and Fruits',
    price: 'Php 5,000.00',
    desc: 'Grass, leaves, and fruits to keep your herbivorous dino friends happy and healthy.',
    img: 'Product Images/prod1.jpg'
  },
  'dino-food-carn': {
    name: 'FOOD - CARNIVORE',
    type: 'Meat',
    price: 'Php 3,000.00',
    desc: 'High-protein diet for your carnivorous dino friends.',
    img: 'Product Images/prod2.png'
  },
  'dino-egg': {
    name: 'DINO EGG',
    type: 'Egg',
    price: 'Php 10,500.00',
    desc: 'Different Species.',
    img: 'Product Images/prod3.avif'
  },
  'whistle': {
    name: 'WHISTLE',
    type: 'Aluminum',
    price: 'Php 650.00',
    desc: 'Used to control dinosaurs.',
    img: 'Product Images/prod4.webp'
  },
  'collar': {
    name: 'COLLAR',
    type: 'Chains',
    price: 'Php 775.00',
    desc: 'A piece of material put around the neck.',
    img: 'Product Images/prod5.webp'
  },
};

function getLocalImgPath(key) {
  // construct a filename based on the card key; e.g. "baby-dina" -> "Baby Dina.png"
  const filename = key
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') + '.png';
  // encode spaces so the browser can resolve the URL even though the folder contains a space
  return `Dino%20Images/${encodeURIComponent(filename)}`;
}
// set modal content and show overlay
function displayModalContent({ name = '', type = '', price = '', desc = '', imgSrc = '' }, overlayId, extra = {}) {
  const imgWrap = document.getElementById('modalImgWrap');
  const img = document.getElementById('modalImg');
  const nameEl = document.getElementById('modalName');
  const typeEl = document.getElementById('modalType');
  const priceEl = document.getElementById('modalPrice');
  const descEl = document.getElementById('modalDesc');

  if (nameEl) nameEl.textContent = name;
  if (typeEl) typeEl.textContent = type;
  if (priceEl) priceEl.textContent = price;
  if (descEl) descEl.textContent = desc;

  if (img && imgSrc) {
    img.src = imgSrc;
    img.style.display = 'block';
    if (imgWrap) imgWrap.classList.remove('no-img');
  } else if (img) {
    img.src = '';
    img.style.display = 'none';
    if (imgWrap) imgWrap.classList.add('no-img');
  }

  const overlay = document.getElementById(overlayId);
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openModal(key) {
  const dino = dinoData[key];
  const prod = prodData[key];
  if (!dino && !prod) return;

  if (dino) {
    displayModalContent({
      name: dino.name,
      type: dino.type ? '🦕 ' + dino.type : '',
      desc: dino.desc,
      imgSrc: dino.img || getLocalImgPath(key)
    }, 'dinoModal');

    const ageEl = document.getElementById('modalAge');
    const sexEl = document.getElementById('modalSex');
    if (ageEl) ageEl.textContent = '🗓 Age ' + (dino.age || '');
    if (sexEl) sexEl.textContent = dino.sex === 'F' ? '♀ Female' : '♂ Male';
  }

  if (prod) {
    displayModalContent({
      name: prod.name ? 'Product: ' + prod.name : '',
      type: prod.type ? 'Type: ' + prod.type : '',
      price: prod.price ? 'Price: ' + prod.price : '',
      desc: prod.desc,
      imgSrc: prod.img || getLocalImgPath(key)
    }, 'prodModal');
  }
}

function closeModal() {
  const dinoEl = document.getElementById('dinoModal'); if (dinoEl) dinoEl.classList.remove('active');
  const prodEl = document.getElementById('prodModal'); if (prodEl) prodEl.classList.remove('active');
  document.body.style.overflow = '';
}

// when the page finishes loading, fill thumbnails and wire up the modal overlay
function populateCards() {
  function populate(selector, dataObj) {
    document.querySelectorAll(selector).forEach(card => {
      const key = card.dataset.key || (card.getAttribute('onclick')?.match(/openModal\('(.+)'\)/)?.[1]);
      if (!key) return;
      const item = dataObj[key];
      if (!item) return;
      const imgWrap = card.querySelector('.card-img-wrap');
      const src = item.img || getLocalImgPath(key);
      if (!src) {
        if (imgWrap) imgWrap.classList.add('no-img');
        return;
      }
      const imgEl = document.createElement('img');
      imgEl.src = src;
      imgEl.alt = item.name || '';
      imgEl.addEventListener('error', () => {
        if (imgWrap) imgWrap.classList.add('no-img');
        imgEl.remove();
      });
      if (imgWrap) imgWrap.appendChild(imgEl);
    });
  }

  populate('.dino-card', dinoData);
  populate('.prod-card', prodData);
}

document.addEventListener('DOMContentLoaded', () => {
  populateCards();
  const dinoOverlay = document.getElementById('dinoModal');
  if (dinoOverlay) dinoOverlay.addEventListener('click', (e) => { if (e.target === dinoOverlay) closeModal(); });
  const prodOverlay = document.getElementById('prodModal');
  if (prodOverlay) prodOverlay.addEventListener('click', (e) => { if (e.target === prodOverlay) closeModal(); });
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// simple add-to-cart handler for product cards
function addToCart(key) {
  const prod = prodData[key];
  const card = document.querySelector(`.prod-card[data-key="${key}"]`);
  if (!card) {
    console.log('addToCart: card not found', key);
    return;
  }
  const btn = card.querySelector('button.btn-outline');
  if (btn) {
    btn.textContent = 'Added ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'ADD TO CART'; btn.disabled = false; }, 1500);
  }
  console.log('Added to cart:', prod ? prod.name : key);
}