const start = () => {
    let count = 0
    // Laço de repetição para o menu do programa
    // O laço só termina quando o usuário desejar sair

    while(true){
        let opcao = "sair"
        switch(opcao){
            case "cadastrar":
                console.log ("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break

            case "sair":
                console.log("saindo")
                return
        }
    }
}

start()