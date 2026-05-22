// FLOATING ICONS
const techIcons = [
  '</>',
  '{ }',
  '[ ]',
  '()',
  '=&gt;',
  '#',
  '@',
  'html',
  'css',
  'js',
  'py',
  'sql',
  'api',
  'git',
  'npm',
  'db',
  'fn()',
  'var',
  'let',
  'if',
  'for',
  '&&',
  '||',
  '++',
  '**',
  '::',
  '~~',
]
const floatBg = document.getElementById('floatBg')
if (floatBg) {
  for (let i = 0; i < 38; i++) {
    const el = document.createElement('span')
    el.className = 'fi'
    el.textContent = techIcons[Math.floor(Math.random() * techIcons.length)]
    const left = Math.random() * 100
    const delay = Math.random() * 18
    const dur = 12 + Math.random() * 16
    const size = 0.8 + Math.random() * 1.2
    el.style.cssText = `left:${left}%;bottom:-60px;font-size:${size}rem;animation-duration:${dur}s;animation-delay:${delay}s;font-family:monospace;color:${Math.random() > 0.6 ? '#00E5FF' : Math.random() > 0.5 ? '#9B59FF' : '#00FFA3'}`
    floatBg.appendChild(el)
  }
}

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible')
    })
  },
  { threshold: 0.1 },
)
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

// Active nav highlight
const sections = document.querySelectorAll('section[id], div[id]')
window.addEventListener('scroll', () => {
  let cur = ''
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id
  })
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--cyan)' : ''
  })
})

// Contact form: client-side validation for Netlify Forms (no mailto)
const contactForm = document.getElementById('contactForm')
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    const name = document.getElementById('contactName').value.trim()
    const email = document.getElementById('contactEmail').value.trim()
    const message = document.getElementById('contactMessage').value.trim()

    if (!name || !email || !message) {
      event.preventDefault()
      alert('Merci de remplir tous les champs avant d’envoyer.')
    }
    // Let the form submit normally to Netlify when validation passes
  })
}

// MODAL DATA
const projects = {
  eventpass: {
    num: '01 · Projet phare',
    title: "EventPass — Contrôle d'accès QR Code",
    desc: "Plateforme complète de gestion et contrôle d'accès aux événements privés au Sénégal. Validation QR en temps réel, tableau de bord admin, gestion multi-rôles (admin, organisateur, agent de sécurité). Notifications live via Socket.io, authentification JWT sécurisée.",
    stack: [
      'React',
      'Node.js',
      'Express',
      'SQLite',
      'Socket.io',
      'JWT Auth',
      'QR Code API',
    ],
    demo: null,
    github: 'https://github.com/bamba-Tech04',
    preview: 'EventPass',
    color: 'rgba(0,229,255,.08)',
  },
  chariow: {
    num: '02',
    title: 'Chariow Store',
    desc: 'Boutique en ligne de produits digitaux (ebooks, templates, guides) ciblant les entrepreneurs africains. Interface moderne avec système de paiement intégré, catalogue de produits et téléchargement automatique après achat.',
    stack: ['WordPress', 'WooCommerce', 'Figma', 'PHP', 'MySQL'],
    demo: 'https://chariow.com',
    github: null,
    preview: 'Chariow',
    color: 'rgba(155,89,255,.08)',
  },
  buildpro: {
    num: '03',
    title: 'BuildPro BTP',
    desc: 'Site vitrine professionnel pour une entreprise de construction à Dakar. Pages services, réalisations, formulaire de devis en ligne et contact. Design BTP moderne, entièrement responsive, déployé sur Netlify.',
    stack: ['React', 'Figma', 'Netlify', 'CSS3'],
    demo: 'https://harmonious-twilight-0a481a.netlify.app',
    github: null,
    preview: 'BuildPro',
    color: 'rgba(0,229,255,.06)',
  },
  dakardeco: {
    num: '04',
    title: 'DakarDéco — Boutique & Décoration',
    desc: 'Site vitrine et boutique e-commerce pour un spécialiste des faux plafonds, staff & plâtrerie et décoration intérieure à Malika, Dakar. Catalogue produits avec panier, commande directe via WhatsApp, et galerie de réalisations.',
    stack: ['React', 'Figma', 'Netlify', 'WhatsApp API'],
    demo: 'https://dakardeco.netlify.app',
    github: null,
    preview: 'DakarDéco',
    color: 'rgba(0,255,163,.06)',
  },
  verus: {
    num: '05 · Client',
    title: 'Verus BTP',
    desc: 'Site officiel de Verus BTP, entreprise de bâtiment et travaux publics au Sénégal. Présentation des services : études, plans architecturaux, béton armé et réalisation de projets de construction. Interface claire et professionnelle.',
    stack: ['HTML/CSS', 'JavaScript', 'Netlify'],
    demo: 'https://verusbtp.netlify.app',
    github: null,
    preview: 'Verus BTP',
    color: 'rgba(155,89,255,.06)',
  },
  trackisen: {
    num: '06 · En cours',
    title: 'Trackisen — Suivi de Livraisons',
    desc: 'Application SaaS de tracking de livraisons en temps réel pensée pour le marché dakarois. Notifications SMS via AfricasTalking, tableau de bord livreur, interface client, et intégration paiement Wave. Déploiement à venir.',
    stack: [
      'Django REST',
      'React',
      'AfricasTalking SMS',
      'Wave API',
      'PostgreSQL',
    ],
    demo: null,
    github: null,
    preview: 'Trackisen',
    color: 'rgba(0,229,255,.05)',
  },
}

