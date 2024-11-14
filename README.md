# Browser Automation Instruction List Tool

[Live Link](https://browser-automation-instruction-list-tool-hoqradwan.vercel.app/)

### To Run This Project:

1. After cloning the project in your PC from github open it in a code editor and run command **npm install**
2. Provide the command **npm run dev** in the terminal to run this project

## Explanation of Technical Choices

- I have chosen Next JS because it provides a simple routing system and really fast in production.
- TypeScript is used to improve type safety and reduce errors, making development more reliable and maintainable.
- I opted for raw CSS over Tailwind. Since this is a simple news article app, raw CSS provides all the styling control I need without extra complexity. Tailwind is great for larger projects, but here it felt like overkill, and using plain CSS keeps the bundle smaller and the design flexible. This way, I can quickly adapt styles as needed without being tied to a framework.
- I used localstorage to persist the instruction list between sessions.

## User Guide

- "+" button to Add instruction.
- "Clone" button to duplicate an instruction.
- "Undo" & "Redo" button to go back to previous state as well ass come back to present state.
- "Clear All" button to clear all instructions.
- "Remove" button to delete an instruction.

## Instruction Types:

a. Wait: Requires a selector input.
b. Fill: Requires inputs for selector, text, and delay.
c. Click: Requires a selector input.
d. Delay: Requests a number input.
