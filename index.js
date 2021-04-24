//Tabelas sendo representadas como array de objetos

let vacas = [{id: 1, valor: 6}, {id: 2, valor: 2}, {id: 3, valor: 7}, {id: 4, valor: 6}, {id: 5, valor: 8}];
let toros = [{id: 1, valor: 10}];
let restricao = 2;
let custo = 0;

//Criando arvore
var TreeModel = require('tree-model'),
    tree = new TreeModel(),
    
    vaca1 = tree.parse(vacas[0]);
    vaca2 = tree.parse(vacas[1]);
    vaca3 = tree.parse(vacas[2]);
    vaca4 = tree.parse(vacas[3]);
    vaca5 = tree.parse(vacas[4]);

    root = tree.parse({id: '1', children: [
        vaca1, 
        vaca2,
        vaca3,
        vaca4,
        vaca5,
    ]});

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

//console.log(restricao);
//console.log(arrayRemover);
//console.log('upper: ' + upper);
console.log('array remover: ' + arrayRemover);

//console.log(tree);

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

/*console.log('1 nodo:')
console.log(root.children[0].model);

console.log('2 nodo:')
console.log(root.children[1].model);

console.log('3 nodo:')
console.log(root.children[2].model);*/
////

console.log(upperArray)

let maiorArray = [];

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

console.log(arrayIds)

for (let i =0; i < arrayIds.length; i++) {
    //console.log(maiorArray[i].valor);
    //console.log(upperArray[arrayIds[i-1]].media);
    //console.log(arrayIds[i]);
    //console.log(upperArray[arrayIds[i]-1].id)
    let custo = maiorArray[i].valor + upperArray[arrayIds[i]-1].media;
    arrayCustos.push(custo);    
}

console.log('array');
console.log(arrayCustos);

console.log(maiorArray)
console.log(arrayIds)