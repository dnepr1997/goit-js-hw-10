import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_PVlsF0SeidXH771wNUzsS7VjvKhcx2jFmsl0LL9nXs1Gupm5zY4qau0Tx3q35x1v";

const BASE_URL = "https://api.thecatapi.com/v1"
export function fetchBreeds() {
    const END_POINT = "/breeds"
    const url = `${BASE_URL}${END_POINT}`;

    return axios
        .get(url)
        .then(response => response.data)
        .catch(error => console.log(error))
}

export function fetchCatByBreed(breedId) {
    const url = `${BASE_URL}/images/search?breed_ids=${breedId}`
    return axios
        .get(url)
        .then(response => response.data)
        .catch(error => console.log(error))
}
