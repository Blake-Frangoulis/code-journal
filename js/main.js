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
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entry);
    $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');

    $ul.prepend(renderEntry(entry));
  } else {
    const originalEntryId = entry.entryId;
    const editedEntry = {
      entryId: data.editing.entryId,
      title: $form.elements.title.value,
      photoUrl: $form.elements['photo-url'].value,
      notes: $form.elements.notes.value
    };
    data.entries.entryId = editedEntry.entryId;
    data.entries[originalEntryId] = editedEntry;

    const $originalEntryDOM = document.querySelector('li[data-entry-id="' + editedEntry.entryId + '"]');
    const $editedEntryDom = renderEntry(editedEntry);
    $originalEntryDOM.replaceWith($editedEntryDom);

    const $entryFormh1 = document.querySelector('.new-entry h1');
    $entryFormh1.textContent = 'New Entry';
    data.editing = null;
  }
  viewSwap('entries');
  toggleNoEntries();
  $form.reset();
}

$form.addEventListener('submit', formStore);

function renderEntry(entry) {
  const $entryRendered = document.createElement('li');
  $entryRendered.setAttribute('data-entry-id', entry.entryId);

  const $divRow = document.createElement('div');
  $divRow.classList.add('row');
  $entryRendered.appendChild($divRow);

  const $divHalf1 = document.createElement('div');
  $divHalf1.classList.add('column-half');
  $divRow.appendChild($divHalf1);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'uploaded-image');
  $divHalf1.appendChild($img);

  const $divHalf2 = document.createElement('div');
  $divHalf2.classList.add('column-half');
  $divRow.appendChild($divHalf2);

  const $h1 = document.createElement('h1');
  $h1.textContent = entry.title;
  $divHalf2.appendChild($h1);
  const $pencil = document.createElement('i');
  $pencil.classList.add('fa-solid', 'fa-pencil');
  $h1.appendChild($pencil);

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
    const $pencilIcon = output.querySelector('.fa-pencil');
    $pencilIcon.addEventListener('click', () => {
      viewSwap('entry-form');
      const selectedEntry = data.entries[i];
      data.editing = selectedEntry;
      $form.elements.title.value = selectedEntry.title;
      $form.elements['photo-url'].value = selectedEntry.photoUrl;
      $form.elements.notes.value = selectedEntry.notes;
      const $entryFormh1 = document.querySelector('.new-entry h1');
      $entryFormh1.textContent = 'Edit Entry';
    });
  }
  viewSwap(data.view);
  toggleNoEntries();
});

const $noEntries = document.querySelector('.no-entries');
function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

const $dataViewEntries = document.querySelector('[data-view="entries"');
const $dataEntryForm = document.querySelector('[data-view="entry-form"]');
function viewSwap(view) {
  if (view === 'entries') {
    $dataViewEntries.classList.remove('hidden');
    $dataEntryForm.classList.add('hidden');
  } else if (view === 'entry-form') {
    $dataEntryForm.classList.remove('hidden');
    $dataViewEntries.classList.add('hidden');
  }
  data.view = view;
}

const $entriesAnchor = document.querySelector('#entries-anchor');
$entriesAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
  toggleNoEntries();
});

const $newButton = document.querySelector('#new-button');
$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
