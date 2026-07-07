// Handle tab switching
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.getElementById(target).style.display = 'block';

    if (target === 'pokemon') {
      loadAndDisplayPokemonList();
    }
  });
});

// Load Pokémon data and create list dynamically
async function loadAndDisplayPokemonList() {
  try {
    const response = await fetch('pokemonData.json');
    const pokemonData = await response.json();

    const container = document.getElementById('pokemon-list-container');
    container.innerHTML = '';

    pokemonData.forEach(poke => {
      const div = document.createElement('div');
      div.className = 'pokemon-name';
      div.textContent = poke.name;
      div.dataset.name = poke.name;
      div.dataset.sprites = JSON.stringify([poke.sprite]);
      div.dataset.shiny = JSON.stringify([poke.shiny]);
      div.addEventListener('click', () => {
        openSpritesModal(poke.name, [poke.sprite], [poke.shiny]);
      });
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading Pokémon data:', err);
  }
}

// Modal handling
const modal = document.getElementById('spritesModal');
const closeBtn = document.getElementById('closeModal');

closeBtn.onclick = () => { modal.style.display = 'none'; };
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

function openSpritesModal(pokemonName, spriteFiles, shinyFiles) {
  document.getElementById('pokemonName').textContent = pokemonName;

  // Clear previous sprites
  document.getElementById('popupSprites').innerHTML = '';
  document.getElementById('popupShinySprites').innerHTML = '';

  // Add sprites
  spriteFiles.forEach(filename => {
    const img = document.createElement('img');
    img.src = `assets/sprites/${filename}`;
    img.alt = pokemonName + ' sprite';
    document.getElementById('popupSprites').appendChild(img);
  });
  shinyFiles.forEach(filename => {
    const img = document.createElement('img');
    img.src = `assets/shiny_sprites/${filename}`;
    img.alt = pokemonName + ' shiny sprite';
    document.getElementById('popupShinySprites').appendChild(img);
  });

  // Show modal
  modal.style.display = 'block';
}

// Initialize default view
window.addEventListener('DOMContentLoaded', () => {
  // Load the Pokémon list for the Pokémon tab
  loadAndDisplayPokemonList();

  // Activate Pokémon tab by default
  document.querySelector('.tab-button[data-tab="pokemon"]').click();
});