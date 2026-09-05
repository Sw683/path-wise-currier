# PathWise India ? Systematic Testing & Architecture Guide (`TESTING.md`)

This document provides a complete overview of the architecture, components, data models, user flows, testing specifications, and known limitations of the **PathWise India** AI Career Navigation platform.

---

## 1. Complete Page & View List

PathWise India is structured as a responsive Single Page Application (SPA) with tab/role-driven view routing:

| View ID | Component Name | Route / Trigger | Primary Target User | Key Purpose |
|---|---|---|---|---|
| `home` | `HeroSection.tsx` | Header Logo / "Home" tab | All Users | Value proposition, 4-tier strategy philosophy, live stats ticker, quick demo profile switcher, and 30-second stream teaser quiz. |
| `assessment` | `OnboardingWizard.tsx` | "Assessment" tab | Students (Class 8?12) | 5-step diagnostic collecting demographics, marks, 8-dimension interest ratings, financial feasibility, and career aspirations. |
| `dashboard` | `RoadmapDashboard.tsx` | "My Roadmap" tab | Students & Parents | Personalized roadmap with AI Compatibility Score, 4-Tier Strategy cards, "Why This Recommendation" explainability, 30-day checklist, and 6-month goals. |
| `simulator` | `PathSimulator.tsx` | "What-If Simulator" tab | Students & Parents | Interactive timeline simulator with real-time Plan A entrance failure recovery loops and coaching/budget adjustments. |
| `tree` | `CareerTreeVisualizer.tsx` | "Career Tree" tab | Students & Parents | Visual decision graph showing stream branching, entrance exams, recovery loops, and destination careers. |
| `exams` | `ExamExplorer.tsx` | "Exams & CETs" tab | Students & Educators | Searchable & filterable directory of 40+ Indian entrance exams with syllabus, competition ratios, fees, free prep resources, and recovery paths. |
| `scholarships` | `ScholarshipFinder.tsx` | "Scholarships" tab | Students & Parents | Searchable matcher of 25+ verified central, state, and CSR scholarships with income cap, gender, and course filters. |
| `sports` | `SportsNavigator.tsx` | "Sports Navigator" tab | Student-Athletes & Parents | Grassroots-to-national progression milestones for 14 sports, dual-career academic degrees, and 5% government sports quota employment. |
| `skills` | `EarlySkillsBuilder.tsx` | "Class 8-10 Skills" tab | Class 8?10 Students | Curated micro-skills (Python, Web Dev, UI/UX, Public Speaking, Finance) with 3 practice mini-projects and safe student hackathons. |
| `chatbot` | `CareerMentorChatbot.tsx` | "Career Mentor AI" button | Students & Parents | Conversational diagnostic counselor with minor-safe responses, context memory, and quick reply pills. |
| `mentors` | `MentorMarketplace.tsx` | "Talk to Mentors" tab | Students & Parents | Verified mentor directory, 30-min consultation booking, Guardian Shield minor consent, 10 pre-call questions, and post-call action plan. |
| `compare` | `CareerComparison.tsx` | Direct link / Comparator | Students & Parents | Side-by-side comparison of 3 careers across 10 vital dimensions (difficulty, cost, duration, salary, risk, backups). |
| `knowledge` | `KnowledgeInsights.tsx` | Direct link / Knowledge | Students & Parents | Source-attributed career experiences separating verified facts (NIRF/Govt) from curated alumni consensus. |
| `parent` | `ParentDashboard.tsx` | "Parent" role switch | Parents & Guardians | College Education Inflation & Monthly SIP Planner, Stream Myth-Buster Guide, and student mental health rules. |
| `admin` | `AdminConsole.tsx` | "Admin" role switch | Platform Administrators | Platform health metrics, mentor KYC verification queue, and child safety flagged message moderation. |

---

## 2. Complete Feature List

1. **4-Tier Strategy Framework**:
   - High-Probability Path (best fit for current marks & state domicile).
   - Ambitious Dream Path (Tier-1 national institutions: IIT, AIIMS, NLSIU, IIM IPM).
   - Solid Backup Path (failure recovery route ensuring one entrance exam never derails a career).
   - Low-Cost / High-ROI Path (government colleges, polytechnics, fee waivers, NPTEL/SWAYAM).
