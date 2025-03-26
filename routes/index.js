const express = require('express');
const router = express.Router();

// In-memory data store (in a real app, use a database)
let people = [
  {
    id: 1,
    name: 'Average Man',
    height: 175,
    gender: 'male',
    heightInFeetInches: "5'9\"",
    avatar: '/img/avatars/male.svg',
    color: 'blue'
  },
  {
    id: 2,
    name: 'Average Woman',
    height: 162,
    gender: 'female',
    heightInFeetInches: "5'4\"",
    avatar: '/img/avatars/female.svg',
    color: 'red'
  }
];

// Helper function to convert cm to feet and inches
function cmToFeetInches(cm) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = (totalInches % 12).toFixed(2);
  return `${feet}'${inches}"`;
}

// Home page route
router.get('/', (req, res) => {
  console.log('Loading homepage, current people:', people);
  res.render('index', {
    title: 'Height Comparison',
    people: people
  });
});

// Add person route
router.post('/add-person', (req, res) => {
  console.log('Received form data:', req.body);

  const { name, height, gender, avatar, color } = req.body;

  // Simple validation
  if (!name || !height) {
    return res.status(400).json({ error: 'Name and height are required' });
  }

  const heightCm = parseFloat(height);

  // Set avatar based on gender and color selection
  let avatarFile;
  if (avatar && avatar !== '') {
    avatarFile = avatar;
  } else {
    // Default avatar based on gender
    avatarFile = gender === 'female'
      ? `/img/avatars/female.svg`
      : `/img/avatars/male.svg`;
  }

  // Create new person
  const newPerson = {
    id: Date.now(), // Use timestamp to ensure unique ID
    name,
    height: heightCm,
    gender: gender || 'male', // Default to male if not specified
    heightInFeetInches: cmToFeetInches(heightCm),
    avatar: avatarFile,
    color: color || 'green' // Default green color matching the screenshot
  };

  // Add to our list
  people.push(newPerson);

  console.log('Added new person:', newPerson);
  console.log('Current people list:', people);

  // Redirect back to home page
  res.redirect('/');
});

// Remove person route
router.post('/remove-person/:id', (req, res) => {
  const id = parseInt(req.params.id);
  people = people.filter(person => person.id !== id);
  res.redirect('/');
});

// Height calculator route
router.get('/height-calculator', (req, res) => {
  res.render('height-calculator', {
    title: 'Height Calculator'
  });
});

// About page route
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Height Comparison'
  });
});

// Contact page route
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});

// Login page route
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login to Height Comparison'
  });
});

// Signup page route
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up for Height Comparison'
  });
});

module.exports = router;
