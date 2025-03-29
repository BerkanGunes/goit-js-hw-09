const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', event => {
  if (event.target.name === 'email' || event.target.name === 'message') {
    saveFormData();
  }
});

function saveFormData() {
  try {
    const formData = {
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Veriler kaydedilirken hata oluştu:', error.message);
  }
}

function loadFormData() {
  try {
    const savedDataJSON = localStorage.getItem(STORAGE_KEY);
    
    if (savedDataJSON) {
      const savedData = JSON.parse(savedDataJSON);
      
      if (savedData.email !== undefined) {
        form.elements.email.value = savedData.email;
      }
      
      if (savedData.message !== undefined) {
        form.elements.message.value = savedData.message;
      }
    }
  } catch (error) {
    console.error('Veriler yüklenirken hata oluştu:', error.message);
    localStorage.removeItem(STORAGE_KEY);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  
  if (email && message) {
    const formData = { email, message };
    
    console.log(formData);
    
    localStorage.removeItem(STORAGE_KEY);
    
    form.reset();
  } else {
    alert('Lütfen tüm alanları doldurun!');
  }
});

document.addEventListener('DOMContentLoaded', loadFormData);