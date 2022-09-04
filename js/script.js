 
document.addEventListener('DOMContentLoaded', function() {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function(event){
    event.preventDefault();
    addTodo();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addTodo () {
  const textTodo = document.getElementById('title').value;
  const timeStamp = document.getElementById('date').value;

  const generateID = generateId();
  const todoObject = generateTodoObjtect(generateID, textTodo, timeStamp, false);
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateId() {
  return +new Date();
}

function generateTodoObjtect(id, task, timeStamp, isCompleted) {
  return {
    id,
    task,
    timeStamp,
    isCompleted

  }
}

  const todos = [];
  const RENDER_EVENT = 'render-todo';

  document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
  });

  function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText =todoObject.task;

    const textTimeStamp = document.createElement('p');
    textTimeStamp.innerText = todoObject.timeStamp;

    const textContainer = document.createElement ('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);
   

    if (todoObject.isCompleted) {
      const undoButton = document.createElement('button');
      undoButton.classList.add('undo-button');
   
      undoButton.addEventListener('click', function () {
        undoTaskFromCompleted(todoObject.id);
      });
   
      const trashButton = document.createElement('button');
      trashButton.classList.add('trash-button');
   
      trashButton.addEventListener('click', function () {
        removeTaskFromCompleted(todoObject.id);
      });
   
      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement('button');
      checkButton.classList.add('check-button');
      
      checkButton.addEventListener('click', function () {
        addTaskToCompleted(todoObject.id);
      });
      
      container.append(checkButton);
    }

    

    return container;
  }

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById ('completed-todos');
    completedTODOList.innerHTML = '';
   
    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted) 
        uncompletedTODOList.append(todoElement);
        else
        completedTODOList.append(todoElement);
    }
  });

  function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

  }

  function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
  }

  function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
   
    if (todoTarget === -1) return;
   
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

  }
   
   
  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

  }
  
  function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
 
  return -1;
}


function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';
 
function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}
// contoh script bookshelp

(()=>{
  let e = [];
  function t(t) {
      t.preventDefault();
      const n = document.querySelector("#inputBookTitle")
        , o = document.querySelector("#inputBookAuthor")
        , d = document.querySelector("#inputBookYear")
        , i = document.querySelector("#inputBookIsComplete")
        , c = {
          id: +new Date,
          title: n.value,
          author: o.value,
          year: d.value,
          isComplete: i.checked
      };
      console.log(c),
      e.push(c),
      document.dispatchEvent(new Event("bookChanged"))
  }
  function n(t) {
      t.preventDefault();
      const n = document.querySelector("#searchBookTitle");
      query = n.value,
      query ? c(e.filter((function(e) {
          return e.title.toLowerCase().includes(query.toLowerCase())
      }
      ))) : c(e)
  }
  function o(t) {
      const n = Number(t.target.id)
        , o = e.findIndex((function(e) {
          return e.id === n
      }
      ));
      -1 !== o && (e[o] = {
          ...e[o],
          isComplete: !0
      },
      document.dispatchEvent(new Event("bookChanged")))
  }
  function d(t) {
      const n = Number(t.target.id)
        , o = e.findIndex((function(e) {
          return e.id === n
      }
      ));
      -1 !== o && (e[o] = {
          ...e[o],
          isComplete: !1
      },
      document.dispatchEvent(new Event("bookChanged")))
  }
  function i(t) {
      const n = Number(t.target.id)
        , o = e.findIndex((function(e) {
          return e.id === n
      }
      ));
      -1 !== o && (e.splice(o, 1),
      document.dispatchEvent(new Event("bookChanged")))
  }
  function c(e) {
      const t = document.querySelector("#incompleteBookshelfList")
        , n = document.querySelector("#completeBookshelfList");
      t.innerHTML = "",
      n.innerHTML = "";
      for (const c of e) {
          const e = document.createElement("article");
          e.classList.add("book_item");
          const a = document.createElement("h2");
          a.innerText = c.title;
          const u = document.createElement("p");
          u.innerText = "Penulis: " + c.author;
          const r = document.createElement("p");
          if (r.innerText = "Tahun: " + c.year,
          e.appendChild(a),
          e.appendChild(u),
          e.appendChild(r),
          c.isComplete) {
              const t = document.createElement("div");
              t.classList.add("action");
              const o = document.createElement("button");
              o.id = c.id,
              o.innerText = "Belum Selesai dibaca",
              o.classList.add("green"),
              o.addEventListener("click", d);
              const a = document.createElement("button");
              a.id = c.id,
              a.innerText = "Hapus buku",
              a.classList.add("red"),
              a.addEventListener("click", i),
              t.appendChild(o),
              t.appendChild(a),
              e.appendChild(t),
              n.appendChild(e)
          } else {
              const n = document.createElement("div");
              n.classList.add("action");
              const d = document.createElement("button");
              d.id = c.id,
              d.innerText = "Selesai dibaca",
              d.classList.add("green"),
              d.addEventListener("click", o);
              const a = document.createElement("button");
              a.id = c.id,
              a.innerText = "Hapus buku",
              a.classList.add("red"),
              a.addEventListener("click", i),
              n.appendChild(d),
              n.appendChild(a),
              e.appendChild(n),
              t.appendChild(e)
          }
      }
  }
  function a() {
      !function(e) {
          localStorage.setItem("books", JSON.stringify(e))
      }(e),
      c(e)
  }
  window.addEventListener("load", (function() {
      e = JSON.parse(localStorage.getItem("books")) || [],
      c(e);
      const o = document.querySelector("#inputBook")
        , d = document.querySelector("#searchBook");
      o.addEventListener("submit", t),
      d.addEventListener("submit", n),
      document.addEventListener("bookChanged", a)
  }
  ))
}
)();
