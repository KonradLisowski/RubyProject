const apiBaseUrl = "http://localhost:3000/food_notes";
const openFoodApiUrl = "https://world.openfoodfacts.org/api/v2/product"; // I recieved the api from here https://ie.openfoodfacts.org/data

// Function to create a new food note
async function createNote() {
  const food = document.getElementById("food").value;
  const note = document.getElementById("note").value;

  if (food && note) {
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ food, note }),
    });

    if (response.ok) {
      alert("Note added successfully");
      fetchNotes();
    } else {
      alert("Failed to add note.");
    }
  } else {
    alert("Enter both food name and note.");
  }
}

// Function to fetch and display all notes
async function fetchNotes() {
  const response = await fetch(apiBaseUrl);
  const notes = await response.json();
  const notesList = document.getElementById("notes");
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${note.food}: ${note.note}`;

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editNote(note.id, note.food, note.note);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteNote(note.id);

    // Displays buttons
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
  });
}

// Function to edit a note only
async function editNote(id, food, note) {
  const newNote = prompt("Edit Note", note);

  if (newNote !== null) {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ food: food, note: newNote }),
    });

    if (response.ok) {
      alert("Note updated successfully!");
      fetchNotes();
    } else {
      alert("Failed to update note.");
    }
  }
}

// Function to delete a note
async function deleteNote(id) {
  const confirmDelete = confirm("Are you sure you want to delete this note?");
  if (confirmDelete) {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Note deleted successfully!");
      fetchNotes();
    } else {
      alert("Failed to delete note.");
    }
  }
}

// Function to fetch product data by barcode
async function fetchProductByBarcode() {
  const barcode = document.getElementById("barcode").value;

  if (barcode) {
    const response = await fetch(`${openFoodApiUrl}/${barcode}.json`);

    if (response.ok) {
      const productData = await response.json();

      // Display product name and ingredients
      const productName = document.getElementById("product-name");
      const productIngredients = document.getElementById("product-ingredients");

      productName.textContent = `Product: ${productData.product.product_name}`;
      productIngredients.textContent = `Ingredients: ${productData.product.ingredients_text || "No ingredients available."}`;
    } else {
      alert("Failed to fetch product data.");
    }
  } else {
    alert("Enter a barcode.");
  }
}

// Fetch notes when page loads
window.onload = fetchNotes;
