function cadastrar() {
    aguardar();

    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    }else if(emailVar.indexOf('@') < 0 && emailVar.indexOf('#')){
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(O seu Email deve conter pelo menos 1 caracter especial e um .)";
        return false;
    } else if(senhaVar != confirmacaoSenhaVar){
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Sua confirmação de senha deve ser igual a sua senha)";
        return false;
    }else if(senhaVar.length < 7){
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Sua senha deve conter ao menos 6 caracteres)";
        return false;
    } else {
      setInterval(sumirMensagem, 5000);
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Sendo redirecionado ao login)";
        
        fetch("/usuarios/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
          }),
        })
        .then(function (resposta) {
        console.log("resposta: ", resposta);
        
        if (resposta.ok) {
          cardErro.style.display = "block";
          
          mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
          
          setTimeout(() => {
            window.location = "login.html";
          }, "2000");
          
          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });
      
      return false;
    }
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }