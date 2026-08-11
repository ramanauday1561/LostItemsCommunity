# Post-Login Dashboard Design System

A modern, clean, and premium dark-mode design system for the **Lost Items Community** post-login experience. Designed to deliver a high-contrast, visually stunning interface with vibrant neon accents and responsive micro-interactions.

---

## 🎨 Color Palette

### 1. Canvas & Surface Layers (Dark Mode)
- **App Background (Canvas)**: `#0D0E12` — Deep slate-black canvas background.
- **Card Surface**: `#14161D` — Primary surface for cards, panels, and sidebars.
- **Card Surface Hover**: `#1B1E27` — Hover state for interactive cards and rows.
- **Elevated / Modal Surface**: `#1E212B` — Popovers, dialogs, and floating menus.
- **Subtle Surface Accent**: `rgba(255, 255, 255, 0.04)` — Subtle fill for input fields and chips.

### 2. Border & Divider Tokens
- **Default Border**: `rgba(255, 255, 255, 0.08)` / `#262A36`
- **Subtle Border**: `rgba(255, 255, 255, 0.04)`
- **Hover / Active Border**: `rgba(56, 223, 255, 0.4)` / `#38DFFF`

### 3. Vibrant Neon Accent Colors
- **Primary Accent (Electric Cyan)**: `#38DFFF`
  - *Glow*: `0 0 20px rgba(56, 223, 255, 0.35)`
  - *Usage*: Primary call-to-action buttons, active nav tabs, key stat highlights.
- **Secondary Accent (Cyber Neon Purple)**: `#A855F7`
  - *Glow*: `0 0 20px rgba(168, 85, 247, 0.35)`
  - *Usage*: Community forum badges, featured items, category tags.
- **Status Success (Neon Emerald)**: `#00FF9D`
  - *Usage*: Found item badges, online status indicators (`🟢 Desk Online`), resolution metrics.
- **Status Danger (Cyber Pink / Coral)**: `#FF5376`
  - *Usage*: Active lost report alerts, error messages, delete action triggers.
- **Status Warning (Neon Amber)**: `#FFB800`
  - *Usage*: Pending claims, moderation notices, verification badges.

### 4. Typography Colors
- **Text Primary**: `#F4F5F6` — Crisp off-white for main headings and titles.
- **Text Secondary**: `#9A9FA5` — Soft grey for subtitles, timestamps, and captions.
- **Text Muted / Placeholder**: `#6F767E` — Placeholder text and disabled states.

---

## 📐 Typography System

Standardized on **Inter / Roboto** with clear font-weight hierarchy and letter-spacing for maximum readability.

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Display / H1` | `2rem` (32px) | `800` (Extrabold) | `1.2` | `-0.02em` | Main dashboard titles |
| `Heading / H2` | `1.5rem` (24px) | `700` (Bold) | `1.3` | `-0.01em` | Section titles & modal headers |
| `Title / H3` | `1.125rem` (18px) | `700` (Bold) | `1.4` | `0` | Card titles & list item headings |
| `Body Large` | `1rem` (16px) | `500` (Medium) | `1.5` | `0` | Main text & form input text |
| `Body Default`| `0.875rem` (14px) | `400` (Regular) / `600` (Semi) | `1.5` | `0` | Descriptions & table cells |
| `Caption / Small` | `0.75rem` (12px) | `600` (Semi) / `700` (Bold) | `1.4` | `0.02em` | Meta info, chips, timestamps |

---

## 🔲 Border Radiuses & Elevation

- **Buttons & Pills (`rounded-full`)**: `9999px`
  - Used for action buttons, search bars, topic chips, and status badges.
- **Inner Inputs & Small Containers (`rounded-xl` / `rounded-2xl`)**: `12px` - `16px`
  - Used for input text fields, select dropdowns, table rows, and alert banners.
- **Cards & Outer Containers (`rounded-3xl`)**: `24px` - `28px`
  - Used for dashboard cards, main content grids, and modal wrappers.
- **Elevation / Shadows**:
  - *Card Elevation*: `0 4px 20px rgba(0, 0, 0, 0.25)`
  - *Popover / Dialog*: `0 12px 36px rgba(0, 0, 0, 0.5)`
  - *Neon Button Glow*: `0 4px 14px rgba(56, 223, 255, 0.3)`

---

## 📏 Spacing Constraints & Layout Grid

Built on an **8px / 4px base spatial grid** for consistent padding and margins across mobile and desktop.

### 1. Component Padding Scale
- **Compact (`px-3 py-1.5`)**: `12px` horizontal, `6px` vertical (Buttons, chips).
- **Medium (`p-4` / `p-5`)**: `16px` - `20px` (Inner card containers, list items).
- **Spacious (`p-6` / `p-8`)**: `24px` - `32px` (Outer dashboard sections, modal dialogs).

### 2. Grid & Flex Gap Scale
- **Tight (`gap-2` / `8px`)**: Icon + text pairs, chip groups.
- **Medium (`gap-4` / `16px`)**: Form field columns, list items.
- **Wide (`gap-6` / `24px`)**: Dashboard 2-column cards, section spacing.

### 3. Responsive Constraints
- **Desktop Sidebar Width**: Fixed `260px`
- **Content Area Max Width**: `1400px` (`maxWidth="xl"`)
- **Card Grid Layout**: 2 items per row on desktop (`md={6}`), 1 item per row on mobile (`xs={12}`).

---

## ✨ Micro-Interactions & Glassmorphism

1. **Card Hover Effect**:
   - `transform: translateY(-2px)`
   - `border-color: rgba(56, 223, 255, 0.3)`
   - `transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`
2. **Glassmorphism Overlay**:
   - `background: rgba(20, 22, 29, 0.75)`
   - `backdrop-filter: blur(12px)`
3. **Active Pill State**:
   - Background gradient: `linear-gradient(135deg, #38DFFF 0%, #00B2FE 100%)`
   - Contrast text: `#0D0E12` (Extrabold)
