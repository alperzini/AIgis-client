# AIgis Financial Dashboard

Developed during a high-intensity 4-day hackathon, AIgis is a full-stack fraud detection platform built for small to medium businesses and financial institutions. As a Full-Stack Engineer, I collaborated with UX Design and Data Science teams to architect and implement an analyst dashboard that leverages PCA-transformed data and a Random Forest algorithm to identify fraudulent credit card transactions. The platform enables analysts to set automated thresholds for auto-approvals and auto-blocks, while flagging medium-probability transactions for manual review.

**URL**: https://aigis-client.vercel.app/ 

Built with React.js, Vite, SCSS, MySQL.

## Features
- **Secure Authentication**: Login flow with protected route handling
- **Interactive Dashboard**: Top-level view of account summaries and alert volumes
- **Transaction Management**: Browse, search, and filter transaction records
- **Transaction Details**: In-depth individual order and transaction tracking views
- **Dynamic Layout**: Smooth sidebar navigation, responsive layout system
- **Responsive Design**: Designed to work flawlessly across desktop and mobile devices

## Tech Stack
- **React 19**: Component-based UI rendering
- **Vite**: Ultra-fast frontend build tool
- **React Router DOM**: Client-side routing for seamless navigation
- **SCSS**: Advanced styling and component-level structure
- **Axios**: HTTP client for robust API requests
- **Lucide React**: High-quality, customizable iconography

## Project Structure
```text
src/
├── assets/       # Images, logos, icons
├── components/   # Reusable UI components (Sidebar, Cards, Navigation, etc.)
├── hooks/        # Custom React hooks
├── pages/        # Application views (Dashboard, Login, Transactions)
├── styles/       # Global styling and SCSS utilities
└── utils/        # API configuration, auth logic, and helper functions
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (v18 or newer recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alperzini/AIgis-client.git
```

2. **Navigate to the project directory**
```bash
cd Brainstation_crosscollab_client
```

3. **Install dependencies**
```bash
npm install
```

4. **Environment Configuration**
Ensure you configure any required environment variables (e.g. duplicating `env.example` into a `.env` file).

5. **Start the local development server**
```bash
npm run dev
```

6. Open the local link (usually `http://localhost:5173`) in your browser to view the project!
