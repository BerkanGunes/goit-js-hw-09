const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.gallery');

function createGalleryMarkup(images) {
  return images.map(({ preview, original, description }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `).join('');
}

galleryContainer.innerHTML = createGalleryMarkup(images);

let modal = null;
let currentImageIndex = 0;

const navigationStyles = `
  .navigation-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.5);
    color: #000;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.3s;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navigation-button:hover {
    background: rgba(255, 255, 255, 0.8);
  }
  .prev-button {
    left: 20px;
  }
  .next-button {
    right: 20px;
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = navigationStyles;
document.head.appendChild(styleElement);

galleryContainer.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  
  const clickedImage = event.target;
  const allGalleryImages = document.querySelectorAll('.gallery-image');
  
  allGalleryImages.forEach((img, index) => {
    if (img === clickedImage) {
      currentImageIndex = index;
    }
  });
  
  showLightbox(currentImageIndex);
}

document.addEventListener('click', function(e) {
  const target = e.target;
  
  if (target.closest('.prev-button')) {
    e.preventDefault();
    navigateGallery('prev');
  } else if (target.closest('.next-button')) {
    e.preventDefault();
    navigateGallery('next');
  }
});

function navigateGallery(direction) {
  if (!modal) return;
  
  modal.close();
  
  let newIndex = currentImageIndex;
  if (direction === 'prev') {
    newIndex = (currentImageIndex - 1 + images.length) % images.length;
  } else if (direction === 'next') {
    newIndex = (currentImageIndex + 1) % images.length;
  }
  
  setTimeout(() => {
    showLightbox(newIndex);
  }, 100);
}

function showLightbox(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  
  currentImageIndex = index;
  const imageData = images[index];
  
  modal = basicLightbox.create(`
    <div class="lightbox-container" style="position: relative;">
      <img src="${imageData.original}" alt="${imageData.description}" width="1100">
      <button class="navigation-button prev-button">&lt;</button>
      <button class="navigation-button next-button">&gt;</button>
    </div>
  `, {
    onShow: () => {
      window.addEventListener('keydown', onKeyPress);
    },
    onClose: () => {
      window.removeEventListener('keydown', onKeyPress);
    }
  });
  
  modal.show();
}

function onKeyPress(event) {
  if (!modal) return;
  
  switch (event.code) {
    case 'Escape':
      modal.close();
      break;
    case 'ArrowLeft':
      navigateGallery('prev');
      break;
    case 'ArrowRight':
      navigateGallery('next');
      break;
  }
}