const projectOrder = [
  'eventpass',
  'chariow',
  'buildpro',
  'dakardeco',
  'verus',
  'trackisen',
]

function renderProjectCards() {
  const grid = document.getElementById('projectsGrid')
  if (!grid) return

  grid.innerHTML = projectOrder
    .map((id) => {
      const p = projects[id]
      const glowStyle = p.color
        ? `background: radial-gradient(circle, ${p.color} 0%, transparent 70%)`
        : ''

      return `
              <div class="project-card ${id === 'eventpass' ? 'featured' : ''}" data-project-id="${id}">
                <div class="project-glow" style="${glowStyle}"></div>
                <div class="project-num">${p.num}</div>
                <div class="project-title">${p.title}</div>
                <p class="project-desc">${p.desc}</p>
                <div class="project-stack">${p.stack
                  .map((s) => `<span class="stack-tag">${s}</span>`)
                  .join('')}</div>
                <span class="project-link">Voir le projet →</span>
              </div>`
    })
    .join('')
}

renderProjectCards()

document.getElementById('projectsGrid')?.addEventListener('click', (event) => {
  const card = event.target.closest('.project-card')
  if (card) openModal(card.dataset.projectId)
})

function openModal(id) {
  const p = projects[id]
  const hasDemoLink = p.demo && p.demo !== '#'
  const stackHtml = p.stack
    .map((s) => `<span class="stack-tag">${s}</span>`)
    .join('')
  const iframeHtml = hasDemoLink
    ? `
        <div class="modal-iframe-wrap">
          <iframe src="${p.demo}" loading="lazy" title="Aperçu ${p.title}" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
        </div>`
    : ''
  const demoBtn = hasDemoLink
    ? `<a class="modal-btn-demo" href="${p.demo}" target="_blank">🔗 Voir le site en live</a>`
    : `<span class="modal-btn-demo" style="opacity:.45;cursor:not-allowed">🔗 Démo bientôt disponible</span>`
  const ghBtn = p.github
    ? `<a class="modal-btn-gh" href="${p.github}" target="_blank">⌨️ GitHub</a>`
    : ''

  document.getElementById('modal-content').innerHTML = `
        <div class="modal-preview" style="background:linear-gradient(135deg,#0d1117,#111820)">
          <div class="modal-preview-label" style="color:${p.color.replace('rgba', 'rgba').replace(/[\d.]+\)$/, '0.2)')};">${p.preview}</div>
        </div>
        <div class="modal-body">
          <div class="modal-num">${p.num}</div>
          <div class="modal-title">${p.title}</div>
          <p class="modal-desc">${p.desc}</p>
          <div class="modal-stack">${stackHtml}</div>
          <div class="modal-actions">${demoBtn}${ghBtn}</div>
          ${iframeHtml}
        </div>`

  document.getElementById('modal-overlay').classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open')
  document.body.style.overflow = ''
  // Vider l'iframe pour stopper le chargement
  const iframe = document.querySelector('#modal-content iframe')
  if (iframe) iframe.src = ''
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})
