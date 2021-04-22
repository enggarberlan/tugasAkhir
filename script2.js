
// FormTodo
let formulir = document.querySelector('.formTodo')
let kolom = document.querySelector('.inputTodo')
let daftarItem = document.querySelector('.itemsTodo')


formulir.addEventListener('submit', function (event) {
    event.preventDefault()
    addLists(kolom.value)
})

let lists = []

function addLists(items) {
    if (items !== '') {
        let list = {
            id: Date.now(),
            name: items,
            completed: false
        }
        console.log(list)
        lists.push(list)
        addToLocalStorage(lists)
        kolom.value = ""

    } else {
        alert('The list should not be empty!')
    }  
}

function renderLists(lists){
    daftarItem.innerHTML = ''

    lists.forEach(items => {
        const li = document.createElement('li')
        li.setAttribute('class', 'items')
        li.setAttribute('data-key', items.id)

        if (items.completed === true){
            li.classList.add('checked')
        }
        let checked;
        if (items.completed) {
            checked = 'checked'
        } else {
            checked = null
        }
        li.innerHTML = `
        <input class="checkbox" type="checkbox" ${checked}> ${items.name} 
        <button class="tombolHapus">X</button>`

        daftarItem.append(li)
    });
}
function addToLocalStorage(lists) {
    let dataJSON = JSON.stringify(lists)
    localStorage.setItem('lists', dataJSON)
    renderLists(lists)
}

function toggle(id){
    lists.forEach(items => {

        if (items.id == id) {
            // if (items.completed === true) {
            //     items.completed = false
            // } else {
            //     items.completed = true
            // }
            items.completed = !items.completed
        }
    })
    addToLocalStorage(lists)
}

function deleteLists(id) {
    lists = lists.filter(function (items) {
        return items.id != id
    })
    addToLocalStorage(lists)
}

daftarItem.addEventListener('click', function (event) {
    let id = event.target.parentElement.getAttribute('data-key')
    if (event.target.type === 'checkbox') {
        toggle(id)
    }

    if (event.target.classList.contains('tombolHapus')) {
        deleteLists(id)
    }
})

function getFromLocalStorage() {
    let ref = localStorage.getItem('lists')
    if (ref) {
        lists = JSON.parse(ref)
        renderLists(lists)
    }
}
getFromLocalStorage()