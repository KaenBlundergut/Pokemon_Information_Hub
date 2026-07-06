// Handle tab switching
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const target = button.dataset.tab;

    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    document.getElementById(target).style.display = 'block';

    // If Pokémon tab is activated, initialize Pokémon display
    if (target === 'pokemon') {
      displayPokemons(); // your existing Pokémon display function
    }
  });
});

// List of Pokémon IDs to display
const pokemonIds = [1, 2, 3, 29, 150]; // Add your Pokémon IDs here
let allPokemons = []; // To store all Pokémon data

const container = document.getElementById('pokemon-container');
const searchInput = document.getElementById('searchInput');

// Function to display Pokémon based on filter
function displayPokemons(filter = '') {
  // Your existing Pokémon display code (if any)
}

// Event listener for search box
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  displayPokemons(filter);
});

// Load and display sprites from JSON files
async function loadSpritesGallery() {
  try {
    // Load regular sprites
    const responseSprites = await fetch('assets/sprites.json');
    const spriteFilenames = await responseSprites.json();

    const gallery = document.getElementById('sprites-gallery');
    spriteFilenames.forEach(filename => {
      const img = document.createElement('img');
      img.src = `assets/sprites/${filename}`;
      img.alt = filename;
      gallery.appendChild(img);
    });

    // Load shiny sprites
    const responseShiny = await fetch('assets/shiny_sprites.json');
    const shinyFilenames = await responseShiny.json();

    const shinyGallery = document.getElementById('shiny-sprites-gallery');
    shinyFilenames.forEach(filename => {
      const img = document.createElement('img');
      img.src = `assets/shiny_sprites/${filename}`;
      img.alt = filename;
      shinyGallery.appendChild(img);
    });
  } catch (error) {
    console.error('Error loading sprite galleries:', error);
  }
}

// Call this function after page loads
loadSpritesGallery();