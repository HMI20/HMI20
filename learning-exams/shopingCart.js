let cart = [
{name: "blaBla", price:10, quantity:2 , id:1010 }
]

let products = [
  { id: 1, name: "Mouse", price: 20, stock:20 },
  { id: 2, name: "Keyboard", price: 40, stock:22 },
  { id: 3, name: "Monitor 24", price: 120, stock:50 },
  { id: 4, name: "Laptop 15", price: 800 , stock:28},
  { id: 5, name: "USB Cable", price: 5 , stock:220},
  { id: 6, name: "Webcam", price: 50 , stock:25},
  { id: 7, name: "Headphones", price: 35, stock:30 },
  { id: 8, name: "Office Chair", price: 150, stock:20 },
  { id: 9, name: "Desk Lamp", price: 30, stock:20 },
  { id: 10, name: "External Hard Drive 1TB", price: 100, stock:20 },
  { id: 11, name: "Notebook", price: 3, stock:20 },
  { id: 12, name: "Pen Set", price: 7, stock:20 },
  { id: 13, name: "Coffee Mug", price: 12, stock:20 },
  { id: 14, name: "Water Bottle", price: 15, stock:20 },
  { id: 15, name: "Smartphone Stand", price: 10, stock:20 }
]
const addItem = (product) => {
    const item = cart.find((item)=> item.id===product.id);
    if (item){
        item.quantity=item.quantity+1
    }
    else{
      
    cart.push({...product,quantity:1})}
}



const filterProducts = (products, limit) => {

    return products.filter((product)=> product.price<limit)
}

addItem(products[6])
addItem(products[6])
addItem(products[5])
console.log("cart", cart)

const quantityChecker = (product) => {
    if (product.quantity>1){product.quantity=product.quantity-1}
    else {deletItem(product.id)}
}

const deletItem = (id)=> {
    cart = cart.filter((item)=> item.id!=id)   
}

quantityChecker(cart[0])

let totalCoast=0 

let totalPrice = (cart) => {
    for (let i = 0; i<cart.length; i++){
        
        totalCoast = totalCoast + (cart[i].price * cart[i].quantity)
    }
}
totalPrice(cart)

let sortCartByPrice = cart.sort((a,b)=> (b.price - a.price))

const checkout = (cart) => {
    cart.forEach(item => {
        const product = products.find((p) => p.id === item.id);
        
        if (product){
            if ( (product.stock - item.quantity) >=0) {
            product.stock = product.stock - item.quantity;
            }
            
            else {
                console.log("no enogh stock from ",product.name)
                alert("no enogh stock from ",product.name );
            }
        }
        else {
            alert ("product does not exist")
        }
    });   
};


console.log("total price", totalCoast)

let final= filterProducts(products, 70)
console.log("filtered", final)