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

function inputElement(evt) {
  const inputValue = evt.target.value;

  fetchCountries(inputValue).then(data => {
    console.log(data);
  });
}
