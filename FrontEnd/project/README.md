# SmartHire AI

> AI-powered recruitment intelligence platform — resume parsing, job matching, and candidate analytics.

SmartHire AI is a modern, production-ready React frontend for an AI recruitment platform. It connects to a FastAPI backend (configurable via environment variable) to upload resumes and job descriptions, generate job-match predictions, and display deep candidate analytics.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tool & dev server)
- **Material UI v6** (component library & theming)
- **React Router DOM v6** (routing)
- **Axios** (HTTP client)
- **Recharts** (charts & data visualization)
- **Framer Motion** (animations & micro-interactions)
- **React Hook Form** + **Yup** (form handling & validation)
- **React Dropzone** (drag & drop file uploads)
- **React Hot Toast** (toast notifications)
- **Poppins / Inter** fonts via `@fontsource`

## Features

- Modern SaaS dashboard with glassmorphism, soft shadows, 18px border radius
- Light / Dark mode (persisted to localStorage, respects system preference)
- Animated statistics cards with count-up
- Responsive sidebar + top navbar with search, notifications, profile menu
- Drag & drop file upload with progress bars
- Recharts-powered area, pie, bar, and radar charts
- Professional tables with search, filters, and pagination
- Skeleton loaders, empty states, and toast notifications
- Fully responsive — mobile, tablet, desktop

## Pages

| Page | Description |
|------|-------------|
| Dashboard | Statistics cards, monthly resumes chart, prediction distribution, top skills, recent activities & predictions |
| Upload Resume | Drag & drop PDF upload → `POST /resume/upload` → parsed info display |
| Upload Job | Drag & drop JSON upload → `POST /job/upload` → parsed job display |
| Predictions | Select resume → `POST /predictions/{resume_id}` → ranked match table with Analyse buttons |
| Candidate Analysis | 3-column analytics: profile, circular score + radar chart, recommendations |
| Jobs | Searchable, filterable, paginated jobs table |
| Resumes | Searchable, filterable, paginated resumes table with view & delete |
| Power BI Dashboard | Embedded Power BI report (replace URL to go live) |
| Settings | Dark mode toggle, theme color picker, language selection, notifications |

## API Configuration

The frontend talks to a FastAPI backend. The base URL defaults to `http://localhost:8000` and can be overridden with an environment variable:

```bash
# .env
VITE_API_URL=http://localhost:8000
```

### Endpoints used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/resume/upload` | Upload & parse a PDF resume |
| POST | `/job/upload` | Upload & parse a JSON job description |
| POST | `/predictions/{resume_id}` | Generate job-match predictions for a resume |
| GET | `/resume` | List all resumes |
| GET | `/job` | List all jobs |
| GET | `/resume/{id}` | Get a single resume |
| DELETE | `/resume/{id}` | Delete a resume |
| GET | `/analysis/{resume_id}/{job_id}` | Get candidate analysis (optional) |

> When the backend is unavailable, the app gracefully falls back to demo data so the UI remains explorable.

## Project Structure

```
src/
  assets/
  components/      # Reusable UI: StatCard, ScoreRing, FileDropzone, Skeletons, EmptyState, PageHeader
  context/          # ThemeContext (light/dark mode)
  hooks/            # useApi, useResumes, useJobs
  layouts/          # MainLayout, Sidebar, Topbar
  pages/            # Dashboard, UploadResume, UploadJob, Predictions, CandidateAnalysis, Jobs, Resumes, PowerBI, Settings, NotFound
  routes/           # AppRoutes (lazy-loaded)
  services/         # api.ts (Axios instance), endpoints.ts (API functions)
  styles/           # theme.ts (MUI theme tokens)
  App.tsx
  main.tsx
  index.css
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The app runs at `http://localhost:5173` by default.

## Customization

- **Theme colors**: edit `src/styles/theme.ts` (`brand` object) and the `getDesignTokens` palette.
- **Power BI embed**: replace `POWER_BI_EMBED` in `src/pages/PowerBI.tsx` with your published report URL.
- **API base URL**: set `VITE_API_URL` in a `.env` file at the project root.

## License

MIT — free to use and adapt.
