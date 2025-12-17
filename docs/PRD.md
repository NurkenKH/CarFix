# Product Requirements Document (PRD)
## CarFix Studio - MVP v0.1

---

## 1. Product Goal

The primary goal of CarFix Studio is to revolutionize the car modification and maintenance experience by providing an interactive, user-friendly platform that combines 3D visualization, parts cataloging, service location, and AI-powered assistance. The MVP aims to validate the core value proposition: enabling users to visualize car modifications in real-time and access comprehensive information about car parts and services in one unified platform.

**Success Metrics:**
- User engagement with 3D models (clicks, interactions)
- Part information modal views
- External link click-through rates (Kolesa.kz, YouTube)
- Map usage and service center discovery
- AI assistant query volume and satisfaction

---

## 2. Problem Statement

Car owners and enthusiasts face several interconnected challenges:

1. **Visualization Gap**: Unable to preview how parts and modifications will look on their specific vehicle before purchase
2. **Information Fragmentation**: Parts information, pricing, installation guides, and service centers exist across multiple disconnected platforms
3. **Trust Issues**: Difficulty identifying authentic parts and reliable service providers
4. **Decision Paralysis**: Lack of accessible expert guidance leads to delayed or poor modification decisions
5. **Local Service Discovery**: No centralized way to find nearby auto service centers with geolocation

These problems result in:
- Increased product returns and customer dissatisfaction
- Time wasted researching across multiple sources
- Risk of purchasing counterfeit or incompatible parts
- Delayed maintenance leading to vehicle damage
- Suboptimal modification choices

---

## 3. Target Audience

### Primary Users
1. **Car Enthusiasts** (Ages 20-40)
   - Active in car modification communities
   - Frequent parts purchasers
   - Value visual customization options
   - Tech-savvy, comfortable with digital tools

2. **First-time Car Owners** (Ages 18-30)
   - Seeking guidance on maintenance and upgrades
   - Limited automotive knowledge
   - Need educational resources
   - Budget-conscious decision-makers

### Secondary Users
3. **Auto Mechanics & Service Professionals** (Ages 25-55)
   - Use platform as reference tool
   - Recommend parts to customers
   - Need quick access to specifications

4. **Car Parts Dealers** (B2B)
   - Potential future partners
   - Interested in platform integration
   - Need showcase capabilities

### Geographic Focus
- **Primary**: Kazakhstan (Almaty, Astana, Shymkent)
- **Language**: Russian, Kazakh, English
- **Market**: Emerging automotive aftermarket

---

## 4. User Roles

### 4.1 Guest User (Unauthenticated)
**Capabilities:**
- View 3D car models
- Browse parts catalog
- Read part specifications and pricing
- Access external links (Kolesa.kz, YouTube)
- View map of nearby services
- **Limitations**: Cannot save configurations, limited AI assistant queries

### 4.2 Registered User (Authenticated)
**Capabilities:**
- All Guest User capabilities, plus:
- Save favorite parts and configurations
- Unlimited AI assistant interactions
- Personalized recommendations
- Comment and review features (future)
- Order history tracking (future)

### 4.3 Administrator (Future Role)
**Capabilities:**
- Manage parts catalog
- Update 3D models
- Monitor system analytics
- Moderate user content
- Configure AI assistant responses

---

## 5. User Scenarios

### Scenario 1: Car Enthusiast Explores Modifications
**User**: Alex, 28-year-old Toyota Corolla owner, wants to customize his car

**Flow:**
1. Opens CarFix Studio homepage
2. Views interactive 3D Corolla model rotating on screen
3. Clicks on "Side Mirror" in the sidebar
4. Camera smoothly focuses on the mirror component
5. Clicks on the highlighted mirror in 3D model
6. Modal appears showing mirror specifications, price (45,000 KZT), and images
7. Clicks "Buy on Kolesa.kz" button → Opens marketplace listing in new tab
8. Clicks "Watch Tutorial" → Opens YouTube installation guide
9. Explores other parts (windshield, body panels) using same workflow
10. Opens AI Assistant to ask "What's the best order to install these parts?"
11. Receives step-by-step guidance

