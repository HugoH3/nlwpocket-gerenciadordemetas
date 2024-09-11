// Extração de códigos do pacote inquirer
const { select, input } = require('@inquirer/prompts')

let meta = {
    value: "Ler 1 livro",
    checked: false
}
let metas = [ meta ]
// Declaração das funções do código
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
    // O laço só termina quando o usuário desejar sair

    while(true){

        // O código usa a função "select" do pacote importado para mostrar uma lista com opções
        // O código aguarda (await) a seleção e retorna a opção escolhida

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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":

                // Espera até que a função async "cadastrarMeta" seja executada por completo
                await cadastrarMeta()
                console.log(meta)
                break

            case "listar":
                console.log("listando")
            case "sair":
                console.log ("Saindo...")
                console.log("See you, space cowboy")
                return
        }
    }
}

start()