function configurarMenu() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', function () {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('aberto');
      navLinks.classList.toggle('aberto');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('aberto');
        navLinks.classList.remove('aberto');
      });
    });
  }
}

function iniciarDigitacao() {
  const alvo = document.getElementById('digitado');
  if (!alvo) return;

  const frases = [
    'Estudante de Engenharia de Software',
    'Apaixonada por Tecnologia',
    'Criativa & Curiosa'
  ];

  let i = 0;
  let j = 0;
  let apagando = false;

  function digitar() {
    const frase = frases[i];

    if (!apagando) {
      alvo.textContent = frase.substring(0, j + 1);
      j++;

      if (j === frase.length) {
        apagando = true;
        setTimeout(digitar, 1500);
        return;
      }
    } else {
      alvo.textContent = frase.substring(0, j - 1);
      j--;

      if (j === 0) {
        apagando = false;
        i = (i + 1) % frases.length;
      }
    }

    setTimeout(digitar, apagando ? 50 : 100);
  }

  digitar();
}

function configurarFiltros() {
  const botoes = document.querySelectorAll('.filtro');
  const cards = document.querySelectorAll('.card');

  if (!botoes.length) return;

  botoes.forEach(botao => {
    botao.addEventListener('click', function () {
      botoes.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');

      const filtro = botao.dataset.f;

      cards.forEach(card => {
        const categorias = card.dataset.cat || '';

        if (filtro === 'todos' || categorias.includes(filtro)) {
          card.classList.remove('oculto');
        } else {
          card.classList.add('oculto');
        }
      });
    });
  });
}

function configurarFormulario() {
  const form = document.getElementById('form');
  const aviso = document.getElementById('aviso');

  if (!form || !aviso) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto')?.value.trim();
   const msg = document.getElementById('msg').value.trim();

    aviso.className = 'aviso';

 if (!nome || !email || !assunto || !msg) {
      aviso.textContent = 'Preencha todos os campos.';
      aviso.classList.add('err');
      return;
    }

   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!regex.test(email)) {
      aviso.textContent = 'Email inválido.';
      aviso.classList.add('err');
      return;
    }

    aviso.textContent = `Mensagem enviada com sucesso, ${nome}! 💌`;
    aviso.classList.add('ok');

    form.reset();
  });
}

window.addEventListener('load', function () {
  configurarMenu();
  iniciarDigitacao();
  configurarFiltros();
  configurarFormulario();
});
