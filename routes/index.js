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
    avatar: '/img/avatars/male.svg'
  },
  {
    id: 2,
    name: 'Average Woman',
    height: 162,
    gender: 'female',
    heightInFeetInches: "5'4\"",
    avatar: '/img/avatars/female.svg'
  }
];

// Helper function to convert cm to feet and inches
function cmToFeetInches(cm) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
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
  const { name, height, gender } = req.body;

  // Simple validation
  if (!name || !height) {
    return res.status(400).json({ error: 'Name and height are required' });
  }

  const heightCm = parseInt(height);

  // Create new person
  const newPerson = {
    id: people.length + 1,
    name,
    height: heightCm,
    gender: gender || 'male', // Default to male if not specified
    heightInFeetInches: cmToFeetInches(heightCm),
    avatar: gender === 'female' ? '/img/avatars/female.svg' : '/img/avatars/male.svg'
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

module.exports = router;
