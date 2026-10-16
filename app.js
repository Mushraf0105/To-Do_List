// 1. IN-MEMORY STATE: Array to store all tasks (No persistence)
let tasks = [
  "Master JavaScript Array Manipulation",
  "Understand DOM Re-rendering Flow",
  "Implement Event Delegation"
];

// 2. DOM ELEMENT REFERENCES
const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAllBtn");

function renderTasks() {
  // Clear existing items in DOM to prevent duplicates
  todoList.innerHTML = "";

  // Update Task Counter
  const count = tasks.length;
  taskCounter.textContent = `${count} ${count === 1 ? "task" : "tasks"}`;

  // Toggle Empty State and Clear All button visibility
  if (count === 0) {
    emptyState.style.display = "flex";
    clearAllBtn.style.display = "none";
    return;
  } else {
    emptyState.style.display = "none";
    clearAllBtn.style.display = "inline-block";
  }

  // Iterate over tasks array and build DOM elements
  tasks.forEach((taskText, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    // Build the inner HTML structure
    li.innerHTML = `
      <div class="todo-content">
        <span class="task-index">${index + 1}</span>
        <span class="task-text">${escapeHTML(taskText)}</span>
      </div>
      <button 
        type="button" 
        class="btn-delete" 
        data-index="${index}" 
        aria-label="Delete task: ${escapeHTML(taskText)}"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    `;

    todoList.appendChild(li);
  });
}

/**
 * Handle adding a new task
 * 1. Read input value and trim whitespace
 * 2. Push to tasks array
 * 3. Clear input
 * 4. Re-render UI
 */
function handleAddTask(e) {
  e.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  // Array manipulation: append new task
  tasks.push(text);

  // Reset input field and retain focus
  taskInput.value = "";
  taskInput.focus();

  // Re-render
  renderTasks();
}

function handleListClick(e) {
  // Find closest delete button (handles clicks on child SVG/paths as well)
  const deleteBtn = e.target.closest(".btn-delete");

  if (!deleteBtn) return;

  // Retrieve the task index stored in data-index
  const index = Number(deleteBtn.dataset.index);

  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    // Array manipulation: remove 1 element at the given index
    tasks.splice(index, 1);

    // Re-render the updated state
    renderTasks();
  }
}

/**
 * Clear all tasks helper
 */
function handleClearAll() {
  if (tasks.length === 0) return;
  // Clear the array
  tasks = [];
  renderTasks();
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 3. EVENT LISTENERS
// Form submit event for adding tasks
todoForm.addEventListener("submit", handleAddTask);

// Single delegated listener for the entire list
todoList.addEventListener("click", handleListClick);

// Clear all tasks button
clearAllBtn.addEventListener("click", handleClearAll);


renderTasks();
