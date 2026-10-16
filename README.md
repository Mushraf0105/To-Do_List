# To-Do List Application

A simple, modern in-memory To-Do list web application built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## 🎯 Objectives & Core Deliverables

- **Array Manipulation**: Managing an in-memory task array using methods like `push()` and `splice()`.
- **DOM Rendering**: Maintaining a clean `renderTasks()` function that treats JavaScript state as the single source of truth.
- **Event Delegation**: Using a single event listener on the parent container (`<ul>`) to handle delete button clicks dynamically.
- **No Persistence**: Tasks exist purely in runtime memory as specified in the assignment.

---

## 🛠️ Approach & Outcome

### Approach
1. **Separation of Concerns**: HTML5 handles document structure, CSS3 provides responsive dark-mode styling with native CSS variables, and Vanilla JavaScript controls data state and interactivity.
2. **State-Driven Architecture (Single Source of Truth)**: Rather than imperatively mutating DOM nodes across separate event handlers, the application maintains state exclusively inside an in-memory array (`let tasks = [...]`). Every state update triggers a centralized `renderTasks()` cycle.
3. **Event Delegation Pattern**: A single listener is attached to the parent `<ul id="todoList">` container. Through event bubbling (`event.target.closest('.btn-delete')`), dynamic additions and deletions are handled efficiently without memory leaks or rebinding.
4. **Resilience & Accessibility**: Semantic elements, `aria-label` tags, and an HTML escaping routine (`escapeHTML`) protect against XSS injection while ensuring accessibility across screen readers and keyboard navigation.

### Outcome
- **Zero Dependencies**: Lightweight footprint running 100% offline without frameworks, build steps, or CDN requirements.
- **High Performance & Low Memory**: Event delegation avoids attaching redundant event listeners as tasks scale.
- **Defensive & Reliable**: Synchronized UI and state prevent orphaned DOM nodes or desynchronization issues.

---

## 📁 Project Structure

```
To-Do_List/
├── index.html   # Semantic HTML5 markup, accessible input form, and list container
├── style.css    # Modern dark UI, glassmorphic card design, responsive layout, micro-animations
├── app.js       # Core JavaScript logic (state, render loop, event delegation)
└── README.md    # Documentation, architecture, deployment, rollback, and interview questions
```

---

## 💡 Key Technical Concepts

### 1. Array Manipulation
- **Adding a task**:
  ```javascript
  tasks.push(newTask);
  ```
- **Removing a task**:
  ```javascript
  tasks.splice(index, 1);
  ```

### 2. DOM Rendering (Single Source of Truth)
Instead of manually creating and appending or removing single DOM nodes across disparate event handlers, the app follows a deterministic render pattern:
```javascript
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((taskText, index) => {
    // Generate <li> items with data-index="${index}"
  });
}
```
Whenever the state changes (an item is added or deleted), `renderTasks()` is called. The UI is guaranteed to match the state.

### 3. Event Delegation
Instead of attaching individual event listeners to every delete button when rendering items:
```javascript
// Attach ONCE to the parent <ul>:
todoList.addEventListener("click", function(event) {
  const deleteBtn = event.target.closest(".btn-delete");
  if (deleteBtn) {
    const index = Number(deleteBtn.dataset.index);
    tasks.splice(index, 1);
    renderTasks();
  }
});
```

---

## ⚙️ Deployment Configuration

Because this application relies exclusively on standard client-side technologies without build tools or backend runtimes, deployment is simple and instantaneous:

### 1. Static Hosting Options
- **GitHub Pages**:
  - Source: Deploy from branch (`main` / root `/`)
  - Build Command: `None`
- **Vercel / Netlify**:
  - Framework Preset: `Other`
  - Build Command: Leave empty / `None`
  - Output Directory: `./` (root directory)

### 2. Environment Compatibility
- **Runtime**: Works on any modern web browser (Chrome, Edge, Firefox, Safari).
- **Network**: Operates 100% offline; requires zero external network calls or remote CDNs.

---

## 🛡️ Rollback Evidence & Verification

### Rollback Strategy
1. **Stateless In-Memory Advantage**:
   - Because tasks persist only in client memory during the active session (no databases, schema migrations, or localStorage mutations), a rollback carries **zero risk of data corruption or schema mismatch**.
2. **Version Control Rollback**:
   - Instant rollback to any prior release or commit:
     ```bash
     git revert <commit-hash>
     git push origin main
     ```
3. **Instant CDN/Static Cache Invalidation**:
   - Static files can be reverted instantaneously without database rollbacks or multi-stage dependency rebuilding.

### Verification Evidence
- **Automated Syntax Check**:
  ```bash
  node -c app.js
  ```
  *Result*: Exit Code `0` (Zero syntax errors, valid ECMAScript).
- **DOM & Cross-Browser Integrity**:
  - Semantic HTML5 structure validated.
  - Native CSS system font stack eliminates CDN timeout risks.
  - XSS mitigation via input sanitation before innerHTML injection.

---

## 📝 Answers to Assignment Interview Questions

### 1. What is event delegation and why is it useful?
> **Answer:**  
> **Event delegation** is a JavaScript pattern where you attach a single event listener to a parent element to handle events for all current and future child elements.  
> It relies on **event bubbling** (where events triggered on child elements bubble up through their parent hierarchy in the DOM tree).  
> **Why it's useful:**
> - **Memory Efficiency:** Avoids attaching hundreds of individual listeners to dynamically generated items.
> - **Dynamic Element Handling:** Works automatically for newly added items without needing to manually bind listeners during each addition.
> - **Cleaner Lifecycle:** Eliminates memory leak risks from unremoved listeners on destroyed DOM nodes.

---

### 2. How would you remove an item from an array?
> **Answer:**  
> There are two primary ways in modern JavaScript:
> 1. **Mutating in place using `splice()`:**
>    ```javascript
>    tasks.splice(index, 1);
>    ```
>    Removes 1 element at position `index`. Ideal for direct array state modification.
> 2. **Immutably using `filter()`:**
>    ```javascript
>    tasks = tasks.filter((_, i) => i !== index);
>    ```
>    Produces a new array excluding the specified index, commonly used in declarative state frameworks (like React).

---

### 3. Why re-render the whole list instead of editing the DOM directly?
> **Answer:**  
> Re-rendering from a data array enforces a **Single Source of Truth**:
> - **Consistency:** The UI state never drifts out of sync with the JavaScript state.
> - **Simpler Debugging:** Bugs can be reproduced by examining the array data rather than untangling a chain of ad-hoc DOM queries and manual mutations (`removeChild`, `previousSibling`, etc.).
> - **Foundation for Declarative Frameworks:** This mimics how modern UI libraries (React, Vue, Svelte) operate by separating data state from visual representation.
