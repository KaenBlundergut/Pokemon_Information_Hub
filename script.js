// Handle tab switching
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const target = button.dataset.tab;

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    // Show the selected tab content
    document.getElementById(target).style.display = 'block';

    // Load sprites only when Pokémon tab is opened
    if (target === 'pokemon') {
      loadSpritesGallery();
    }
  });
});

// Load and display sprites from JSON files
async function loadSpritesGallery() {
  try {
    // Load regular sprites filenames
    const responseSprites = await fetch('assets/sprites.json');
    const spriteFilenames = await responseSprites.json();

    const gallery = document.getElementById('sprites-gallery');
    gallery.innerHTML = '';

    spriteFilenames.forEach(filename => {
      const img = document.createElement('img');
      img.src = `assets/sprites/${filename}`;
      img.alt = filename;
      gallery.appendChild(img);
    });

    // Load shiny sprites filenames
    const responseShiny = await fetch('assets/shiny_sprites.json');
    const shinyFilenames = await responseShiny.json();

    const shinyGallery = document.getElementById('shiny-sprites-gallery');
    shinyGallery.innerHTML = '';

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

// Initialize after DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Load sprites once DOM is ready
  loadSpritesGallery();

  // Initialize default tab (simulate click)
  const activeTabButton = document.querySelector('.tab-button.active');
  if (activeTabButton) {
    activeTabButton.click();
  }

  // Modal elements
  const modal = document.getElementById('spritesModal');
  const closeBtn = document.getElementById('closeModal');
  const popupSpritesContainer = document.getElementById('popupSprites');
  const popupShinySpritesContainer = document.getElementById('popupShinySprites');
  const pokemonNameHeader = document.getElementById('pokemonName');

  // Function to open modal with sprites
  window.openSpritesModal = (pokemonName, spriteFilenames, shinyFilenames) => {
    // Set Pokémon name
    pokemonNameHeader.textContent = pokemonName;

    // Clear previous sprites
    popupSpritesContainer.innerHTML = '';
    popupShinySpritesContainer.innerHTML = '';

    // Add sprites
    spriteFilenames.forEach(filename => {
      const img = document.createElement('img');
      img.src = `assets/sprites/${filename}`;
      img.alt = pokemonName + ' sprite';
      popupSpritesContainer.appendChild(img);
    });

    // Add shiny sprites
    shinyFilenames.forEach(filename => {
      const img = document.createElement('img');
      img.src = `assets/shiny_sprites/${filename}`;
      img.alt = pokemonName + ' shiny sprite';
      popupShinySpritesContainer.appendChild(img);
    });

    // Show modal
    modal.style.display = 'block';
  };

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Attach click events to Pokémon names
  document.querySelectorAll('.pokemon-name').forEach(elem => {
    elem.addEventListener('click', () => {
      const name = elem.dataset.name;
      const spriteFiles = JSON.parse(elem.dataset.sprites);
      const shinyFiles = JSON.parse(elem.dataset.shiny);
      window.openSpritesModal(name, spriteFiles, shinyFiles);
    });
  });
});