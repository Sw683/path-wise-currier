# PathWise India ? Known Issues & Bug Tracking (`BUGS.md`)

This document tracks all identified bugs, edge cases, missing validations, and UX gaps discovered during systematic inspection of the PathWise India codebase.

### Severity Definitions:
- **P0**: Application unusable / security vulnerability / irreversible data loss.
- **P1**: Major feature broken with no functional workaround.
- **P2**: Important functionality impaired or misleading, but a workaround exists.
- **P3**: Minor UI/UX inconsistency, formatting error, or missing empty state.

---

## Active Bug Tracker

| ID | Feature | Bug Description | Severity | Reproduction Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|
| `BUG-001` | ExamExplorer | Category filter pill truncation in Exam Explorer | **P2** | 1. Navigate to "Exams & CETs" tab.<br>2. Inspect category filter pills at the top. | All 10 exam categories (including Defence, Commerce, Science, Design, Management) should be visible and selectable via horizontal scroll. | Only the first 5 categories are rendered because `categories.slice(0, 5)` was hardcoded in `ExamExplorer.tsx` (line 50). | Open |
| `BUG-002` | ExamExplorer & ScholarshipFinder | Missing empty search state feedback | **P3** | 1. Go to "Exams & CETs" or "Scholarships" tab.<br>2. Type a non-existent search query like `astronomy_xyz`. | A user-friendly empty state message ("No matching exams/scholarships found") and a "Reset Filters" button should render. | A blank grid is displayed with no visual feedback explaining why no results appear. | Open |
| `BUG-003` | RoadmapDashboard | 30-Day checklist initializes with static hardcoded items instead of dynamic top recommendation checklist | **P2** | 1. Switch demo profile in navbar to "Priya Patel" (Medical aspirant) or "Rohan Verma" (CA aspirant).<br>2. View "My Next 30 Days Actions" on the Roadmap Dashboard. | Checklist items should dynamically initialize from `topRec.next30DaysChecklist` (e.g. NEET/Biology or CA Foundation tasks). | Checklist initializes with hardcoded engineering tasks ("Start Python fundamentals on Replit") defined in local `useState` initial state. | Open |
| `BUG-004` | OnboardingWizard | Absence of required input validation on Step 1 (Empty Student Name) | **P2** | 1. Go to "Assessment" tab (`OnboardingWizard.tsx`).<br>2. Clear the student name input.<br>3. Click "Continue". | Form should prevent advancing to Step 2 if the name is empty or whitespace, displaying an inline error message. | Wizard allows advancing through all 5 steps and submitting with an empty student name. | Open |
| `BUG-005` | MentorMarketplace & OnboardingWizard | Absence of email format validation for Guardian Email | **P2** | 1. Open "Talk to Mentors" tab and click "Book Session".<br>2. In the Guardian Consent field, enter an invalid string like `not_an_email`.<br>3. Check consent box and click Confirm. | Email input should validate standard email regex (`^[^\s@]+@[^\s@]+\.[^\s@]+$`) before permitting confirmation. | Any arbitrary text string is accepted without email syntax validation. | Open |
| `BUG-006` | Navbar | "Career Comparison" and "Knowledge Insights" missing from top navigation bar | **P3** | 1. Look at the desktop and mobile navigation items in `Navbar.tsx`. | All major views (`compare`, `knowledge`) should be accessible directly from the navigation bar or a "More" dropdown. | "Career Comparison" and "Knowledge Insights" are omitted from `navItems` array and only accessible via secondary in-page buttons. | Open |
| `BUG-007` | Application State | In-memory state resets to default on browser page reload | **P2** | 1. Complete the 5-step assessment or customize student profile marks.<br>2. Reload the browser page (`F5`). | User's profile modifications, assessment results, and bookings should persist across sessions using `localStorage`. | State resets to default demo profile on every page refresh because state is stored only in React Context memory. | Open |
| `BUG-008` | MentorMarketplace | Booking confirmation lacks simulated receipt / transaction ID breakdown | **P3** | 1. Open Mentor Marketplace modal.<br>2. Select a slot and complete booking. | Confirmation screen should display a generated booking ID (e.g. `PW-BK-89421`), invoice breakdown (?99 + GST / EWS waiver), and a "Download Prep Sheet" button. | Modal renders a basic text confirmation without transaction ID or export button. | Open |

---

## Verification & Safe Maintenance Instructions

1. **Before fixing any bug**: Verify that all TypeScript types in `src/types/index.ts` remain strictly aligned.
2. **After fixing any bug**: Run `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\npm.cmd" run build` to guarantee zero compilation or bundle regressions.
