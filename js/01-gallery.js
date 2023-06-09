import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
let modalInstance = null;

const createGalleryItemMarkup = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
};

const createGalleryMarkup = items => {
  return items.map(item => createGalleryItemMarkup(item)).join('');
};

galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

galleryList.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    const largeImageURL = e.target.dataset.source;
    openModal(largeImageURL);
  }
});

const openModal = url => {
  const instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600">
  `, {
    onShow: instance => {
      console.log('onShow', instance);
      document.addEventListener('keydown', onModalKeyDown);
    },
    onClose: instance => {
      console.log('onClose', instance);
      document.removeEventListener('keydown', onModalKeyDown);
    }
  });

  instance.show();
  modalInstance = instance;
};

const closeModal = () => {
  document.removeEventListener('keydown', onModalKeyDown);

  if (modalInstance) {
    modalInstance.close();
    modalInstance = null;
  }
};

const onModalKeyDown = e => {
  if (e.key === 'Escape' && modalInstance) {
    closeModal();
  }
};


