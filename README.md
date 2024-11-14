## Assignment: Develop a Browser Automation Instruction List Tool

## Objective:
Create a web-based tool that allows users to define, edit, and visualize a series of browser automation instructions. The tool should generate a corresponding JSON output for the instructions and support two-way editing.

![image](https://github.com/user-attachments/assets/3b07b050-3b63-43a7-bfb0-a9e7c00b235b)

## Requirements:

### User Interface:

- a. Create a main panel with input fields for different types of browser instructions.
- b. Implement a dropdown to select instruction types: Wait, Fill, and Click.
- c. Add input fields for selectors, text (for Fill instructions), and delay (in milliseconds).
- d. Include buttons for redo (↻), undo (↺), and adding new instructions (+) at the top of the panel.
- e. Add a remove button (×) for each instruction.

### Instruction Types:

- a. Wait: Requires a selector input.
- b. Fill: Requires inputs for selector, text, and delay.
- c. Click: Requires a selector input.
- d. Delay: Requests a number input. 

### Layout and Responsiveness:
- a. Ensure all input fields for an instruction remain on the same line.
- b. Make the interface responsive for various screen sizes.
- c. Implement a two-panel layout: instructions on the left, JSON output on the right.

### JSON Output:
- a. Create a panel to display the JSON representation of the instructions.
- b. Update the JSON output in real-time as instructions are added, edited, or removed.
- c. Format the JSON output to match the structure shown in the image.

### Two-way Binding:
- a. Make the JSON output editable.
- b. Implement functionality to update the instruction list when the JSON is manually edited.
- c. Ensure changes in either panel (instruction list or JSON) are reflected in the other.

### Functionality:
- a. Allow users to add new instructions of any type.
- b. Enable editing of existing instructions.
- c. Implement undo and redo functionality for all actions.
- d. Ensure the remove button works for individual instructions.

### Data Validation:
- a. Implement input validation for all fields.
- b. Provide user-friendly error messages for invalid inputs or JSON syntax errors.

### Styling:
- a. Style the interface to match the layout and design shown in the image.
- b. Use appropriate spacing and borders to clearly separate instructions.

### Bonus Features:
- Implement drag-and-drop functionality to reorder instructions.
- Add local storage to persist the instruction list between sessions.
- Create a "Test" button to simulate running the instructions.
- Implement import/export functionality for instruction sets.

### Deliverables:
- A fully functional web application meeting all the above requirements.
- Source code with clear comments and documentation.
- A brief user guide explaining how to use the tool.
- A short technical document outlining the architecture and key design decisions.

### Evaluation Criteria:
- Functionality: Does the tool work as specified?
- User Experience: Is the interface intuitive and easy to use?
- Code Quality: Is the code well-structured, efficient, and maintainable?
- Design Accuracy: Does the tool's appearance match the provided image?
- Responsiveness: Does the tool work well on different screen sizes?
- Two-way Binding: Is the synchronization between the instruction list and JSON output accurate and real-time?

This assignment challenges students to create a practical tool for browser automation while applying web development skills, user interface design, state management, and data synchronization concepts.