2. **5-Step Student Onboarding & Assessment**:
   - Location tier (Tier-1 to Rural), school board (CBSE, ICSE, State, KV), device/internet context.
   - Subject marks diagnostic (Maths, Science, English, SST) and daily study capacity.
   - 8-Dimensional Interest Vector calculation (Analytical, Technical, Scientific, Social, Creative, Business, Physical, Leadership).
   - Sensitive financial reality parameters with "Prefer not to disclose" support.
   - Career aspiration target selection.
3. **AI Recommendation & Explainability Engine**:
   - Weighted multi-factor compatibility scoring (45%?96%).
   - Transparent "Why This Recommendation?" bulleted rationale.
   - Class 11 stream selection advice with non-discriminatory guidance across all streams.
4. **"What If I Choose This?" Path Simulator**:
   - Dynamic simulation of 10+ career timelines.
   - "Simulate Plan A Failure" toggle illustrating resilient backup recovery branches.
   - Coaching mode, college budget, and relocation variable toggles.
5. **Interactive Visual Career Tree**:
   - Visual SVG node graph of stream choices, exams, recovery loops, and destination careers.
6. **Comprehensive Exam & Scholarship Directory**:
   - 40+ entrance examinations with official portals and free prep resources.
   - 25+ verified scholarships with eligibility, income cap, and direct application links.
7. **Sports Career & Dual-Career Navigator**:
   - Tier 1?3 age milestones, Khelo India schemes, compatible degrees, and 5% PSU sports quota jobs.
8. **Class 8?10 Early Skills & Portfolio Builder**:
   - Age-appropriate micro-skills with 3 practice deliverables and safe hackathons.
9. **Career Mentor AI Chatbot**:
   - Empathetic guidance chatbot with quick suggested replies and diagnostic flow.
10. **"Talk to a Real Professional" Mentor Marketplace**:
    - KYC-verified mentors across Tech, Medicine, Law, CA, Defense, Sports, and Design.
    - 30-min consultation tiers (?99/?199/?299/Free for EWS).
    - Guardian Shield child safety safeguards and automated 10-question pre-call prep sheet.
11. **Parent Higher Education Inflation & SIP Calculator**:
    - Future college cost projection at 8?12% inflation and recommended monthly SIP investment.
    - Myth-buster guide for Indian parents debunking societal pressure.
12. **Admin & Moderation Console**:
    - Platform usage metrics, mentor KYC approval queue, and flagged message review.
13. **Preloaded Demo Personas**:
    - Instant demo switcher including **Aarav Sharma** (Class 10 Tier-2 AI aspirant with low coaching budget - Section 29 benchmark), Priya Patel, Rohan Verma, and Sneha Mukherjee.

---

## 3. End-to-End User Flows

### Flow A: Student Self-Discovery & Roadmap Generation
1. Student lands on Home page (`HeroSection.tsx`).
2. Student clicks "Take 5-Min Career Assessment" or selects "Assessment" tab (`OnboardingWizard.tsx`).
3. Student completes Steps 1 to 5 (Demographics ? Marks ? 8 Scenario Ratings ? Financial Feasibility ? Career Goal).
4. System executes `evaluateStudentProfile()`, computing the 8-dimension interest vector and ranking all 11 career pathways.
5. Student is redirected to `RoadmapDashboard.tsx` displaying:
   - AI Compatibility Score (%)
   - 4-Tier Strategy cards (High-Probability, Ambitious, Backup, Low-Cost)
   - "Why This Recommendation?" explainability
   - Class 11 Stream Advice
   - My Next 30 Days checklist & 6-month goals
6. Student explores `PathSimulator.tsx` to test Plan A failure scenarios and recovery loops.

