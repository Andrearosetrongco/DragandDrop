// script.js

// Get all draggable elements and droppable containers
const draggableItems = document.querySelectorAll('.draggable');
const droppableItems = document.querySelectorAll('.droppable');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Add event listeners to each draggable element
draggableItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// Add event listeners to each droppable container
droppableItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', drop);
});

// When the drag starts, add a visual cue (e.g., opacity change)
function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id); // store the id of the dragged item
    event.target.style.opacity = '0.4'; // change opacity to indicate it's being dragged
}

// When the drag ends, restore the visual cue
function dragEnd(event) {
    event.target.style.opacity = '1'; // restore opacity
}

// Allow dropping by preventing the default behavior
function dragOver(event) {
    event.preventDefault();
}

// Highlight the droppable container when an item is dragged over it
function dragEnter(event) {
    event.target.style.backgroundColor = '#f0f0f0'; // change background color when hovered
}

// Reset the droppable container when the dragged item leaves it
function dragLeave(event) {
    event.target.style.backgroundColor = ''; // reset background color when dragged item leaves
}

// Handle the drop event
function drop(event) {
    event.preventDefault(); // prevent default action

    const draggedItemId = event.dataTransfer.getData('text'); // get the id of the dragged item
    const draggedItem = document.getElementById(draggedItemId); // get the dragged element
    const targetDescription = event.target;

    // Check if the dragged item matches the description
    if (draggedItem && targetDescription && draggedItem.dataset.description === targetDescription.dataset.description) {
        // If they match, append the image to the description and update score
        targetDescription.appendChild(draggedItem);
        targetDescription.style.backgroundColor = ''; // remove hover effect
        draggedItem.setAttribute('draggable', 'false'); // make the item non-draggable once dropped
        targetDescription.style.border = '2px solid green'; // give a visual confirmation that it's correct
        
        // Update the score
        score++;
        scoreDisplay.textContent = score;
        
        // Check if all items are matched and show a congratulatory message
        if (score === draggableItems.length) {
            document.getElementById('remarks').textContent = 'Congratulations! You have matched all items!';
        }
    } else {
        // If the item doesn't match, just reset the background color of the droppable area
        targetDescription.style.backgroundColor = ''; 
    }
}


