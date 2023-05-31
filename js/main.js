const $imgInput = document.querySelector('#photo-url');
const $imgSrc = document.querySelector('#img');

function imgChange(event) {
  $imgSrc.setAttribute('src', event.target.value);
}

$imgInput.addEventListener('input', imgChange);
