# Simple Game Inventory App

This is an Inventory Management Application for games built as part of [The Odin Project's NodeJS course](https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application). The app allows users to manage categories and items with full CRUD functionality.

## Features

- Manage categories and items
- Full CRUD operations for both categories and items
- Validation and error handling

## Technologies Used

- Node.js
- Express
- PostgreSQL
- EJS (Embedded JavaScript Templates)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Viadsss/GameInventory.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your database configuration. You can use the `.env-example` file as a template:
   ```bash
   cp .env-example .env
   ```
4. Populate your PostgreSQL database with initial data:

   ```bash
   node db/populate.js <connection-string>
   ```

   Replace `<connection-string>` with your actual PostgreSQL connection string.

5. Start the application:
   ```bash
   npm run dev
   ```
