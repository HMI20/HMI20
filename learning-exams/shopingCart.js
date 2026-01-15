let cart = [
{name: "blaBla", price:10, quantity:1 , id:1010 }
]

let products = [
  { id: 1, name: "Mouse", price: 20 },
  { id: 2, name: "Keyboard", price: 40 },
  { id: 3, name: "Monitor 24", price: 120 },
  { id: 4, name: "Laptop 15", price: 800 },
  { id: 5, name: "USB Cable", price: 5 },
  { id: 6, name: "Webcam", price: 50 },
  { id: 7, name: "Headphones", price: 35 },
  { id: 8, name: "Office Chair", price: 150 },
  { id: 9, name: "Desk Lamp", price: 30 },
  { id: 10, name: "External Hard Drive 1TB", price: 100 },
  { id: 11, name: "Notebook", price: 3 },
  { id: 12, name: "Pen Set", price: 7 },
  { id: 13, name: "Coffee Mug", price: 12 },
  { id: 14, name: "Water Bottle", price: 15 },
  { id: 15, name: "Smartphone Stand", price: 10 }
]
const addItem = (product) => {
    const item = cart.find((item)=> item.id===product.id);
    if (item){
        item.quantity=item.quantity+1
    }
    else{
      
    cart.push({...product,quantity:1})}
}

addItem(products[6])
addItem(products[6])
console.log("cart", cart)

const deletItem = (id)=> {
    cart = cart.filter((item)=> item.id!=id)   
}
deletItem(cart[0].id)