// Extração de códigos do pacote inquirer
const { select } = require('@inquirer/prompts')

// Função de inicio do programa
const start = async() => {

    // Laço de repetição para o menu do programa
    // O laço só termina quando o usuário desejar sair

    while(true){

        // O código usa a função "select" do pacote importado para mostrar uma lista com opções
        // O código aguarda (await) a seleção e retorna a opção escolhida

        const opcao = await select({
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
                console.log ("Cadastrando meta")
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