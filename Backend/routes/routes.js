const express = require('express');
const router = express.Router(); // Corrected import statement

router.post("/", (req, res) => {
  // Handler for the first POST route
});

router.post("/", (req, res) => {
  // Handler for the second POST route
});

router.post("/", (req, res) => {
  // Handler for the third POST route
});

module.exports = router; // Properly exporting the router instance