**Outcome**: Alex makes informed purchase decisions with visual confirmation

### Scenario 2: First-time Owner Finds Service Center
**User**: Sara, 22-year-old new car owner, needs oil change

**Flow:**
1. Navigates to CarFix Studio
2. Clicks "Map" icon in top navigation
3. Browser requests location permission → Grants access
4. Map loads centered on her location (Almaty)
5. Sees 15 red markers within 5km radius
6. Clicks nearest marker (2.3km away)
7. Popup shows: "AutoMaster STO", address, phone number
8. Clicks "Get Directions" → Opens Google Maps with route
9. Calls phone number directly from popup
10. Books appointment

**Outcome**: Sara finds trusted service quickly without extensive research

### Scenario 3: Mechanic Uses Platform as Reference
**User**: Dmitry, 35-year-old auto mechanic, needs part specifications

**Flow:**
1. Customer asks about front windshield replacement cost
2. Opens CarFix Studio on workshop tablet
3. Searches "front windshield" in sidebar search bar
4. Clicks "3D Clickable Parts" → "Front Windshield"
5. Views detailed specifications: "Laminated safety glass, UV protection, acoustic dampening"
6. Notes price: 125,000 KZT
7. Shows customer the 3D visualization
8. Adds 20% markup and quotes customer
9. Customer approves → Clicks Kolesa.kz link to order

**Outcome**: Quick, professional customer interaction with visual aids

### Scenario 4: User Registration for Enhanced Features
**User**: Amir, wants to save his custom configuration

**Flow:**
1. Explores various parts and builds dream configuration
2. Clicks "Login" in top-right corner
3. Sees options: "Sign Up with Email" or "Continue as Guest"
4. Clicks "Sign Up with Email"
5. Enters email and password
6. Receives verification email from Supabase
7. Clicks verification link
8. Returns to platform, now logged in
9. "Save Configuration" button now enabled (future feature)
10. Unlimited AI assistant access activated

**Outcome**: Enhanced user experience with personalization

---

## 6. Functional Requirements

### FR-1: 3D Model Visualization
- **FR-1.1**: System must render interactive 3D car models using Three.js
- **FR-1.2**: Models must support mouse/touch rotation, zoom, and pan
- **FR-1.3**: Models must load within 5 seconds on standard broadband
- **FR-1.4**: System must provide loading indicators during model fetch
- **FR-1.5**: Camera must smoothly animate (1-second transition) when focusing on parts

### FR-2: Clickable Parts System
- **FR-2.1**: System must support clickable hotspots on 3D models
- **FR-2.2**: Implemented clickable parts: Front Windshield, Side Mirror, Left Body Panel Door
- **FR-2.3**: Hover state must highlight clickable parts with emissive glow
- **FR-2.4**: Click must trigger part details modal
- **FR-2.5**: Sidebar selection must focus camera on corresponding 3D part

### FR-3: Parts Catalog & Information
- **FR-3.1**: System must maintain structured parts database (partsData.ts)
- **FR-3.2**: Each part must include: name, category, description, price (KZT), image URL
- **FR-3.3**: Part details modal must display all part information
- **FR-3.4**: System must provide direct links to Kolesa.kz listings
- **FR-3.5**: System must provide YouTube tutorial links for each category
- **FR-3.6**: Sidebar must organize parts into collapsible categories
- **FR-3.7**: Search functionality must filter parts by name or category (case-insensitive)

### FR-4: Map & Geolocation Services
- **FR-4.1**: System must integrate Leaflet.js for interactive maps
- **FR-4.2**: System must request user's geolocation on Map page load
- **FR-4.3**: Default location must be Almaty, Kazakhstan if permission denied
- **FR-4.4**: System must query Overpass API for nearby car repair shops
- **FR-4.5**: Search radius must be configurable (default: 5-10km)
- **FR-4.6**: Markers must distinguish between user location (blue) and services (red)
- **FR-4.7**: Service popups must display: name, address, phone, "Get Directions" link
- **FR-4.8**: "Get Directions" must open Google Maps with route
- **FR-4.9**: Refresh button must re-query services based on current map center

