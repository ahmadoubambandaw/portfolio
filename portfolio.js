/* ============================================================
   Portfolio — Cheikh Ahmadou Bamba Ndaw
   Rendu dynamique : compétences, outils, projets + modal
   ============================================================ */

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        revealObserver.unobserve(e.target)
      }
    })
  },
  { threshold: 0.12 },
)
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

/* ---------- Mobile nav toggle ---------- */
const navbar = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
navToggle?.addEventListener('click', () => navbar.classList.toggle('open'))
document.querySelectorAll('.nav-links a').forEach((a) =>
  a.addEventListener('click', () => navbar.classList.remove('open')),
)

/* ---------- Active nav highlight ---------- */
const navSections = document.querySelectorAll('section[id]')
window.addEventListener('scroll', () => {
  let cur = ''
  navSections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id
  })
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--violet)' : ''
  })
})

/* ============================================================
   DATA — Compétences (barres)
   ============================================================ */
const skillGroups = [
  {
    icon: '🌐',
    title: 'Développement Web',
    num: '01. Front-end',
    rows: [
      { name: 'HTML / CSS / JS', pc: 95 },
      { name: 'React', pc: 85 },
      { name: 'PHP / WordPress', pc: 90 },
      { name: 'Responsive Design', pc: 95 },
    ],
  },
  {
    icon: '🔧',
    title: 'Backend & Data',
    num: '02. Serveur',
    rows: [
      { name: 'Node.js / Express', pc: 85 },
      { name: 'Django / Python', pc: 80 },
      { name: 'MySQL / SQLite', pc: 85 },
      { name: 'REST API / JWT', pc: 85 },
    ],
  },
  {
    icon: '🎨',
    title: 'Design & Marketing',
    num: '03. Créa',
    rows: [
      { name: 'UX/UI (Figma)', pc: 90 },
      { name: 'Social Media', pc: 95 },
      { name: 'SEO / Contenu', pc: 85 },
      { name: 'Automatisation (n8n)', pc: 80 },
    ],
  },
]

function renderSkills() {
  const grid = document.getElementById('skillsGrid')
  if (!grid) return
  grid.innerHTML = skillGroups
    .map(
      (g, i) => `
      <div class="skill-card reveal" style="transition-delay:${i * 0.08}s">
        <div class="skill-head">
          <div class="skill-ic">${g.icon}</div>
          <div>
            <div class="t">${g.title}</div>
            <div class="n">${g.num}</div>
          </div>
        </div>
        ${g.rows
          .map(
            (r) => `
          <div class="skill-row">
            <div class="sr-top"><span>${r.name}</span><span class="pc">${r.pc}%</span></div>
            <div class="bar"><i data-pc="${r.pc}"></i></div>
          </div>`,
          )
          .join('')}
      </div>`,
    )
    .join('')

  // re-observe the freshly created reveal cards
  grid.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

  // animate bars when skills section enters viewport
  const skillsSection = document.getElementById('skills')
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          grid
            .querySelectorAll('.bar > i')
            .forEach((i) => (i.style.width = i.dataset.pc + '%'))
          barObserver.disconnect()
        }
      })
    },
    { threshold: 0.25 },
  )
  if (skillsSection) barObserver.observe(skillsSection)
}
renderSkills()

/* ============================================================
   DATA — Outils (icônes SVG)
   ============================================================ */
