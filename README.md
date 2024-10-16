# Chizzakura Project

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Docker
- Docker Compose

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/chizzakura.git
   cd chizzakura
   ```

2. **Download dependencies:**

   ```sh
   npm install
   ```

3. **Configure the database:**
   - Create a `.env` file (copy from .env.example)

### Running the Project

1. **Run docker:**

   ```sh
   docker compose -f docker-compose.yml -p chizzakura up -d
   ```

2. **Initialize database**
   use db.sql file

3. **Start project**

   ```sh
   npm run start
   ```

4. **Access the application:**
   - Open your browser and go to `http://localhost:8080`
   - Go to `http://localhost:8080/sample`
