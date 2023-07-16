class Banco {
    constructor(){
        let indice = localStorage.getItem('indice')

        if(indice === null){
            localStorage.setItem('indice', 0)
        }
    }

    salvarDespesa(novaDespesa){
        let indiceAtual = localStorage.getItem('indice')
        localStorage.setItem(indiceAtual, JSON.stringify(novaDespesa))
        localStorage.setItem('indice', parseInt(indiceAtual) + 1)
    }

    buscarDespesa(){
        let arrayDespesas = []
        let qtdeItens = localStorage.getItem('indice')

        for(let i = 0; i < qtdeItens; i++){
            if(localStorage.getItem(i)){
                arrayDespesas.push(localStorage.getItem(i))
            }
        }

        for(let i = 0; i < arrayDespesas.length; i++){
            arrayDespesas[i] = JSON.parse(arrayDespesas[i])
        }

        return arrayDespesas
    }
}

let banco = new Banco()

class Despesa {
    constructor(descricao, grupo, valor, data, tipo){
        this.descricao = descricao
        this.grupo = grupo
        this.valor = valor
        this.data = data
        this.tipo = tipo
    }
}

function registrarDespesa(){
    let descricao = document.getElementById("descricao")
    let grupo = document.getElementById("grupo")
    let valor = document.getElementById("valor")
    let data = document.getElementById("data")
    let tipo = document.getElementById("tipo")

    let despesa = new Despesa(descricao.value, grupo.value, valor.value, data.value, tipo.value)
    banco.salvarDespesa(despesa)
    selecionarTamanhoTabela()

}

function criarTabelaGrande(){
    let arrayDespesas = banco.buscarDespesa()
    const containerPai = document.getElementById("container-pai")
    const modelo = document.getElementById("linha")
    let elemento = modelo.nextElementSibling

    while(elemento){
        containerPai.removeChild(elemento)
        elemento = modelo.nextElementSibling
    }

    arrayDespesas.forEach(
        function(d, i){
            const tabela = modelo.cloneNode(true)
            tabela.classList.remove('ocultar')
            tabela.classList.add('item-lista')
            tabela.id = `linha-${i}`
            
            tabela.querySelector('#data').textContent = d.data
            tabela.querySelector('#grupo').textContent = d.grupo
            tabela.querySelector('#descricao').textContent = d.descricao
            tabela.querySelector('#valor').textContent = d.valor

            containerPai.appendChild(tabela)
        }
    )
}

function selecionarTamanhoTabela(){
    let modelo = document.getElementById("tabela-mb")
    let estilo = window.getComputedStyle(modelo)
    let display = estilo.getPropertyValue("display")
    
    if(display === 'none'){
        criarTabelaGrande()
    }
    else{
        console.log('gerar tabela pequena')
    }
}
