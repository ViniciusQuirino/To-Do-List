let botaoAdicionar = document.querySelector('.adicionar-remover')
let ulLista = document.querySelector('.lista-tarefa')
botaoAdicionar.addEventListener('click', botao)

let listaDeTarefa = []

function botao(e) {
    let textoTitulo = document.getElementById('titulo').value.toLowerCase().trim()
    let textoDescricao = document.getElementById('descricao').value.toLowerCase().trim()

    listaDeTarefa.push({ titulo: textoTitulo, descricao: textoDescricao, input: 0 })

    ulLista.innerHTML = ""
    criarCardToDoList(listaDeTarefa)
}

function criarCardToDoList(lista) {
    for (let i = 0; i < lista.length; i++) {
        lista[i] = {
            id: i,
            ...lista[i]
        };
        let titulo = lista[i].titulo
        let descricao = lista[i].descricao

        let tagLi = document.createElement('li')
        let tagDiv = document.createElement('div')
        let tagTitulo = document.createElement('h2')
        let tagDescricao = document.createElement('p')
        let tagDivButton = document.createElement('div')
        let tagExcluir = document.createElement('button')
        let tagEditar = document.createElement('button')

        tagLi.id = i
        tagExcluir.id = i
        tagEditar.id = i

        tagTitulo.innerText = titulo
        tagDescricao.innerText = descricao
        tagExcluir.innerText = "X"
        tagEditar.innerText = "editar"

        tagLi.classList.add("lista")
        tagDivButton.classList.add("div-button")
        tagExcluir.classList.add("adicionar-remover")
        tagEditar.classList.add("editar")

        tagExcluir.addEventListener('click', excluirCard)
        tagEditar.addEventListener('click', () => editar(lista[i]))

        tagLi.append(tagDiv, tagDivButton)
        tagDivButton.append(tagEditar, tagExcluir)
        tagDiv.append(tagTitulo, tagDescricao)
        ulLista.appendChild(tagLi)
    }
}

function excluirCard(e) {
    let ondeClicou = e.target.id

    listaDeTarefa.splice(ondeClicou, 1)
    ulLista.innerHTML = ""
    criarCardToDoList(listaDeTarefa)

    addTagSpan()
}

const editar = (elem) => {
    elem.input = 1
    ulLista.innerHTML = ""

    criarCard(listaDeTarefa)
}

function criarCard(dados) {
    ulLista.innerHTML = ""
    for (let i = 0; i < dados.length; i++) {
        if (dados[i].input == 0) {
            let tagLi = document.createElement('li')
            let tagDiv = document.createElement('div')
            let tagTitulo = document.createElement('h2')
            let tagDescricao = document.createElement('p')
            let tagDivButton = document.createElement('div')
            let tagExcluir = document.createElement('button')
            let tagEditar = document.createElement('button')

            tagLi.id = dados[i].id
            tagExcluir.id = dados[i].id
            tagEditar.id = dados[i].id

            tagTitulo.innerText = dados[i].titulo
            tagDescricao.innerText = dados[i].descricao
            tagExcluir.innerText = "X"
            tagEditar.innerText = "editar"

            tagLi.classList.add("lista")
            tagDivButton.classList.add("div-button")
            tagExcluir.classList.add("adicionar-remover")
            tagEditar.classList.add("editar")

            tagExcluir.addEventListener('click', excluirCard)
            tagEditar.addEventListener('click', () => editar(dados[i]))

            tagLi.append(tagDiv, tagDivButton)
            tagDivButton.append(tagEditar, tagExcluir)
            tagDiv.append(tagTitulo, tagDescricao)
            ulLista.appendChild(tagLi)

        } else {

            let li = document.createElement('li')
            let div = document.createElement('div')
            let divBotoes = document.createElement('div')
            let inputTitulo = document.createElement('input')
            let inputDescricao = document.createElement('input')
            let botaoSalvar = document.createElement('button')
            let botaoExcluir = document.createElement('button')

            inputTitulo.type = "text"
            inputTitulo.value = dados[i].titulo
            inputDescricao.type = "text"
            inputDescricao.value = dados[i].descricao
            botaoSalvar.innerText = "salvar"
            botaoSalvar.id = dados[i].id
            botaoExcluir.innerText = "X"
            botaoExcluir.id = dados[i].id
            li.id = dados[i].id

            li.classList.add('lista')
            div.classList.add('div-lista')
            divBotoes.classList.add('div-button')
            inputTitulo.classList.add('input')
            inputDescricao.classList.add('input')
            botaoSalvar.classList.add('adicionar-remover')
            botaoExcluir.classList.add('adicionar-remover')

            botaoExcluir.addEventListener('click', excluirCard)

            ulLista.append(li)
            li.append(div, divBotoes)
            div.append(inputTitulo, inputDescricao)
            divBotoes.append(botaoSalvar, botaoExcluir)


            botaoSalvar.addEventListener('click', (event) => {
                if (dados[i].id == event.target.id) {

                    dados[i].input = 0

                    let novoTitulo = inputTitulo.value.toLowerCase().trim()
                    let novaDescricao = inputDescricao.value.toLowerCase().trim()

                    dados[i].titulo = novoTitulo
                    dados[i].descricao = novaDescricao

                    criarCard(listaDeTarefa)
                }
            })
        }
    }
}

function addTagSpan() {
    if (ulLista.children.length === 0) {
        const span = document.createElement('span');
        span.className = 'tagSpan';
        span.textContent = 'No tasks';
        ulLista.appendChild(span);
    }
}