### Flow B: Mentor Consultation Booking with Guardian Shield
1. Student/Parent opens `MentorMarketplace.tsx`.
2. Filters or selects a verified professional (e.g. AI Engineer or Doctor).
3. Clicks "Book Session" to open the booking modal.
4. Selects a 30-minute time slot.
5. Fills parent/guardian email and checks the mandatory Guardian Shield consent box.
6. Clicks "Confirm & Generate Prep Sheet".
7. System creates a `Booking` record with an auto-generated 10-Question Prep Sheet and Post-Call Action Plan.

### Flow C: Parent Financial Planning & Stream Clarity
1. User switches role to "Parent" via Navbar.
2. System navigates to `ParentDashboard.tsx`.
3. Parent adjusts current 4-year degree cost (e.g. ?6 Lakhs), expected inflation (9%), and mutual fund return rate (12%).
4. System computes future inflated cost at college entry year and required monthly SIP.
5. Parent reads Stream Myth-Busters and student mental health guidelines.

---

## 4. Important API Endpoints (Architecture Blueprint for Backend Integration)

When migrating from client-side in-memory mock state to a full-stack REST/GraphQL backend, the following endpoints should be implemented:

| HTTP Method | Endpoint Path | Description | Request Body / Query Params | Response Object |
|---|---|---|---|---|
| `POST` | `/api/v1/assessment/evaluate` | Evaluates student profile & computes ranked recommendations | `{ profile: StudentProfile }` | `{ recommendations: RecommendationResult[] }` |
| `GET` | `/api/v1/careers` | Fetches all career pathways | `?stream=PCM&difficulty=High` | `CareerPath[]` |
| `GET` | `/api/v1/careers/:id` | Fetches single career details | `id: string` | `CareerPath` |
| `GET` | `/api/v1/exams` | Fetches catalog of entrance exams | `?category=Engineering&difficulty=Extreme` | `Exam[]` |
| `GET` | `/api/v1/scholarships` | Fetches scholarships matching student filters | `?gender=Female&incomeLimit=250000` | `Scholarship[]` |
| `GET` | `/api/v1/sports` | Fetches sports pathways & dual degrees | `?sportId=cricket` | `SportsPath[]` |
| `GET` | `/api/v1/skills` | Fetches Class 8?10 micro-skills & projects | `?classLevel=10` | `EarlySkill[]` |
| `GET` | `/api/v1/mentors` | Fetches verified mentors | `?field=Technology&verified=true` | `Mentor[]` |
| `POST` | `/api/v1/mentors/book` | Creates consultation booking with guardian consent | `{ mentorId, slot, guardianEmail, guardianConsent }` | `Booking` |
| `POST` | `/api/v1/chat/message` | Sends prompt to Career Mentor AI counselor | `{ message: string, profileContext: StudentProfile }` | `{ reply: string, quickReplies: string[] }` |
| `POST` | `/api/v1/parent/inflation-sip`| Calculates education inflation & monthly SIP | `{ currentCost, inflationRate, returnRate, currentClass }` | `InflationProjection` |
| `GET` | `/api/v1/admin/metrics` | Fetches platform analytics & KYC queue | `Authorization: Bearer <AdminToken>` | `{ totalStudents, kycQueue, safetyFlags }` |

---

## 5. Important Components

