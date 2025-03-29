// Form elementini seç
const form = document.querySelector('.feedback-form');
// localStorage için anahtar tanımla
const STORAGE_KEY = 'feedback-form-state';

// Delegasyon kullanarak form input olaylarını dinleme
form.addEventListener('input', event => {
  // Sadece ilgili olan input ve textarea elemanlarını işle
  if (event.target.name === 'email' || event.target.name === 'message') {
    saveFormData();
  }
});

// Form verilerini localStorage'a kaydetme
function saveFormData() {
  try {
    // Mevcut form verilerini al
    const formData = {
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim()
    };
    
    // Verileri JSON formatında localStorage'a kaydet
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Veriler kaydedilirken hata oluştu:', error.message);
  }
}

// localStorage'dan form verilerini yükleme
function loadFormData() {
  try {
    // localStorage'dan veriyi al
    const savedDataJSON = localStorage.getItem(STORAGE_KEY);
    
    // Eğer veri varsa, form alanlarını doldur
    if (savedDataJSON) {
      const savedData = JSON.parse(savedDataJSON);
      
      // Form alanlarına değerleri yerleştir
      if (savedData.email !== undefined) {
        form.elements.email.value = savedData.email;
      }
      
      if (savedData.message !== undefined) {
        form.elements.message.value = savedData.message;
      }
    }
  } catch (error) {
    console.error('Veriler yüklenirken hata oluştu:', error.message);
    // Hata durumunda localStorage'ı temizle
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Form gönderildiğinde
form.addEventListener('submit', event => {
  // Sayfanın yenilenmesini engelle
  event.preventDefault();
  
  // Form verilerini al
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  
  // Her iki alan da doldurulmuş mu kontrol et
  if (email && message) {
    // Verileri bir nesne olarak hazırla
    const formData = { email, message };
    
    // Konsola yazdır
    console.log(formData);
    
    // localStorage'ı temizle
    localStorage.removeItem(STORAGE_KEY);
    
    // Form alanlarını temizle
    form.reset();
  } else {
    // Kullanıcıya uyarı göster
    alert('Lütfen tüm alanları doldurun!');
  }
});

// Sayfa yüklendiğinde, form verilerini yükle
document.addEventListener('DOMContentLoaded', loadFormData); 