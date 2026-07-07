// Switch tabs and close popup on tab change
function switchTab(tabName) {
  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('show'));
  // Show selected tab
  document.getElementById(tabName).classList.add('show');

  // Close popup when switching tabs
  closePopup();

  // Update active button styles
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    }
  });
}

// Open popup
function openPopup() {
  document.getElementById('spritesModal').style.display = 'block';
}

// Close popup
function closePopup() {
  document.getElementById('spritesModal').style.display = 'none';
}