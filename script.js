const PreLoadImages = ["/Images/metaverse-icon-modified.png","/Images/microchip-icon-modified.png", "/Images/logo_weiß_rgb_transp.png", "/Images/globe-network-icon-modified (1).png"];



window.addEventListener('DOMContentLoaded', reverseElements);
window.addEventListener('DOMContentLoaded', updateProjectsBG);
// Animation für den Willkommen-Text
window.addEventListener('load', () => {
  const animatedText = document.querySelector('.animated-text');
  if (animatedText) {
    animatedText.style.opacity = '1';
  }
  PreLoadImages.forEach(function(PreLoadImages) {
    var img=new Image();
    img.src=PreLoadImages;
  });
  console.log("LoadedImages");
});

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
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const menu = document.querySelector('.menu');
    if (menu) {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 50) {
        menu.classList.add('visible');
      } else {
        menu.classList.remove('visible');
      }
    }
  });
});





// Scrollen zu Projekten beim Klicken auf Scroll-Down-Pfeile
document.addEventListener('DOMContentLoaded', function () {
  const scrollDownArrows = document.querySelector('.scroll-down-arrows');
  const projectsSection = document.getElementById('projects');

  if (scrollDownArrows && projectsSection) {
    scrollDownArrows.addEventListener('click', function () {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  //Timeline zeug

});

//LEGACY CODE
// Funktion zum Hinzufügen der Trennlinien und Aktualisieren der Hintergrundfarben
/*function updateProjects() {
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
}*/





function updateProjectsBG() {
  const projectBoxes = document.querySelectorAll('.SingleProject');
  const visibleProjects = Array.from(projectBoxes).filter(box => box.style.display !== 'none');
  projectBoxes.forEach(box => box.classList.remove('alternate-background'));
  visibleProjects.forEach((box, index) => {
    if (index % 2 === 1) {
      box.classList.add('alternate-background');
      console.log(index);
      index++;
    }
  });
}

// Projekte filtern
document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    const projects = document.querySelectorAll('.SingleProject');

    // Füge zuerst eine Fade-Out-Animation hinzu
    projects.forEach(project => {
      project.style.opacity = '0';

    });

    setTimeout(() => {
      // Verstecke alle Projekte
      projects.forEach(project => {
        project.style.display = 'none';
      });

      // Filtere die Projekte basierend auf der Kategorie
      const filteredProjects = category === 'Alle'
        ? projects
        : document.querySelectorAll(`.SingleProject.${category}`);

      // Zeige die gefilterten Projekte an
      filteredProjects.forEach(project => {
        project.style.display = '';
      });

      // Führe das Update für Trennlinien und Hintergrundfarben durch
      reverseElements();
      updateProjectsBG();
      // Füge dann eine Fade-In-Animation hinzu
      setTimeout(() => {
        filteredProjects.forEach(project => {
          project.style.opacity = '1';
          project.style.transition = '';
        });
      }, 100);
    }, 300);
  });
});

function reverseElements() {
  console.log("Reverse");
  const singleProjects = document.querySelectorAll('.SingleProject');
  const visibleProjects = Array.from(singleProjects).filter(box => box.style.display !== 'none');

  visibleProjects.forEach((project, index) => {
    console.log(project);
    const imgBox = project.querySelector('.imgBox');
    const title = project.querySelector('.TextBox');

    // Überprüfen der Index-Position
    if (index % 2 === 0) {
      // Gerade Index-Position: div zuerst, dann h2
      project.insertBefore(imgBox, title);
    } else {
      // Ungerade Index-Position: h2 zuerst, dann div
      project.insertBefore(title, imgBox);
    }
  });
}




// Neue Funktion zum Pausieren der Audiodatei
function pauseAudio() {
  const audio = document.querySelector('#podcast-audio');
  if (audio && !audio.paused) {
    audio.pause();
    updatePlayPauseButton(true);
  }
}

