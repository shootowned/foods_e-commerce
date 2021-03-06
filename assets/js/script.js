// Variáveis
let cart = [];
let modalQt = 1;
let modalKey = 0;
let currentPrice = 0;

// Utilitários;
const getElementById = (el) => document.getElementById(el);
const querySelector = (el) => document.querySelector(el);
const querySelectorAll = (el) => document.querySelectorAll(el);

// Listagem das Comidas:
foodJson.forEach((item, index) => {

    // Clona a estrutura .food-item;
    let foodItem = querySelector('.models .food-item').cloneNode(true);

    // Adiciona os elementos clonados de 'foodItem' em 'food-area';
    querySelector('.food-area').append(foodItem);

    // Define uma chave pra cada item clicado;
    foodItem.setAttribute('data-key', index);
    
    // Preenche as informações em .food-item;    
    foodItem.querySelector('.food-item--img img').src = item.img;
    foodItem.querySelector('.food-item--price')
    foodItem.querySelector('.food-item--price').innerHTML = `R$ ${item.price[2].toFixed(2).toString().replace(".",",")}`;
    foodItem.querySelector('.food-item--name').innerHTML = item.name;
    foodItem.querySelector('.food-item--desc').innerHTML = item.description;
    
    // Adiciona evento de click na tag 'a';
    foodItem.querySelector('.food-item--block').addEventListener('click', (e) => {

        // Previne a ação padrão (atualizar a página);
        e.preventDefault();

        // Abre o modal;
        openModal();

        // Pega a chave do item clicado;
        let key = e.target.closest('.food-item').getAttribute('data-key');

        // Ao abrir o modal, preenche a variável 'modalKey' com o id do item;
        modalKey = key;

        // Preenche as informações do item no Modal;
        querySelector('.foodBig img').src = foodJson[key].img;
        querySelector('.foodInfo h1').innerHTML = foodJson[key].name;
        querySelector('.foodInfo--desc').innerHTML = foodJson[key].description;
        querySelector('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[2].toFixed(2).toString().replace(".",",")}`;
        querySelectorAll('.foodDefault').forEach((size) => {
            size.querySelector('span').innerHTML = `R$ ${foodJson[key].price[2].toFixed(2).toString().replace(".",",")}`;
        });

        // Exibe todos os itens da seção 'Opção';
        querySelectorAll('.foodInfo--size').forEach((size) => {
            size.style.display = 'flex';
            querySelector('.foodDefault').style.display = 'flex';
        });

        // Exibe os três tamanhos apenas para Pizzas e somente preço para o restante;
        if(foodJson[key].id <= 3) {
            querySelector('.foodDefault').style.display = 'none';
        } else if (foodJson[key].id > 3) {
            querySelectorAll('.foodSize').forEach((size) => {
                size.style.display = 'none';
            });
            querySelector('.foodDefault').style.display = 'flex';
        };

        // Define a posição inicial do Radio Input;
        getElementById('checkLarge').checked = true;

        // Preenche o valor das Pizzas e reseta a posição do Radio Input;        
        getElementById('checkSmall').addEventListener('click', () => {
            getElementById('checkSmall').checked = true;
            if(foodJson[key].sizes[0]) {
                querySelector('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[0].toFixed(2).toString().replace(".",",")}`;
            };
            modalQt = 1;    
            querySelector('.foodInfo--qt').innerHTML = modalQt;
            querySelector('.foodInfo--qtmenos').style.color = "#999"; 
            currentPrice = 0;
        });
        getElementById('checkMedium').addEventListener('click', () => {
            getElementById('checkMedium').checked = true;
            if(foodJson[key].sizes[1]) {
                querySelector('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[1].toFixed(2).toString().replace(".",",")}`;
            };
            modalQt = 1;    
            querySelector('.foodInfo--qt').innerHTML = modalQt;
            querySelector('.foodInfo--qtmenos').style.color = "#999"; 
            currentPrice = 0;
        });
        getElementById('checkLarge').addEventListener('click', () => {
            getElementById('checkLarge').checked = true;
            if(foodJson[key].sizes[2]) {
                querySelector('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[2].toFixed(2).toString().replace(".",",")}`;
            };
            modalQt = 1;    
            querySelector('.foodInfo--qt').innerHTML = modalQt;
            querySelector('.foodInfo--qtmenos').style.color = "#999"; 
            currentPrice = 0;
        });

        // Remove a class 'selected' do item;
        querySelector('.foodSize.selected').classList.remove('selected');

        // Preenche o tamanho das Pizzas;
        querySelectorAll('.foodSize').forEach((size, sizeIndex) => {

            // Adiciona a class 'selected' ao terceiro item (reseta a informação sempre que abrir o Modal);
            if(sizeIndex == 2) {
                size.classList.add('selected');
            };
            size.querySelector('span').innerHTML = foodJson[key].sizes[sizeIndex];
        });        

        // Reseta as observações no Text area;
        getElementById('foodObs').value = '';

        // Reseta a quantidade de items sempre que abre o Modal;
        modalQt = 1;    
        querySelector('.foodInfo--qt').innerHTML = modalQt;
    });
});

// Evento do botão de compartilhamento;
let compartilharRed = getElementById('compartilharImgRed');
let compartilharWhite = getElementById('compartilharImgWhite');

querySelector('.main-area--links a:last-child').addEventListener('mouseover', () => {
    compartilharRed.style.display = 'none';
    compartilharWhite.style.display = 'flex';
});
querySelector('.main-area--links a:last-child').addEventListener('mouseout', () => {
    compartilharRed.style.display = 'flex';
    compartilharWhite.style.display = 'none';
});

// Eventos do Modal:

// Abre o Modal e define uma transição mais suave;
function openModal() {
    querySelector('.foodWindowArea').style.opacity = 0;
    querySelector('.foodWindowArea').style.display = 'flex';
    setTimeout(() => {
        querySelector('.foodWindowArea').style.opacity = 1;
    }, 200);
    document.querySelector('body').style.overflow = 'hidden';
};

// Fecha o Modal;
function closeModal() {
    querySelector('.foodWindowArea').style.opacity = 0;
    setTimeout(() => {
        querySelector('.foodWindowArea').style.display = 'none';
    }, 500);
    document.querySelector('body').style.overflowY = 'scroll';

    // Reseta o preço atual do modal;
    currentPrice = 0;
};
querySelectorAll('.foodInfo--cancelButtonImg, .foodInfo--cancelButtonMobileImg').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Função dos botões de quantidade no modal;
function multiPrice() {
    let multiPrice = 0;
    if(currentPrice == 0) {
        currentPrice = querySelector('.foodInfo--actualPrice').innerHTML.replace(/,?0+$/,'').replace(/\D+/g, '');
        multiPrice = currentPrice * modalQt;
    } else {
        multiPrice = currentPrice * modalQt;
    };
    return querySelector('.foodInfo--actualPrice').innerHTML = `R$ ${multiPrice.toFixed(2).toString().replace(".",",")}`;
    };

// Insere ação dos botões de quantidade;
querySelector('.foodInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 2) {
        modalQt--;
        querySelector('.foodInfo--qt').innerHTML = modalQt;
    } else if(modalQt = 2) {
        querySelector('.foodInfo--qtmenos').style.color = "#999";  
        modalQt--;
        querySelector('.foodInfo--qt').innerHTML = modalQt;              
    };
    
    multiPrice();
});
querySelector('.foodInfo--qtmais').addEventListener('click', () => {
    querySelector('.foodInfo--qtmenos').style.color = "#ea1d2c";
    modalQt++;
    querySelector('.foodInfo--qt').innerHTML = modalQt;

    multiPrice();
});

// Insere ação de seleção dos tamanhos;
querySelectorAll('.foodSize').forEach((size) => {
    size.addEventListener('click', () => {
        querySelector('.foodSize.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// Função de adicionar ao carrinho de compras;
querySelector('.foodInfo--addButton').addEventListener('click', () => {
    let size = parseInt(querySelector('.foodSize.selected').getAttribute('data-key'));
    let foodObs = getElementById('foodObs').value;
    
    // Cria um identificador;
    let identifier = foodJson[modalKey].id+'@'+size;

    // Verifica se já existe o identificador no carrinho e adiciona a nova quantidade da comida;
    let key = cart.findIndex((item) => item.identifier == identifier);

    if(key > -1) {
        cart[key].qt += modalQt; // Aumenta a quantidade da comida;
        cart[key].obs += ` Nova observação: ${foodObs},`; // Adiciona mais uma observação;
    } else {
        cart.push({
            identifier,
            id: foodJson[modalKey].id, // Insere o id da comida;
            name: foodJson[modalKey].name, // Insere o nome da comida;
            size, // Insere o tamanho da comida;
            qt: modalQt, // Insere a quantidade da comida;
            obs: 'Observação: '+foodObs+',' // Insere a observação sobre o pedido;
        });
    };

    asideOpen();
    updateCart();
    closeModal();
});


function asideOpen() {
    querySelector('.aside-closer').style.display = 'flex';
    querySelector('html').style.overflow = 'hidden';
}

function asideCloser() {
    querySelector('.aside-closer').style.display = 'none';
    querySelector('html').style.overflowY = 'scroll';   
}

querySelector('.aside-closer').addEventListener('click', () => {
    querySelector('aside').classList.remove('show');
    asideCloser();
});

querySelector('.headerCart').addEventListener('click', () => {
    if(cart.length > 0) {
        querySelector('aside').classList.add('show');
        asideOpen();
    };
});
getElementById('cancelButton').addEventListener('click', () => {
    querySelector('aside').classList.remove('show');
    asideCloser();
});

// Define as cores inicias dos botões de quantidade do carrinho de compras;
querySelector('.cart--item-qtmenos').style.color = "#999";
querySelector('.cart--item-qtmais').style.color = "#ea1d2c";

// Função pra atualizar o carrinho de compras;
function updateCart() {

    if(cart.length > 0) {
        querySelector('aside').classList.add('show');
        querySelector('.headerCart--Counter').style.display = 'flex'; 

        // Reseta a listagem dos itens do carrinho de compras;
        querySelector('.cart').innerHTML = '';

        let subtotal = 0;
        let total = 0;
        

        for(let i in cart) {            

            // Acessa as informações da comida selecionada;
            let foodItem = foodJson.find((item) => item.id == cart[i].id);

            // Cálculo do subtotal;
            switch(cart[i].size) {
                case 0:
                    subtotal += foodItem.price[0] * cart[i].qt;
                    break;
                case 1: 
                subtotal += foodItem.price[1] * cart[i].qt;
                    break;
                case 2:
                    subtotal += foodItem.price[2] * cart[i].qt;
                    break;
            };

            // Clona o carrinho de compras;
            let cartItem = querySelector('.models .cart--item').cloneNode(true);

            // Define o nome e tamanho das Pizzas;
            let foodSizeName;
            switch(cart[i].size) {
                case 0:
                    foodSizeName = '- (P)';
                    break;
                case 1: 
                    foodSizeName = '- (M)';
                    break;
                case 2:
                    foodSizeName = '- (G)';
                    break;
            };
            if(cart[i].id > 3) {
                foodSizeName = '';
            }
            let foodName = `${foodItem.name} ${foodSizeName}`;

            // Preenche as informações em .cart-item; 
            // cartItem.querySelector('img').src = foodItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = foodName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            // Insere ação dos botões de quantidade do carrinho de compras;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 2) {
                    cart[i].qt--;
                } else if(cart[i].qt == 2) {
                    querySelector('.cart--item-qtmenos').style.color = "#999";
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);

                    // Reseta a contagem do carrinho de compras ;
                    if(cart.length == 0) {
                        querySelector('.headerCart--Counter').style.display = 'none';
                        asideCloser();
                    };
                    querySelector('.headerCart--Counter span').innerHTML = '';                    
                };

                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                querySelector('.cart--item-qtmenos').style.color = "#ea1d2c";
                cart[i].qt++;
                updateCart();
            });

            // Função do botão de remover itens;
            cartItem.querySelector('.cart--item--itemRemove button').addEventListener('click', () => {
                cart.splice(i, 1);
                if(cart.length == 0) {
                    querySelector('.headerCart--Counter').style.display = 'none';
                    asideCloser();
                };
                updateCart();
            });

            // Adiciona a contagem do carrinho de compras e informações da estrutura .foodWindowFinishBody;;
            var sum = 0;
            var cartQtd = '';
            var cartName = ''; 
            var cartSize = '';     
            for(j = 0; j < cart.length; j++) {
                sum += cart[j].qt;
                cartQtd += 'x'+cart[j].qt + '<br>';
                switch(cart[j].size) {
                    case 0:
                        cartSize = ' - (P)';
                        break;
                    case 1: 
                    cartSize = ' - (M)';
                        break;
                    case 2:
                        cartSize = ' - (G)';
                        break;
                };
                if(cart[j].id > 3) {
                    cartSize = '';   
                };
                cartName += cart[j].name + cartSize + '<br>';             
                console.log(cartSize);
            };
            querySelector('.headerCart--Counter span').innerHTML = sum;

            // Adiciona conteúdos a estrutura .cart-item;
            querySelector('.cart').append(cartItem);
            
            // Função do botão de finalizar compras;
            querySelector('.cart--finishButton').addEventListener('click', () => {
                querySelector('aside').classList.remove('show');
                openModal();
                asideOpen();
                querySelector('.foodWindowBody').style.display = 'none';
                querySelector('.foodWindowFinishBody').style.display = 'inline';
                querySelector('.foodWindowFinishBody .foodBig img').src = './assets/images/verificado.png';
            });

            // Função pra recarregar a página;
            querySelector('.foodWindowFinishBody .foodInfo--cancelButtonImg').addEventListener('click', () => {
                location.reload();
            });

            // Adiciona conteúdos a estrutura .foodWindowFinishBody;
            querySelector('.foodWindowFinishBody .food-item--qt').innerHTML = cartQtd;
            querySelector('.foodWindowFinishBody .food-item--name').innerHTML = cartName;        
        };

        // Cálculo do valor total;
        taxa =  9;
        total = subtotal + taxa;

        // Atualiza o preço no botão de finalizar compra;
        querySelector('.cart--finish--actualPrice').innerHTML = `R$ ${total.toFixed(2).toString().replace(".",",")}`;

        // Adiciona o valor total da estrutura .foodWindowFinishBody;
        querySelector('.foodWindowFinishBody .food-item--total').innerHTML = `Total: R$ ${total.toFixed(2).toString().replace(".",",")}`;

        // Adiciona os valores no carrinho de compras;
        querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        querySelector('.taxa span:last-child').innerHTML = `R$ ${taxa.toFixed(2)}`;
        querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

        // Função pra recarregar a página;
        querySelector('.foodInfo--pageReload').addEventListener('click', () => {
            location.reload();
        });
    } else {
        // Remove o carrinho de compras;
        querySelector('aside').classList.remove('show');
    }
};