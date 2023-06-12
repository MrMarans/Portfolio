// Scroll-Animation für Menü-Links
document.querySelectorAll('.menu ul li a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const topOffset = targetElement.offsetTop;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    });
  });
  
  // Einblenden des Menüs beim Scrollen
  window.addEventListener('scroll', () => {
    const menu = document.querySelector('.menu');
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 50) {
      menu.classList.add('visible');
    } else {
      menu.classList.remove('visible');
    }
  });
  
  // Animation für den Willkommen-Text
  window.addEventListener('load', () => {
    const animatedText = document.querySelector('.animated-text');
    animatedText.style.opacity = '1';
  });
  
 
  
  // Scrollen zu Projekten beim Klicken auf Scroll-Down-Pfeile
  document.addEventListener('DOMContentLoaded', function() {
    const scrollDownArrows = document.querySelector('.scroll-down-arrows');
    const projectsSection = document.getElementById('projects');
  
    scrollDownArrows.addEventListener('click', function() {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
  

// Funktion zum Hinzufügen der Trennlinien und Aktualisieren der Hintergrundfarben
function updateProjects() {
    const projectBoxes = document.querySelectorAll('.project-box');
    const visibleProjects = Array.from(projectBoxes).filter(box => box.parentElement.style.display !== 'none');
  
    // Entferne vorhandene Trennlinien und setze die Hintergrundfarben zurück
    const existingLines = document.querySelectorAll('.project-line');
    existingLines.forEach(line => line.remove());
    projectBoxes.forEach(box => box.classList.remove('alternate-background'));
  
    // Füge Trennlinien und aktualisierte Hintergrundfarben hinzu
    visibleProjects.forEach((box, index) => {
      if (index !== visibleProjects.length - 1) {
        const line = document.createElement('div');
        line.classList.add('project-line');
        box.parentElement.appendChild(line);
      }
  
      if (index % 2 === 1) {
        box.classList.add('alternate-background');
      }
    });
  }
  
  // Projekte filtern
  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      const projects = document.querySelectorAll('.project');
  
      // Füge zuerst eine Fade-Out-Animation hinzu
      projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transition = 'opacity 0.3s ease-out';
      });
  
      setTimeout(() => {
        // Verstecke alle Projekte
        projects.forEach(project => {
          project.style.display = 'none';
        });
  
        // Filtere die Projekte basierend auf der Kategorie
        const filteredProjects = category === 'Alle'
          ? projects
          : document.querySelectorAll(`.project.${category}`);
  
        // Zeige die gefilterten Projekte an
        filteredProjects.forEach(project => {
          project.style.display = '';
        });
  
        // Führe das Update für Trennlinien und Hintergrundfarben durch
        updateProjects();
  
        // Füge dann eine Fade-In-Animation hinzu
        setTimeout(() => {
          filteredProjects.forEach(project => {
            project.style.opacity = '1';
          });
        }, 100);
      }, 300);
    });
  });
  
  // Füge die Trennlinien und Hintergrundfarben beim Laden der Webseite hinzu
  window.addEventListener('load', updateProjects);

  function toggleProjectDetails(project) {
    project.parentNode.classList.toggle('expanded');
  }
  