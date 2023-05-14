import axios from "axios";

const listaPaises = axios.create({
    baseURL: 'https://restcountries.com/v3.1/all'
})

const pesquisaPaises = axios.create({
    baseURL: 'https://restcountries.com/v3.1/all'
})

export default listaPaises;