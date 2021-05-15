//Tabelas sendo representadas como array de objetos

let vacas = [{id: 1, valor: 6}, {id: 2, valor: 2}, {id: 3, valor: 7}, {id: 4, valor: 6}, {id: 5, valor: 8}, {id: 6, valor: 10}, {id: 7, valor: 33}];
let toros = [{id: 1, valor: 10}];


let restricao = 2;
let custo = 0;

//Criando arvore
var TreeModel = require('tree-model'),
    tree = new TreeModel(),
    
filhos = [];

console.log('vacas length: ' + vacas.length);

for(let i = 0; i < vacas.length; i++){
    filhos.push(tree.parse(vacas[i]));
}

root = tree.parse({id: '1', children: filhos});

console.log(root);

var tree = new TreeModel();
let upper = 0;
let upperArray = [];

let vacasArray = [];

for(let i = 0; i < vacas.length; i++) {
    vacasArray.push(tree.parse(vacas[i]));
}

console.log('array de vacas');
console.log(vacasArray);

//calculando os indices
[root].map((item) => {
    let vaca = item.children;
    vaca.filter(obj => {
        console.log(obj.model.model);
        let media = (parseFloat(toros[0].valor) + parseFloat(obj.model.model.valor))/2;
        upperArray.push({id: obj.model.model.id, media: media});
        
    })
});



// resultados upper bound 
console.log('\nUpperArray:')
console.log(upperArray);

// tem que exluir vaca 2 e 4
  
let arrayRemover = [];

/////////////////////////////////////////////////////////////

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
console.log('array remover: ' + arrayRemover);

//Remover da arvora
root.all().forEach(function (node) {
    vaca = node.model.model;
    [vaca].filter(obj => {
        if(obj != undefined) {
            if (arrayRemover.indexOf(obj.id) != -1) {
                node.drop();
            }
        }
    })
});

//Adiciona filhos
root.all().forEach(function (node) {
    vaca = node.model.model;
    [vaca].filter(obj => {
        if(obj != undefined) {
            for(let i = 0; i < vacasArray.length; i++) {
                if(i+1 !== obj.id){
                    let newNode = vacasArray[i];
                    node.addChild(newNode);
                }
            }
        }
    })
});

console.log(upperArray)

let maiorArray = [];

//ESSA FUNÇÃO
for (let i = 0; i < root.children.length; i++) {
    let tamanho = root.children[i].model.children.length;
    let maior = {id: null, valor: 0};

    for(let j = 0; j < tamanho; j++) {
        let id = root.children[i].model.children[j].id - 1;
        if(id != undefined) {
            if(upperArray[id].media > maior.valor) {
                maior = {id: id+1, valor: upperArray[id].media};
            }
        }
    }
    maiorArray.push(maior);
}

let arrayCustos = [];
let arrayIds = [];


root.model.children.filter(obj => {
    arrayIds.push(obj.model.id);
});




for (let i =0; i < arrayIds.length; i++) {
    let custo = maiorArray[i].valor + upperArray[arrayIds[i]-1].media;
    arrayCustos.push(custo);    
}

//console.log(arrayCustos);

let segundaIds = [];

for(let i = 0; i < maiorArray.length; i++){
    segundaIds.push(maiorArray[i].id);
}

console.log('Primeira altura \n' + arrayIds)
console.log('Segunda altura \n' + segundaIds)
console.log('Custos \n' + arrayCustos)

let indice = indexOfMax(arrayCustos);

console.log('Touro: 1 | Vacas: ' + arrayIds[indice] + ' e ' + segundaIds[indice]);

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}