const icons = {
  html: '<svg viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.835-6.865.001.23 2.07 6.39.072-.277 3.047-5.51.001-1.17-3.67H7.17l1.39 4.81 4.52 1.23 4.47-1.23.59-8.565z"/></svg>',
  css: '<svg viewBox="0 0 24 24" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.835-6.865.001.23 2.07 6.39.072-.277 3.047-5.51.001-2.065-5.57H7.17l2.28 7.87 4.52 1.23 4.47-1.23.59-8.565z"/></svg>',
  js: '<svg viewBox="0 0 24 24" fill="#F7DF1E"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
  react:
    '<svg viewBox="0 0 24 24" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.624 4.887 2.624.413 0 .783-.09 1.106-.278 1.375-.793 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.29zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>',
  node: '<svg viewBox="0 0 24 24" fill="#339933"><path d="M11.998.001a.865.865 0 0 0-.424.111L.733 6.235a.857.857 0 0 0-.431.741v12.249a.86.86 0 0 0 .431.741l2.815 1.626c1.356.679 1.843.683 2.463.683 2.017 0 3.172-1.22 3.172-3.347V8.515a.386.386 0 0 0-.386-.386H7.33a.386.386 0 0 0-.385.386v10.213c0 .942-.975 1.876-2.566 1.083L1.69 18.16a.087.087 0 0 1-.043-.076V6.979a.087.087 0 0 1 .043-.076l10.841-6.124a.087.087 0 0 1 .087 0l10.841 6.124a.087.087 0 0 1 .043.076v11.105a.086.086 0 0 1-.043.076l-10.841 6.126a.087.087 0 0 1-.087 0l-2.768-1.604c-.2-.114-.42-.194-.652-.215-.556-.048-.994.285-.994.285l-.001-.001c.19.116 2.384 1.434 2.796 1.66a.867.867 0 0 0 .851 0l10.841-6.126a.863.863 0 0 0 .431-.741V6.976a.863.863 0 0 0-.431-.741L12.422.112a.867.867 0 0 0-.424-.111zm2.76 7.742a4.885 4.885 0 0 0-2.888.747 2.972 2.972 0 0 0-1.225 2.567c0 2.038 1.538 2.597 3.935 2.853 2.907.307 3.138.771 3.138 1.393 0 1.078-.864 1.538-2.895 1.538-2.555 0-3.118-.641-3.308-1.913a.384.384 0 0 0-.379-.327h-1.479a.386.386 0 0 0-.385.386c0 2.228 1.216 3.882 5.551 3.882 3.319 0 5.228-1.308 5.228-3.587 0-2.264-1.528-2.866-4.748-3.294-3.253-.432-3.582-.651-3.582-1.414 0-.634.281-1.48 2.673-1.48 2.142 0 2.931.461 3.258 1.907a.385.385 0 0 0 .378.307h1.477a.386.386 0 0 0 .386-.394c-.212-2.497-1.878-3.671-5.135-3.671z"/></svg>',
  python:
    '<svg viewBox="0 0 24 24" fill="#3776AB"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.98l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V2.06h2.09l.14.01zm-6.47 1.8a1.1 1.1 0 0 0-.79.32 1.1 1.1 0 0 0-.33.79 1.11 1.11 0 0 0 .33.79 1.1 1.1 0 0 0 .79.33 1.11 1.11 0 0 0 .79-.33 1.11 1.11 0 0 0 .33-.79 1.1 1.1 0 0 0-.33-.79 1.11 1.11 0 0 0-.79-.32z"/></svg>',
  django:
    '<svg viewBox="0 0 24 24" fill="#44B78B"><path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 0 0-1.097-.137c-1.983 0-3.129 1.218-3.129 3.35 0 2.08 1.096 3.23 3.129 3.23.36 0 .657-.025 1.097-.076zM20.637 5.805v12.243c0 4.217-1.096 5.97-3.34 6.957-2.904.97-5.324.684-7.718.685l-.586-1.217c1.834-.23 3.537-.476 5.087-1.117 1.66-.71 2.132-1.7 2.132-3.62v-.624c-.688.382-1.477.535-2.59.535-3.315 0-5.248-2.294-5.248-5.956 0-3.967 2.599-6.244 6.778-6.244 1.198 0 2.346.152 3.485.358zm-3.921 3.28a4.803 4.803 0 0 0-1.097-.153c-1.707 0-2.903 1.32-2.903 3.35 0 1.98 1.146 3.155 2.903 3.155.432 0 .764-.05 1.097-.177z"/></svg>',
  php: '<svg viewBox="0 0 24 24" fill="#777BB4"><path d="M12 5.95C5.373 5.95 0 8.69 0 12.06s5.373 6.11 12 6.11 12-2.74 12-6.11S18.627 5.95 12 5.95zm-1.528 4.34h1.337c1.474 0 2.07.56 2.07 1.713 0 1.3-.741 1.945-2.295 1.945h-.714v1.792H9.576zm3.77 0h1.303l.386 1.824h.02l.386-1.824h1.303l-.908 5.45h-1.217l.25-1.499h-.02l-.483 1.499H14.03l-.483-1.499h-.02l.25 1.499H12.56zm-6.93 0h1.338c1.474 0 2.07.56 2.07 1.713 0 1.3-.741 1.945-2.295 1.945h-.714v1.792H6.893zm4.052.865v1.928h.354c.613 0 .937-.29.937-.954 0-.643-.306-.974-.937-.974zm-4.052 0v1.928h.354c.612 0 .937-.29.937-.954 0-.643-.306-.974-.937-.974z"/></svg>',
  mysql:
    '<svg viewBox="0 0 24 24" fill="#4479A1"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 0 0-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.966.378 3.81.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.357-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.398-.424 2.097-1.27 2.097-.442 0-.768-.165-.976-.494z"/></svg>',
  wordpress:
    '<svg viewBox="0 0 24 24" fill="#21759B"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM1.5 12c0-1.524.328-2.972.914-4.278l5.04 13.804A10.503 10.503 0 0 1 1.5 12zm10.5 10.5c-1.03 0-2.026-.15-2.968-.428l3.153-9.16 3.23 8.85c.02.052.046.1.075.145A10.46 10.46 0 0 1 12 22.5zm1.448-15.42c.632-.033 1.202-.1 1.202-.1.566-.067.5-.898-.066-.865 0 0-1.7.134-2.799.134-1.031 0-2.766-.134-2.766-.134-.566-.033-.633.832-.067.865 0 0 .537.067 1.102.1l1.636 4.484-2.3 6.897L6.09 7.08c.633-.033 1.203-.1 1.203-.1.566-.067.499-.898-.067-.865 0 0-1.699.134-2.799.134-.197 0-.43-.005-.678-.013A10.503 10.503 0 0 1 12 1.5c2.748 0 5.25 1.05 7.13 2.77-.045-.003-.09-.008-.137-.008-1.03 0-1.76.898-1.76 1.864 0 .866.499 1.598 1.031 2.463.399.7.865 1.598.865 2.895 0 .898-.345 1.94-.799 3.394l-1.047 3.497-3.79-11.29zm5.9 1.463c.435 3.185-.732 5.573-.732 5.573l-3.117 9.006A10.503 10.503 0 0 0 22.5 12c0-1.593-.354-3.104-.984-4.457z"/></svg>',
  figma:
    '<svg viewBox="0 0 24 24" fill="#F24E1E"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zm6.703 7.51c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49zm-7.51 0c0 1.665 1.355 3.019 3.019 3.019s3.019-1.354 3.019-3.019-1.354-3.019-3.019-3.019-3.019 1.355-3.019 3.019zm9.528-5.02h-1.471V8.981h1.471c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49z"/></svg>',
  git: '<svg viewBox="0 0 24 24" fill="#F05032"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6 0 1.846 1.846 0 0 1-.404-1.996L12.86 8.955v6.525c.176.086.342.203.48.34a1.847 1.847 0 0 1 0 2.6 1.84 1.84 0 0 1-2.6 0 1.847 1.847 0 0 1 0-2.6c.158-.158.347-.27.554-.345V8.825a1.854 1.854 0 0 1-.554-.345 1.85 1.85 0 0 1-.408-2.013L7.636 3.71.45 10.897a1.55 1.55 0 0 0 0 2.187l10.48 10.478a1.55 1.55 0 0 0 2.187 0l10.43-10.43a1.55 1.55 0 0 0 0-2.203z"/></svg>',
  netlify:
    '<svg viewBox="0 0 24 24" fill="#00C7B7"><path d="M6.49 19.04h-.23L5.13 17.9v-.23l1.73-1.73h1.2l.16.16v1.2L6.49 19.04zM5.13 6.31V6.08l1.13-1.13h.23L8.22 6.7v1.2l-.16.16h-1.2L5.13 6.31zm9.15 9.46h-1.65l-.14-.14v-3.87c0-.68-.27-1.21-1.09-1.23-.42 0-.9 0-1.42.02l-.08.08v5l-.14.14H8.11l-.14-.14V9.08l.14-.14h3.71c1.44 0 2.61 1.17 2.61 2.61v4.08l-.15.14zM4.4 12.86H.14L0 12.72v-1.44l.14-.14H4.4l.14.14v1.44l-.14.14zm19.46 0h-4.26l-.14-.14v-1.44l.14-.14h4.26l.14.14v1.44l-.14.14zm-11.72 6.6l-.14-.14v-2.22l.14-.14h.02c.9 0 1.63.73 1.63 1.63v.6l-.14.14h-1.49zm0-12.9h1.49l.14.14v.6c0 .9-.73 1.63-1.63 1.63h-.02l-.14-.14V6.7l.14-.14z"/></svg>',
  vite: '<svg viewBox="0 0 24 24" fill="#646CFF"><path d="M8.286 10.578l.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.373.826.826 0 0 1-.634-.294.81.81 0 0 1-.16-.666l1.029-4.98-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.183 23.7a.612.612 0 0 0 1.066-.004l11.71-20.14a.612.612 0 0 0-.633-.905z"/></svg>',
  tailwind:
    '<svg viewBox="0 0 24 24" fill="#06B6D4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>',
  n8n: '<svg viewBox="0 0 24 24" fill="none" stroke="#EA4B71" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><line x1="8" y1="12" x2="16" y2="7"/><line x1="8" y1="12" x2="16" y2="17"/></svg>',
}

