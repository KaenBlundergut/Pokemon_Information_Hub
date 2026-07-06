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
      displayPokemons(); // Call the function to display Pokémon
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
  container.innerHTML = ''; // Clear current sprites

  // Filter Pokémon IDs based on search
  const filteredIds = pokemonIds.filter(id => {
    // For simplicity, match ID or name if you have names
    const name = getPokemonName(id).toLowerCase();
    return id.toString().includes(filter) || name.includes(filter);
  });

  filteredIds.forEach(id => {
    const idStr = String(id).padStart(3, '0');

    const normalImg = document.createElement('img');
    normalImg.src = `assets/sprites/${idStr}bulbasaur.png`; // Adjust filename pattern
    normalImg.alt = `Pokemon ${id}`;

    const shinyImg = document.createElement('img');
    shinyImg.src = `assets/shiny_sprites/${idStr}nidoranf shiny.png`; // Adjust filename pattern
    shinyImg.alt = `Shiny Pokemon ${id}`;

    // Append images
    container.appendChild(normalImg);
    container.appendChild(shinyImg);
  });
}

// Example function to get Pokémon name by ID (can be customized)
function getPokemonName(id) {
  const names = {
    1: 'bulbasaur',
    2: 'ivysaur',
    3: 'venusaur',
    29: 'nidoran-f',
    150: 'mewtwo'
  };
  return names[id] || 'pokemon';
}

// Event listener for search box
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  displayPokemons(filter);
});

// Initialize display when Pokémon tab is first shown
// Optionally, call displayPokemons() here to show all by default