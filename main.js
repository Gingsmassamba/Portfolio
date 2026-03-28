// Fonction pour prévisualiser les images téléchargées
function previewImage(event) {
  const file = event.target.files && event.target.files[0];
  const imgElement = document.getElementById('profile-pic');
  if (!file || !imgElement) return;
  const reader = new FileReader();
  reader.onload = function () {
    imgElement.src = reader.result;
  };
  reader.readAsDataURL(file);
}

// Animation de défilement fluide pour les liens d'ancrage
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth',
    });
  });
});

// Effet de saisie de texte pour le titre
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Animation au défilement avec Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observer pour les éléments à animer
document
  .querySelectorAll(
    '.section-title, .profile-info, .certificate-card, .skill-card, .project-card'
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Effet de terminal pour le pseudo
const pseudoElement = document.querySelector('.pseudo');
const originalPseudo = pseudoElement.textContent;

function terminalEffect() {
  let i = 0;
  pseudoElement.textContent = '';

  function type() {
    if (i < originalPseudo.length) {
      pseudoElement.textContent += originalPseudo.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      setTimeout(deleteText, 2000);
    }
  }

  function deleteText() {
    if (pseudoElement.textContent.length > 0) {
      pseudoElement.textContent = pseudoElement.textContent.slice(0, -1);
      setTimeout(deleteText, 50);
    } else {
      setTimeout(type, 500);
    }
  }

  type();
}

// Génération de particules
function createParticles() {
  const container = document.getElementById('particles-container');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Position aléatoire
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 3 + Math.random() * 4;

    particle.style.left = `${left}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);
  }
}

// Terminal interactif
function showTerminal() {
  const modal = document.getElementById('terminal-modal');
  const input = document.getElementById('terminal-input');
  if (modal) modal.removeAttribute('hidden');
  if (input) input.focus();
}

function closeTerminal() {
  const modal = document.getElementById('terminal-modal');
  if (modal) modal.setAttribute('hidden', '');
}

// Commandes du terminal
document.getElementById('terminal-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const command = this.value.toLowerCase();
    const output = document.getElementById('terminal-output');

    // Ajouter la commande à l'output
    output.innerHTML += `<div>> ${this.value}</div>`;

    // Traiter la commande
    switch (command) {
      case 'help':
        output.innerHTML += `<div>Commandes disponibles: about, skills, projects, contact, clear</div>`;
        break;
      case 'about':
        output.innerHTML += `<div>Cyberhack_Massamba - Hacker Éthique spécialisé en sécurité offensive et défensive</div>`;
        break;
      case 'skills':
        output.innerHTML += `<div>Pentesting, Analyse de vulnérabilités, Reverse Engineering, Cryptographie, etc.</div>`;
        break;
      case 'projects':
        output.innerHTML += `<div>Audits de sécurité, Développement d'outils, Formations en cybersécurité</div>`;
        break;
      case 'contact':
        output.innerHTML += `<div>Email: contact@cyberhack-massamba.com | TikTok: @cyberhack_massamba</div>`;
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      case 'matrix':
        startMatrix();
        break;
      default:
        output.innerHTML += `<div>Commande non reconnue. Tapez 'help' pour la liste des commandes.</div>`;
    }

    // Effacer l'input
    this.value = '';

    // Scroll vers le bas
    output.scrollTop = output.scrollHeight;
  }
});

// Effet Matrix
function startMatrix() {
  const chars =
    '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.background = 'rgba(0, 0, 0, 0.8)';
  container.style.zIndex = '9999';
  container.style.fontFamily = 'Courier New, monospace';
  container.style.fontSize = '16px';
  container.style.color = '#0f0';
  container.style.overflow = 'hidden';
  container.style.cursor = 'pointer';

  document.body.appendChild(container);

  // Créer les colonnes
  const columns = Math.floor(window.innerWidth / 20);
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    const ctx = container;
    ctx.innerHTML = '';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 20;
      const y = drops[i] * 20;

      const charElement = document.createElement('div');
      charElement.textContent = text;
      charElement.style.position = 'absolute';
      charElement.style.left = `${x}px`;
      charElement.style.top = `${y}px`;
      charElement.style.opacity = Math.random() > 0.5 ? '1' : '0.7';

      container.appendChild(charElement);

      if (y > window.innerHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  const matrixInterval = setInterval(draw, 50);

  // Arrêter l'effet au clic
  container.addEventListener('click', function () {
    clearInterval(matrixInterval);
    document.body.removeChild(container);
  });
}

// Initialiser les animations
window.addEventListener('load', function () {
  // Effet de particules
  createParticles();

  // Effet de saisie pour le titre
  const typingElement = document.querySelector('.typing-text');
  const originalText = typingElement.textContent;
  typeWriter(typingElement, originalText, 80);

  // Effet terminal pour le pseudo
  setTimeout(terminalEffect, 2000);

  // Effet de glitch aléatoire sur le pseudo
  setInterval(() => {
    if (Math.random() > 0.95) {
      const pseudo = document.getElementById('main-pseudo');
      const originalText = pseudo.textContent;
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      let glitched = '';
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.8) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += originalText[i];
        }
      }

      pseudo.textContent = glitched;

      setTimeout(() => {
        pseudo.textContent = originalText;
      }, 100);
    }
  }, 1000);
});

(function wireUi() {
  const btnTerminal = document.getElementById('btn-terminal');
  const btnMatrix = document.getElementById('btn-matrix');
  const btnClose = document.getElementById('btn-close-terminal');
  const profileUpload = document.getElementById('profile-upload');
  const profilePic = document.getElementById('profile-pic');

  if (btnTerminal) btnTerminal.addEventListener('click', showTerminal);
  if (btnMatrix) btnMatrix.addEventListener('click', startMatrix);
  if (btnClose) btnClose.addEventListener('click', closeTerminal);
  if (profileUpload) profileUpload.addEventListener('change', previewImage);
  if (profilePic && profileUpload) {
    profilePic.addEventListener('click', () => profileUpload.click());
  }
})();
