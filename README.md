# ✨ VIBE: The Vibrant Intelligent Build Environment

VIBE is a cutting-edge, high-performance **React frontend** designed to transform how developers interact with their code. It provides a premium, "Glassmorphic" user interface for generating AI-powered documentation, analyzing complex logic, and managing collaborative workspaces in real-time.

---

## 🎨 Premium UI & Experience

VIBE isn't just a tool; it's an experience. The interface is built with **Tailwind CSS 4** and customized for:
- **Vibrant Aesthetics**: Deep slate backgrounds with indigo and cyan neon accents.
- **Micro-Animations**: Smooth transitions and hover effects that make the app feel alive.
- **Glassmorphism**: Elegant translucent panels and blurred backgrounds for a modern look.
- **Responsive Layout**: Fluid design that adapts to various screen sizes with a focus on PC and Tablet performance.

---

## 🚀 Key Features & Modules

### 1. 📝 AI Documentation Generator (`DocGenTab`)
- **Purpose**: The heart of VIBE. It allows users to paste code and receive perfectly formatted documentation block-by-block.
- **Logic**: Select from pre-configured styles (Modern, Concise, Detailed) or provide a custom tone reference.
- **Outputs**: Generates native docstrings and Markdown fences.

### 2. 💬 Intelligent Chat Stream (`ChatTab`)
- **Purpose**: A direct collaboration channel with the AI.
- **Interactive**: Ask questions about specific files or ask for logic refactors on the fly.

### 3. 📂 Workspace Management (`Workspace`)
- **Purpose**: Organizes your tasks into Projects and Files.
- **Cloud-Synced**: All project structures are synced to the backend with cascading data safety.

### 4. 📊 Community Leaderboard (`CommunityTab`)
- **Purpose**: Real-time activity tracking using the **TripCode Identity System**.
- **Features**: Live "Online/Offline" indicators and contribution rankings (Docs vs Explanations).

---

## 🏗️ Technical Stack

- **Framework**: [React 19](https://react.dev) (Latest Concurrent Features).
- **Build Tool**: [Vite 8](https://vite.dev) (Ultra-fast HMR).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) & [Lucide React Icons](https://lucide.dev).
- **Code Editing**: [React Simple Code Editor](https://github.com/satya164/react-simple-code-editor) with [PrismJS](https://prismjs.com).
- **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown) + [Remark GFM](https://github.com/remarkjs/remark-gfm).
- **PDF/Image Export**: [jspdf](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v20+ recommended).
- [npm](https://www.npmjs.com) or [pnpm](https://pnpm.io).

### 🛠️ Local Installation

1. **Clone and Enter**:
   ```bash
   git clone <repository-url>
   cd frontVIBE
   ```

2. **Configure Environment**:
   Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *Visit `http://localhost:5173` to see VIBE in action.*

---

## 🏁 Deployment

This frontend is optimized for **Vercel** or **Netlify**:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Single File Mode**: Supported via `vite-plugin-singlefile` for offline usage.

---

## 🛡️ Session Security

VIBE prioritizes your privacy and session integrity:
- **Session-Only Storage**: User data is kept in `sessionStorage`. Closing your tab or browser **instantly expires** your session.
- **Beacons**: Uses `navigator.sendBeacon` to notify the backend precisely when you disconnect, keeping the leaderboard accurate.

---
*Developed with ❤️ by the Phok Keomonnyratanak.*
