const $imgInput = document.querySelector('#photo-url');
const $imgSrc = document.querySelector('#img');

function imgChange(event) {
  $imgSrc.setAttribute('src', event.target.value);
}

$imgInput.addEventListener('input', imgChange);

const $form = document.querySelector('form');

function formStore(event) {
  event.preventDefault();
  const entry = {
    title: $form.elements.title.value,
    photoUrl: $form.elements['photo-url'].value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', formStore);
