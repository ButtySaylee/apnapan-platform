# School Partnership Page - Interactive Features Reference

## 🎮 Interactive Elements

### 1. Metric Selection Buttons
**Location**: Metric Comparison Section
- **Function**: Click to switch between 4 different belonging metrics
- **Behavior**: 
  - Bar charts animate smoothly
  - Description updates
  - Active button highlighted with gradient background
- **States**: 
  - Inactive: Light background, no animation
  - Hover: Brightness increase
  - Active: Full gradient background (blue-to-purple)

### 2. Outcomes Comparison Table
**Location**: "What Changed in Real Schools" Section
- **Function**: Compare traditional vs. transformed school outcomes
- **Features**:
  - Sortable by metric (if extended)
  - Hover rows highlight
  - Color-coded differences
  - Real percentage changes highlighted
- **Data Points**:
  - Academic Performance: +3% improvement
  - Attendance: +10% increase
  - Discipline: -64% reduction
  - Wellbeing: +31% improvement
  - Teacher Retention: +23% increase

### 3. Implementation Timeline Carousel
**Location**: "Implementation Journey" Section
- **Function**: Scroll through 4 phases of implementation
- **Controls**: 
  - Left/Right arrow buttons
  - Horizontal scroll with smooth behavior
  - Buttons disable at start/end
- **Content**: Each phase shows:
  - Duration (weeks/months)
  - Icon representation
  - 3-4 key activities
  - Progress bar

### 4. Student Voice Toggle
**Location**: "Hear from Students" Section
- **Function**: Switch between 3 different student before/after stories
- **Behavior**:
  - Click any grade level button
  - Before quote updates on left
  - After quote updates on right
  - Impact metric refreshes
- **Stories**: 9th grade, 7th grade, 10th grade

### 5. Theme Toggle
**Location**: Header (top-right corner)
- **Function**: Switch between dark and light modes
- **Affects**: Entire page appearance
- **Persistence**: Saved to localStorage
- **Icons**: ☀️ for light mode, 🌙 for dark mode

### 6. Navigation Links
**Location**: Header
- **Logo**: Links to home (/)
- **"Community Hub"**: Link to community page (/community)
- **"School Partnership"**: Link to this page (/schools)
- **"Start a Conversation"**: CTA button (customizable)

---

## 📊 Data Visualization Behaviors

### Metric Comparison Bars
- **Animation Duration**: 500ms smooth transition
- **Trigger**: On metric button click
- **Max Value**: Dynamically calculated from data
- **Colors**: 
  - Traditional: Slate gradient
  - Transformed: Teal-to-blue gradient

### Outcomes Table Rows
- **Hover Effect**: Background lightens
- **Sort Capability**: Can be added to columns
- **Badge Display**: Change percentages highlighted in teal
- **Responsive**: Horizontal scroll on mobile

### Implementation Timeline Cards
- **Scroll Behavior**: Smooth, momentum-based
- **Width**: Each card is 380px wide
- **Gap**: 24px between cards
- **Hover**: Shadow increases, slight lift

### Student Quote Cards
- **Left (Before)**: 
  - Darker background
  - Slate border (muted color)
  - Italic quote text
- **Right (After)**:
  - Teal-accented border
  - Teal glow effect
  - Highlighted impact badge
- **Animation**: Fade in with 300ms delay

---

## 🎯 Scroll-Triggered Animations

### Entrance Animations
Triggered when element comes into view (80% visible threshold):

1. **Fade In**: 0.6s ease-out
   - Applied to: All major sections
   - Stagger delay: Varies by component

2. **Slide from Left**: 0.6s ease-out
   - Applied to: Text content
   - Starting position: -40px offset

3. **Slide from Right**: 0.6s ease-out
   - Applied to: Supporting visuals
   - Starting position: +40px offset

4. **Scale Up**: 0.5s ease-out
   - Applied to: Metric cards
   - Starting scale: 95%

### Progress Bar Animations
- **Duration**: 1000ms for smooth fill
- **Easing**: ease-out (fast at start, slow at end)
- **Trigger**: On scroll into view
- **Fill**: From 0% to target value

---

## 🖱️ Hover & Focus States

### Buttons
```
Base: Solid or bordered
Hover: 
  - Scale: +2% (slight grow)
  - Background: +10% opacity
  - Border: Brighter color
Focus: 
  - Ring: 2px outline
  - High contrast mode supported
```

### Cards
```
Base: Subtle shadow
Hover:
  - Shadow: +50% larger
  - Lift: -1px translateY
  - Background: +5% opacity increase
```

