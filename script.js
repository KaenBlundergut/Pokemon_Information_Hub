// Handle tab switching
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.getElementById(target).style.display = 'block';

    if (target === 'pokemon') {
      loadAndDisplayPokemon();
    }
  });
});

// Load Pokémon data and display list
async function loadAndDisplayPokemon() {
  try {
    const response = await fetch('assets/pokemonData.json'); // Path to your JSON
    const data = await response.json();

    // Combine Pokémon with same base name
    const combinedData = combinePokemonByBaseName(data);
    window.pokemonData = combinedData;

    // Populate list
    populatePokemonList(combinedData);
  } catch (err) {
    console.error('Error loading Pokémon:', err);
  }
}

function combinePokemonByBaseName(pokemonArray) {
  const grouped = {};

  pokemonArray.forEach(p => {
    const baseName = p.name.replace(/\s*\(.*?\)\s*/g, '').trim();

    if (!grouped[baseName]) {
      grouped[baseName] = {
        name: baseName,
        sprites: [],
        shinies: []
      };
    }

    if (p.sprite && !grouped[baseName].sprites.includes(p.sprite)) {
      grouped[baseName].sprites.push(p.sprite);
    }
    if (p.shiny && !grouped[baseName].shinies.includes(p.shiny)) {
      grouped[baseName].shinies.push(p.shiny);
    }
  });

  return Object.values(grouped);
}

function populatePokemonList(data) {
  const container = document.getElementById('pokemon-list');
  container.innerHTML = '';

  data.forEach(p => {
    const div = document.createElement('div');
    div.className = 'pokemon-name';
    div.textContent = p.name;
    div.dataset.name = p.name;
    div.dataset.sprites = JSON.stringify(p.sprites);
    div.dataset.shiny = JSON.stringify(p.shinies);
    div.onclick = () => {
      openSpritePopup(p.name, p.sprites, p.shinies);
    };
    container.appendChild(div);
  });
}

// Popup sprite modal
const modal = document.getElementById('spritesModal');
const closeBtn = document.getElementById('closeModal');

closeBtn.onclick = () => { modal.style.display = 'none'; };
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

function openSpritePopup(name, sprites, shinies) {
  document.getElementById('pokemonName').textContent = name;
  const containerSprites = document.getElementById('popupSprites');
  const containerShinies = document.getElementById('popupShinySprites');

  // Clear previous sprites
  containerSprites.innerHTML = '';
  containerShinies.innerHTML = '';

  // Add sprites
  sprites.forEach(f => {
    const img = document.createElement('img');
    img.src = `assets/sprites/${f}`;
    img.alt = name + ' sprite';
    containerSprites.appendChild(img);
  });

  // Add shiny sprites
  shinies.forEach(f => {
    const img = document.createElement('img');
    img.src = `assets/shiny_sprites/${f}`;
    img.alt = name + ' shiny sprite';
    containerShinies.appendChild(img);
  });

  modal.style.display = 'block';
}

// Initialize on DOM content loaded
window.addEventListener('DOMContentLoaded', () => {
  // Only load Pokémon tab initially
  document.querySelector('.tab-button[data-tab="pokemon"]').click();
});