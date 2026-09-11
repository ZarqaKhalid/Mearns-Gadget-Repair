/**
 * MEARNS GADGET REPAIR - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Mobile Dropdown Toggle
  const dropdownToggle = document.querySelector('.nav-dropdown');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (e.target.closest('.nav-link') && !e.target.closest('.dropdown-menu')) {
          e.preventDefault();
          dropdownToggle.classList.toggle('active');
        }
      }
    });
  }

  // Tabbed Device Explorer
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // Character counter for message textarea
  const messageInput = document.getElementById('formMessage');
  const charCounter = document.getElementById('charCount');

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 180`;
    });
  }

  // File upload preview
  const fileInput = document.getElementById('deviceImages');
  const dropzone = document.getElementById('fileDropzone');
  const fileLabel = document.getElementById('fileDropzoneText');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        fileLabel.innerHTML = `<strong>${fileInput.files.length} file(s) selected:</strong> ${fileInput.files[0].name}`;
      }
    });
  }

  // Booking Form Submission & Modal Feedback
  const bookingForms = document.querySelectorAll('.repair-booking-form');
  const confirmationModal = document.getElementById('confirmationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalRefNum = document.getElementById('modalRefNumber');

  bookingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Generate random ticket reference
      const randomTicket = 'MGR-' + Math.floor(100000 + Math.random() * 900000);
      if (modalRefNum) {
        modalRefNum.textContent = randomTicket;
      }

      if (confirmationModal) {
        confirmationModal.classList.add('active');
      }

      form.reset();
      if (fileLabel) {
        fileLabel.innerHTML = 'Drag and Drop (or) <span>Choose Files</span>';
      }
      if (charCounter) {
        charCounter.textContent = '0 / 180';
      }
    });
  });

  if (modalCloseBtn && confirmationModal) {
    modalCloseBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
    });

    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        confirmationModal.classList.remove('active');
      }
    });
  }

  // Set minimum date to today for service date inputs
  const dateInput = document.getElementById('serviceDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});
