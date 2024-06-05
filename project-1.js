       // Add smooth scrolling to all links with anchors
       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
      
     




function handleScroll() {
  const sections = document.querySelectorAll('.content, .project-container, .contact-container');

  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight * 1) { // Change the threshold as desired
          section.classList.add('visible'); // Add class to trigger animation
      } else {
          section.classList.remove('visible'); // Remove class if section is not in viewport
      }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', handleScroll);