const toolsPrimary = [
  { i: 'html', n: 'HTML5' },
  { i: 'css', n: 'CSS3' },
  { i: 'js', n: 'JavaScript' },
  { i: 'react', n: 'React' },
  { i: 'node', n: 'Node.js' },
  { i: 'figma', n: 'Figma' },
]
const toolsSecondary = [
  { i: 'python', n: 'Python' },
  { i: 'django', n: 'Django' },
  { i: 'php', n: 'PHP' },
  { i: 'mysql', n: 'MySQL' },
  { i: 'wordpress', n: 'WordPress' },
  { i: 'tailwind', n: 'Tailwind' },
  { i: 'vite', n: 'Vite' },
  { i: 'git', n: 'Git' },
  { i: 'n8n', n: 'n8n' },
  { i: 'netlify', n: 'Netlify' },
]

function renderTools() {
  const build = (list) =>
    list
      .map(
        (t) =>
          `<div class="tool-chip">${icons[t.i] || ''}<span class="tn">${t.n}</span></div>`,
      )
      .join('')
  const p = document.getElementById('toolsPrimary')
  const s = document.getElementById('toolsSecondary')
  if (p) p.innerHTML = build(toolsPrimary)
  if (s) s.innerHTML = build(toolsSecondary)
}
renderTools()

