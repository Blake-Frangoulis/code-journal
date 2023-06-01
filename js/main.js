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

function renderEntry(entry) {
  const $entryRendered = document.createElement('li');

  const $divRow = document.createElement('div');
  $divRow.classList.add('row');
  $entryRendered.appendChild($divRow);

  const $divHalf1 = document.createElement('div');
  $divHalf1.classList.add('column-half');
  $divRow.appendChild($divHalf1);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $divHalf1.appendChild($img);

  const $divHalf2 = document.createElement('div');
  $divHalf1.classList.add('column-half');
  $divRow.appendChild($divHalf2);

  const $h1 = document.createElement('h1');
  $h1.textContent = entry.title;
  $divHalf2.appendChild($h1);

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $divHalf2.appendChild($p);

  return $entryRendered;
}

const $ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const output = renderEntry(data.entries[i]);
    $ul.appendChild(output);
  }
});
