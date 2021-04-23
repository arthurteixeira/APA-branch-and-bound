//Tabelas sendo representadas como array de objetos

let vacas = [{id: 1, valor: 6}, {id: 2, valor: 2}, {id: 3, valor: 7}, {id: 4, valor: 6}, {id: 5, valor: 8}];
let toros = [{id: 1, valor: 10}];

//Criando arvore
var TreeModel = require('tree-model'),
    tree = new TreeModel(),
    root = tree.parse({name: '1', children: [
        vacas[0], 
        vacas[1],
        vacas[2],
        vacas[3],
        vacas[4],
    ]});

var tree = new TreeModel();

let upper = 0;

let upperArray = [];


//calculando os indices
[root].map((item) => {
    let vaca = item.model.children;
    vaca.filter(obj => {
        let media = (parseFloat(toros[0].valor) + parseFloat(obj.valor))/2;
        upperArray.push({id: obj.id, media: media});
    })
});

let arrayRemover = [];

//Primeira rodada, vendo quais caminhos devem ser excluidos
for(let i = 0; i < upperArray.length; i++) {
    vacaValor = Object.values(upperArray[i])[1];
    vacaId = Object.values(upperArray[i])[0]

    if (vacaValor > upper) {
        upper = vacaValor;
    }
    else {
         arrayRemover.push(vacaId);
    }
}

console.log('upper: ' + upper);
console.log('array remover: ' + arrayRemover);

//Fazer lógica para removelos da arvore


//** PENSAR EM ALGUMA REPETIÇÃO FOR, WHILE, ETC PRA QUE ISSO CONTEMPLE TD ARVORE*/