/* ============================================================
   DATA — Projets
   ============================================================ */
const projects = {
  naatal: {
    cat: 'SaaS · ERP multi-tenant',
    isNew: true,
    title: 'Naatal — ERP SaaS pour PME africaines',
    desc: "ERP SaaS modulaire et multi-tenant pensé pour les PME d'Afrique subsaharienne et du Maghreb. 8 modules métiers : comptabilité conforme SYSCOHADA, facturation, gestion de stock, RH & paie, CRM et gestion de projet. Gère plusieurs devises africaines et le mobile money, avec un mode hors-ligne pour les zones à faible connectivité.",
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Mobile Money'],
    demo: 'https://erp-saa-s-swart.vercel.app',
    github: 'https://github.com/ahmadoubambandaw/ERP-SaaS',
    preview: 'Naatal ERP',
    cover: 'assets/covers/naatal.png',
    grad: 'linear-gradient(135deg,#171233,#4a2fd0)',
  },
  koligo: {
    cat: 'App Web · Logistique',
    isNew: true,
    title: 'KoliGo — Transport & livraison de colis',
    desc: "Application web pour la gestion et le suivi de livraisons de colis. Interface moderne permettant de commander un transport, suivre l'acheminement et gérer les livraisons. Construite avec React, Vite et Tailwind CSS pour une expérience rapide et responsive.",
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    demo: null,
    github: 'https://github.com/bamba-Tech04/colima',
    preview: 'KoliGo',
    cover: 'assets/covers/koligo.jpg',
    grad: 'linear-gradient(135deg,#6c47ff,#8b6eff)',
  },
  boutique: {
    cat: 'SaaS · Headless Commerce',
    isNew: true,
    title: 'Boutique — Headless Commerce SaaS',
    desc: "Plateforme e-commerce multi-tenant qui permet aux marchands de connecter leur boutique Shopify et d'obtenir une vitrine premium ultra-rapide, sans duplication de données (Shopify reste la source de vérité). Catalogue, filtres avancés, panier temps réel, comptes clients, wishlist, recherche instantanée, dashboard analytics et facturation Stripe.",
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4', 'Stripe', 'Shopify API'],
    demo: 'https://boutique-ecommerce-t4k8.vercel.app',
    github: 'https://github.com/ahmadoubambandaw/Boutique-Ecommerce-',
    preview: 'Boutique',
    cover: 'assets/covers/boutique.jpg',
    grad: 'linear-gradient(135deg,#5b34f0,#9d7bff)',
  },
  scolaris: {
    cat: 'SaaS · Gestion scolaire',
    title: 'Scolaris — ERP de gestion scolaire',
    desc: "Plateforme ERP cloud pour les écoles africaines et francophones : gestion pédagogique, financière et administrative. Tableaux de bord temps réel, détection des élèves à risque par IA, facturation automatisée, pointage par QR code et communication multicanale (email, SMS, WhatsApp). 13 rôles utilisateurs avec isolation complète des données.",
    stack: ['Next.js 14', 'React 18', 'Node.js', 'Express', 'PostgreSQL'],
    demo: 'https://concours-rose.vercel.app',
    github: 'https://github.com/ahmadoubambandaw/concours',
    preview: 'Scolaris',
    cover: 'assets/covers/scolaris.jpg',
    grad: 'linear-gradient(135deg,#6c47ff,#00b8d4)',
  },
  ndawresto: {
    cat: 'SaaS · Restaurant OS',
    title: 'Ndaw-Resto — Restaurant OS',
    desc: "Plateforme SaaS « Restaurant OS » complète : réservations, caisse (POS), gestion de cuisine (Kitchen Display), stock, CRM, comptabilité, marketing et reporting, activés par abonnement. Architecture modulaire multi-tenant avec API Laravel partagée (web Next.js, mobile Flutter à venir), programmes de fidélité et sites personnalisés avec domaine sur mesure.",
    stack: ['Laravel 13', 'Next.js', 'PostgreSQL', 'Redis', 'Multi-tenant'],
    demo: 'https://reservation-nine-beta.vercel.app',
    github: 'https://github.com/ahmadoubambandaw/reservation',
    preview: 'Ndaw-Resto',
    cover: 'assets/covers/ndawresto.jpg',
    grad: 'linear-gradient(135deg,#e0555a,#7c5cfc)',
  },
  teranga: {
    cat: 'E-commerce · Mode',
    title: 'Teranga Shein — Boutique mode',
    desc: "Boutique e-commerce de mode inspirée de Shein, pensée pour le marché sénégalais : catalogue de vêtements et accessoires, navigation fluide et commande en ligne. Vitrine moderne et responsive déployée sur Vercel.",
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    demo: 'https://terangashein.vercel.app',
    github: 'https://github.com/ahmadoubambandaw/Teranga-mode',
    preview: 'Teranga Shein',
    cover: 'assets/covers/teranga.jpg',
    grad: 'linear-gradient(135deg,#9d7bff,#e0555a)',
  },
  eventpass: {
    cat: "Plateforme · Contrôle d'accès",
    title: "EventPass — Contrôle d'accès QR Code",
    desc: "Plateforme complète de gestion et contrôle d'accès aux événements privés au Sénégal. Validation QR en temps réel, tableau de bord admin, gestion multi-rôles (admin, organisateur, agent de sécurité). Notifications live via Socket.io, authentification JWT sécurisée.",
    stack: ['React', 'Node.js', 'Express', 'SQLite', 'Socket.io', 'JWT'],
    demo: null,
    github: 'https://github.com/ahmadoubambandaw/Evenpass',
    preview: 'EventPass',
    cover: 'assets/covers/eventpass.jpg',
    grad: 'linear-gradient(135deg,#171233,#3a2a7a)',
  },
  chariow: {
    cat: 'E-commerce · Produits digitaux',
    title: 'Chariow Store',
    desc: 'Boutique en ligne de produits digitaux (ebooks, templates, guides) ciblant les entrepreneurs africains. Interface moderne avec système de paiement intégré, catalogue de produits et téléchargement automatique après achat.',
    stack: ['WordPress', 'WooCommerce', 'Figma', 'PHP', 'MySQL'],
    demo: 'https://chariow.com',
    github: null,
    preview: 'Chariow',
    cover: 'assets/covers/chariow.jpg',
    grad: 'linear-gradient(135deg,#8b6eff,#b49bff)',
  },
  verus: {
    cat: 'Site vitrine · BTP',
    title: 'Verus BTP',
    desc: "Site officiel de Verus BTP, entreprise de bâtiment et travaux publics au Sénégal. Présentation des services : études, plans architecturaux, béton armé et réalisation de projets de construction. Interface claire et professionnelle.",
    stack: ['HTML/CSS', 'JavaScript', 'Netlify'],
    demo: 'https://verusbtp.netlify.app',
    github: 'https://github.com/bamba-Tech04/verus-btp',
    preview: 'Verus BTP',
    cover: 'assets/covers/verus.jpg',
    grad: 'linear-gradient(135deg,#5b34f0,#8b6eff)',
  },
  buildpro: {
    cat: 'Site vitrine · Construction',
    title: 'BuildPro BTP',
    desc: 'Site vitrine professionnel pour une entreprise de construction à Dakar. Pages services, réalisations, formulaire de devis en ligne et contact. Design BTP moderne, entièrement responsive, déployé sur Netlify.',
    stack: ['React', 'Figma', 'Netlify', 'CSS3'],
    demo: 'https://harmonious-twilight-0a481a.netlify.app',
    github: null,
    preview: 'BuildPro',
    cover: 'assets/covers/buildpro.jpg',
    grad: 'linear-gradient(135deg,#6c47ff,#9d7bff)',
  },
  dakardeco: {
    cat: 'E-commerce · Décoration',
    title: 'DakarDéco — Boutique & Décoration',
    desc: 'Site vitrine et boutique e-commerce pour un spécialiste des faux plafonds, staff & plâtrerie et décoration intérieure à Malika, Dakar. Catalogue produits avec panier, commande directe via WhatsApp, et galerie de réalisations.',
    stack: ['React', 'Figma', 'Netlify', 'WhatsApp API'],
    demo: 'https://dakardeco.netlify.app',
    github: null,
    preview: 'DakarDéco',
    cover: 'assets/covers/dakardeco.jpg',
    grad: 'linear-gradient(135deg,#7c5cfc,#a98bff)',
  },
  trackisen: {
    cat: 'SaaS · Suivi de livraisons',
    title: 'Trackisen — Suivi de Livraisons',
    desc: 'Application SaaS de tracking de livraisons en temps réel pensée pour le marché dakarois. Notifications SMS via AfricasTalking, tableau de bord livreur, interface client, et intégration paiement Wave. Déploiement à venir.',
    stack: ['Django REST', 'React', 'AfricasTalking', 'Wave API', 'PostgreSQL'],
    demo: null,
    github: null,
    preview: 'Trackisen',
    cover: 'assets/covers/trackisen.jpg',
    grad: 'linear-gradient(135deg,#4a2fd0,#7c5cfc)',
  },
}

