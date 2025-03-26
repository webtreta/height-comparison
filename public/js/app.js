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
  const genderInput = document.getElementById('gender-input');

  if (maleBtn && femaleBtn && genderInput) {
    maleBtn.addEventListener('click', function() {
      maleBtn.classList.add('bg-blue-100', 'text-blue-800');
      maleBtn.classList.remove('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      femaleBtn.classList.remove('bg-blue-100', 'text-blue-800');
      femaleBtn.classList.add('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      genderInput.value = 'male';
    });

    femaleBtn.addEventListener('click', function() {
      femaleBtn.classList.add('bg-blue-100', 'text-blue-800');
      femaleBtn.classList.remove('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      maleBtn.classList.remove('bg-blue-100', 'text-blue-800');
      maleBtn.classList.add('bg-white', 'text-gray-800', 'border', 'border-gray-300');

      genderInput.value = 'female';
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
  const heightInput = document.getElementById('height-input');

  if (feetInput && inchesInput && cmInput && heightInput) {
    feetInput.addEventListener('input', function() {
      const feet = parseInt(feetInput.value) || 0;
      const inches = parseFloat(inchesInput.value) || 0;
      const cm = feetInchesToCm(feet, inches);

      cmInput.value = cm.toFixed(2);
      heightInput.value = cm.toFixed(2);
      updatePersonHeight(cm);
    });

    inchesInput.addEventListener('input', function() {
      const feet = parseInt(feetInput.value) || 0;
      const inches = parseFloat(inchesInput.value) || 0;
      const cm = feetInchesToCm(feet, inches);

      cmInput.value = cm.toFixed(2);
      heightInput.value = cm.toFixed(2);
      updatePersonHeight(cm);
    });

    cmInput.addEventListener('input', function() {
      const cm = parseFloat(cmInput.value) || 0;
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round((totalInches % 12) * 100) / 100;

      feetInput.value = feet;
      inchesInput.value = inches;
      heightInput.value = cm.toFixed(2);
      updatePersonHeight(cm);
    });
  }

  // Avatar selection
  const avatarBtn = document.querySelector('button.text-blue-500.hover\\:text-blue-700');
  const avatarSelection = document.getElementById('avatar-selection');
  const avatarInput = document.getElementById('avatar-input');

  if (avatarBtn && avatarSelection) {
    avatarBtn.addEventListener('click', function() {
      avatarSelection.classList.toggle('hidden');
    });

    // Close avatar selection when clicking outside
    document.addEventListener('click', function(e) {
      if (!avatarSelection.contains(e.target) && e.target !== avatarBtn && !avatarBtn.contains(e.target)) {
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
    const avatarButtons = avatarSelection.querySelectorAll('.avatar-btn');
    avatarButtons.forEach(button => {
      button.addEventListener('click', function() {
        avatarButtons.forEach(btn => {
          btn.classList.remove('border-blue-500');
        });
        this.classList.add('border-blue-500');

        // Store the selected avatar path in the hidden input
        if (avatarInput) {
          avatarInput.value = this.getAttribute('data-avatar');
        }
      });
    });
  }

  // Function to update the person visualization preview
  function updatePersonHeight(cm) {
    const preview = document.querySelector('.max-h-full');
    if (preview) {
      preview.style.height = (cm * 0.5) + 'px';
    }
  }

  // Color selection for avatars
  const colorButtons = document.querySelectorAll('.avatar-color-btn');
  const colorInput = document.getElementById('color-input');

  if (colorButtons.length > 0 && colorInput) {
    colorButtons.forEach(button => {
      button.addEventListener('click', function() {
        const color = this.getAttribute('data-color');

        // Remove selected class from all buttons
        colorButtons.forEach(btn => {
          btn.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500');
        });

        // Add selected class to clicked button
        this.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');

        // Update hidden input
        colorInput.value = color;
      });
    });
  }

  // Add person button (this is just the button to show the form)
  const addPersonBtn = document.getElementById('add-person-btn');
  const personForm = document.getElementById('person-form');

  if (addPersonBtn && personForm) {
    addPersonBtn.addEventListener('click', function() {
      // Focus on the name input to make it easy to start entering data
      const nameInput = document.getElementById('name-input');
      if (nameInput) {
        nameInput.focus();
        // Scroll to the form if needed
        personForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Form submission validation
  const personFormElement = document.getElementById('person-form');
  if (personFormElement) {
    personFormElement.addEventListener('submit', function(e) {
      const nameInput = document.getElementById('name-input');
      const heightInput = document.getElementById('height-input');

      if (!nameInput || nameInput.value.trim() === '' || !heightInput || heightInput.value <= 0) {
        e.preventDefault();
        alert('Please enter a valid name and height');
        return false;
      }

      // Make sure the height input is updated with the latest value
      if (cmInput && heightInput) {
        heightInput.value = cmInput.value;
      }

      // Everything looks good, submit the form
      return true;
    });
  }

  // Initialize any sliders for scaling
  const scaleSlider = document.querySelector('input[type="range"]');

  if (scaleSlider) {
    scaleSlider.addEventListener('input', function() {
      // Scale visualization based on slider value
      const scale = this.value / 50; // Normalize to 0-2 range

      // Apply scaling to the visualization
      const personContainer = document.querySelector('#people-visualization');
      if (personContainer) {
        personContainer.style.transform = `scale(${scale})`;
        personContainer.style.transformOrigin = 'center bottom';
      }
    });
  }

  // Function to add a new person to the visualization dynamically (for client-side preview)
  function addPersonToVisualization(name, height, gender, avatar, color) {
    const peopleVisualization = document.getElementById('people-visualization');
    if (!peopleVisualization) return;

    // Create a new person element
    const personElement = document.createElement('div');
    personElement.className = 'flex flex-col items-center mx-4';

    // Add name and height information
    const infoElement = document.createElement('div');
    infoElement.className = 'text-xs text-center mb-1';

    const nameElement = document.createElement('div');
    nameElement.textContent = name;

    const cmElement = document.createElement('div');
    cmElement.textContent = `cm: ${height}`;

    const ftElement = document.createElement('div');
    ftElement.textContent = `ft: ${cmToFeetInches(height)}`;

    infoElement.appendChild(nameElement);
    infoElement.appendChild(cmElement);
    infoElement.appendChild(ftElement);

    // Add avatar visualization
    const visualElement = document.createElement('div');
    visualElement.className = 'relative';

    const avatarImg = document.createElement('img');
    avatarImg.src = gender === 'male' ? '/img/avatars/male.svg' : '/img/avatars/female.svg';
    avatarImg.alt = `${gender} avatar`;
    avatarImg.style.height = `${height * 0.5}px`; // Scale the avatar height
    avatarImg.classList.add('max-h-full');

    visualElement.appendChild(avatarImg);

    personElement.appendChild(infoElement);
    personElement.appendChild(visualElement);

    // Append the new person to the visualization container
    peopleVisualization.appendChild(personElement);
  }

  // For client-side preview, you could add this to the form submit event
  // This would show the new person immediately without waiting for page refresh
  if (personFormElement) {
    personFormElement.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the form from submitting and refreshing the page

      const nameInput = document.getElementById('name-input');
      const heightInput = document.getElementById('height-input');
      const genderInput = document.getElementById('gender-input');
      const avatarInput = document.getElementById('avatar-input');
      const colorInput = document.getElementById('color-input');

      if (nameInput && heightInput && genderInput) {
        const name = nameInput.value;
        const height = parseFloat(heightInput.value);
        const gender = genderInput.value;
        const avatar = avatarInput ? avatarInput.value : '';
        const color = colorInput ? colorInput.value : 'green';

        if (name && height) {
          // Add the person to the visualization
          addPersonToVisualization(name, height, gender, avatar, color);

          // Optionally, clear the form inputs after adding the person
          nameInput.value = '';
          heightInput.value = '';
          genderInput.value = 'male'; // Reset to default gender
          avatarInput.value = '';
          colorInput.value = 'green';
        }
      }
    });
  }
});
