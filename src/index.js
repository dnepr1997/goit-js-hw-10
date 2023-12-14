import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from './cat-api'

const selectMenu = document.querySelector('.breed-select')
const loadingInfo = document.querySelector('.loader')
const errorInfo = document.querySelector('.error')
const infoCat = document.querySelector('.cat-info')

errorInfo.classList.add('is-hidden')
fetchBreeds()
    .then(data => {
        loadingInfo.classList.replace('loader', 'is-hidden')
        
        let createMark = data
        .map(({ name, id }) => {
        return `<option value="${id}">${name}</option>`
        }).join("")
        selectMenu.insertAdjacentHTML('beforeend', createMark)
        new SlimSelect({
            select: selectcat,
        });
     })
    .catch(error => error)

selectMenu.addEventListener('change', handleClick)

function handleClick(event) {
    loadingInfo.classList.replace('is-hidden', 'loader')
    // selectMenu.classList.add('is-hidden')
    infoCat.classList.add('is-hidden')
    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            loadingInfo.classList.replace('loader', 'is-hidden')
            
            // infoCat.classList.remove('is-hidden')
            const { id, url, breeds } = data[0]
            
            infoCat.innerHTML = `<img class="cat-img" src="${url}" alt="${breeds[0].name}" width=400px/>
            <div>
            <h2>${breeds[0].name}</h2>
            <p>${breeds[0].description}</p>
            <p><span>Temperament: </span>${breeds[0].temperament}</p>
            </div>`
        })
        .catch(onError)
}
function onError() {
  selectMenu.classList.remove('is-hidden');
  loadingInfo.classList.replace('loader', 'is-hidden');
  infoCat.classList.add('is-hidden');
//   errorInfo.classList.remove('is-hidden')
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

