# OrnoPlante 🌿

**OrnoPlante is a web application to help users identify, manage, and learn about ornamental plants. Powered by a machine learning model, it provides plant identification and a platform for users to track their plant collections.**

## ✨ Features

*   **Plant Identification:** Upload an image to get plant identification suggestions.
*   **Personal Collection:** Create a profile to save and manage your plants.
*   **Search:** Browse our extensive database of ornamental plants.
*   **Admin Dashboard:** Manage users and plant data.

## 🛠️ Tech Stack

*   **Frontend:** Next.js, React, Tailwind CSS
*   **Backend:** Node.js, Express, Prisma ORM
*   **Database:** MySQL
*   **Deployment:** Vercel (Frontend), Docker (Backend)

## 🏁 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   Node.js (v18.x or higher)
*   Docker & Docker Compose

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AbdelkbirNA/OrnoPlante.git
    cd OrnoPlante
    ```
2.  **Setup Backend & Database:**
    ```bash
    cd backend
    npm install
    cp .env.example .env.local # And fill it out
    docker-compose up -d
    npx prisma migrate dev
    ```
3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    cp .env.local.example .env.local # And fill it out
    ```

## 🏃‍♂️ Running the Application

*   **Run Backend (from `/backend`):** `npm run dev`
*   **Run Frontend (from `/frontend`):** `npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👤 Contact

This project was created by Abdelkbir Nainiaa.

*   **Portfolio:** [abdelkbirnainiaa.me](https://www.abdelkbirnainiaa.me)
*   **GitHub:** [AbdelkbirNA](https://github.com/AbdelkbirNA)
