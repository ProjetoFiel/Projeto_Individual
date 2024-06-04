var database = require("../database/config");

function buscarPontuacao() {

    var instrucaoSql = `
    select (select count(qtdPontos) as 'Até 10' from quiz where qtdPontos <=10) as 'Até 10', 
    (select count(qtdPontos) as 'Até 15' from quiz where qtdPontos >10 and qtdPontos <= 15) as 'Até 15', 
    (select count(qtdPontos) as '16' from quiz where qtdPontos = 16) as '16' from quiz limit 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPontuacao
}
