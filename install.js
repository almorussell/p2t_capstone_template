const fs = require('fs').promises;

// Reusable function to create a file with specified content
async function createFile(filename, data) {
  try {
    await fs.writeFile(filename, data, 'utf8');
    console.log(`File "${filename}" created successfully`);
  } catch (error) {
    console.error('Error creating file:', error);
  }
}

// Create .env file for backend with placeholder content
createFile('./capstone-backend/.env', `DB_URL="YOUR_MONGO_DB_URL_HERE"`);
