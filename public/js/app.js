// Height Comparison App Frontend JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Height unit conversion functions
  function cmToFeetInches(cm) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = (totalInches % 12).toFixed(2);
    return `${feet}' ${inches}"`;
  }

  function feetInchesToCm(feet, inches) {
    return ((feet * 12) + parseFloat(inches)) * 2.54;
  }

  // Gender selection
  const maleBtn = document.getElementById('male-btn');
  const femaleBtn = document.getElementById('female-btn');

  if (maleBtn && femaleBtn) {
    maleBtn.addEventListener('click', function() {
      maleBtn.classList.add('bg-blue-100', 'text-blue-800');
      maleBtn.classList.remove('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      femaleBtn.classList.remove('bg-blue-100', 'text-blue-800');
      femaleBtn.classList.add('bg-white', 'text-gray-800', 'border', 'border-gray-300');
    });

    femaleBtn.addEventListener('click', function() {
      femaleBtn.classList.add('bg-blue-100', 'text-blue-800');
      femaleBtn.classList.remove('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      maleBtn.classList.remove('bg-blue-100', 'text-blue-800');
      maleBtn.classList.add('bg-white', 'text-gray-800', 'border', 'border-gray-300');
    });
  }

  // Height unit selection
  const ftBtn = document.getElementById('ft-btn');
  const cmBtn = document.getElementById('cm-btn');
  const feetInchesInputs = document.getElementById('feet-inches-inputs');
  const cmInputContainer = document.getElementById('cm-input-container');

  if (ftBtn && cmBtn && feetInchesInputs && cmInputContainer) {
    ftBtn.addEventListener('click', function() {
      ftBtn.classList.add('bg-blue-100', 'text-blue-800');
      ftBtn.classList.remove('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      cmBtn.classList.remove('bg-blue-100', 'text-blue-800');
      cmBtn.classList.add('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      feetInchesInputs.classList.remove('hidden');
      cmInputContainer.classList.add('hidden');

      // Convert current cm value to feet/inches
      const cmInput = document.getElementById('cm-input');
      const feetInput = document.getElementById('feet-input');
      const inchesInput = document.getElementById('inches-input');

      if (cmInput && feetInput && inchesInput) {
        const cm = parseFloat(cmInput.value);
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12 * 100) / 100;

        feetInput.value = feet;
        inchesInput.value = inches;
      }
    });

    cmBtn.addEventListener('click', function() {
      cmBtn.classList.add('bg-blue-100', 'text-blue-800');
      cmBtn.classList.remove('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      ftBtn.classList.remove('bg-blue-100', 'text-blue-800');
      ftBtn.classList.add('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      cmInputContainer.classList.remove('hidden');
      feetInchesInputs.classList.add('hidden');

      // Convert current feet/inches to cm
      const cmInput = document.getElementById('cm-input');
      const feetInput = document.getElementById('feet-input');
      const inchesInput = document.getElementById('inches-input');

      if (cmInput && feetInput && inchesInput) {
        const feet = parseInt(feetInput.value);
        const inches = parseFloat(inchesInput.value);
        const cm = feetInchesToCm(feet, inches);

        cmInput.value = cm.toFixed(2);
      }
    });
  }

  // Feet and inches input handling
  const feetInput = document.getElementById('feet-input');
  const inchesInput = document.getElementById('inches-input');
  const cmInput = document.getElementById('cm-input');

  if (feetInput && inchesInput && cmInput) {
    feetInput.addEventListener('input', function() {
      const feet = parseInt(feetInput.value) || 0;
      const inches = parseFloat(inchesInput.value) || 0;
      const cm = feetInchesToCm(feet, inches);

      cmInput.value = cm.toFixed(2);
      updatePersonHeight(cm);
    });

    inchesInput.addEventListener('input', function() {
      const feet = parseInt(feetInput.value) || 0;
      const inches = parseFloat(inchesInput.value) || 0;
      const cm = feetInchesToCm(feet, inches);

      cmInput.value = cm.toFixed(2);
      updatePersonHeight(cm);
    });

    cmInput.addEventListener('input', function() {
      const cm = parseFloat(cmInput.value) || 0;
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round((totalInches % 12) * 100) / 100;

      feetInput.value = feet;
      inchesInput.value = inches;
      updatePersonHeight(cm);
    });
  }

  // Avatar selection
  const avatarBtn = document.querySelector('button.text-blue-500.hover\\:text-blue-700');
  const avatarSelection = document.getElementById('avatar-selection');

  if (avatarBtn && avatarSelection) {
    avatarBtn.addEventListener('click', function() {
      avatarSelection.classList.toggle('hidden');
    });

    // Close avatar selection when clicking outside
    document.addEventListener('click', function(e) {
      if (!avatarSelection.contains(e.target) && e.target !== avatarBtn) {
        avatarSelection.classList.add('hidden');
      }
    });

    // Avatar body type selection
    const bodyTypeButtons = avatarSelection.querySelectorAll('button.px-3.py-1.text-xs');
    bodyTypeButtons.forEach(button => {
      button.addEventListener('click', function() {
        bodyTypeButtons.forEach(btn => {
          btn.classList.remove('bg-gray-100');
          btn.classList.add('bg-white', 'border', 'border-gray-300');
        });
        this.classList.add('bg-gray-100');
        this.classList.remove('bg-white', 'border', 'border-gray-300');
      });
    });

    // Avatar selection
    const avatarButtons = avatarSelection.querySelectorAll('button.border.border-gray-200');
    avatarButtons.forEach(button => {
      button.addEventListener('click', function() {
        avatarButtons.forEach(btn => {
          btn.classList.remove('border-blue-500');
        });
        this.classList.add('border-blue-500');
      });
    });
  }

  // Function to update the person visualization
  function updatePersonHeight(cm) {
    const personSvg = document.querySelector('.max-h-full');
    if (personSvg) {
      personSvg.style.height = (cm * 0.5) + 'px';
    }
  }

  // Color selection for avatars
  const colorButtons = document.querySelectorAll('.w-8.h-8.rounded-full');

  if (colorButtons.length > 0) {
    colorButtons.forEach(button => {
      button.addEventListener('click', function() {
        const color = window.getComputedStyle(this).backgroundColor;

        // Here you would update the avatar color
        // This is just a placeholder for the actual implementation
        console.log('Selected color:', color);
      });
    });
  }

  // Add person button
  const addPersonBtn = document.getElementById('add-person-btn');

  if (addPersonBtn) {
    addPersonBtn.addEventListener('click', function() {
      // Get form values
      const nameInput = document.getElementById('name-input');
      const height = cmInput.value;
      const gender = maleBtn.classList.contains('bg-blue-100') ? 'male' : 'female';

      if (nameInput && nameInput.value.trim() !== '' && height) {
        // In a real app, you would submit this data to the server
        console.log('Adding person:', {
          name: nameInput.value,
          height,
          gender
        });
      }
    });
  }

  // Initialize any sliders for scaling
  const scaleSlider = document.querySelector('input[type="range"]');

  if (scaleSlider) {
    scaleSlider.addEventListener('input', function() {
      // Scale visualization based on slider value
      const scale = this.value / 50; // Normalize to 0-2 range

      // Apply scaling to the visualization
      const personContainer = document.querySelector('.flex.justify-center.items-end.absolute');
      if (personContainer) {
        personContainer.style.transform = `scale(${scale})`;
      }
    });
  }
});
