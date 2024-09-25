// Extração de códigos do pacote inquirer e filesystem (fs)
const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

// Variáveis globais de mensagem e array de metas
let mensagem = "Bem-Vindo ao Gerenciador de Metas"
let metas

// Declaração das funções do código
const carregarMetas = async() => {
    // Tenta importar dados do arquivo metas.json
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    // Em caso de erro, a array metas fica vazia
    catch(erro){
        metas = []
    }
}
const salvarMetas = async() => {
    // Passa os dados inseridos no programa para o arquivo metas.json
    await fs.writeFile("metas.json", JSON.stringify(metas, null,2))
}
const deletarMetas = async() => {
    if (metas.length == 0){
        mensagem = "Você precisa cadastrar uma meta antes."
        return
    }

    // Cria um array que clona o array "metas" e altera o valor checked para false
    const metasDesmarcadas = metas.map ((meta) => {
        meta.checked  = false
        return meta
    })
    const metasParaExclusao = await checkbox({
        message: "Navegue até a meta escolhida e use espaço para marcar para exclusão. Pressione enter para salvar suas alterações",
        choices: [...metasDesmarcadas],
        instructions: false // Remove instruções padrão do inquirer
    }) 
    if (metasParaExclusao.length == 0) {
        mensagem = "Nenhuma meta foi excluída."
        return
    }

    // Filtra o array princpal "metas" para ter apenas os itens que não foram marcados, caso contrário, remove-os do array

    metasParaExclusao.forEach((m) => {
        metas = metas.filter((meta) => {
            return meta.value != m
        })
    })
    console.log("Meta(s) excluida(s) com sucesso!")
}
const metasAbertas = async() => {
    if (metas.length == 0){
        mensagem = "Você precisa cadastrar uma meta antes."
        return
    }

    const abertas = metas.filter((meta) => {

        // A meta é adicionada a array "abertas" se o seu valor booleano INVERTIDO for verdadeiro, ou sejam se "metas.checked" for falso, retorna true.
        return !meta.checked
    })
    if(abertas.length == 0) {
        mensagem = "Parabéns, você concluiu todas metas!"
        return
    }

    await select ({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    }) 
}
const metasRealizadas = async() => {
    if (metas.length == 0){
        mensagem = "Você precisa cadastrar uma meta antes."
        return
    }

    const realizadas = metas.filter ((meta) => {
        // A meta é adicionada a array "realizadas" se o retorno for true.
        return meta.checked
    })
    if(realizadas.length == 0) {
        mensagem = "Você ainda não concluiu nenhuma meta."
        return
    }

    await select ({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}
const listarMetas = async() => {
    if (metas.length == 0){
        mensagem = "Você precisa cadastrar uma meta antes."
        return
    }
    const respostas = await checkbox({
        message: "Navegue até a meta escolhida e use espaço para marcar ou desmarcar como concluida. Pressione enter para salvar suas alterações. ",
        choices: [...metas],
        instructions: false
    })

    // Atribui o valor false para TODAS as metas
    metas.forEach((m) => {
        m.checked = false
    })

    // Resposta caso nenhuma meta seja marcada como realizada
    if (respostas.length == 0){
        mensagem = "Você não marcou nenhuma meta como realizada."
        return
    }

    // Checa cada meta até encontrar as que estão incluidas no array das respostas
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        // Se a meta for a mesma escolhida pelo usuário, altera o valor para true
        meta.checked = true
    })

    mensagem = "Alterações Salvas!"
}
const cadastrarMeta = async() => {

    // O código utiliza a função input e espera que o usuário insira uma meta
    const meta = await input ({message: "Digite a meta: "})

    // Caso nada seja escrito, retorna ao menu principal
    if(meta.length == 0) {
        mensagem = ("Você não inseriu nenhuma meta!")
        return
    }
    else {
        mensagem = ("Meta cadastrada!")
    }

    // Insere a nova meta no array "metas"
    metas.push ({value: meta, checked: false})
}
const mostrarMensagem = () => {

    // Limpa o terminal e mostra uma mensagem, caso a função mostre uma
    console.clear()
    if (mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}
const start = async() => {

    // Espera a função carregar as metas do arquivo json
    await carregarMetas()

    // Laço de repetição para o menu do programa
    while(true){

        // Sempre espera os dados serem salvos no arquivo json
        mostrarMensagem()
        await salvarMetas()

        // O código usa a função "select" do pacote importado para mostrar uma lista com opções
        // O código aguarda (await) a seleção e retorna o valor da opção escolhida

        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar nova meta",
                    value: "cadastrar"
                },
                {
                    name: "Deletar meta",
                    value: "deletar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            // Cada case espera sua função o ser executadas por completo antes de voltar para o menu

            case "cadastrar":
                await cadastrarMeta()
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                await salvarMetas()
                break
            case "abertas":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log ("Saindo...")
                console.log("See you, space cowboy")
                return
        }
    }
}

start()