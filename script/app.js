let products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

let burgersBtn = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cartAmout = document.querySelector('.warapper__navbar-count'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartListItem = document.querySelector('.wrapper__navbar-checklist'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    cartList  = document.querySelector('.wrapper__navbar-basket');
    
    
burgersBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        
        addAmount(btn)
    })
})


function addAmount(btn) {
    // closest() - подключаеться к указаному ближайшему родителю
    // getAttribute() - возращает значение указаного атрибута
    let parent = btn.closest('.wrapper__list-card')
    let id = parent.getAttribute('id')
    if(products[id].amount < 10) {
        products[id].amount++
        basket()
    }
    
}

function basket() {
    let korzina = []
    for(let key in products) {
        let burger = products[key]
        let productBurger = document.querySelector(`#${key}`)
        let productCount = productBurger.querySelector('.wrapper__list-count')
        if(burger.amount > 0) {
            korzina.push(burger)
            productCount.classList.add('active')
            productCount.innerHTML = burger.amount
        }else {
            productCount.classList.remove('active')
            productCount.innerHTML = ''
        }
    }
    let allAmount = totalAmount()
    if(allAmount > 0) {
        cartAmout.classList.add('active')
        cartAmout.innerHTML = allAmount
    }else {
        cartAmout.classList.remove('active')
        cartAmout.innerHTML = ''
    }
    
    cartListItem.innerHTML = ''
    
    korzina.forEach((burger) => {
        cartListItem.innerHTML += createBurger(burger)
    })
    
    cartTotalPrice.innerHTML = getTotalSum()
    
    
}

cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))

function  getTotalSum() {
    let sum = 0;
    for(let key in products) {
        sum += products[key].totalSum
    }
    return sum + ' сумм'
}


    
function totalAmount () {
    let sum = 0;
    for(let key in products) {
        sum += products[key].amount
    }
    return sum
}



function createBurger(burger) {      
    return `<div class="navbar__item"  id="${burger.name.toLowerCase()}-item">
    <div class="navbar__item-left">
        <img src="${burger.img}" alt="">
        <div class="navbar__item-left-info">
            <p class="navbar__item-left-name">${burger.name}</p>
            <p class="navbar__item-left-price">${burger.price} сум</p>
        </div>
    </div>
    <div class="navbar__item-right">
        <button data-symbol="-" class="navbar__item-btn">-</button>
        <output class="navbar__item-count">${burger.amount}</output>
        <button data-symbol="+" class="navbar__item-btn">+</button>
    </div>
</div> `
}

    
window.addEventListener('click', (event) => {
    // event.target - отдает тот элемент на который вы нажали
    if(event.target.classList.contains('navbar__item-btn')) {
        let parent = event.target.closest('.navbar__item')
        let dataValue = event.target.getAttribute('data-symbol')
        let id = parent.getAttribute('id').split('-')[0]
        if(dataValue == '+' && products[id].amount < 10) {
            products[id].amount++
        }else if(dataValue == '-') {
            products[id].amount--
        }
        basket()
    }
})

