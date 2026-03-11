# Aura | Modern Music Player

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-ff4154?logo=reactrouter)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query-ff4154?logo=reactquery)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-black?logo=radixui)](https://www.radix-ui.com/)

Aura is a high-performance, visually immersive music discovery platform built with **React 19** and the **TanStack ecosystem**. It serves as a demonstration of senior-level frontend architecture, focusing on complex state management, custom audio engineering, and polished UX/UI.

---

## 🏗️ Architectural Highlights

### 1. Advanced State Management (ISP Applied)
Unlike monolithic context providers, Aura utilizes **Interface Segregation** across its state layer. The `MusicProvider` orchestrates four specialized, memoized contexts:
- **PlaybackContext**: Atomic controls for the active track and player state.
- **LibraryContext**: Manages user persistence (Playlists, Liked Songs) via an offline-first strategy.
- **QueueContext**: Handles shuffle logic and complex queue mutations.
- **PlaybackTimeContext**: Optimized for high-frequency updates (current time/progress) to prevent global re-renders.

### 2. Custom Audio Engine
Instead of relying on heavy third-party libraries, Aura implements a robust **`useAudioEngine`** hook. 
- **Concurrent-Safe**: Uses "Sync during render" patterns to prevent state tearing in React 19's concurrent mode.
- **Encapsulated Logic**: Manages the `HTMLAudioElement` lifecycle, metadata loading, and cross-component synchronization.
- **Performance**: Decouples audio metadata loading from UI rendering for an "instant-feel" interaction.

### 3. Type-Safe Routing & Data Fetching
- **TanStack Router**: Implements fully type-safe, file-based routing.
- **TanStack Query**: Orchestrates the Jamendo API integration with smart caching, stale-time management, and loading states.
- **Virtualization**: Prepared for large datasets using `@tanstack/react-virtual` to ensure 60fps scrolling in deep libraries.

---

## 💎 Features & UX

- **🎵 Immersive Audio Experience**: Seamless playback with full queue management and shuffle/repeat modes.
- **📜 Lyrics Overlay**: Real-time visual focus mode for active listening.
- **📂 Personal Library**: Create, edit, and manage local playlists with automatic persistence.
- **🎨 Dynamic UI**: Fluid transitions, glassmorphism effects, and accessible components built with Radix UI.
- **📱 Responsive & PWA**: Mobile-first architecture with PWA support for a native-like experience.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript
- **Routing**: TanStack Router (File-based)
- **Data Fetching**: TanStack Query (v5)
- **State**: React Context (Atomic Pattern)
- **Styling**: Tailwind CSS 4.0, Radix UI Primitives, Lucide/Tabler Icons
- **Performance**: React 19 Transitions, Memoization, Lazy Loading
- **Build**: Vite, Bun

---

## 🚀 Getting Started

1. **Clone & Install**
   ```bash
   git clone https://github.com/your-username/Aura.git
   cd Aura
   bun install # or npm install
   ```

2. **API Configuration**
   - Get a Client ID from the [Jamendo Developer Portal](https://developer.jamendo.com/v3.0).
   - Create a `.env` file:
     ```env
     VITE_JAMENDO_CLIENT_ID=your_client_id_here
     ```

3. **Run**
   ```bash
   bun run dev
   ```

---

## 🧑‍💻 Technical Case Study

For a deep dive into how I solved **Audio Synchronization in Concurrent React** or **Optimizing Context Re-renders**, check out my [Portfolio Write-up](https://your-portfolio.com/projects/aura).
