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

function getLocalImgPath(key) {
  // construct a filename based on the card key; e.g. "baby-dina" -> "Baby Dina.png"
  const filename = key
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') + '.png';
  // encode spaces so the browser can resolve the URL even though the folder contains a space
  return `Dino%20Images/${encodeURIComponent(filename)}`;
}

function openModal(key) {
  const dino = dinoData[key];
  if (!dino) return;

  document.getElementById('modalName').textContent = dino.name;
  document.getElementById('modalType').textContent = '🦕 ' + dino.type;
  document.getElementById('modalAge').textContent = '🗓 Age ' + dino.age;
  document.getElementById('modalSex').textContent = dino.sex === 'F' ? '♀ Female' : '♂ Male';
  document.getElementById('modalDesc').textContent = dino.desc;

  const imgWrap = document.getElementById('modalImgWrap');
  const img = document.getElementById('modalImg');
  // prefer explicit path, otherwise try local file
  const src = dino.img || getLocalImgPath(key);
  if (src) {
    img.src = src;
    img.style.display = 'block';
    imgWrap.classList.remove('no-img');
  } else {
    img.src = '';
    img.style.display = 'none';
    imgWrap.classList.add('no-img');
  }

  document.getElementById('dinoModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('dinoModal').classList.remove('active');
  document.body.style.overflow = '';
}

// when the page finishes loading, fill thumbnails and wire up the modal overlay
function populateCards() {
  document.querySelectorAll('.dino-card').forEach(card => {
    const key = card.dataset.key || (card.getAttribute('onclick')?.match(/openModal\('(.+)'\)/)?.[1]);
    if (!key) return;
    const dino = dinoData[key];
    if (!dino) return;
    const imgWrap = card.querySelector('.card-img-wrap');
    let src = dino.img || getLocalImgPath(key);
    if (!src) {
      imgWrap.classList.add('no-img');
      return;
    }
    const imgEl = document.createElement('img');
    imgEl.src = src;
    imgEl.alt = dino.name;
    imgEl.addEventListener('error', () => {
      imgWrap.classList.add('no-img');
      imgEl.remove();
    });
    imgWrap.appendChild(imgEl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateCards();
  const overlay = document.getElementById('dinoModal');
  if (overlay) {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  }
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Contact form send handler
function handleSend(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = 'SENT! 🦕';
  btn.style.background = 'var(--tan)';
  btn.style.color = 'var(--brown-dark)';
  setTimeout(() => {
    btn.textContent = 'SEND MESSAGE';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}