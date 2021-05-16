//Tabelas sendo representadas como array de objetos

let vacas = [{id: 1, valor: 6}, {id: 2, valor: 2}, {id: 3, valor: 7}, {id: 4, valor: 6}, {id: 5, valor: 8}, {id: 6, valor: 10}, {id: 7, valor: 33}, {id: 8, valor: 38},  {id: 9, valor: 9}, {id: 10, valor:7}, {id: 11, valor: 28}];
let toros = [{id: 1, valor: 10}, {id: 2, valor: 8}, {id: 3, valor: 30}, {id: 4, valor:25 }, {id: 5, valor:40 }];

toros.sort((a,b) => {
    if (a.valor < b.valor)
       return -1;
    if (a.valor > b.valor)
      return 1;
    return 0;
});

toros.reverse();

let vacasExcluidas = [];

for(let z=0; z < toros.length; z++){
//Criando arvore
var TreeModel = require('tree-model'),
    tree = new TreeModel(),
    
filhos = [];

//console.log('vacas length: ' + vacas.length);

for(let i = 0; i < vacas.length; i++){
    filhos.push(tree.parse(vacas[i]));
}

root = tree.parse({id: '1', children: filhos});

//console.log(root);

var tree = new TreeModel();
let upper = 0;
let upperArray = [];

let vacasArray = [];

for(let i = 0; i < vacas.length; i++) {
    vacasArray.push(tree.parse(vacas[i]));
}

//console.log('array de vacas');
//console.log(vacasArray);

//calculando os indices
[root].map((item) => {
    let vaca = item.children;
    vaca.filter(obj => {
        //console.log(obj.model.model);
        let media = (parseFloat(toros[z].valor) + parseFloat(obj.model.model.valor))/2;
        upperArray.push({id: obj.model.model.id, media: media});
        
    })
});



// resultados upper bound 
//console.log('\nUpperArray:')
//console.log(upperArray);

// tem que exluir vaca 2 e 4
  
let arrayRemover = [];

/////////////////////////////////////////////////////////////
let flagFor = 0;
//Primeira rodada, vendo quais caminhos devem ser excluidos
for(let i = 0; i < upperArray.length; i++) {
    vacaValor = Object.values(upperArray[i])[1];
    vacaId = Object.values(upperArray[i])[0]

    for(let j = 0; j < vacasExcluidas.length; j++){
        if (vacaId == vacasExcluidas[j]){
            arrayRemover.push(vacaId);
        }
    }
}
console.log('array remover: ' + arrayRemover);

for(let i = 0; i < upperArray.length; i++) {
    vacaValor = Object.values(upperArray[i])[1];
    vacaId = Object.values(upperArray[i])[0]

    if((vacasArray.length - arrayRemover.length) <= 2){
        if (vacaValor > upper) {
            upper = vacaValor;
        }
        else {
            arrayRemover.push(vacaId);
        }
    }
}

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
               //console.log('i: ' + i);
                //console.log('objid ' + obj.id)
                //console.log('\nArray Remover: ' + arrayRemover[i]);
                //console.log('Array vacas: ' + vacasArray[i].model.id);
                if (vacasArray[i].model.id != arrayRemover[i]){
                    if(i+1 !== obj.id){
                        if((arrayRemover.includes(vacasArray[i].model.id)) == false){
                            let newNode = vacasArray[i];
                            node.addChild(newNode);
                            //console.log('entrou');
                        }
                    }
                }
           }
        }
    })
});

//console.log(upperArray)

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

let zindice = z+1;

console.log('Touro: ' + zindice + ' | Vacas: ' + arrayIds[indice] + ' e ' + segundaIds[indice] + '\n\n');

vacasExcluidas.push(arrayIds[indice]);
vacasExcluidas.push(segundaIds[indice]);

console.log('vacas excluidas ' + vacasExcluidas);

}
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