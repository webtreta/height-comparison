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
    avatar: '/img/avatars/female-red.svg',
    color: 'red'
  }
];

// Helper function to convert cm to feet and inches
function cmToFeetInches(cm) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12 * 100) / 100;
  return `${feet}'${inches.toFixed(2)}"`;
}

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Height Comparison',
    people: people
  });
});

// Add person route
router.post('/add-person', (req, res) => {
  const { name, height, gender, avatar, color } = req.body;

  // Simple validation
  if (!name || !height) {
    return res.status(400).json({ error: 'Name and height are required' });
  }

  const heightCm = parseFloat(height);

  // Set default avatar based on gender and color selection
  const avatarFile = gender === 'female'
    ? `/img/avatars/female-${color || 'red'}.svg`
    : `/img/avatars/male.svg`;

  // Create new person
  const newPerson = {
    id: people.length + 1,
    name,
    height: heightCm,
    gender: gender || 'male', // Default to male if not specified
    heightInFeetInches: cmToFeetInches(heightCm),
    avatar: avatar || avatarFile,
    color: color || 'blue'
  };

  // Add to our list
  people.push(newPerson);

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