### FR-5: User Authentication
- **FR-5.1**: System must integrate Supabase Auth
- **FR-5.2**: System must support email/password registration
- **FR-5.3**: System must support email/password login
- **FR-5.4**: System must send email verification upon registration
- **FR-5.5**: System must maintain session persistence (local storage)
- **FR-5.6**: System must provide logout functionality
- **FR-5.7**: Protected features must redirect unauthenticated users to login

### FR-6: AI Assistant
- **FR-6.1**: System must provide chat interface for AI interactions
- **FR-6.2**: System must integrate with Supabase Edge Function (ai-assistant)
- **FR-6.3**: AI must provide car maintenance advice
- **FR-6.4**: AI must answer parts-related questions
- **FR-6.5**: AI must suggest service centers based on user issues
- **FR-6.6**: Chat history must persist during session
- **FR-6.7**: System must show typing indicator during AI response generation

### FR-7: Responsive Design
- **FR-7.1**: System must be fully functional on desktop (1920x1080+)
- **FR-7.2**: System must adapt layout for tablets (768px-1024px)
- **FR-7.3**: System must provide mobile-optimized interface (320px-767px)
- **FR-7.4**: 3D viewer must support touch gestures (pinch-zoom, swipe-rotate)
- **FR-7.5**: Sidebar must collapse to hamburger menu on mobile

### FR-8: Navigation & Routing
- **FR-8.1**: System must implement client-side routing (React Router)
- **FR-8.2**: System must provide persistent top navigation bar
- **FR-8.3**: Routes: `/` (home), `/map` (services), `/auth` (login), `*` (404)
- **FR-8.4**: "Back" button must return to previous page
- **FR-8.5**: 404 page must provide link to homepage

---

## 7. Non-Functional Requirements

### NFR-1: Performance
- **NFR-1.1**: Initial page load must complete within 3 seconds
- **NFR-1.2**: 3D model initial render must occur within 5 seconds
- **NFR-1.3**: Part modal open animation must be smooth (60 FPS)
- **NFR-1.4**: Map tile loading must not block UI interactions
- **NFR-1.5**: Build size must be optimized (<2MB gzipped)

### NFR-2: Reliability
- **NFR-2.1**: System uptime must be 99.5% during business hours
- **NFR-2.2**: Failed API calls must retry with exponential backoff
- **NFR-2.3**: Supabase connection errors must show user-friendly messages
- **NFR-2.4**: 3D model load failures must show fallback placeholder
- **NFR-2.5**: Map API failures must gracefully degrade to text list

### NFR-3: Security
- **NFR-3.1**: All API communications must use HTTPS
- **NFR-3.2**: Supabase keys must be stored in environment variables
- **NFR-3.3**: Authentication tokens must expire after 7 days
- **NFR-3.4**: User passwords must meet minimum requirements (8+ chars)
- **NFR-3.5**: External links must open in new tab with `rel="noopener noreferrer"`
- **NFR-3.6**: Input fields must sanitize user data to prevent XSS

### NFR-4: Usability
- **NFR-4.1**: UI must follow consistent design system (Shadcn/UI)
- **NFR-4.2**: All interactive elements must have hover states
- **NFR-4.3**: Loading states must be visually indicated
- **NFR-4.4**: Error messages must be clear and actionable
- **NFR-4.5**: Tooltips must provide context for complex features
- **NFR-4.6**: Keyboard navigation must be supported for accessibility

### NFR-5: Scalability
- **NFR-5.1**: System architecture must support 1,000 concurrent users
- **NFR-5.2**: Database schema must allow easy addition of new car models
- **NFR-5.3**: Parts catalog must support 500+ parts without performance degradation
- **NFR-5.4**: Supabase free tier limits must not be exceeded during MVP phase
- **NFR-5.5**: Code structure must allow modular feature additions

### NFR-6: Maintainability
- **NFR-6.1**: Code must follow TypeScript strict mode
- **NFR-6.2**: ESLint rules must be enforced in CI/CD pipeline
- **NFR-6.3**: Components must follow single responsibility principle
- **NFR-6.4**: All functions must have clear naming and JSDoc comments
- **NFR-6.5**: Git commits must follow conventional commit format

