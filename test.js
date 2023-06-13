document.addEventListener('DOMContentLoaded', function() {
    const points = document.querySelectorAll('.point');
  
    points.forEach((point, index) => {
      point.addEventListener('click', function() {
        // Setze den ausgewählten Punkt hervor
        points.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
  
        // Zeige den entsprechenden Text an
        const text = document.querySelector(`.text:nth-child(${index + 1})`);
        const texts = document.querySelectorAll('.text');
        texts.forEach(t => t.style.display = 'none');
        text.style.display = 'block';
      });
    });
  });
  