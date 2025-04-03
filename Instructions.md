🍿 Popcorn Palace Backend — Instructions

Welcome to the backend of the Popcorn Palace ticket booking system! This project is built using NestJS, PostgreSQL, TypeORM, and Jest for testing. Here's everything you need to get started.

🛠️ Prerequisites

Ensure you have the following installed:

Node.js (v18+ recommended)

npm (v9+)

Docker & Docker Compose


📦 Installation

Clone the repository and install dependencies:

git clone https://github.com/Nadav-Goldhirsh/popcorn_palace_typescript
cd popcorn_palace_typescript
npm install

🧱 Database Setup (PostgreSQL with Docker)

Spin up the PostgreSQL container:

docker compose up -d

This uses the following defaults:

POSTGRES_USER: postgres

POSTGRES_PASSWORD: postgres

POSTGRES_DB: popcorn

You can change these in your compose.yml or .env file.



▶️ Running the Application

To start the backend:

npm run start:dev

This will compile and watch for changes using TypeScript.

API will be accessible at:http://localhost:3000

📄 Swagger API Documentation

Once running, you can explore the live API docs at:http://localhost:3000/api

⚠️ Note: The PATCH /movies/update/:title endpoint is not visible in Swagger UI due to dynamic route parameters. You can test it manually using tools like Thunder Client, Postman, or curl.

🧪 Running Tests

We use Jest with supertest for e2e testing.

To run end-to-end tests:

npm run test:e2e

This covers:

Movie creation & validation

Showtimes logic (including invalid time checks)

Booking logic and prevention of double-booking

🧼 Linting & Formatting

To check linting:

npm run lint


🗂️ Helpful Scripts

# Rebuild and restart Docker
docker compose down -v
docker compose up -d --build

# Reset DB container if needed
docker compose down && docker compose up -d

📂 Project Structure

src/
  ├── movie/        # Movie module (controllers, services, schemas)
  ├── showtime/     # Showtime module
  └── booking/      # Booking module
  app.module.ts # Main application module

test/
  └── app.e2e-spec.ts  # End-to-end test suite

💬 Contact

For questions or issues, feel free to open an issue or reach out.

