document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      
      // Toggle Icon between Bars and X
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });


  // ==========================================
  // 2. FORM SUBMISSION & MODAL CONTROL
  // ==========================================
  const bookingForms = document.querySelectorAll('.repair-booking-form');
  const confirmationModal = document.getElementById('confirmationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalRefNumber = document.getElementById('modalRefNumber');

  if (bookingForms.length > 0) {
    bookingForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual page reload
        
        // Generate a random 6-digit reference number
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        if (modalRefNumber) {
          modalRefNumber.textContent = `MGR-${randomNum}`;
        }
        
        // Show the modal
        if (confirmationModal) {
          confirmationModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        // Optional: Clear the form fields after submission
        form.reset();
        
        // Reset char counter if it exists
        const charCount = document.getElementById('charCount');
        if (charCount) {
          charCount.textContent = '0 / 180';
        }
      });
    });
  }

  // Close Modal Event
  if (modalCloseBtn && confirmationModal) {
    modalCloseBtn.addEventListener('click', function () {
      confirmationModal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the modal content
    confirmationModal.addEventListener('click', function (e) {
      if (e.target === confirmationModal) {
        confirmationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }


  // ==========================================
  // 3. TEXTAREA CHARACTER COUNTER
  // ==========================================
  const messageTextarea = document.getElementById('contactMsg') || document.getElementById('bookMessage') || document.getElementById('formMessage');
  const charCount = document.getElementById('charCount');

  if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', function () {
      let currentLength = messageTextarea.value.length;
      charCount.textContent = `${currentLength} / 180`;
      
      // Change color if approaching limit
      if (currentLength > 160) {
        charCount.style.color = '#dc2626'; // Red
      } else {
        charCount.style.color = 'var(--text-muted)';
      }
    });
  }


  // ==========================================
  // 4. FILE UPLOAD DROPZONE LOGIC
  // ==========================================
  const fileDropzone = document.getElementById('fileDropzone');
  const fileInput = document.getElementById('contactDeviceImages') || document.getElementById('bookDeviceImages') || document.getElementById('deviceImages');
  const fileDropzoneText = document.getElementById('fileDropzoneText');

  if (fileDropzone && fileInput) {
    // Click the dropzone to open file dialog
    fileDropzone.addEventListener('click', function () {
      fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        let fileNames = [];
        for (let i = 0; i < fileInput.files.length; i++) {
          fileNames.push(fileInput.files[i].name);
        }
        fileDropzoneText.innerHTML = `<span style="color: var(--primary); font-weight: 700;"><i class="fa-solid fa-circle-check"></i> ${fileInput.files.length} file(s) selected</span>`;
      } else {
        fileDropzoneText.innerHTML = 'Drag and Drop (or) <span>Choose Files</span>';
      }
    });

    // Drag and Drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      fileDropzone.addEventListener(eventName, function (e) {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    // Highlight dropzone when dragging file over it
    ['dragenter', 'dragover'].forEach(eventName => {
      fileDropzone.addEventListener(eventName, function () {
        fileDropzone.style.borderColor = 'var(--primary)';
        fileDropzone.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
      }, false);
    });

    // Remove highlight when dragging file leaves or is dropped
    ['dragleave', 'drop'].forEach(eventName => {
      fileDropzone.addEventListener(eventName, function () {
        fileDropzone.style.borderColor = 'var(--border-color)';
        fileDropzone.style.backgroundColor = 'var(--bg-alt)';
      }, false);
    });

    // Handle the actual dropped files
    fileDropzone.addEventListener('drop', function (e) {
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change')); // Trigger change event to update text
      }
    }, false);
  }

});
