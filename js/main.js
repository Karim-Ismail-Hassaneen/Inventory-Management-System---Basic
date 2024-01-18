const title = document.getElementById('title')
const category = document.getElementById('category')
const price = document.getElementById('price')
const taxes = document.getElementById('taxes')
const ads = document.getElementById('ads')
const discount = document.getElementById('discount')
const total = document.getElementById('total')
const count = document.getElementById('count')
const sumbit = document.getElementById('sumbit')


let mood = 'create'

let updated


let getData = () => {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
    } else {
        total.innerHTML = ' '
    }
}
let allProducts;
if (localStorage.product !== undefined) {
    allProducts = JSON.parse(localStorage.product)
} else {
    allProducts = []
}


sumbit.onclick = function () {
    let newProducts = {
        title: title.value.toLowerCase(),
        category: category.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value
    }
    if (title.value !== '' && category.value !== '' && newProducts.count <= 100) {
        if (mood === 'create') {
            if (newProducts.count > 1) {
                for (let i = 0; i < newProducts.count; i++) {
                    allProducts.push(newProducts)
                }
            } else {
                allProducts.push(newProducts)
            }
        } else {
            allProducts[updated] = newProducts
            mood = 'create'
            sumbit.innerHTML = 'Create'
            count.style.display = 'block'
        }
        clearData()
    }



    localStorage.setItem('product', JSON.stringify(allProducts))
    showData()
}

const clearData = () => {
    title.value = '';
    category.value = '';
    price.value = '';
    ads.value = ''
    taxes.value = '';
    discount.value = '';
    count.value = '';
    total.innerHTML = ''
}

const showData = () => {
    let table = ''
    for (let i = 0; i < allProducts.length; i++) {
        table += `
        <tr>
            <td>${++i}</td>
            <td>${allProducts[i].title}</td>
            <td>${allProducts[i].category}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].discount}</td>
            <td>${allProducts[i].total}</td>
            <td>
              <button onclick="updateData(${i})" class="action" id="update">Update</button>
            </td>
            <td>
              <button onclick="deleteShowData(${i})" class="action" id="delete">Delete</button>
            </td>
          </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    const deleteAllBtn = document.getElementById('delete-all')
    if (allProducts.length > 0) {
        deleteAllBtn.innerHTML = `<button onclick="deleteAllDataBtn()" class="delete-all">Delete All(${allProducts.length})</button>`
    } else {
        deleteAllBtn.innerHTML = ''
    }

}
showData()

const deleteShowData = (i) => {
    allProducts.splice(i, 1)
    localStorage.product = JSON.stringify(allProducts)
    showData()
}

const deleteAllDataBtn = () => {
    localStorage.clear()
    allProducts.splice(0)
    showData()
}

const updateData = (i) => {
    title.value = allProducts[i].title
    category.value = allProducts[i].category
    price.value = allProducts[i].price
    taxes.value = allProducts[i].taxes
    ads.value = allProducts[i].ads
    discount.value = allProducts[i].discount
    getData()
    count.style.display = 'none'
    sumbit.innerHTML = 'Update'
    mood = 'update'
    updated = i
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

let searchMood = 'title'

const searchData = (id) => {
    let search = document.getElementById('search')
    if (id === 'search-title') {
        searchMood = 'title'
    } else {
        searchMood = 'Category'
    }
    search.placeholder = 'Search By ' + searchMood
    search.focus()
    search.value = ''
    showData()
}

const handleSearch = (value) => {
    let table = ''
    for (let i = 0; i < allProducts.length; i++) {
        if (searchMood === 'title') {
            if (allProducts[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${allProducts[i].title}</td>
                    <td>${allProducts[i].category}</td>
                    <td>${allProducts[i].price}</td>
                    <td>${allProducts[i].taxes}</td>
                    <td>${allProducts[i].ads}</td>
                    <td>${allProducts[i].discount}</td>
                    <td>${allProducts[i].total}</td>
                    <td>
                      <button onclick="updateData(${i})" class="action" id="update">Update</button>
                    </td>
                    <td>
                      <button onclick="deleteShowData(${i})" class="action" id="delete">Delete</button>
                    </td>
                  </tr>
                `
            }
        } else {
            if (allProducts[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${allProducts[i].title}</td>
                    <td>${allProducts[i].category}</td>
                    <td>${allProducts[i].price}</td>
                    <td>${allProducts[i].taxes}</td>
                    <td>${allProducts[i].ads}</td>
                    <td>${allProducts[i].discount}</td>
                    <td>${allProducts[i].total}</td>
                    <td>
                      <button onclick="updateData(${i})" class="action" id="update">Update</button>
                    </td>
                    <td>
                      <button onclick="deleteShowData(${i})" class="action" id="delete">Delete</button>
                    </td>
                  </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}