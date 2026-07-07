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

// Load sprite galleries (all Pokémon sprites)
async function loadSpritesGallery() {
  try {
    const responseSprites = await fetch('assets/sprites.json');
    const spriteFilenames = await responseSprites.json();

    const gallery = document.getElementById('sprites-gallery');
    if (gallery) {
      gallery.innerHTML = '';
      spriteFilenames.forEach(filename => {
        const img = document.createElement('img');
        img.src = `assets/sprites/${filename}`;
        img.alt = filename;
        gallery.appendChild(img);
      });
    } else {
      console.error('Element with ID "sprites-gallery" not found.');
    }

    const responseShiny = await fetch('assets/shiny_sprites.json');
    const shinyFilenames = await responseShiny.json();

    const shinyGallery = document.getElementById('shiny-sprites-gallery');
    if (shinyGallery) {
      shinyGallery.innerHTML = '';
      shinyFilenames.forEach(filename => {
        const img = document.createElement('img');
        img.src = `assets/shiny_sprites/${filename}`;
        img.alt = filename;
        shinyGallery.appendChild(img);
      });
    } else {
      console.error('Element with ID "shiny-sprites-gallery" not found.');
    }
  } catch (error) {
    console.error('Error loading sprite galleries:', error);
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
    img.alt = `${pokemonName} sprite`;
    document.getElementById('popupSprites').appendChild(img);
  });
  shinyFiles.forEach(filename => {
    const img = document.createElement('img');
    img.src = `assets/shiny_sprites/${filename}`;
    img.alt = `${pokemonName} shiny sprite`;
    document.getElementById('popupShinySprites').appendChild(img);
  });

  // Show modal
  modal.style.display = 'block';
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  loadSpritesGallery();
  loadAndDisplayPokemonList();

  // Activate Pokémon tab by default
  document.querySelector('.tab-button[data-tab="pokemon"]').click();
});