### Links
```
Base: Dashed underline
Hover:
  - Color: Shift to brand-purple
  - Underline: Solid
```

---

## 📱 Mobile Interactions

### Touch Optimizations
- **Button Sizes**: Minimum 44x44px touch target
- **Spacing**: Increased gaps on mobile
- **Carousel**: Swipe-enabled (native scroll)
- **Modals**: Full-width on mobile

### Mobile-Specific Behaviors
1. **Header**: Sticky on scroll
2. **Carousel**: Single card visible initially
3. **Buttons**: Full width in stacked layout
4. **Text**: Scales based on viewport

---

## 🎨 Color System in Interactions

### Active States
- **Primary Action**: `from-brand-blue to-brand-purple`
- **Secondary Action**: `border-brand-blue`
- **Highlight**: `text-brand-teal`
- **Success/Increase**: `text-brand-teal`
- **Warning/Decrease**: `text-red-400`

### Hover States
- **Light Mode Contrast**: Colors brighten
- **Dark Mode Contrast**: Colors maintain saturation
- **Accessibility**: All hover states have 3:1 contrast minimum

---

## ⌨️ Keyboard Navigation

### Tab Order
1. Theme toggle
2. Primary CTA button
3. Secondary CTA button
4. All metric selection buttons (in order)
5. All internal links
6. Footer links

### Keyboard Shortcuts (Optional Enhancement)
- `?` - Help / keyboard shortcuts
- `Esc` - Close any open interactions
- `←` / `→` - Navigate carousel slides
- `Enter` / `Space` - Activate buttons

---

## 🔊 Accessibility Features

### ARIA Labels
```jsx
aria-label="Switch to light mode"
aria-pressed={theme === 'dark'}
aria-hidden="true" // for decorative elements
role="button" // for custom buttons
```

### Semantic HTML
- `<header>` - Navigation
- `<main>` - Primary content
- `<section>` - Content sections
- `<button>` / `<Link>` - Interactive elements
- `<table>` - Data comparison

### Motion Preferences
- Respects `prefers-reduced-motion: reduce`
- All animations disabled for users who prefer reduced motion
- Critical information not dependent on animation

---

## 🚀 Performance Considerations

### Intersection Observer Usage
- Used for scroll-triggered animations
- Lazy loads content visibility detection
- Reduces layout thrashing

### CSS Animation Performance
- Uses `transform` and `opacity` (GPU-accelerated)
- Avoids animating `top`, `left`, `width`, `height`
- No animation loops on page

### JavaScript Efficiency
- Event listeners cleaned up on unmount
- No setState in scroll handlers
- Memoized calculations where needed

---

## 🎬 Animation Timings

| Animation | Duration | Delay | Easing |
|-----------|----------|-------|--------|
| Bar fill | 700ms | 0-100ms | ease-out |
| Slide in | 600ms | 0-200ms | ease-out |
| Fade in | 500ms | 0-300ms | ease-out |
| Scale up | 500ms | 0ms | ease-out |
| Hover scale | 150ms | 0ms | ease-out |
| Carousel scroll | 300ms | 0ms | smooth |
| Quote transition | 300ms | 0ms | ease-in-out |

---

## 🔧 Customizing Interactions

### Change Metric Selection Colors
```javascript
// In SchoolPartnership.jsx, MetricComparison component
// Update className condition:
activeMetric === idx
  ? 'bg-gradient-to-r from-YOUR-COLOR-1 to-YOUR-COLOR-2'
  : 'bg-white/10'
```

### Adjust Animation Speeds
```javascript
// In index.css, update @keyframes durations:
animation: fade-in-up 0.6s ease-out forwards; /* change 0.6s */
```

### Add/Remove Interactive Elements
```javascript
// Each component can be independently toggled:
// <MetricComparison /> - Remove this line to hide
// <StudentVoiceComparison /> - Remove this line to hide
```

---

## 📋 Feature Checklist

- [x] Metric comparison with smooth transitions
- [x] Outcomes data visualization
- [x] Timeline carousel with scroll controls
- [x] Student voice toggle system
- [x] Success story deep dives
- [x] FAQ accordion (not collapsible yet - can enhance)
- [x] Theme switching (light/dark)
- [x] Scroll-triggered animations
- [x] Responsive mobile design
- [x] Accessibility compliance
- [ ] Live data integration (future)
- [ ] Video embeds (future)
- [ ] CRM integration (future)
- [ ] Download materials (future)

---

## � Interactive Belonging Calculator (NEW)
**Location**: `/calculator` route (accessible from Landing & Community CTAs)

