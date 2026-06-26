/* ============================================
   PORTFÓLIO — script.js
   Funções: typewriter, scroll-nav, filtro,
   animações, formulário, hamburguer, tema
   ============================================ */

// ── 1. TYPEWRITER EFFECT ──────────────────────
function iniciarTypewriter() {
  const elemento = document.getElementById('typed-text');
  if (!elemento) return;

  const frases = [
    'Desenvolvedora Web',
    'Estudante de TI',
    'Apaixonada por código',
    'Front-end em formação'
  ];

  let indiceFrase = 0;
  let indiceChar = 0;
  let apagando = false;

  function digitar() {
    const frase = frases[indiceFrase];

    if (!apagando) {
      elemento.textContent = frase.slice(0, indiceChar + 1);
      indiceChar++;

      if (indiceChar === frase.length) {
        apagando = true;
        setTimeout(digitar, 1800);
        return;
      }
      setTimeout(digitar, 90);
    } else {
      elemento.textContent = frase.slice(0, indiceChar - 1);
      indiceChar--;

      if (indiceChar === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        setTimeout(digitar, 400);
        return;
      }
      setTimeout(digitar, 45);
    }
  }

  digitar();
}

// ── 2. SCROLL: NAV SOMBRA + ACTIVE LINK ──────
function iniciarScrollNav() {
  const nav = document.querySelector('nav');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });

  // Marca link ativo pelo href da página atual
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── 3. HAMBURGUER MENU ────────────────────────
function iniciarHamburguer() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-links');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Fecha ao clicar em link
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// ── 4. ANIMAÇÕES DE ENTRADA (INTERSECTION) ───
function iniciarAnimacoes() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in, .timeline-item').forEach(el => {
    observer.observe(el);
  });
}

// ── 5. FILTRO DE PROJETOS ─────────────────────
function iniciarFiltro() {
  const btnsFiltro = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btnsFiltro.length) return;

  btnsFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza botão ativo
      btnsFiltro.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filtro = btn.dataset.filtro;

      cards.forEach(card => {
        const categorias = card.dataset.categoria || '';
        const mostrar = filtro === 'todos' || categorias.includes(filtro);

        if (mostrar) {
          card.style.display = '';
          // Re-anima com pequeno delay
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.style.display = 'none';
          card.classList.remove('visible');
        }
      });
    });
  });
}

// ── 6. FORMULÁRIO DE CONTATO ──────────────────
function iniciarFormulario() {
  const form = document.getElementById('form-contato');
  if (!form) return;

  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    // Validação simples
    if (!nome || !email || !mensagem) {
      mostrarFeedback('Por favor, preencha todos os campos.', 'error');
      return;
    }

    if (!validarEmail(email)) {
      mostrarFeedback('Digite um e-mail válido.', 'error');
      return;
    }

    // Simulação de envio
    const btnEnviar = form.querySelector('button[type="submit"]');
    btnEnviar.textContent = 'Enviando...';
    btnEnviar.disabled = true;

    setTimeout(() => {
      mostrarFeedback(`Obrigada, ${nome}! Sua mensagem foi enviada. Em breve entro em contato ✨`, 'success');
      form.reset();
      btnEnviar.textContent = 'Enviar mensagem';
      btnEnviar.disabled = false;
    }, 1200);
  });

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function mostrarFeedback(msg, tipo) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = `form-feedback ${tipo}`;

    setTimeout(() => {
      feedback.className = 'form-feedback';
    }, 5000);
  }
}

// ── 7. MANIPULAÇÃO DO DOM — CONTADOR SKILLS ──
function iniciarContadorSkills() {
  const tags = document.querySelectorAll('.tag');
  if (!tags.length) return;

  // Cria e injeta contador dinâmico
  const contador = document.createElement('p');
  contador.id = 'skills-counter';
  contador.style.cssText = 'font-size:0.8rem;color:var(--texto-suave);margin-top:0.8rem;';
  contador.textContent = `${tags.length} habilidades`;

  const wrapper = document.querySelector('.skills-tags');
  if (wrapper) wrapper.after(contador);

  // Efeito hover: destaca tag clicada
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.style.opacity = '0.4');
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1.08)';

      setTimeout(() => {
        tags.forEach(t => {
          t.style.opacity = '';
          t.style.transform = '';
        });
      }, 1500);
    });
  });
}

// ── 8. TEMA CLARO/ESCURO (BÔNUS) ─────────────
function iniciarTema() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  const guardado = localStorage.getItem('tema');
  if (guardado === 'escuro') aplicarTemaEscuro();

  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const escuro = document.body.classList.contains('dark');
    btn.textContent = escuro ? '☀️' : '🌙';
    localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
  });
}

function aplicarTemaEscuro() {
  document.body.classList.add('dark');
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = '☀️';
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  iniciarTypewriter();
  iniciarScrollNav();
  iniciarHamburguer();
  iniciarAnimacoes();
  iniciarFiltro();
  iniciarFormulario();
  iniciarContadorSkills();
  iniciarTema();
});
