const title = document.getElementById('title')
const category = document.getElementById('category')
const price =  document.getElementById('price')
const taxes =  document.getElementById('taxes')
const ads =  document.getElementById('ads')
const discount =  document.getElementById('discount')
const total =  document.getElementById('total')
const count =  document.getElementById('count')
const sumbit =  document.getElementById('sumbit')



let getData = () => {
    if(price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value 
        total.innerHTML = result
    } else {
        total.innerHTML = ' '
    }
}
const allProducts = []

sumbit.onclick = function() {
    let newProducts = {
        title: title.value,
        category: category.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value
    }
    allProducts.push(newProducts)
    console.log(allProducts)
}