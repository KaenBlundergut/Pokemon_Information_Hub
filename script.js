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
    populatePokedex();
  });

  // Tab switching
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabContents.forEach(tc => {
        tc.classList.toggle('active', tc.id === target);
      });
    });
  });

  // Populate Pokedex
  function populatePokedex() {
    pokemonList.innerHTML = '';
    pokemonData.forEach(pokemon => {
      const box = document.createElement('div');
      box.className = 'pokemon-box';
      box.textContent = pokemon.name;
      box.addEventListener('click', () => showPokemonDetails(pokemon));
      pokemonList.appendChild(box);
    });
  }

  // Show popup with Pokémon details
  function showPokemonDetails(pokemon) {
    const spritePath = `assets/sprites/${pokemon.sprite}`;
    const shinyPath = `assets/shiny_sprites/${pokemon.shiny}`;
    pokemonNameEl.textContent = pokemon.name;
    spriteEl.src = spritePath;
    shinySpriteEl.src = shinyPath;
    popup.classList.remove('hidden');
  }

  // Close popup
  closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  // Optional: Close popup when clicking outside content
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
    }
  });

  // Buttons actions (About, Feedback, Donate)
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