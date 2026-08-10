# CareConnect

CareConnect is a modern healthcare platform built to bridge the gap between patients and medical professionals. It enables patients to easily book appointments, consult with doctors, and manage their health journey. For doctors, it provides tools to manage their availability, handle appointments, and track earnings.

## 🚀 Features

### For Patients
- **Find Specialists:** Browse through a list of certified doctors by specialty.
- **Book Appointments:** Real-time scheduling based on the doctor's availability.
- **Consultations:** Integrated communication and seamless meeting experiences (powered by Vonage).
- **Credits System:** Manage your platform credits to book appointments efficiently.

### For Doctors
- **Availability Management:** Set your daily working hours seamlessly. 
- **Appointment Tracking:** View upcoming, completed, and canceled appointments.
- **Payouts Dashboard:** Track earnings (credits) and request payouts.

### For Admins
- **Manage Payouts:** Review and approve doctor payout requests securely.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Neon (Serverless Postgres)](https://neon.tech/)
- **ORM:** [Prisma ORM](https://www.prisma.io/)
- **Communication:** [Vonage SDK](https://www.vonage.com/)
- **Forms & Validation:** React Hook Form & Zod

## 🏗️ Architecture & How It Works

CareConnect uses a modern Full-Stack Next.js architecture (App Router) combined with Server Actions for secure and seamless data fetching.

```mermaid
graph TD
    %% Define Classes for Colors
    classDef client fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff;
    classDef server fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff;
    classDef auth fill:#f59e0b,stroke:#b45309,stroke-width:2px,color:#fff;
    classDef db fill:#8b5cf6,stroke:#5b21b6,stroke-width:2px,color:#fff;
    classDef thirdparty fill:#ef4444,stroke:#b91c1c,stroke-width:2px,color:#fff;
    classDef userNode fill:#475569,stroke:#1e293b,stroke-width:2px,color:#fff;

    %% Nodes
    User(("🧑‍💻 User (Patient/Doctor)")):::userNode
    
    subgraph Frontend ["Client-Side Application (Browser)"]
        UI["React UI (Tailwind & shadcn/ui)"]:::client
        Components["Client Components"]:::client
    end
    
    subgraph Backend ["Next.js App Router (Server)"]
        Middleware["Next.js Middleware"]:::server
        Actions["Server Actions (Business Logic)"]:::server
    end
    
    subgraph Services ["External Services & Database"]
        Clerk["Clerk Authentication"]:::auth
        Neon[("Neon Postgres Database")]:::db
        Vonage["Vonage SDK (Video/Audio)"]:::thirdparty
    end

    %% Relationships
    User -->|"1. Interacts with"| UI
    UI -->|"2. Renders"| Components
    
    User -->|"3. HTTP Requests"| Middleware
    Middleware -->|"4. Validates Token"| Clerk
    Middleware -->|"5. Routes to"| Actions
    
    Components -->|"6. Fetches/Mutates Data"| Actions
    Components -->|"7. Manages Login"| Clerk
    Components -->|"8. Initializes Call"| Vonage
    
    Actions -->|"9. Executes Queries via Prisma"| Neon
    
    %% Style the subgraph containers
    style Frontend fill:#eff6ff,stroke:#bfdbfe,stroke-width:2px,stroke-dasharray: 5 5;
    style Backend fill:#ecfdf5,stroke:#a7f3d0,stroke-width:2px,stroke-dasharray: 5 5;
    style Services fill:#f8fafc,stroke:#e2e8f0,stroke-width:2px,stroke-dasharray: 5 5;
```

### 1. User Interaction & Client Layer (Blue)
The frontend of the application is built entirely using **Next.js App Router** with React.
- When a user (Doctor or Patient) visits the app, the browser downloads the Client Components.
- The UI is styled elegantly using **Tailwind CSS** and **shadcn/ui**.
- State is managed via React hooks (e.g., `useState`, `useEffect`, and custom hooks like `useFetch`).

### 2. Authentication & Middleware (Orange & Green)
Security is handled at the edge using Next.js Middleware and **Clerk**.
- Whenever the user attempts to access a protected route (like the Dashboard or Appointments page), the HTTP request first hits the **Next.js Middleware**.
- The Middleware communicates with **Clerk Auth** to verify the user's JSON Web Token (JWT).
- If the token is invalid or missing, the user is immediately redirected to the sign-in page, ensuring that unauthorized users can never access the Server Actions or the Database.

### 3. Server Actions & Business Logic (Green)
Instead of building traditional REST APIs (like `/api/getAppointments`), this project utilizes **Next.js Server Actions**.
- When the user submits a form (e.g., setting availability or booking an appointment), the Client Component calls a Server Action function directly.
- These Server Actions run securely on the server environment. This means secrets (like Database URLs and Vonage private keys) never leak to the client's browser.
- Server Actions handle all the business logic, input validation, and role verification (checking if a user is an ADMIN, DOCTOR, or PATIENT).

### 4. Database Layer (Purple)
The application's data is stored in **Neon**, a Serverless Postgres Database.
- The Server Actions communicate with the Neon database via **Prisma ORM**.
- Prisma ensures that all database queries are type-safe. It reads and writes data (users, appointments, availability slots, and credit transactions) smoothly without the need to write raw SQL.

### 5. Third-Party Integrations (Red)
Real-time capabilities are powered by the **Vonage SDK**.
- When a patient and doctor are ready for their scheduled appointment, the client-side application securely connects to Vonage.
- This establishes a WebRTC-powered video/audio communication channel directly between the two users' browsers, allowing for seamless telehealth consultations.

## 📂 Folder Structure

```text
CareConnect/
├── actions/         # Server Actions (Next.js backend logic)
├── app/             # Next.js App Router (Pages, Layouts)
│   └── (main)/      # Main application routes (Dashboard, Appointments, etc.)
├── components/      # Reusable UI Components (shadcn/ui, custom components)
├── hooks/           # Custom React hooks (e.g., useFetch)
├── lib/             # Utility functions and Prisma Client setup
├── prisma/          # Database Schema and Migrations
├── public/          # Static assets (images, icons)
├── .env.example     # Example environment variables
├── middleware.js    # Clerk Authentication middleware
└── package.json     # Project dependencies and scripts
```

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/CareConnect.git
   cd CareConnect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Rename the `.env.example` file to `.env` and fill in your keys:
   ```bash
   cp .env.example .env
   ```
   *Note: You will need API keys for Clerk, Vonage, and a connection string for Neon Database.*

4. **Initialize the Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
