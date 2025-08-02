/*
 * Interaktive Funktionen für die Website von KH Projects.
 *
 * - Sprache umschalten: Alle Elemente mit den Klassen .lang-de und .lang-it
 *   werden entsprechend der gewählten Sprache ein- oder ausgeblendet. Die
 *   Auswahl wird in localStorage gespeichert, sodass die Einstellung bei
 *   erneutem Besuch erhalten bleibt.
 * - Filterfunktion für die Projektgalerie: Mit Buttons können Projekte nach
 *   ihrem Status gefiltert werden (alle, in Planung, in Umsetzung, abgeschlossen).
 * - Smooth Scrolling für Navigationslinks.
 * - Aktuelles Jahr im Footer anzeigen.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementreferenzen
  const langButtons = document.querySelectorAll('.lang-btn');
  const langDeElements = document.querySelectorAll('.lang-de');
  const langItElements = document.querySelectorAll('.lang-it');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const navLinks = document.querySelectorAll('.nav-links li a');

  // Sprache aus localStorage laden oder Standard setzen
  const savedLang = localStorage.getItem('khprojects-lang') || 'de';
  updateLanguage(savedLang);

  // Sprachumschalter Listener
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      updateLanguage(lang);
      localStorage.setItem('khprojects-lang', lang);
    });
  });

  function updateLanguage(lang) {
    // HTML lang-Attribut anpassen
    document.documentElement.lang = lang;
    // Ein-/Ausblenden der Texte
    if (lang === 'de') {
      langDeElements.forEach(el => el.style.display = 'block');
      langItElements.forEach(el => el.style.display = 'none');
    } else {
      langDeElements.forEach(el => el.style.display = 'none');
      langItElements.forEach(el => el.style.display = 'block');
    }
    // Aktiven Button markieren
    langButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
  }

  // Filterfunktion für Projekte
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      // aktiven Button setzen
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      // Cards filtern
      projectCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
        } else {
          card.style.display = card.classList.contains(filter) ? 'flex' : 'none';
        }
      });
    });
  });

  // Smooth Scrolling für Navigationslinks
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      // Nur wenn es sich um einen internen Anker handelt
      if (link.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Aktuelles Jahr im Footer eintragen
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});