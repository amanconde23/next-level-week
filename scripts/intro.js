//objeto com funcionalidade

const pessoa = {
    altura: "1,80m",
    idade: 24,
    solteiro: true,
    correr(){
        return "run Forest"
    }
}

document.write(pessoa.correr());


for(i = 0; i < 10; i++){
    //esse tipo de string `` aceita interpolar variável
    document.write(`<p>${i}</p>`)
}

//create point com comentarios

function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //função anônima que retorna um valor em formato de json
    .then( (res) => {return res.json()} )
    //ou .then( res => res.json() ) ---> pq só tem um valor, se for mais,não funciona a abreviação
    .then( states => {
        //pega um estado de states e coloca na variavel state
        for(const state of states){
            //ou ufSelect.innerHTML += `<option value="1">Valor</option>`
        //adiciona ele mesmo
        ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUfs();

//só vai executar a função getCities qd for clicado
function getCities(event){
    const citySelect = document.querySelector("selector[name=city]")
    //ao realizar o evento de mudar, ele pega o valor do estado que foi selecionado
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)