| Component | File Path | Responsibilities |
|---|---|---|
| `Navbar` | `src/components/Navbar.tsx` | Top safety bar, demo profile switcher, brand navigation, role switcher (`student`/`parent`/`admin`), AI chatbot modal trigger. |
| `HeroSection` | `src/components/HeroSection.tsx` | Landing banner, 4-tier philosophy showcase, live platform statistics ticker, Section 29 benchmark cards, 30s mini stream quiz. |
| `OnboardingWizard` | `src/components/OnboardingWizard.tsx` | 5-step form wizard, marks sliders, 8 scenario buttons, financial selectors, linear interest vector calculation, profile update. |
| `RoadmapDashboard` | `src/components/RoadmapDashboard.tsx` | 4-Tier Strategy cards, explainability list, Class 11 stream rationale, milestone timeline, 30-day interactive checklist, 6-month goals, ranked careers list. |
| `PathSimulator` | `src/components/PathSimulator.tsx` | Career selector, Plan A failure toggle, coaching/budget scenario controls, 5-stage progressive timeline cards. |
| `CareerTreeVisualizer`| `src/components/CareerTreeVisualizer.tsx`| Stream selector, interactive decision tree, exam nodes, recovery loop demo, destination careers. |
| `ExamExplorer` | `src/components/ExamExplorer.tsx` | Search input, category filter buttons, exam difficulty badges, fee, competition ratio, free prep links, fallback options, official portal URLs. |
| `ScholarshipFinder` | `src/components/ScholarshipFinder.tsx` | Search input, gender and provider filter dropdowns, award badges, eligibility summaries, income caps, official portal links. |
| `SportsNavigator` | `src/components/SportsNavigator.tsx` | Sport selector dropdown, dual-career strategy banner, Tier 1?3 age milestone cards, 5% PSU quota recruitment list, compatible degrees. |
| `EarlySkillsBuilder`| `src/components/EarlySkillsBuilder.tsx` | Skill selector pills, 3 mini-project deliverables, free curated learning links, portfolio and safe hackathons guide. |
| `CareerMentorChatbot`| `src/components/CareerMentorChatbot.tsx`| Chat message scroll window, empathetic counselor simulation, context-aware responses, quick reply buttons, input form. |
| `MentorMarketplace` | `src/components/MentorMarketplace.tsx` | Verified mentor cards, hourly rates, booking modal, slot selection, Guardian Shield consent checkbox, 10 pre-call questions, post-call action plan. |
| `CareerComparison` | `src/components/CareerComparison.tsx` | 3 career dropdown selectors, 10-dimension side-by-side comparison table. |
| `KnowledgeInsights` | `src/components/KnowledgeInsights.tsx` | Attributed career insights, verified fact vs community consensus badges, source citation links. |
| `ParentDashboard` | `src/components/ParentDashboard.tsx` | Degree cost, inflation rate, and return rate sliders, future cost & SIP output cards, stream myth-buster cards, student mental health guidelines. |
| `AdminConsole` | `src/components/AdminConsole.tsx` | Platform KPIs, minor safety flagged message log with resolve toggle, mentor KYC verification queue table. |
| `Footer` | `src/components/Footer.tsx` | Ethical AI disclaimers, minor safety safeguards notice, quick links, non-discrimination pledge. |
| `AppContext` | `src/context/AppContext.tsx` | React Context provider managing global state (`activeProfile`, `recommendations`, `role`, `activeTab`, `bookings`, `guardianShieldActive`). |

---

## 6. Database Entities & Schemas

Defined in `src/types/index.ts`:

- **`StudentProfile`**: Demographics, school board, medium, device context, academics, 8-dim interest vector, financial feasibility, and career aspirations.
- **`CareerPath`**: 4-Tier pathways (High Probability, Ambitious, Backup, Low-Cost), exams, difficulty, fees, starting CTC, mid-career CTC, and milestone timeline.
- **`Exam`**: 40+ entrance examinations with official portal, syllabus, fees, and failure recovery.
- **`Scholarship`**: 25+ verified scholarships with eligibility, income cap, and direct application links.
- **`SportsPath`**: Progression milestones, Khelo India, compatible dual degrees, and PSU recruitment.
- **`EarlySkill`**: Class 8?10 micro-skills, 3 practice mini-projects, deliverables, and hackathons.
- **`Mentor`**: Verified professional profiles with KYC status, hourly rate, and availability.
- **`Booking`**: Consultation records with Guardian Shield parental consent and pre-call prep sheets.
- **`AttributedInsight`**: Verified facts vs curated alumni consensus with source citations.

---

## 7. Known Limitations

