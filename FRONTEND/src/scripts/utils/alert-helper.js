/* eslint-disable linebreak-style */
const AlertHelper = {
  showAlert(message, type = 'success') {
    // Remove existing alerts first
    const existingAlerts = document.querySelectorAll('.alert-message');
    existingAlerts.forEach((alert) => alert.remove());

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message fixed top-4 left-1/2 transform -translate-x-1/2 
        px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50
        ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white
        transition-all duration-300 ease-in-out opacity-0`;

    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} mr-2"></i>
        <span>${message}</span>
        <button class="ml-4 hover:text-${type === 'error' ? 'red' : 'green'}-200">
          <i class="fas fa-times"></i>
        </button>
      `;

    document.body.appendChild(alertDiv);

    // Add close button handler
    alertDiv.querySelector('button').addEventListener('click', () => {
      alertDiv.classList.remove('opacity-100');
      setTimeout(() => alertDiv.remove(), 300);
    });

    // Trigger animation
    setTimeout(() => alertDiv.classList.add('opacity-100'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      alertDiv.classList.remove('opacity-100');
      setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
  },

  showConfirmation(message, confirmCallback) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out opacity-0';

    const confirmationBox = document.createElement('div');
    confirmationBox.className = 'bg-white rounded-3xl shadow-xl p-8 max-w-md w-full transform transition-transform duration-300 ease-in-out scale-95 opacity-0';
    confirmationBox.innerHTML = `
      <div class="text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <i class="fas fa-exclamation-triangle text-3xl text-yellow-500"></i>
        </div>
        <h3 class="text-2xl font-bold mb-4">Peringatan Keamanan</h3>
        <p class="text-gray-600 mb-8">${message}</p>
        <div class="flex justify-center space-x-4">
          <button id="cancelButton" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all font-semibold">Batal</button>
          <button id="confirmButton" class="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all font-semibold">Lanjutkan</button>
        </div>
      </div>
    `;

    overlay.appendChild(confirmationBox);
    document.body.appendChild(overlay);

    // Trigger animations
    setTimeout(() => {
      overlay.classList.add('opacity-100');
      confirmationBox.classList.add('scale-100', 'opacity-100');
    }, 10);

    const removeDialog = () => {
      overlay.classList.remove('opacity-100');
      confirmationBox.classList.remove('scale-100', 'opacity-100');
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 300);
    };

    document.getElementById('confirmButton').onclick = () => {
      confirmCallback();
      removeDialog();
    };

    document.getElementById('cancelButton').onclick = () => {
      removeDialog();
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        removeDialog();
      }
    });
  },
};

export default AlertHelper;