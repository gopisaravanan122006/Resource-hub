# ECE Department Resource Portal
### Group 4 – Pixel Pioneers

A modern, responsive, peer-driven academic resource portal built with **React.js** for Electronics & Communication Engineering (ECE) students to access lecture notes, laboratory manuals, question banks (PYQs), simulation scripts, and reference links organized across all 8 semesters.

---

## 🚀 Key Features

- **Subject-wise & Semester Organization**: Comprehensive curriculum covering Semesters 1 through 8 with subject syllabus modules, academic credits, and lead faculty info.
- **Dynamic Multi-Criteria Search & Filter**: Real-time search across titles, subject codes, descriptions, contributor names, and tags, with category and format filters.
- **Saved Bookmarks & Local Persistence**: One-click bookmarking with animated celebration feedback, localStorage synchronization, and JSON export capability.
- **Resource Details & Student Reviews**: Detailed breakdown with direct access/download, user ratings, student comment threads, and related resource recommendations.
- **Contribute / Add Resource**: Interactive form with live card preview, robust input validation, and automatic inclusion into the portal state.
- **Interactive Lab Tools & Hub**:
  - ⚡ **Resistor Color Code Calculator**: 4-Band & 5-Band resistance and tolerance calculator with visual resistor rendering.
  - 🔌 **IC Pinout Quick Reference**: Pinouts for NE555 Timer, LM741 Op-Amp, ESP32 NodeMCU, and Intel 8086.
  - 🌐 **Academic Portals**: Direct quick-access to NPTEL, Virtual Labs, IEEE Xplore, Falstad, and EDA Playground.
- **Theme Switcher**: Dark / Light mode toggle with sleek engineering circuit aesthetic.
- **Grid & Table View Modes**: Easily switch between visually rich card grids and dense data tables.

---

## 🛠️ Project Structure (All `.js` React Files)

```
resource-hub/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.js                  # Application entry point
│   ├── App.js                   # Root router and layout setup
│   ├── index.css                # Tailwind CSS and circuit utilities
│   ├── data/
│   │   └── initialData.js       # Realistic ECE dataset (Sem 1-8, 20+ courses, 18+ resources)
│   ├── context/
│   │   ├── ResourceContext.js   # Central state, bookmarks, reviews, CRUD, stats
│   │   └── ThemeContext.js      # Light/Dark mode state
│   ├── hooks/
│   │   ├── useLocalStorage.js   # Local storage synchronization
│   │   └── useResourceFilter.js # Array methods (map, filter, reduce, sort)
│   ├── utils/
│   │   ├── formatters.js        # Formatting dates, categories, sizes
│   │   └── validators.js        # Form validation rules
│   ├── components/
│   │   ├── common/              # Reusable UI (Navbar, Footer, Button, Card, Badge, Modal, Input, Select, Rating, Toast, EmptyState, Breadcrumb)
│   │   ├── dashboard/           # StatCard, SemesterGrid, AnnouncementBanner, QuickLinkCard
│   │   ├── resources/           # ResourceCard, ResourceTable, ResourceFilterBar, ResourceFormModal, CommentSection
│   │   ├── subjects/            # SubjectCard
│   │   └── tools/               # ResistorCalculator, PinoutViewer
│   └── pages/
│       ├── DashboardPage.js     # Main overview & summary metrics
│       ├── SubjectsPage.js      # All ECE subjects by semester
│       ├── SubjectDetailPage.js # Subject modules & subject-filtered materials
│       ├── ResourcesPage.js     # Multi-filter explorer (Grid/Table)
│       ├── ResourceDetailPage.js # Full file details, reviews & related items
│       ├── BookmarksPage.js     # Saved items & export
│       ├── ImportantLinksPage.js# Lab tools & external academic links
│       ├── AddResourcePage.js   # Standalone contribution form with live preview
│       └── NotFoundPage.js      # 404 handler
```

---

## 💡 How Array Methods & React Hooks Are Demonstrated

1. **`map()`**: Used across semester grids, subject cards, resource cards, table rows, comment streams, pinout badges, and category pills.
2. **`filter()`**: Powering search queries, semester filters, category selectors, subject-specific resource listings, and bookmark lists.
3. **`find()`**: Used in retrieving single resource items (`resources.find(...)`) and subject details by route param ID (`useParams()`).
4. **`reduce()`**: Dynamically computing aggregate dashboard metrics (total downloads, category distributions, semester allocations, and real-time average star ratings).
5. **`useState` & `useEffect`**: Managing filter states, form validation states, modal visibility, search inputs, active tabs, theme persistence, and route change scroll restoration.
6. **`useContext`**: Sharing resource data, bookmarks, toast alerts, and theme preferences across the entire component tree.

---

## 🏃 Running the Application

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```
