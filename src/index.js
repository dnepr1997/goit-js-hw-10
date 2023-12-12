import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api'

const selectMenu = document.querySelector('.breed-select')
const loadingInfo = document.querySelector('.loader')
const errorInfo = document.querySelector('.error')
const infoCat = document.querySelector('.cat-info')

fetchBreeds()
    .then(data => {
        loadingInfo.classList.replace('loader', 'is-hidden')
        let createMark = data
        .map(({ name, id }) => {
        return `<option value="${id}">${name}</option>`
        }).join("")
        selectMenu.insertAdjacentHTML('beforeend', createMark)
     })
    .catch(error => error)

selectMenu.addEventListener('change', handleClick)

function handleClick(event) {
    loadingInfo.classList.replace('is-hidden', 'loader')
    errorInfo.classList.add('is-hidden')
    infoCat.classList.add('is-hidden')
    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            loadingInfo.classList.replace('loader', 'is-hidden')
            errorInfo.classList.remove('is-hidden')
            infoCat.classList.remove('is-hidden')
            const { id, url, breeds } = data[0]
            console.log(breeds);
            infoCat.innerHTML = `<img class="cat-img" src="${url}" alt="${breeds[0].name}" width=400px/>
            <h2>${breeds[0].name}</h2>
            <p>${breeds[0].description}</p>
            <p><span>Temperament: </span>${breeds[0].temperament}</p>`
        })
        .catch(error)
    
  
}

