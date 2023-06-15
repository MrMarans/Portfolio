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
document.addEventListener('DOMContentLoaded', function () {
  const scrollDownArrows = document.querySelector('.scroll-down-arrows');
  const projectsSection = document.getElementById('projects');

  scrollDownArrows.addEventListener('click', function () {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  });

  //Timeline zeug

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
window.addEventListener('load', updateProjects /*toggleProjectDetails*/);

async function toggleProjectDetails(project) {
  const obj = document.getElementById("transition");
  obj.style.transition = "width 0.25s ease-in";
  obj.style.width = "100%";
  obj.style.right = "auto";
  await new Promise(resolve => setTimeout(resolve, 250));
  const img = document.getElementById("Logo");
  img.style.filter = "blur(0px)";
  img.style.opacity = "1";
  await new Promise(resolve => setTimeout(resolve, 500));
  await new Promise(resolve => setTimeout(resolve, 250)); //wait until dissolve
  img.style.opacity = "0";
  img.style.filter = "blur(5px)";
  await new Promise(resolve => setTimeout(resolve, 500));
  obj.style.transition = "width 0.25s ease-out";
  obj.style.width = "0%";
  obj.style.right = "0px";
}
//button color
const buttons = document.querySelectorAll('.filter-button');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    // Alle Buttons zurücksetzen
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Aktuellen Button hervorheben
    this.classList.add('active');
  });
});


document.addEventListener('DOMContentLoaded', function () {
  // Schritt 1: Zähle die Anzahl der Divs
  var divs = document.querySelectorAll('.circle');
  var anzahlDivs = divs.length - 1;

  // Schritt 2: Berechne die Breite für jedes Div
  var breite = 100 / anzahlDivs - 1;
  // Schritt 3: Wende die Position basierend auf dem Index an
  divs.forEach(function (div, index) {
    var versatz = (index) * breite;
    div.style.left = versatz + '%';
  });
});


//Lebenslauf kreise klicks
const circles = document.querySelectorAll('.circle');
// Add a click event listener to each circle
circles.forEach(circle => {
  circle.addEventListener('click', () => {
    console.log("click on circle");
    if (circle.classList.contains('circleClicked')) { circle.classList.remove('circleClicked'); } else { circle.classList.add('circleClicked'); }

    // Set the opacity of all child elements to 1
    const children = circle.querySelectorAll('.StepsLebenslauf, .StepsLebenslaufText, div');
    children.forEach(child => {
      if (child.style.display == "none") {
        child.style.display = "block";
        setTimeout(function () {
          if (child.classList.contains('visible')) {
            child.classList.remove('visible');
          } else {
            child.classList.add('visible');
          }
        }, 10);
      }
      else {
        if (child.classList.contains('visible')) {
          child.classList.remove('visible');
        } else {
          child.classList.add('visible');
        }
        setTimeout(function () {
          child.style.display = "none";
        }, 100);

      }



    });
  });
});
