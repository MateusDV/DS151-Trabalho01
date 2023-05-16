export default class PaisesApiClient {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async obterTodosPaises(){
        const resposta = await fetch(`${this.url}all?fields=name,region,flags`);
        return await resposta.json();
    }

    async pesquisarPaises(nome) {
        const resposta = await fetch(`${this.url}name/${nome}`);
        if (resposta.status === 404) {
            return null;
        }
        return await resposta.json();
    }
}