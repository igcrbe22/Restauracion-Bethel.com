/* ============================================
   RESTAURACIÓN BETHEL — JAVASCRIPT
   ============================================ */

// Número de WhatsApp (formato internacional sin +)
var WHATSAPP_NUM = '525533157550';

// ===== NAVBAR SCROLL =====
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// ===== MENÚ MÓVIL =====
function toggleMenu() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');
  
  if (hamburger) hamburger.classList.toggle('active');
  if (navLinks) navLinks.classList.toggle('active');
  if (navOverlay) navOverlay.classList.toggle('active');
  document.body.style.overflow = navLinks && navLinks.classList.contains('active') ? 'hidden' : '';
}

// Cerrar menú al tocar overlay
var navOverlay = document.getElementById('navOverlay');
if (navOverlay) {
  navOverlay.addEventListener('click', function() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Cerrar menú al tocar enlace
var links = document.querySelectorAll('.nav-links a');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');    if (hamburger) hamburger.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// ===== NAV LINK ACTIVO =====
window.addEventListener('scroll', function() {
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  var current = '';
  
  for (var i = 0; i < sections.length; i++) {
    var top = sections[i].offsetTop - 120;
    if (window.scrollY >= top) {
      current = sections[i].getAttribute('id');
    }
  }
  
  for (var j = 0; j < navItems.length; j++) {
    navItems[j].classList.remove('active');
    if (navItems[j].getAttribute('href') === '#' + current) {
      navItems[j].classList.add('active');
    }
  }
});

// ===== REVEAL ON SCROLL =====
function revealOnScroll() {
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) {
    var top = reveals[i].getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      reveals[i].classList.add('active');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== EMBLEM DOTS =====
var emblemDots = document.getElementById('emblemDots');
if (emblemDots) {
  for (var k = 0; k < 12; k++) {
    var dot = document.createElement('div');
    dot.className = 'emblem-dot';
    dot.style.transform = 'rotate(' + (k * 30) + 'deg) translateX(55px)';
    dot.style.animationDelay = (k * 0.1) + 's';
    emblemDots.appendChild(dot);  }
}

// ===== SCROLL SUAVE =====
var anchors = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      var offset = 80;
      var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
}

// ===== ENVIAR POR WHATSAPP =====
function enviarWhatsApp() {
  var nombre = document.getElementById('formNombre').value.trim();
  var email = document.getElementById('formEmail').value.trim();
  var telefono = document.getElementById('formTel').value.trim();
  var motivo = document.getElementById('formMotivo').value;
  var mensaje = document.getElementById('formMensaje').value.trim();
  
  if (!nombre || !mensaje || !motivo) {
    mostrarNotificacion('Por favor completa los campos obligatorios *', 'error');
    return;
  }
  
  var texto = '🕊️ *Nuevo mensaje desde Restauración Bethel*\n\n';
  texto += '👤 *Nombre:* ' + nombre + '\n';
  texto += '📧 *Email:* ' + (email || 'No proporcionado') + '\n';
  texto += '📱 *Teléfono:* ' + (telefono || 'No proporcionado') + '\n';
  texto += '🎯 *Motivo:* ' + motivo + '\n\n';
  texto += '💬 *Mensaje:*\n' + mensaje + '\n\n';
  texto += '──────────────\n';
  texto += '🌐 Enviado desde: restauracionbethel.org';
  
  var url = 'https://wa.me/' + WHATSAPP_NUM + '?text=' + encodeURIComponent(texto);
  window.open(url, '_blank');
  
 mostrarNotificacion('✅ Mensaje listo para enviar por WhatsApp. ¡Gracias por contactarnos! 🕊️', 'success');
  
  setTimeout(function() {
    var form = document.getElementById('contactForm');
    if (form) form.reset();
  }, 1500);
}
// ===== NOTIFICACIONES =====
function mostrarNotificacion(mensaje, tipo) {
  var notif = document.getElementById('notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notif';
    notif.className = 'notif';
    document.body.appendChild(notif);
  }
  
  notif.textContent = mensaje;
  notif.className = 'notif ' + tipo + ' show';
  
  setTimeout(function() {
    notif.classList.remove('show');
  }, 4000);
}

// ===== FORMULARIO EMAIL =====
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function() {
    // Sincronizar campos ocultos
    var fields = [
      ['formNombre', 'formNombreHidden'],
      ['formEmail', 'formEmailHidden'],
      ['formTel', 'formTelHidden'],
      ['formMotivo', 'formMotivoHidden'],
      ['formMensaje', 'formMensajeHidden']
    ];
    
    for (var i = 0; i < fields.length; i++) {
      var visible = document.getElementById(fields[i][0]);
      var hidden = document.getElementById(fields[i][1]);
      if (visible && hidden) {
        hidden.value = visible.value || '';
      }
    }
  });
}

// ===== VALIDACIÓN VISUAL =====
var inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', function() {
    this.classList.remove('error');
  });
}

// ===== NOTIFICACIÓN AL CARGAR LA PÁGINA (PARA CONFIRMACIÓN DE ENVÍO) =====
window.addEventListener('load', function() {
  // Verificar si viene de un envío exitoso por email
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('enviado') === 'exito') {
    mostrarNotificacion('✅ Mensaje enviado con éxito. Espera nuestra respuesta, ¡Dios te bendiga! 🕊️', 'success');
    
    // Limpiar la URL para que no se muestre de nuevo al recargar
    if (window.history.replaceState) {
      var cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({path: cleanUrl}, '', cleanUrl);
    }
  }
});
