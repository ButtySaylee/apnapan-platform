# 🎨 School Partnership Page - Visual Architecture

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTRY POINTS                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Landing Page (/)          Community Page (/community)        │
│  ├─ "For School Leaders"   ├─ Header Link                    │
│  │   ↓                      │   ↓                             │
│  └─────────────────┬────────┴────────────────────────────┐  │
│                    ↓                                     ↓  │
│         ┌──────────────────────────────────────────────────┐ │
│         │    School Partnership Page (/schools)           │ │
│         │                                                  │ │
│         │    ✨ NEW DESTINATION FOR SCHOOL LEADERS ✨     │ │
│         └──────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Page Sections Map (Scroll Order)

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  📍 HERO SECTION (Immediate Hook)                    │
│  ├─ Question: "Two schools. Same test scores?"       │
│  ├─ Value prop: Different lived experience            │
│  ├─ Quick stats: +47%, 12+, 89%                       │
│  ├─ CTA: "See the Transformation"                     │
│  └─ Secondary: "Download Partnership Guide"           │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  📊 INTERACTIVE COMPARISON SECTION                    │
│  ├─ Headline: "Two Schools. Same Benchmark."         │
│  ├─ Toggle Buttons: 4 belonging metrics               │
│  ├─ Left Column: Traditional School (A)               │
│  │   ├─ 50% Student belonging                         │
│  │   ├─ 38% Voice & agency                            │
│  │   ├─ 52% Classroom safety                          │
│  │   └─ 61% Learning motivation                       │
│  ├─ Right Column: Transformed School (B)              │
│  │   ├─ 88% Student belonging                         │
│  │   ├─ 82% Voice & agency                            │
│  │   ├─ 91% Classroom safety                          │
│  │   └─ 87% Learning motivation                       │
│  └─ Animated bars with smooth transitions             │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  💡 WHY IT MATTERS (3 Cards - Horizontal)             │
│  ├─ 🎯 Belonging Predicts Performance                 │
│  ├─ 🗣️ Student Voice Changes Everything               │
│  └─ 🔄 Quick to Iterate, Easy to Sustain              │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🚀 IMPLEMENTATION TIMELINE                           │
│  ├─ Phase 1: Listen (6-8 weeks) 👂                    │
│  │   ├─ Conduct student circles                       │
│  │   ├─ Map gaps                                      │
│  │   └─ Co-create framework                           │
│  │                                                    │
│  ├─ Phase 2: Design (8-10 weeks) ✏️                   │
│  │   ├─ Co-design interventions                       │
│  │   ├─ Create surveys                                │
│  │   └─ Build feedback loops                          │
│  │                                                    │
│  ├─ Phase 3: Implement (12-16 weeks) 🚀               │
│  │   ├─ Launch circles                                │
│  │   ├─ Track metrics                                 │
│  │   └─ Build mentoring                               │
│  │                                                    │
│  └─ Phase 4: Scale (Ongoing) 📈                       │
│      ├─ Document outcomes                             │
│      ├─ Train leaders                                 │
│      └─ Adapt for scale                               │
│                                                        │
│  [Horizontal Scrollable Carousel]                     │
│  [← Previous | Phase Cards | Next →]                  │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  📈 REAL OUTCOMES TABLE                               │
│  ┌──────────────────┬────────────┬────────────┐      │
│  │ Metric           │ Traditional│ Transformed│      │
│  ├──────────────────┼────────────┼────────────┤      │
│  │ Academic Perf.   │    72%     │    75%     │  +3% │
│  │ Attendance       │    84%     │    94%     │ +10% │
│  │ Discipline       │    22      │     8      │-64%  │
│  │ Wellbeing        │    58%     │    89%     │+31%  │
│  │ Teacher Retention│    68%     │    91%     │+23%  │
│  └──────────────────┴────────────┴────────────┘      │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🎤 STUDENT VOICES (Interactive)                      │
│  ├─ Toggle: Grade 9 | Grade 7 | Grade 10              │
│  │                                                    │
│  ├─ Before Quote:                                     │
│  │  "I show up because I have to..."                  │
│  │                                                    │
│  ├─ After Quote:                                      │
│  │  "My teacher asks what I think..."                 │
│  │                                                    │
│  ├─ Impact: Engagement +42%                           │
│  └─ School: First Implementation School               │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🏆 SUCCESS STORIES (3 Deep Dives)                     │
│  │                                                    │
│  ├─ Story 1: Mountain Valley High                     │
│  │  Location: Colorado, USA                           │
│  │  Students: 1,200                                   │
│  │  Timeframe: 6 months                               │
│  │  Headline: +47% belonging, -34% discipline         │
│  │  Details: Implemented belonging circles...         │
│  │  Results: [Metrics breakdown]                      │
│  │                                                    │
│  ├─ Story 2: Riverside Academy                        │
│  │  Location: Toronto, Canada                         │
│  │  Students: 850                                     │
│  │  Timeframe: 8 months                               │
│  │  Headline: Teachers "actually know students"       │
│  │  Details: Shifted to narrative portfolios...       │
│  │  Results: [Metrics breakdown]                      │
│  │                                                    │
│  └─ Story 3: Nova International                       │
│     Location: Singapore                               │
│     Students: 1,600                                   │
│     Timeframe: 10 months                              │
│     Headline: 89% predictive accuracy                 │
│     Details: Tracked belonging metrics weekly...      │
│     Results: [Metrics breakdown]                      │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🤝 PARTNERSHIP PROCESS                               │
│  │                                                    │
│  ├─ Your Role:                 Our Role:              │
│  │  ✓ Lead cultural vision      → Facilitate circles │
│  │  ✓ Release teacher time      → Design framework   │
│  │  ✓ Build infrastructure      → Build tools        │
│  │  ✓ Champion the shift        → Coach & support    │
│  │                                                    │
│  └─ Clear role differentiation builds trust          │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  💰 INVESTMENT & TIMELINE                             │
│  ├─ Cost: $40-80K (12-18 months)                      │
│  ├─ Time: 8-15 hours/month from leadership            │
│  └─ Flexible: Multiple pricing models available       │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ✅ RIGHT FIT ASSESSMENT                              │
│  │                                                    │
│  ├─ Great Fit If:             ✗ Not a Fit If:        │
│  │  ✓ Genuinely curious         ✗ Want status quo    │
│  │  ✓ Data → action            ✗ Data → justify     │
│  │  ✓ Teachers open             ✗ Staff resistant    │
│  │  ✓ Wellbeing = core         ✗ Wellbeing = nice   │
│  │                                                    │
│  └─ Self-qualification tool                           │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ❓ FAQ SECTION                                        │
│  ├─ Q: Will this interfere with curriculum?           │
│  │  A: No, integrates into existing structures        │
│  │                                                    │
│  ├─ Q: How do we know it works?                       │
│  │  A: Monthly dashboards, see changes in 6-8 weeks  │
│  │                                                    │
│  ├─ Q: What happens after 12-18 months?              │
│  │  A: You have internal expertise to sustain         │
│  │                                                    │
│  └─ Q: Can we pilot with one grade?                   │
│     A: Absolutely, many schools start small           │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🎯 FINAL CTA                                         │
│  ├─ Headline: "Ready to Join the Movement?"           │
│  ├─ Subheading: The future is about belonging...      │
│  ├─ Primary CTA: "Start a Conversation"               │
│  ├─ Secondary CTA: "Download Partnership Guide"       │
│  └─ Trust: "No commitment. 30-min call."              │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  📞 CONTACT SECTION                                   │
│  ├─ Email: schools@apnapan.org                        │
│  └─ Purpose: Direct school inquiries                  │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🔗 FOOTER                                            │
│  ├─ Copyright & branding                              │
│  ├─ Links: Home | Community Hub | Contact | Privacy   │
│  └─ Footer text: "Measuring What Matters"             │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│               SchoolPartnership.jsx                      │
│           (Main Component - Entry Point)                 │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ State Management                                   │ │
│  ├─ theme: 'dark' | 'light' (localStorage)            │ │
│  ├─ activeMetric: 0-3 (for metric selection)           │ │
│  ├─ activeVoice: 0-2 (for student stories)             │ │
│  └─ scrollPosition: for carousel                       │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Data Arrays (Imported Constants)                   │ │
│  ├─ schoolMetrics[] → MetricComparison              │
│  ├─ outcomeData[] → OutcomesComparison              │
│  ├─ implementationPhases[] → ImplementationTimeline │
│  ├─ studentVoices[] → StudentVoiceComparison        │
│  └─ successStories[] → Success Stories Cards         │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Sub-Components                                     │ │
│  ├─ MetricComparison (Interactive)                   │
│  ├─ ImplementationTimeline (Carousel)                │
│  ├─ StudentVoiceComparison (Toggle)                  │
│  ├─ OutcomesComparison (Table)                       │
│  └─ Various glass cards & sections                   │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Reusable Components (DataViz.jsx)                 │ │
│  ├─ BarChart                                         │
│  ├─ MetricCard                                       │
│  ├─ Timeline                                         │
│  ├─ ComparisonSlider                                 │
│  ├─ ProgressRing                                     │
│  └─ ScrollReveal                                     │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
       ↓                              ↓
  ┌──────────────┐            ┌──────────────────┐
  │ useTheme     │            │ CSS/Animations   │
  │ Hook         │            │ index.css        │
  │              │            │                  │
  │ Manages:     │            │ - Transitions    │
  │ - Theme      │            │ - Animations     │
  │ - Switching  │            │ - Hover effects  │
  │ - Persistence│            │ - Responsive     │
  └──────────────┘            └──────────────────┘
