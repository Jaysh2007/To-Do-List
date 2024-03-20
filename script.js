const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const totalTasksIndicator = document.getElementById("total-tasks");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    updateTotalTasks();
  }
  inputBox.value = "";
  saveData();
}

var input = document.getElementById("input-box");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {

    event.preventDefault();

    document.getElementById("addBtn").click();

  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      const listItem = e.target.parentElement;
      
      // Add destroy animation class
      listItem.classList.add('destroy-animation');
      
      // After the animation completes, remove the element from the DOM
      listItem.addEventListener('animationend', function() {
        listItem.remove();
        updateTotalTasks();
        saveData();
      });
    }
  },
  false
);


function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showData();

function updateTotalTasks() {
  const totalTasks = listContainer.querySelectorAll("li").length;
  if(totalTasks===0){
    totalTasksIndicator.style.display = 'none'
  }else{
  totalTasksIndicator.textContent = `${totalTasks} tasks left`;
  }

}