1. **State Persistence**: Profile updates and booking creations are stored in-memory in React Context. A page reload resets to initial demo state unless synchronized with LocalStorage or a backend database.
2. **Browser URL Routing**: View navigation uses tab state (`activeTab`) rather than HTML5 History API (`/dashboard`, `/exams`, etc.).
3. **Simulated Payment Gateway**: Mentor booking records are created immediately without connecting to a live Razorpay/UPI/Stripe payment gateway.
4. **Offline AI Counselor**: The Career Mentor AI chatbot uses deterministic client-side intent matching rather than streaming responses from a live LLM API.
5. **Role Access Control**: Role switching between Student, Parent, and Admin is unauthenticated for demonstration purposes.

---

## 8. External Dependencies

- **Runtime & Build Tooling**: Node.js (v20+ / v24 LTS), Vite (v5.4.21), TypeScript (v5.5.3).
- **Frontend Libraries**: React & React-DOM (v18.3.1), Tailwind CSS (v3.4.1), Lucide React (v0.344.0), PostCSS & Autoprefixer.
- **External Web Assets**: Google Fonts CDN (`Inter`, `Outfit`), Unsplash Image CDN, Official Indian Government portals (`nta.ac.in`, `scholarships.gov.in`, `upsc.gov.in`, `icai.org`, `iiseradmission.in`, `joinindianarmy.nic.in`).

---

## 9. Environment Variables Required (For Full Production Deployment)

| Variable Name | Required / Optional | Default Value (Dev) | Description |
|---|---|---|---|
| `VITE_APP_TITLE` | Optional | `PathWise India` | Title displayed in header and document metadata. |
| `VITE_API_BASE_URL` | Optional (Prod) | `http://localhost:8000/api/v1` | Base URL for backend REST API services. |
| `VITE_GEMINI_API_KEY` | Optional (Prod) | `""` | Google Gemini API key for live AI Career Counselor chat streaming. |
| `VITE_RAZORPAY_KEY_ID` | Optional (Prod) | `""` | Public Razorpay key ID for processing mentor consultation payments. |
| `VITE_ENABLE_ANALYTICS`| Optional | `false` | Enables Google Analytics / PostHog tracking. |

---

## 10. Systematic Testing Plan

### A. Unit Tests (Recommended with Vitest)
- **`decisionEngine.test.ts`**:
  - Test Section 29 benchmark: Aarav Sharma (Class 10 Tier-2 PCM AI aspirant with low coaching budget) generates PCM stream and Software/AI Engineer as #1 recommendation.
  - Test Medical aspirant (Priya Patel, 94% Science/Bio) generates PCB stream and MBBS/Doctor as #1 recommendation.
  - Test Commerce aspirant (Rohan Verma) generates Commerce stream and CA as #1 recommendation.
  - Test Humanities/Law aspirant (Sneha Mukherjee) generates Humanities stream and Corporate Lawyer as #1 recommendation.
- **`inflationCalculator.test.ts`**:
  - Test `calculateEducationCost()` returns compounding future cost and non-zero monthly SIP for classes 8 through 12.

### B. Component & Integration Tests (Recommended with React Testing Library)
- **`OnboardingWizard.test.tsx`**: Verify step progression (1 ? 5), range slider interactions, 8 scenario clicks, and submission triggering `updateProfile`.
- **`PathSimulator.test.tsx`**: Verify "Simulate Plan A Failure" toggle updates displayed failure recovery route from Tier-1 IIT to State College / BCA + GitHub portfolio.
- **`MentorMarketplace.test.tsx`**: Verify Guardian Shield consent checkbox enables "Confirm & Generate Prep Sheet" button and creates a confirmed booking.
- **`ExamExplorer.test.tsx` & `ScholarshipFinder.test.tsx`**: Verify search filtering by keyword and category pills.

### C. Manual E2E Verification Checklist
1. Load `http://localhost:3000/`.
2. Switch through all 4 Demo Profiles in the top bar; verify that `RoadmapDashboard` updates compatibility scores, stream recommendations, and explainability bullet points immediately.
3. Switch role to `Parent`; verify that Education Inflation and SIP Planner sliders react dynamically.
4. Switch role to `Admin`; verify that KYC verification queue and child safety flagged logs render with interactive resolve buttons.
5. Open `Career Mentor AI` chatbot; verify quick reply pills trigger responsive counselor dialog.