```

---

## Component Tree

```
SchoolPartnership (Main)
├── Header
│   ├── Logo Link (/)
│   ├── Navigation Links
│   │   ├── Community Hub (/community)
│   │   └── School Partnership (/schools)
│   └── Theme Toggle
│
├── Main Content
│   ├── Hero Section
│   │   ├── Pill Badge
│   │   ├── Headline
│   │   ├── Subheading
│   │   ├── CTA Buttons
│   │   └── Quick Stats Grid
│   │
│   ├── Metric Comparison Section
│   │   ├── Headline & Description
│   │   ├── Metric Selection Buttons
│   │   └── MetricComparison Component (Interactive)
│   │
│   ├── Why It Matters (3 Cards)
│   │   ├── Card 1 (Icon + Text)
│   │   ├── Card 2 (Icon + Text)
│   │   └── Card 3 (Icon + Text)
│   │
│   ├── Implementation Timeline
│   │   ├── Headline & Controls
│   │   └── ImplementationTimeline (Carousel)
│   │       └── 4x Phase Cards
│   │
│   ├── Outcomes Section
│   │   ├── Headline
│   │   ├── OutcomesComparison (Table)
│   │   └── Key Insight Callout
│   │
│   ├── Student Voices
│   │   ├── Headline
│   │   ├── Story Selection Buttons
│   │   └── StudentVoiceComparison (Before/After)
│   │
│   ├── Success Stories
│   │   ├── Headline
│   │   └── 3x Story Cards
│   │       └── (Deep dive case studies)
│   │
│   ├── Partnership Process
│   │   ├── Headline
│   │   └── 2-Column Layout
│   │       ├── Your Role
│   │       └── Our Role
│   │
│   ├── Investment & Timeline
│   │   ├── Investment Card
│   │   └── Time Commitment Card
│   │
│   ├── Right Fit Assessment
│   │   ├── Great Fit If (Green section)
│   │   └── Not a Fit If (Red section)
│   │
│   ├── FAQ Section
│   │   └── 4x FAQ Cards
│   │
│   └── Final CTA
│       ├── Headline
│       ├── Description
│       └── CTA Buttons
│
├── Contact Section
│   └── Email & call-to-action
│
└── Footer
    ├── Copyright
    └── Footer Links