// Aktualisierte toggleProjectDetails Funktion
async function toggleProjectDetails(deactivate, activate, iframe) {
  // Pause the audio when navigating to a project
  pauseAudio();

  const obj = document.getElementById("transition");
  obj.style.transition = "width 0.25s ease-in";
  obj.style.width = "100%";
  obj.style.right = "auto";
  await new Promise(resolve => setTimeout(resolve, 250));
  document.getElementById(deactivate).style.display = "none";
  document.getElementById(activate).style.display = "block";
  
  // Überprüfen, ob iframe definiert ist, bevor wir es verwenden
  if (iframe) {
    document.getElementById("iframe").src = "subsites/" + iframe + ".html";
  } else {
    // Wenn iframe nicht definiert ist (z.B. beim Zurückkehren zur Hauptseite),
    // setzen wir die src auf eine leere Seite oder entfernen sie ganz
    document.getElementById("iframe").src = "about:blank";
  }
  
  if (deactivate != "MainSite") {
    document.getElementById('projects').scrollIntoView();
  }
  else {
    window.scrollTo(0, 0);
    if (iframe) {
      changeLoadingIcon(iframe);
    }
  }
  const img = document.getElementById("Logo");
  img.style.filter = "blur(0px)";
  img.style.opacity = "1";
  //
  await new Promise(resolve => setTimeout(resolve, 500));
  await new Promise(resolve => setTimeout(resolve, 250)); //wait until dissolve

  img.style.opacity = "0";
  img.style.filter = "blur(5px)";
  await new Promise(resolve => setTimeout(resolve, 500));

  obj.style.transition = "width 0.25s ease-out";
  obj.style.width = "0%";
  obj.style.right = "0px";
}

function changeLoadingIcon(activate) {
  image = document.getElementById("Logo");
  switch (activate) {
    //XR
    case "3DPrint":
    case "Vishoelisation":
    case "VRSchnorcheln":
      image.src = "Images/metaverse-icon-modified.png";
      break;
    //Microcontroller
    case "VRonGlove":
      case "CoffeeBox":
        case "SportTracker":
          image.src = "Images/microchip-icon-modified.png";
          break;
    //Film
    case "Nine.Ron.Ron":
    case "IAOPodcast":
      image.src = "Images/logo_weiß_rgb_transp.png";
      break;

    //other
    case "BH-WebApp":
    case "LeaguePredict":
      image.src = "Images/globe-network-icon-modified (1).png";
      break;
  }
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



//open text legacy
function loadJSONFile(name) {
  fetch('texte.json')
    .then(response => response.json())
    .then(data => {
      const projectsContainer = document.getElementById('projects-container');

      // Hier wird das gewünschte Projekt ausgewählt
      const selectedProject = name;

      // Iteriere über die Projekte in der JSON-Datei
      data.projects.forEach(project => {
        // Überprüfe, ob der aktuelle Projekttitel mit dem ausgewählten Projekt übereinstimmt
        if (project.title === selectedProject) {

          const titleElement = document.createElement('h2');
          titleElement.textContent = project.title;
          projectsContainer.appendChild(titleElement);
          titleElement.classList.add('ProjectTitle');

          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = project.description;
          projectsContainer.appendChild(descriptionElement);

          if (project.youtubeLink != null) {
            const youtubeLinkElement = document.createElement('a');
            youtubeLinkElement.textContent = "YouTube Video ansehen";
            youtubeLinkElement.href = project.youtubeLink;
            projectsContainer.appendChild(youtubeLinkElement);
          }

          if (project.imagePath != null) {
            const imageElement = document.createElement('img');
            imageElement.src = project.imagePath;
            projectsContainer.appendChild(imageElement);
          }
        }
      });
    })
    .catch(error => {
      console.log('Fehler beim Laden der JSON-Datei:', error);
    });
}
//loadJSONFile("Projekt 1");

// Audio player functionality
let audioPlayer, audio, playPauseBtn, progress, timeline, timeDisplay;

function updatePlayPauseButton(isPaused) {
  playPauseBtn.querySelector('.play-icon').style.display = isPaused ? 'inline' : 'none';
  playPauseBtn.querySelector('.pause-icon').style.display = isPaused ? 'none' : 'inline';
}

document.addEventListener('DOMContentLoaded', function() {
  audioPlayer = document.querySelector('.audio-player');
  audio = document.querySelector('#podcast-audio');
  playPauseBtn = audioPlayer.querySelector('.play-pause-btn');
  progress = audioPlayer.querySelector('.progress');
  timeline = audioPlayer.querySelector('.timeline');
  timeDisplay = audioPlayer.querySelector('.time-display');

  playPauseBtn.addEventListener('click', togglePlayPause);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', resetPlayButton);
  timeline.addEventListener('click', seek);

  // Initial time display update
  audio.addEventListener('loadedmetadata', updateTimeDisplay);
});

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    updatePlayPauseButton(false);
  } else {
    audio.pause();
    updatePlayPauseButton(true);
  }
}

function resetPlayButton() {
  updatePlayPauseButton(true);
  progress.style.width = '0%';
  updateTimeDisplay();
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  updateTimeDisplay();
}

function seek(e) {
  const percent = e.offsetX / timeline.offsetWidth;
  audio.currentTime = percent * audio.duration;
  updateTimeDisplay();
}

function updateTimeDisplay() {
  const remainingTime = audio.duration - audio.currentTime;
  timeDisplay.textContent = `-${formatTime(remainingTime)}`;
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
