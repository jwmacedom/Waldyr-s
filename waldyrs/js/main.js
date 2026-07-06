/* =========================================================
   WALDYR'S LUBRICENTRO — Interacciones del sitio
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año dinámico en footer ---------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Menú móvil ---------- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      burger.setAttribute('aria-expanded', expanded);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Acordeón FAQ ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Filtros de catálogo (página productos) ---------- */
  const filterButtons = document.querySelectorAll('.filters .pill');
  const productCards = document.querySelectorAll('[data-category]');
  if (filterButtons.length && productCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const cat = btn.dataset.filter;
        productCards.forEach(card => {
          const show = cat === 'todos' || card.dataset.category === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Recomendador de aceite ("Encuentra tu aceite ideal") ---------- */
  const finder = document.querySelector('.finder');
  if (finder) {
    const vehicleBtns = finder.querySelectorAll('[data-vehicle]');
    const usoBtns = finder.querySelectorAll('[data-uso]');
    const resultBox = finder.querySelector('.finder-result');
    const gradeEl = finder.querySelector('.grade');
    const descEl = finder.querySelector('.grade-desc');
    const placeholderEl = finder.querySelector('.placeholder');
    const needle = finder.querySelector('.gauge-needle');

    let vehicle = null;
    let uso = null;

    const recommendations = {
      'auto-gasolina|nuevo':            { grade: '5W-30', tipo: 'Sintético',      angle: -60, desc: 'Máxima protección y ahorro de combustible para motores modernos a gasolina.' },
      'auto-gasolina|usado':            { grade: '10W-40', tipo: 'Semisintético', angle: -20, desc: 'Buen equilibrio entre protección y precio para uso diario en ciudad.' },
      'auto-gasolina|alto-kilometraje': { grade: '20W-50', tipo: 'Mineral',       angle:  60, desc: 'Mayor viscosidad para compensar el desgaste de motores con muchos kilómetros.' },

      'auto-diesel|nuevo':              { grade: '5W-40',  tipo: 'Sintético Diésel',      angle: -40, desc: 'Formulado para la mayor exigencia y presión de los motores diésel modernos.' },
      'auto-diesel|usado':              { grade: '15W-40', tipo: 'Semisintético Diésel',  angle:  10, desc: 'Protección confiable para motores diésel de uso frecuente.' },
      'auto-diesel|alto-kilometraje':   { grade: '20W-50', tipo: 'Mineral Diésel',        angle:  60, desc: 'Mayor espesor para sellar holguras en motores diésel desgastados.' },

      'moto|nuevo':                     { grade: '10W-40', tipo: 'Sintético Moto 4T',     angle: -20, desc: 'Cuida el embrague y el motor de motos nuevas de alto rendimiento.' },
      'moto|usado':                     { grade: '20W-50', tipo: 'Semisintético Moto 4T', angle:  40, desc: 'Ideal para motolineales y motos de uso urbano constante.' },
      'moto|alto-kilometraje':          { grade: '20W-50', tipo: 'Mineral Moto 4T',       angle:  60, desc: 'Protección económica y efectiva para motos con muchos kilómetros.' },

      'pesado|nuevo':                   { grade: '15W-40', tipo: 'Sintético Camión',      angle:  10, desc: 'Rendimiento superior para camiones y maquinaria en trabajo continuo.' },
      'pesado|usado':                   { grade: '15W-40', tipo: 'Semisintético Camión',  angle:  20, desc: 'Resiste altas temperaturas en jornadas largas de carga pesada.' },
      'pesado|alto-kilometraje':        { grade: '20W-50', tipo: 'Mineral Camión',        angle:  60, desc: 'Protección robusta para vehículos de carga con alto uso acumulado.' },
    };

    function updateResult() {
      if (!vehicle || !uso) {
        placeholderEl.style.display = 'block';
        gradeEl.style.display = 'none';
        finder.querySelector('.grade-label').style.display = 'none';
        descEl.style.display = 'none';
        needle.style.transform = 'rotate(0deg)';
        return;
      }
      const key = `${vehicle}|${uso}`;
      const rec = recommendations[key];
      if (!rec) return;
      placeholderEl.style.display = 'none';
      gradeEl.style.display = 'block';
      finder.querySelector('.grade-label').style.display = 'block';
      descEl.style.display = 'block';
      gradeEl.textContent = rec.grade;
      finder.querySelector('.grade-label').textContent = rec.tipo;
      descEl.textContent = rec.desc;
      needle.style.transform = `rotate(${rec.angle}deg)`;
    }

    vehicleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        vehicleBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        vehicle = btn.dataset.vehicle;
        updateResult();
      });
    });
    usoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        usoBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        uso = btn.dataset.uso;
        updateResult();
      });
    });
  }

  /* ---------- Formulario de contacto -> WhatsApp ---------- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = contactForm.querySelector('#nombre').value.trim();
      const telefono = contactForm.querySelector('#telefono').value.trim();
      const servicio = contactForm.querySelector('#servicio').value;
      const mensaje = contactForm.querySelector('#mensaje').value.trim();

      const texto = `Hola WALDYR'S, soy ${nombre}.%0AInteresado en: ${servicio}.%0ATeléfono: ${telefono}.%0AMensaje: ${mensaje}`;
      const numeroWhatsapp = '51900000000'; // TODO: reemplazar por el número real del negocio
      const url = `https://wa.me/${numeroWhatsapp}?text=${texto}`;

      const successBox = contactForm.querySelector('.form-success');
      if (successBox) successBox.classList.add('show');

      window.open(url, '_blank');
      contactForm.reset();
    });
  }

  /* ---------- Resaltar enlace activo del nav según la página actual ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) a.classList.add('active');
  });

});