```

---

## Data Structure Examples

### schoolMetrics
```javascript
{
  metric: "Student Belonging",
  schoolA: 45,
  schoolB: 88,
  description: "Feel accepted and valued at school"
}
```

### outcomeData
```javascript
{
  label: "Student-Reported Wellbeing",
  traditional: 58,
  transformed: 89,
  delta: "+31%"
}
```

### implementationPhases
```javascript
{
  phase: "Phase 1: Listen",
  duration: "6-8 weeks",
  activities: [
    "Conduct student & teacher listening circles",
    "Map current culture and belonging gaps",
    "Co-create measurement framework"
  ],
  icon: "👂",
  color: "from-brand-blue to-brand-teal"
}
```

### studentVoices
```javascript
{
  quote: "Before quote",
  after: "After quote",
  grade: "Grade 9",
  school: "School Name",
  impact: "Engagement +42%",
  type: "belonging"
}
```

### successStories
```javascript
{
  title: "School Name",
  location: "City, State",
  studentCount: 1200,
  timeframe: "6 months",
  headline: "Key outcome headline",
  result: "Detailed story",
  metrics: [
    { label: "Metric Name", value: "+47%" }
  ]
}
```

---

## Event Flow

```
User Interaction
    ↓
┌───────────────────────────────┐
│ Button Click / State Change   │
└─────────────┬─────────────────┘
              ↓
┌───────────────────────────────┐
│ Update Component State        │
│ (activeMetric, activeVoice)   │
└─────────────┬─────────────────┘
              ↓
┌───────────────────────────────┐
│ Re-render with New Data       │
└─────────────┬─────────────────┘
              ↓
┌───────────────────────────────┐
│ CSS Animations Trigger        │
│ (Smooth transitions)          │
└─────────────┬─────────────────┘
              ↓
┌───────────────────────────────┐
│ DOM Updated                   │
│ User sees new visualization   │
└───────────────────────────────┘
```

---

## Scroll Animation Flow

```
Page Load
    ↓
┌─────────────────────────────────────┐
│ Intersection Observer Initialized  │
│ (threshold: 0.3)                    │
└────────────┬────────────────────────┘
             ↓
User Scrolls Down
    ↓
┌─────────────────────────────────────┐
│ Element enters viewport (30% visible)
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ Trigger Animation                   │
│ - Fade in                           │
│ - Slide from side                   │
│ - Scale up                          │
│ - Staggered delays                  │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ CSS Animation Plays                 │
│ Duration: 0.5-0.8s                  │
│ Easing: ease-out                    │
└────────────┬────────────────────────┘
             ↓
Element Fully Visible & Animated
```

---

**Visual Architecture Created**: February 3, 2026
**Purpose**: Understand structure, flow, and interactions
**Use**: Reference while customizing or extending
