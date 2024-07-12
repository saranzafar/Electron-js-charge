const todoInput = document.getElementById("todoInput")
const todoList = document.getElementById("todoList")
const addBtn = document.getElementById("addBtn")

addBtn.addEventListener("click", () => {
    const li = document.createElement("li")
    const text = document.createTextNode(todoInput.value)

    const doneBtn = document.createElement("button")
    doneBtn.textContent = "Done"
    doneBtn.classList.add("done-btn")
    doneBtn.addEventListener("click", () => {
        li.classList.toggle("done")
    })

    li.appendChild(text)
    todoList.appendChild(li)
    li.appendChild(doneBtn)
    todoInput.value = ""
});
