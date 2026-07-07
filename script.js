function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('show'));
  // Show selected tab
  document.getElementById(tabName).classList.add('show');

  // Close the popup when switching tabs
  closePopup();

  // Update active button styles
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    }
  });
}

function openPopup() {
  document.getElementById('spritesModal').style.display = 'block';
}

function closePopup() {
  document.getElementById('spritesModal').style.display = 'none';
}