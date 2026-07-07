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

  // Group Pokémon with parentheses for merging
  let groupedPokemon = {};
  function groupPokemon() {
    groupedPokemon = {};
    pokemonData.forEach(p => {
      let baseName = p.name;
      // Remove parentheses and their content for grouping
      const nameWithoutParentheses = baseName.replace(/\s*\(.*?\)\s*/g, '').trim();
      if (!groupedPokemon[nameWithoutParentheses]) {
        groupedPokemon[nameWithoutParentheses] = [];
      }
      groupedPokemon[nameWithoutParentheses].push(p);
    });
  }

  // Populate Pokedex list
  function populatePokedex() {
    const searchInput = document.getElementById('searchBar');
    searchInput.value = '';
    renderPokemonList(Object.keys(groupedPokemon));
  }

  // Render list based on filter
  function renderPokemonList(names) {
    pokemonList.innerHTML = '';
    names.forEach(name => {
      const box = document.createElement('div');
      box.className = 'pokemon-box';
      box.textContent = name;
      box.addEventListener('click', () => showPokemonGroup(name));
      pokemonList.appendChild(box);
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

  // Tab switching
  const tabButtons = document.querySelectorAll('.main-button');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabContents.forEach(tc => {
        tc.classList.toggle('hidden', tc.id !== target);
        if (target === 'pokedex') {
          // When switching to Pokedex, refresh list
          groupPokemon();
          populatePokedex();
        }
      });
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