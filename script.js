document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.main-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const pokemonList = document.getElementById('pokemonList');
  const popup = document.getElementById('popup');
  const closePopupBtn = document.getElementById('closePopup');
  const pokemonNameEl = document.getElementById('pokemonName');
  const spriteEl = document.getElementById('sprite');
  const shinySpriteEl = document.getElementById('shinySprite');

  let pokemonData = [];
  let shinySprites = [];
  let sprites = [];

  // Load JSON data
  Promise.all([
    fetch('assets/pokemonData.json').then(res => res.json()),
    fetch('assets/shiny_sprites.json').then(res => res.json()),
    fetch('assets/sprites.json').then(res => res.json())
  ]).then(([data, shinyData, spriteData]) => {
    pokemonData = data;
    shinySprites = shinyData;
    sprites = spriteData;
    groupPokemon();
    populatePokedex();
  });

// Group Pokémon
function groupPokemon() {
  groupedPokemon = {};
  pokemonData.forEach(p => {
    const baseName = p.name.replace(/\s*\(.*?\)\s*/g, '').trim();
    if (!groupedPokemon[baseName]) {
      groupedPokemon[baseName] = [];
    }
    groupedPokemon[baseName].push(p);
  });
}

// Populate Pokedex
function populatePokedex() {
  groupPokemon();
  document.getElementById('searchBar').value = '';
  renderPokemonList(Object.keys(groupedPokemon));
}

// Render list
function renderPokemonList(names) {
  const listContainer = document.getElementById('pokemonList');
  listContainer.innerHTML = '';
  names.forEach(name => {
    const box = document.createElement('div');
    box.className = 'pokemon-box';
    box.textContent = name;
    box.addEventListener('click', () => showPokemonGroup(name));
    listContainer.appendChild(box);
  });
}

  // Show all sprites for a group
  function showPokemonGroup(name) {
    const group = groupedPokemon[name];
    // Prepare array of sprites (normal + shiny)
    const spritesArray = group.map(p => ({
      name: p.name,
      spritePath: `assets/sprites/${p.sprite}`,
      shinyPath: `assets/shiny_sprites/${p.shiny}`
    }));
    showMultipleSpritesPopup(spritesArray, name);
  }

  // Show multiple sprites in popup
  function showMultipleSpritesPopup(sprites, groupName) {
    pokemonNameEl.textContent = groupName;
    // Clear previous sprites
    document.querySelector('.sprites-container').innerHTML = '';
    sprites.forEach(s => {
      const container = document.createElement('div');
      container.className = 'sprites-container';

      const spriteImg = document.createElement('img');
      spriteImg.src = s.spritePath;
      spriteImg.alt = s.name;

      const shinyImg = document.createElement('img');
      shinyImg.src = s.shinyPath;
      shinyImg.alt = s.name + ' Shiny';

      container.appendChild(spriteImg);
      container.appendChild(shinyImg);
      document.querySelector('.sprites-container').appendChild(container);
    });
    popup.classList.remove('hidden');
  }

  // Search filter event
  document.getElementById('searchBar').addEventListener('input', () => {
    const filter = document.getElementById('searchBar').value.toLowerCase();
    const filteredNames = Object.keys(groupedPokemon).filter(name => name.toLowerCase().includes(filter));
    renderPokemonList(filteredNames);
  });

// When a tab button is clicked
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-tab');
    // Show the target tab and hide others
    tabContents.forEach(tc => {
      if (tc.id === targetId) {
        tc.classList.remove('hidden');
      } else {
        tc.classList.add('hidden');
      }
    });
    // Refresh Pokedex when shown
    if (targetId === 'pokedex') {
      groupPokemon();
      populatePokedex();
    }
  });
});

  // Close popup
  document.getElementById('closePopup').addEventListener('click', () => {
    popup.classList.add('hidden');
  });
  // Close if clicking outside content
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
    }
  });

  // Buttons: About, Feedback, Donate
  document.getElementById('aboutBtn').addEventListener('click', () => {
    alert('This is a Pokémon Information Hub.');
  });
  document.getElementById('feedbackBtn').addEventListener('click', () => {
    alert('Feedback form coming soon.');
  });
  document.getElementById('donateBtn').addEventListener('click', () => {
    window.open('https://yourdonatepage.com', '_blank');
  });
});