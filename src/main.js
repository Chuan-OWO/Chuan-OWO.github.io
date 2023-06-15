let shop =document.querySelector(`#shop`)

let basket= JSON.parse(localStorage.getItem('data')) || []

console.log(shopItemsData)
let generateShop = () =>{
    return (shop.innerHTML = shopItemsData 
        .map((e)=>{
            let{id,name,price,desc,img} = e  ;
            let search = basket.find((e)=>e.id === id) || [];
            // console.log(search.item === undefined);
            return `
    <div id=product-id-${id} class="item">
        <img src=${img} alt="" class=""  />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
      `}).join("")
)}
generateShop();
// ${search.item === undefined ? 0 : search.item}

// console.log(basket);

let increment = (id) =>{
  let selectedItem = id;
  // console.log(selectedItem.id);
  let search = basket.find((e)=> e.id === selectedItem.id)
  if(search === undefined){
    basket.push({
      id:selectedItem.id,
      item:1,
    })
  }
  else{
    search.item += 1
  }
  
  // console.log(basket);
  update(selectedItem.id)
  localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) =>{
  let selectedItem = id;
   
  let search = basket.find((e)=> e.id === selectedItem.id)
  if(search === undefined) return
  else if(search.item === 0) return
  else{
    search.item -= 1
  }
  
  update(selectedItem.id)
  basket = basket.filter((e)=>e.item !== 0 )
  //  console.log(basket);
  

  localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) =>{
  console.log(id)
  let search = basket.find((e)=>e.id === id)
  
  document.getElementById(id).innerHTML = search.item;
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))
}

let calculation = () =>{
  let cartIcon = document.getElementById('cartAmont')
  // console.log(basket)
  // console.log(basket.map((e)=>e.item))
  // console.log(basket.map((e)=>e.item).reduce((x,y)=>x+y,0))
  cartIcon.innerHTML = basket.map((e)=>e.item).reduce((x,y)=>x+y,0)  
}
calculation()