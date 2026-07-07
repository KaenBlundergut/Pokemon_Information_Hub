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

// Load Pokémon data and display list and hexagons
async function loadAndDisplayPokemon() {
  try {
    const response = await fetch('assets/pokemonData.json'); // Ensure path is correct
    const data = await response.json();

    window.pokemonData = data;

    // Display Pokémon list
    const listContainer = document.getElementById('pokemon-list');
    listContainer.innerHTML = '';

    data.forEach(p => {
      const div = document.createElement('div');
      div.className = 'pokemon-name';
      div.textContent = p.name;
      div.dataset.name = p.name;
      div.dataset.sprites = JSON.stringify([p.sprite]);
      div.dataset.shiny = JSON.stringify([p.shiny]);
      div.onclick = () => {
        openSpritePopup(p.name, [p.sprite], [p.shiny]);
      };
      listContainer.appendChild(div);
    });

    // Generate hexagon buttons
    generateHexagons();

  } catch (err) {
    console.error('Error loading Pokémon:', err);
  }
}

function generateHexagons() {
  const container = document.getElementById('hexagon-container');
  container.innerHTML = '';
  const data = window.pokemonData || [];
  data.forEach(p => {
    const hex = document.createElement('div');
    hex.className = 'hexagon';
    hex.textContent = p.name;
    hex.title = 'Click to view sprites';
    hex.onclick = () => {
      openSpritePopup(p.name, [p.sprite], [p.shiny]);
    };
    container.appendChild(hex);
  });
}

// Search filtering
document.getElementById('searchInput').addEventListener('input', () => {
  const filter = document.getElementById('searchInput').value.toLowerCase();
  const data = window.pokemonData || [];
  const filtered = data.filter(p => p.name.toLowerCase().includes(filter));

  const container = document.getElementById('pokemon-list');
  container.innerHTML = '';

  filtered.forEach(p => {
    const div = document.createElement('div');
    div.className = 'pokemon-name';
    div.textContent = p.name;
    div.dataset.name = p.name;
    div.dataset.sprites = JSON.stringify([p.sprite]);
    div.dataset.shiny = JSON.stringify([p.shiny]);
    div.onclick = () => {
      openSpritePopup(p.name, [p.sprite], [p.shiny]);
    };
    container.appendChild(div);
  });
}

// Load sprite galleries (reference, optional) - no sprites outside modal
async function loadSpriteGalleries() {
  try {
    const respSprites = await fetch('assets/sprites.json');
    const spritesList = await respSprites.json();

    const gallery = document.createElement('div');
    gallery.id = 'sprites-gallery';

    spritesList.forEach(filename => {
      const img = document.createElement('img');
      img.src = `assets/sprites/${filename}`;
      img.alt = filename;
      gallery.appendChild(img);
    });
    document.body.appendChild(gallery);

    const respShiny = await fetch('assets/shiny_sprites.json');
    const shinyFilenames = await respShiny.json();
    const shinyGallery = document.createElement('div');
    shinyGallery.id = 'shiny-sprites-gallery';

    shinyFilenames.forEach(filename => {
      const img = document.createElement('img');
      img.src = `assets/shiny_sprites/${filename}`;
      img.alt = filename;
      shinyGallery.appendChild(img);
    });
    document.body.appendChild(shinyGallery);
  } catch (err) {
    console.error('Error loading sprite galleries:', err);
  }
}

// Popup modal functions
const modal = document.getElementById('spritesModal');
const closeBtn = document.getElementById('closeModal');

closeBtn.onclick = () => { modal.style.display = 'none'; };
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

function openSpritePopup(name, sprites, shinies) {
  document.getElementById('pokemonName').textContent = name;
  const containerSprites = document.getElementById('popupSprites');
  const containerShinies = document.getElementById('popupShinySprites');

  // Clear previous images
  containerSprites.innerHTML = '';
  containerShinies.innerHTML = '';

  // Add normal sprites
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

  // Show modal
  modal.style.display = 'block';
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  loadAndDisplayPokemon();
  loadSpriteGalleries(); // optional
  document.querySelector('.tab-button[data-tab="pokemon"]').click();
});