// Naatal est mis en avant dans la section "étude de cas", donc pas dans la grille
const projectOrder = [
  'koligo',
  'boutique',
  'scolaris',
  'ndawresto',
  'teranga',
  'eventpass',
  'chariow',
  'verus',
  'buildpro',
  'dakardeco',
  'trackisen',
]

function renderProjectCards() {
  const grid = document.getElementById('projectsGrid')
  if (!grid) return
  grid.innerHTML = projectOrder
    .map((id) => {
      const p = projects[id]
      const badge = p.isNew ? '<span class="tag-new">NOUVEAU</span>' : ''
      const coverImg = p.cover
        ? `<img class="project-cover" src="${p.cover}" alt="Aperçu ${p.title}" loading="lazy" onerror="this.remove()">`
        : ''
      return `
      <article class="project-card" data-project-id="${id}">
        <div class="project-thumb" style="background:${p.grad}">
          <span class="th-label">${p.preview}</span>
          ${coverImg}
        </div>
        <div class="project-body">
          <div class="project-cat">${p.cat} ${badge}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-stack">${p.stack
            .map((s) => `<span class="stack-tag">${s}</span>`)
            .join('')}</div>
          <span class="project-link">Voir le projet <span aria-hidden="true">→</span></span>
        </div>
      </article>`
    })
    .join('')
}
renderProjectCards()

