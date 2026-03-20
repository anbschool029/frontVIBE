# Agentic AI Development Guidelines for VIBE Frontend

This file serves as the core instruction manual for any AI agent interacting with this codebase. When building, modifying, or refactoring the VIBE frontend, strictly adhere to the following architectural patterns and development styles to keep the codebase beginner-friendly, highly maintainable, and aligned with standard TypeScript-ready concepts.

## 1. Separation of Concerns (SoC)
- **Keep `App.jsx` Clean**: `App.jsx` handles only high-level orchestration, such as navigation and tab rendering. Do not write feature UI inside `App.jsx`.
- **Component Splitting**: Isolate feature-specific UI (e.g., `DocGenTab.jsx`, `ChatTab.jsx`) into their own files.
- **Custom Hooks for State Management**: Complex state logic and API operations MUST be extracted into standalone custom hooks inside `src/hooks/` (e.g., `useDocGen.js`, `useChat.js`). Never mix heavy business logic with presentation layers.
- **Utilities Extraction**: Non-React helper logic (like language detection) belongs in `src/utils/` to be modular and easily testable.

## 2. Reusable "Atomic" UI Components
- **The "Canvas" Pattern**: All major views must be wrapped inside the `Canvas`, `CanvasRow`, and `CanvasColumn` primitives (located in `src/components/ui/Canvas.jsx`). This enforces uniform width, max-heights, padding limits, and the fundamental empty workspace structure.
- **Micro-Components**: Always utilize pre-built atomic components in `src/components/ui/` (like `Button`, `SectionCard`, `SectionHeader`). Avoid repeating massive strings of explicit TailwindCSS design classes inline within your feature files.
- **Extend Instead of Repeating**: If a new styling twist is required, expand the specific existing atomic component (for instance, by adding a new `variant` to the `Button` component) rather than hardcoding it directly in a parent.

## 3. Beginner-Friendly & TypeScript-Ready Preparation
- **JSDoc as a TypeScript Bridge**: As the codebase evolves towards full TypeScript (`.tsx`), but currently uses JavaScript, you MUST heavily rely on strict JSDoc comments to describe props and return types accurately.
  - **Example**:
    ```javascript
    /**
     * Renders a customizable canvas block.
     * @param {Object} props
     * @param {React.ReactNode} props.children - Inner block content
     * @param {boolean} props.visible - Controls CSS display visibility
     */
    ```
- **Readability Over Brevity**: Opt for highly descriptive names. Code should almost read like natural English to remain intensely beginner-friendly (`handleGenerateDocs` instead of `runGen`). 

## 4. State Preservation Strategy (Hiding vs Unmounting)
- When dealing with Tabbed navigation or switching views, avoid unmounting components conditionally if they hold their own intensive local states.
- **Utilize Display Toggling**: Pass down a `visible` prop (e.g., `<ChatTab visible={activeTab === 'Chat'} />`) and use inline styling inside the component wrappers (`style={{ display: visible ? 'flex' : 'none' }}`) to toggle visibility. This elegantly preserves all internal variable states while the component resides safely in the background DOM.

## 5. Styling Architecture (TailwindCSS)
- Employ modern Tailwind classes ensuring cross-device support (e.g., breaking flex rows with `max-md:flex-col`).
- Always follow the existing premium, "Glassmorphism" visual style. Default panel styles are typically built around transparency, blurs naturally handled by `<SectionCard>`, alongside vibrant gradient highlights.

## 6. Build and Tooling Configuration (Vite + Rollup)
- **Code Splitting Large Dependencies**: When integrating heavy libraries (`highlight.js`, `html2pdf.js`, `react-dom`), the main chunk size will wildly exceed generic limits (500kB) and cause Vite build warnings.
- **Rollup Options Strategy**: Do not arbitrarily raise limits without chunking. Always configure `vite.config.js` to intelligently parse and split `node_modules/` into mapped separate files via `build.rollupOptions.output.manualChunks(id)` to retain blazing fast website loading times! Only then should `build.chunkSizeWarningLimit` be increased proportionally to silence the warning on those large isolated libraries.

## 7. Backend Architecture (FastAPI + Clean Architecture)
The backend (located tightly inside `/backend`) has been refactored utilizing the **Ports and Adapters (Hexagonal Architecture)** design pattern heavily focused on Separation of Concerns (SoC) logic to allow infinite integrations (like SQLite/SQLAlchemy & Auth layers) flawlessly later!

Future AI agents MUST strictly respect this layout when adding features:
- **`app/main.py`**: The fundamental bootstrap entry point. Only contains FastAPI initialization and absolute top-level Middleware (CORS).
- **`app/core/`**: Central hub for environment variables natively pulled via `.env`. (e.g. `config.py`, future `security.py`).
- **`app/domain/`**: The pure brain of the app!
  - `schemas.py`: Pydantic Models protecting network traffic structure.
  - `services.py`: Contains strictly Business Logic. It does NOT know what HTTP or Groq is. It takes sanitized requests and formats strings natively.
- **`app/ports/`**: The Contracts (Abstract Base Classes). E.g., `llm_port.py` ensures that any AI provider plugging into the specific system MUST implement an exact `generate_text` function mathematically.
- **`app/adapters/`**: Bridging the contracts to outside API logic! E.g. `groq_adapter.py` talks to Groq natively under the `LLMPort` interface wrapper. This is where you would build an `auth_adapter.py` or `sqlite_adapter.py`.
- **`app/api/routers/`**: The "Primary Driving Adapters". These files handle EXACTLY one thing: taking an HTTP Endpoint (`@router.post(...)`) and bridging it directly into a Service via Dependency Injection! Keep logic explicitly out of routers!

**Building & Running Backend Locally:**
```bash
cd backend
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uv run uvicorn app.main:app --reload --port 8000
```