### Features

#### Input Form with Animated Sliders
- **School Name**: Text field for identification
- **Student Population**: Number input
- **4 Metric Sliders** (0-100 scale):
  - Belonging Score: "% of students reporting strong belonging"
  - Voice Score: "% of students feeling heard and valued"
  - Safety Score: "% of students feeling physically/emotionally safe"
  - Engagement Score: "% of students actively participating"
- **Interactions**:
  - Real-time slider updates with dual-range constraints
  - Animated visual feedback on input
  - Form validation (shows errors for empty/invalid fields)
  - Smooth gradient fills as values increase

#### Results Visualization
- **Timeline Cards** (6, 12, 18 months):
  - Shows predicted metric values at each checkpoint
  - Color-coded by metric type
  - Animated entrance with staggered cards
  - Displays both absolute values and % improvement
- **Progress Bars**:
  - Before/after comparison for each metric
  - Animated fill from 0% to projected value
  - Percentage point increase displayed
  - Gradient colors matching metric themes
- **Impact Insights**:
  - Contextual recommendations based on results
  - High-improvement areas highlighted
  - Areas needing focus identified
  - Next steps CTAs

#### Calculation Engine
**Model**: Research-backed improvement projections

```
Month 1-3:  15-20% improvement from baseline interventions
Month 4-6:  Additional 10-15% from systemic changes
Month 7-12: Additional 5-10% as culture solidifies
Month 13-18: Additional 3-5% as practices embedded
```

**Example**:
- Baseline Belonging: 65%
- Month 6 projection: 71.3%
- Month 12 projection: 75.7%
- Month 18 projection: 77.4%

#### Data Persistence
- Results saved to browser localStorage
- Persists across browser sessions
- Can "Refine Results" to adjust inputs
- "Try Again" option to start fresh
- Manual reset available

#### Animations
All using **Framer Motion**:
- Form entrance: BlurAnimation (0-9px blur)
- Result cards: StaggerAnimation (0.2s delay, 0.15s stagger)
- Progress bars: Animated fill (1.2s duration, easeOut)
- Smooth transitions between form and results view

### User Flow

```
1. User visits Landing or Community page
2. Discovers "Try Our Calculator" CTA button
3. Clicks → Navigates to /calculator
4. Enters school info and 4 belonging metrics
5. Clicks "Calculate My Results"
6. Results display with animated timeline and comparisons
7. Can refine inputs or try new scenarios
8. Results saved to localStorage automatically
```

### Integration Points

1. **Landing Page**: 
   - "Try Our Calculator" button in hero CTA group
   - Links to `/calculator` route

2. **Community Page**:
   - "Calculate Your Transformation" button in final CTA section
   - Links to `/calculator` route

3. **Component Structure**:
   - `src/components/BelongingCalculator.jsx` (420 lines)
   - Two main sub-components: InputForm, ResultsDisplay
   - Standalone, no required props

### Customization Guide

#### Change Improvement Model
Edit `calculateProjections()` in BelongingCalculator.jsx:

```jsx
const improvements = {
  6: 0.18,   // 18% by month 6
  12: 0.12,  // +12% by month 12
  18: 0.07   // +7% by month 18
};
```

#### Modify Metric Labels
In InputForm component, update slider descriptions:

```jsx
<label>Voice Score (% of students feeling heard)</label>
```

#### Customize Result Insights
In ResultsDisplay component, modify insight templates:

```jsx
{improvements.belonging > 10 && <Insight text="Strong growth potential in belonging" />}
```

---

## 🐛 Troubleshooting

### Animations Not Playing
- Check `prefers-reduced-motion` setting
- Verify IntersectionObserver browser support
- Check for CSS conflicts in custom styles

### Scroll Carousel Not Working
- Verify ref is properly attached
- Check scroll container width calculations
- Test on mobile Safari (sometimes needs special handling)

### Theme Toggle Not Working
- Check localStorage is available
- Verify class names match `.light` and `.dark`
- Check for conflicting global styles

### Calculator Not Showing Results
- Verify form validation passed (no error messages)
- Check browser console for JavaScript errors
- Try refreshing the page

### localStorage Not Persisting
- Check browser is not in private/incognito mode
- Verify localStorage quota not exceeded
- Check browser privacy settings allow localStorage

### Performance Issues
- Reduce animation complexity
- Use `will-change: transform` sparingly
- Profile with Chrome DevTools

---

**Last Updated**: February 2026
**Compatibility**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
**Bundle Impact**: Calculator adds ~8KB gzipped (Framer Motion already bundled)
