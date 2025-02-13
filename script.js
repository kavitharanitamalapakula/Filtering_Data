const URL = "https://tricolor-fire-helium.glitch.me/products"
let container = document.getElementById("container")
let btnConatiner = document.getElementById("btn-conatiner")
async function getData() {
    try {
        let response = await fetch(URL)
        if (!response.ok) {
            throw new Error(`HTTP Request : ${response.statusText}`);
        }
        let result = await response.json()
        localStorage.setItem("products", JSON.stringify(result))
        createBtn()
        displayData()
    } catch (err) {
        console.log(err)
    }
}
function createBtn() {
    btnConatiner.innerHTML = "";
    let btn = document.createElement("button")
    btn.innerText = "All"
    btn.addEventListener("click", () => {
        window.onload = getData()
    })
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = Array.from(new Set(products.map((obj => obj.category))))
        result.forEach(ele => {
            let button = document.createElement("button")
            button.innerText = ele
            button.addEventListener("click", () => {
                filterData(ele)
            })
            btnConatiner.append(button, btn);
        })
    }
}
function filterData(category) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length !== 0) {
        let result = products.filter(obj => obj.category === category);
        displayData(result);
    }
}
function displayData(filterProducts) {
    container.innerHTML = ``;
    let array = JSON.parse(localStorage.getItem("products")) || [];
    if (filterProducts !== undefined) {
        array = filterProducts;
    }
    if (array.length === 0) {
        container.innerHTML = "No data Available"
    } else {
        array.forEach(obj => {
            let item = document.createElement("div")
            item.className = "card"
            let item1 = document.createElement("div")
            let item2 = document.createElement("div")
            item1.innerHTML = `
            <img src="${obj.image}">
            `
            item2.innerHTML = `
            <h3>${obj.title}</h3>
            <p>${obj.description}</p>
            <p><b>$ ${obj.price}</b></p>
            `
            item.append(item1, item2)
            container.appendChild(item)
        })
    }
}

window.onload = getData()