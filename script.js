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

    // If Pokémon tab is opened, load sprites (optional, only load once)
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

    // Get the gallery container
    const gallery = document.getElementById('sprites-gallery');
    // Clear previous images
    gallery.innerHTML = '';

    // Append images
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
    // Clear previous images
    shinyGallery.innerHTML = '';

    // Append shiny images
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

// Automatically load sprites when page loads
// (Optional: only load once, or load on tab click)
loadSpritesGallery();

// Initialize default tab
// Show the Challenges tab by default
document.querySelector('.tab-button.active').click();

window.addEventListener('DOMContentLoaded', loadSpritesGallery);