### NFR-7: Compatibility
- **NFR-7.1**: System must support Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **NFR-7.2**: WebGL 2.0 must be available for 3D rendering
- **NFR-7.3**: Geolocation API must be available for map features
- **NFR-7.4**: Local Storage must be available for session persistence
- **NFR-7.5**: System must provide fallback messaging for unsupported browsers

---

## 8. MVP Scope (Version 0.1)

### ✅ In-Scope Features
1. **Interactive 3D Visualization**
   - Toyota Corolla model with 3 clickable parts
   - Smooth camera transitions
   - Rotation, zoom, pan controls

2. **Parts Information System**
   - 9 part categories with 30+ parts total
   - Detailed specifications and pricing
   - Direct Kolesa.kz purchase links
   - YouTube installation tutorials

3. **Service Center Locator**
   - Interactive Leaflet map
   - Geolocation-based search
   - Overpass API integration
   - Service information popups
   - Google Maps directions

4. **User Authentication**
   - Email/password signup and login
   - Supabase Auth integration
   - Session management

5. **AI Assistant**
   - Chat interface
   - Car maintenance advice
   - Parts recommendations

6. **Responsive Design**
   - Desktop optimization
   - Mobile/tablet adaptability
   - Touch gesture support

7. **Core Navigation**
   - Home, Map, Auth pages
   - Top navigation bar
   - 404 error handling

### Timeline: 6-8 weeks

---

## 9. Out-of-Scope (Backlog)

### Phase 2 Features (v0.2)
- Multiple car models (Porsche 911 GT3, BMW M3, Mercedes-Benz AMG)
- User profiles with saved configurations
- Color customization tool with real-time preview
- Part comparison feature (side-by-side)
- User reviews and ratings system

### Phase 3 Features (v0.3)
- Booking system for service centers
- Payment integration for parts ordering
- Advanced AI recommendations based on driving habits
- Social sharing of configurations
- Mobile app (React Native)

### Phase 4 Features (v1.0)
- Augmented Reality (AR) preview via smartphone camera
- Virtual showroom tours
- Dealer partnership program
- Marketplace for used parts
- Community forum and Q&A

### Technical Debt
- Automated unit and integration testing
- Performance monitoring (Sentry, LogRocket)
- A/B testing framework
- Analytics dashboard for admins
- Multi-language support (full i18n)

---

## 10. Acceptance Criteria

### AC-1: 3D Model Visualization
✅ **PASS** if:
- User can rotate 3D model 360° smoothly
- User can zoom in/out using mouse wheel or pinch
- Model loads within 5 seconds on 10 Mbps connection
- No visual glitches or texture pop-in after full load
- Loading spinner displays during model fetch

### AC-2: Clickable Parts Interaction
✅ **PASS** if:
- Hovering over "Side Mirror" highlights it with visible glow
- Clicking "Side Mirror" opens modal with correct information
- Modal displays: name, price (45,000 KZT), description, image
- Camera focuses on mirror within 1-second animation
- Clicking sidebar "Side Mirror" focuses camera on 3D part
- Same behavior works for Front Windshield and Left Body Panel Door

### AC-3: Parts Catalog Functionality
✅ **PASS** if:
- Sidebar displays 10+ part categories
- Each category expands to show 2-5 parts
- Search bar filters parts in real-time (e.g., "mirror" shows only Mirror category)
- "Buy on Kolesa.kz" button opens correct product page in new tab
- "Watch Tutorial" button opens relevant YouTube video
- All links use `target="_blank"` and `rel="noopener noreferrer"`

### AC-4: Map & Geolocation
✅ **PASS** if:
- Map page requests geolocation permission on load
- Map centers on user's location (blue marker) if permission granted
- Map defaults to Almaty coordinates if permission denied
- Red markers appear for 10+ auto services within 10km radius
- Clicking service marker shows popup with name, address, phone
- "Get Directions" link opens Google Maps with correct coordinates
- Refresh button re-fetches services successfully