/* ============================================================
   Modal
   ============================================================ */
function openModal(id) {
  const p = projects[id]
  if (!p) return
  const hasDemo = p.demo && p.demo !== '#'
  const stackHtml = p.stack
    .map((s) => `<span class="stack-tag">${s}</span>`)
    .join('')
  const iframeHtml = hasDemo
    ? `<div class="modal-iframe-wrap"><iframe src="${p.demo}" loading="lazy" title="Aperçu ${p.title}" sandbox="allow-scripts allow-same-origin allow-forms"></iframe></div>`
    : ''
  const demoBtn = hasDemo
    ? `<a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">🔗 Voir le site en live</a>`
    : `<span class="btn btn-outline" style="opacity:.55;cursor:not-allowed">🔗 Démo bientôt disponible</span>`
  const ghBtn = p.github
    ? `<a class="btn btn-outline" href="${p.github}" target="_blank" rel="noopener">⌨️ Code GitHub</a>`
    : ''

  const coverImg = p.cover
    ? `<img src="${p.cover}" alt="Aperçu ${p.title}" onerror="this.remove()">`
    : ''
  document.getElementById('modal-content').innerHTML = `
    <div class="modal-preview" style="background:${p.grad}">${p.preview}${coverImg}</div>
    <div class="modal-body">
      <div class="modal-cat">${p.cat}</div>
      <h3>${p.title}</h3>
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
  const iframe = document.querySelector('#modal-content iframe')
  if (iframe) iframe.src = ''
}

document.getElementById('projectsGrid')?.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card')
  if (card) openModal(card.dataset.projectId)
})
document.querySelectorAll('[data-project-id].fc-link, .fc-link').forEach((el) => {
  el.addEventListener('click', () => {
    const id = el.dataset.projectId
    if (id) openModal(id)
  })
})
document.getElementById('modal-close')?.addEventListener('click', closeModal)
document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'modal-overlay') closeModal()
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})

/* ---------- Contact form validation (Netlify) ---------- */
const contactForm = document.getElementById('contactForm')
contactForm?.addEventListener('submit', (event) => {
  const name = document.getElementById('contactName').value.trim()
  const email = document.getElementById('contactEmail').value.trim()
  const message = document.getElementById('contactMessage').value.trim()
  if (!name || !email || !message) {
    event.preventDefault()
    alert('Merci de remplir tous les champs avant d’envoyer.')
  }
})
