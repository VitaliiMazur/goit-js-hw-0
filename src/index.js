import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(inputElement, DEBOUNCE_DELAY)
);

function clearElems(data) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function inputElement(evt) {
  const inputValue = evt.target.value.trim();
  if (inputValue === '') {
    clearElems();
    return;
  }

  fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearElems();
        return;
      }

      if (data.length >= 2) {
        countryList(data);
      }

      if (data.length === 1) {
        clearElems();
        showCountry(data);
      }
    })
    .catch(Notify.failure('Oops, there is no country with that name'));
}

function countryList(data) {
  console.log(data);
  let markup = data
    .map(item => {
      console.log(item);
      return `<li class="country-el"><img src="${item.flags.svg} " alt="country-flag">
  <p>${item.name.official} </p></li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function showCountry(data) {
  const markup = ``;
  console.log(data);
}
