// add item to database
let items = [];

function addtodb(data) {
  db.collection("todoItems")
    .add({
      text: data,
      status: "active",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

//  get items from database

function getfromdb() {
  db.collection("todoItems").onSnapshot((snapshot) => {
    // console.log(snapshot.docs);
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    createitems(items);
    // console.log(items);
    items = [];
  });
}

//updating the list from database
function createitems(arrItems) {
  let itemsHtml = "";
  arrItems.forEach((item) => {
    itemsHtml += `<li data-id="${item.id}" class="${
      item.status == "completed" ? "checked" : ""
    } ">${item.text}<span class="close" >\u00D7</span></li>`;
  });
  document.getElementById("myUL").innerHTML = itemsHtml;
  delete_event();
}

getfromdb();
// Click on a close button to hide the current list item
function delete_event() {
  const close_item = document.getElementsByClassName("close");
  for (const item of close_item) {
    item.onclick = (e) => {
      const id = e.target.parentElement.dataset.id;
      deleteindb(id);
    };
  }
}
function deleteindb(id) {
  db.collection("todoItems")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      checkUncheck(ev.target.dataset.id);
    }
  },
  false
);
function checkUncheck(id) {
  let item = db.collection("todoItems").doc(id);
  item.get().then((doc) => {
    if (doc.exists) {
      const status = doc.data().status;
      if (status === "active") {
        item.update({
          status: "completed",
        });
      } else if (status === "completed") {
        item.update({
          status: "active",
        });
      }
    }
  });
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  // console.log(inputValue);

  const inputValue = document.getElementById("myInput").value;

  // console.log(inputValue);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    addtodb(inputValue);
  }
  document.getElementById("myInput").value = "";
}