### AC-5: User Authentication
✅ **PASS** if:
- Clicking "Login" opens modal with email/password fields
- Entering valid credentials logs user in and persists session
- Invalid credentials show clear error message
- Sign-up sends verification email to provided address
- Clicking verification link activates account
- Logged-in user sees "Logout" button instead of "Login"
- Logout clears session and redirects to homepage

### AC-6: AI Assistant
✅ **PASS** if:
- Clicking floating AI button opens chat modal
- User can type message and submit
- AI responds within 10 seconds with relevant advice
- Chat history persists during session
- Typing indicator shows while AI generates response
- AI answers at least 80% of car-related questions correctly

### AC-7: Responsive Design
✅ **PASS** if:
- Desktop (1920x1080): Sidebar visible, 3D model takes 70% width
- Tablet (768px): Sidebar collapsible, 3D model takes 60% width
- Mobile (375px): Hamburger menu, 3D model full-width
- Touch gestures work on mobile (pinch-zoom, swipe-rotate)
- No horizontal scrolling on any screen size
- All text remains readable at smallest breakpoint

### AC-8: Navigation & Routing
✅ **PASS** if:
- Clicking logo returns to homepage
- "Map" link navigates to `/map` without page reload
- Browser back button returns to previous page
- Navigating to `/invalid-route` shows 404 page with "Go Home" link
- Page refreshes maintain correct route
- Netlify `_redirects` file ensures all routes work in production

---

## 11. Success Metrics (KPIs)

### User Engagement
- **3D Interaction Rate**: >70% of visitors interact with 3D model
- **Part Modal Views**: Average 3+ modals per session
- **Time on Site**: Average 5+ minutes per visit
- **Return Visitor Rate**: 30% within 7 days

### Conversion Metrics
- **External Link Clicks**: 40% click Kolesa.kz or YouTube links
- **Map Usage**: 50% of sessions include map visit
- **AI Assistant Usage**: 25% of users open AI chat
- **Registration Rate**: 15% of visitors create accounts

### Technical Performance
- **Page Load Time**: <3 seconds for 90th percentile
- **Bounce Rate**: <40%
- **Error Rate**: <2% of all API calls
- **Uptime**: 99.5%+

---

## 12. Risks & Mitigation

### Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| 3D model files too large (>50MB) | High | Medium | Optimize with Draco compression, lazy load |
| Supabase free tier limit exceeded | High | Low | Monitor usage, implement caching, upgrade plan |
| Browser WebGL incompatibility | Medium | Low | Provide fallback 2D images, clear error messaging |
| Overpass API rate limiting | Medium | Medium | Cache service data, implement retry logic |

### Business Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low user adoption | High | Medium | User testing, marketing campaign, referral program |
| Kolesa.kz links break | Medium | Low | Regular link validation, alternative sources |
| Competitors launch similar product | Medium | High | Focus on unique 3D experience, build community |

---

## 13. Dependencies

### External Services
- **Supabase**: Authentication, database, edge functions
- **Kolesa.kz**: Parts marketplace (affiliate partnership potential)
- **YouTube**: Installation tutorial hosting
- **Overpass API**: Auto service location data
- **Google Maps**: Directions and routing
- **OpenStreetMap**: Base map tiles

### Internal Dependencies
- **3D Model Assets**: Corolla.glb file from 3D designer (Kanat)
- **Parts Data**: Pricing and specifications from research
- **UI Design**: Figma designs from UX/UI designer (Tamerlan)

---

## 14. Open Questions

1. Should we implement a shopping cart for multi-part orders?
2. How do we monetize: commission per referral, premium subscription, or ads?
3. Should AI assistant have voice interaction capabilities?
4. Do we need admin dashboard in MVP or can we use Supabase directly?
5. Should we support anonymous part ratings or require authentication?

---

**Document Version**: 1.0  
**Last Updated**: December 17, 2025  
**Prepared by**: Nurken (Developer), Tamerlan (UX/UI), Kanat (PM), Kuanishkerey (QA)  
**Status**: Approved for MVP Development
