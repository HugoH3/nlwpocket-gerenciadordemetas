// Extração de códigos do pacote inquirer
const { select, input, checkbox } = require('@inquirer/prompts')

// Declaração das variáveis globais
let meta = {
    value: "Ler 1 livro",
    checked: false
}
let metas = [ meta ]

// Declaração das funções do código

const metasAbertas = async() => {

    const abertas = metas.filter((meta) => {

        // A meta é adicionada a array "abertas" se o seu valor booleano INVERTIDO for verdadeiro, ou sejam se "metas.checked" for falso, retorna true.
        return !meta.checked
    })
    if(abertas.length == 0) {
        console.log("Parabéns, Você concluiu todas metas!")
        return
    }

    await select ({
        message: "Metas realizadas: " + abertas.length,
        choices: [...abertas]
    })
    
}
const metasRealizadas = async () => {

    const realizadas = metas.filter ((meta) => {
        // A meta é adicionada a array "realizadas" se o retorno for true.
        return meta.checked
    })
    if(realizadas.length == 0) {
        console.log ("Você ainda não concluiu nenhuma meta.")
        return
    }

    await select ({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}
const listarMetas = async() => {
    const respostas = await checkbox({
        message: "Navegue até a meta escolhida e use espaço para marcar ou desmarcar como concluida. Pressione enter para salvar suas alterações",
        choices: [...metas],
        instructions: false // Remove instruções padrão do inquirer
    })

    // Atribui o valor false para TODAS as metas
    metas.forEach((m) => {
        m.checked = false
    })

    // Resposta caso nenhuma meta seja marcada como realizada
    if (respostas.length == 0){
        console.log("Você não marcou nenhuma meta como realizada.")
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

    console.log("Alterações Salvas!")
}
const cadastrarMeta = async() => {

    // O código utiliza a função input e espera que o usuário insira uma meta
    const meta = await input ({message: "Digite a meta: "})

    // Caso nada seja escrito, retorna ao menu principal
    if(meta.length == 0) {
        console.log("Você não digitou uma meta!")
        return
    }
    else {
        console.log ("Meta cadastrada!")
    }

    // Insere a nova meta no array "metas"
    metas.push ({value: meta, checked: false})
}
const start = async() => {

    // Laço de repetição para o menu do programa

    while(true){
        // O código usa a função "select" do pacote importado para mostrar uma lista com opções
        // O código aguarda (await) a seleção e retorna o valor da opção escolhida

        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
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
            // Cada case espera sua função ser realizada por completo antes de retornar para o menu
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "sair":
                console.log ("Saindo...")
                console.log("See you, space cowboy")
                return
        }
    }
}

start()