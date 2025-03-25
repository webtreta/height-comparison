// Height Comparison App Frontend JavaScript

// Helper function to convert between cm and feet/inches
function cmToFeetInches(cm) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

function feetInchesToCm(feet, inches) {
  return Math.round((feet * 12 + parseInt(inches)) * 2.54);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {

  // Scale slider for height visualization
  const scaleSlider = document.getElementById('scale-slider');
  if (scaleSlider) {
    scaleSlider.addEventListener('input', function() {
      const people = document.querySelectorAll('.person-card');
      const scale = parseFloat(this.value);

      people.forEach(person => {
        const avatarContainer = person.querySelector('.avatar-container');
        if (avatarContainer) {
          avatarContainer.style.transform = `scale(${scale})`;
        }
      });
    });
  }

  // Define Alpine.js components
  window.heightConverter = function() {
    return {
      cm: 175,
      feet: 5,
      inches: 9,
      activeTab: 'cm',

      updateFromCm() {
        const totalInches = this.cm / 2.54;
        this.feet = Math.floor(totalInches / 12);
        this.inches = Math.round(totalInches % 12);
      },

      updateFromFeetInches() {
        this.cm = feetInchesToCm(this.feet, this.inches);
      }
    }
  }

  // Modal functionality
  const addPersonModal = document.getElementById('addPersonModal');
  const closeModalButtons = document.querySelectorAll('[data-close-modal]');

  // Close modal when clicking outside
  if (addPersonModal) {
    addPersonModal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.add('hidden');
      }
    });
  }

  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && addPersonModal) {
      addPersonModal.classList.add('hidden');
    }
  });

  // Person card hover effects
  const personCards = document.querySelectorAll('.person-card');
  personCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('shadow-md', 'scale-105');
      this.classList.remove('shadow');
    });

    card.addEventListener('mouseleave', function() {
      this.classList.remove('shadow-md', 'scale-105');
      this.classList.add('shadow');
    });
  });
});
