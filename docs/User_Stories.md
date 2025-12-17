# User Stories
## CarFix Studio - MVP v0.1
---

## Epic 1: 3D Model Interaction & Visualization

### Story 1.1: View Interactive 3D Car Model
**As a** car enthusiast  
**I want to** view and interact with a 3D model of a car  
**So I can** explore its design and identify parts visually

**Acceptance Criteria**:
-   3D model loads within 5 seconds on standard broadband
-   User can rotate model 360° using mouse drag or touch swipe
-   User can zoom in/out using mouse wheel or pinch gesture
-   User can pan camera by right-click + drag or two-finger drag
-   Model displays with realistic lighting and shadows
-   Loading spinner shows during model fetch
-   Error message displays if model fails to load

**Priority**: High (P0)  
**Story Points**: 8  
**Status**:   Completed

---

### Story 1.2: Click on Car Parts in 3D
**As a** potential buyer  
**I want to** click on specific car parts in the 3D model  
**So I can** see detailed information about that component

**Acceptance Criteria**:
-   Hovering over clickable parts highlights them with visible glow
-   Cursor changes to pointer when hovering over clickable parts
-   Clicking a part opens a modal with part details
-   Modal displays: part name, category, price, description, image
-   Modal includes "Buy on Kolesa.kz" button
-   Modal includes "Watch Tutorial" button
-   Clicking outside modal or X button closes it
-   Only 3 parts are clickable in MVP: Front Windshield, Side Mirror, Left Body Panel Door

**Priority**: High (P0)  
**Story Points**: 13  
**Status**:   Completed

---

### Story 1.3: Sidebar Part Selection with Camera Focus
**As a** user exploring parts  
**I want to** select a part from the sidebar and have the camera focus on it  
**So I can** quickly navigate to specific components

**Acceptance Criteria**:
-   Sidebar displays "3D Clickable Parts" category at the top
-   Category contains: Front Windshield, Side Mirror, Left Body Panel Door
-   Clicking a part name in sidebar animates camera to that part
-   Camera transition is smooth and takes ~1 second
-   Clicked part is highlighted with emissive glow
-   Previous highlight is removed when new part is selected
-   Eye icon appears next to 3D clickable parts
-   Hint text "Click to focus on 3D model" displays when category expanded

**Priority**: High (P0)  
**Story Points**: 8  
**Status**:   Completed

---

## Epic 2: Parts Catalog & Information

### Story 2.1: Browse Parts Catalog
**As a** car owner  
**I want to** browse a categorized list of available car parts  
**So I can** discover options for upgrading or replacing components

**Acceptance Criteria**:
-   Sidebar displays 10+ part categories (Engine, Transmission, Wheels, etc.)
-   Each category is collapsible/expandable with smooth animation
-   Each category shows appropriate icon (Cog, Settings, Circle, etc.)
-   Expanded category displays 2-5 parts
-   Part names are clearly readable
-   Sidebar is scrollable if content exceeds viewport height
-   Categories remember expand/collapse state during session

**Priority**: High (P0)  
**Story Points**: 5  
**Status**:   Completed

---

### Story 2.2: Search for Specific Parts
**As a** user with a specific need  
**I want to** search for parts by name  
**So I can** quickly find what I'm looking for without scrolling

**Acceptance Criteria**:
-   Search bar appears at top of sidebar
-   Search filters parts in real-time (no submit button needed)
-   Search is case-insensitive
-   Search matches part names and category names
-   Results update as user types
-   "No results" message appears if no matches found
-   Clearing search restores full parts list
-   Search icon appears in search input field

**Priority**: Medium (P1)  
**Story Points**: 3  
**Status**:   Completed

---

### Story 2.3: View Part Details
**As a** potential buyer  
**I want to** see detailed specifications and pricing for a part  
**So I can** make an informed purchase decision

**Acceptance Criteria**:
-   Part modal displays: name, category, full description
-   Price shown in KZT currency with proper formatting
-   Part image/photo displayed (if available)
-   Modal has clean, professional design
-   Modal is responsive on mobile/tablet/desktop
-   Modal scrolls if content is long
-   Close button (X) is clearly visible

**Priority**: High (P0)  
**Story Points**: 5  
**Status**:   Completed

---

### Story 2.4: Access External Purchase Links
**As a** buyer ready to purchase  
**I want to** click a button to go to the Kolesa.kz listing  
**So I can** buy the authentic part

**Acceptance Criteria**:
-   "Buy on Kolesa.kz" button prominently displayed in part modal
-   Button opens Kolesa.kz in new browser tab
-   Link uses `rel="noopener noreferrer"` for security
-   Correct product listing page opens for each part
-   Tooltip appears on hover: "Find authentic parts"
-   Button has hover animation (color change, icon rotation)
-   Button works on mobile (touch-friendly)

**Priority**: High (P0)  
**Story Points**: 3  
**Status**:   Completed

---

### Story 2.5: Watch Installation Tutorials
**As a** DIY car owner  
**I want to** watch tutorial videos on how to install parts  
**So I can** learn to do repairs myself

**Acceptance Criteria**:
-   "Watch Tutorial" button displayed in part modal
-   Button opens relevant YouTube video in new tab
-   Video is in Russian or English with clear instructions
-   Tooltip appears on hover: "Learn installation tips"
-   Button has hover animation (scale effect)
-   Each part category has appropriate tutorial video
-   YouTube icon displayed on button

**Priority**: Medium (P1)  
**Story Points**: 2  
**Status**:   Completed

---

## Epic 3: Service Center Locator

### Story 3.1: Find Nearby Auto Services
**As a** car owner needing repairs  
**I want to** see a map of nearby auto service centers  
**So I can** choose a convenient location

**Acceptance Criteria**:
-   Map page loads with user's current location requested
-   Browser geolocation permission prompt appears
-   If permission granted, map centers on user's coordinates
-   If permission denied, map defaults to Almaty, Kazakhstan
-   Blue marker shows user's location
-   Red markers show auto service centers
-   Search radius is 5-10km
-   10+ service centers appear within radius (Almaty)
-   Toast notification shows "Found X car services"

**Priority**: High (P0)  
**Story Points**: 13  
**Status**:   Completed

---

### Story 3.2: View Service Center Information
**As a** user exploring service options  
**I want to** click on a service marker to see details  
**So I can** learn about the business before visiting

**Acceptance Criteria**:
-   Clicking red marker opens popup with service info
-   Popup displays: service name, address, phone number
-   Information formatted clearly and readable
-   Popup closes when clicking elsewhere on map
-   Multiple popups don't overlap (only one open at a time)
-   Popup has professional styling
-   Phone number is clickable on mobile devices

**Priority**: High (P0)  
**Story Points**: 5  
**Status**:   Completed

---

### Story 3.3: Get Directions to Service Center
**As a** user planning a visit  
**I want to** click a button to get directions  
**So I can** navigate to the service center

**Acceptance Criteria**:
-   "Get Directions" link displayed in service popup
-   Link opens Google Maps in new tab
-   Google Maps shows route from user's location to service
-   Link works on both desktop and mobile
-   Arrow icon (→) appears next to link text
-   Link styled as blue hyperlink with hover underline

**Priority**: High (P0)  
**Story Points**: 3  
**Status**:   Completed

---

### Story 3.4: Refresh Service Search
**As a** user who moves to a different area  
**I want to** refresh the service search  
**So I can** see services near my new location

**Acceptance Criteria**:
-   "Refresh" button displayed in map header
-   Button shows search icon when idle
-   Button shows loading spinner when searching
-   Button is disabled during search (prevents duplicate requests)
-   Clicking refresh re-queries Overpass API
-   New markers replace old ones on map
-   Toast notification confirms updated results

**Priority**: Medium (P1)  
**Story Points**: 3  
**Status**:   Completed

---

## Epic 4: User Authentication

### Story 4.1: Register New Account
**As a** first-time visitor  
**I want to** create an account with email and password  
**So I can** access personalized features

**Acceptance Criteria**:
-   "Login" button visible in top-right corner
-   Clicking opens modal with "Sign Up" option
-   Form has email and password fields
-   Email field validates format (shows error if invalid)
-   Password field shows strength indicator
-   Password must be 8+ characters
-   Clicking "Sign Up" sends request to Supabase
-   Success message: "Check your email for verification"
-   Verification email sent to user's inbox
-   Error messages display clearly (e.g., "Email already registered")

**Priority**: High (P0)  
**Story Points**: 8  
**Status**:   Completed

---

### Story 4.2: Login to Existing Account
**As a** returning user  
**I want to** login with my credentials  
**So I can** access my saved data

**Acceptance Criteria**:
-   Login modal has email and password fields
-   "Forgot password?" link displayed (future feature)
-   Clicking "Login" authenticates user
-   Successful login stores JWT token in localStorage
-   User redirected to homepage after login
-   "Login" button changes to "Logout" button
-   User's email displayed in header (future feature)
-   Error messages for wrong credentials: "Invalid login credentials"
-   Session persists across page refreshes

**Priority**: High (P0)  
**Story Points**: 5  
**Status**:   Completed

---

### Story 4.3: Logout from Account
**As a** logged-in user  
**I want to** logout from my account  
**So I can** secure my session on shared devices

**Acceptance Criteria**:
-   "Logout" button visible when user is authenticated
-   Clicking logout calls supabase.auth.signOut()
-   JWT token cleared from localStorage
-   User redirected to homepage
-   "Logout" button changes back to "Login" button
-   Protected features become inaccessible
-   No confirmation prompt needed (simple action)

**Priority**: Medium (P1)  
**Story Points**: 2  
**Status**:   Completed

---

## Epic 5: AI Assistant

### Story 5.1: Open AI Chat Interface
**As a** user with car-related questions  
**I want to** open a chat with an AI assistant  
**So I can** get quick answers without searching

**Acceptance Criteria**:
-   Floating AI button visible in bottom-right corner
-   Button has bot icon and glows to attract attention
-   Clicking button opens chat modal
-   Modal has professional chat interface design
-   Modal shows chat history (if any)
-   Input field and send button clearly visible
-   Modal is responsive on mobile devices
-   Close button (X) closes modal

**Priority**: Medium (P1)  
**Story Points**: 5  
**Status**:   Completed

---

### Story 5.2: Ask Questions and Receive Advice
**As a** user needing car guidance  
**I want to** type questions and get AI responses  
**So I can** make informed decisions about repairs and parts

**Acceptance Criteria**:
-   User can type message in input field
-   Pressing Enter or clicking Send submits message
-   User message appears in chat history immediately
-   Typing indicator shows while AI generates response
-   AI response appears within 10 seconds
-   AI provides relevant car-related advice
-   Chat history persists during session
-   Scrolling works if chat history is long
-   AI handles greetings, questions, and troubleshooting

**Priority**: Medium (P1)  
**Story Points**: 8  
**Status**:   Completed (MVP with mock responses)

---

## Epic 6: Responsive Design & UX

### Story 6.1: Mobile-Friendly Interface
**As a** mobile user  
**I want to** use all features on my smartphone  
**So I can** access CarFix Studio on the go

**Acceptance Criteria**:
-   All pages render correctly on 375px width (iPhone SE)
-   Sidebar collapses to hamburger menu on mobile
-   3D model supports touch gestures (swipe, pinch-zoom)
-   Buttons are large enough for touch (44x44px minimum)
-   Text is readable without zooming
-   No horizontal scrolling on any page
-   Map markers are touch-friendly
-   Modals fit within mobile viewport

**Priority**: High (P0)  
**Story Points**: 13  
**Status**:   Completed

---

### Story 6.2: Tablet Optimization
**As a** tablet user  
**I want to** have an optimized layout for medium screens  
**So I can** enjoy a balance between mobile and desktop experience

**Acceptance Criteria**:
-   Layout adapts for 768px-1024px widths
-   Sidebar is collapsible but can stay open
-   3D model takes appropriate screen space
-   Touch and mouse interactions both work
-   Two-column layouts used where appropriate
-   No UI elements cut off or overlapping

**Priority**: Medium (P1)  
**Story Points**: 5  
**Status**:   Completed

---

### Story 6.3: Fast Page Load Times
**As a** user with limited bandwidth  
**I want to** pages to load quickly  
**So I can** start using the app without long waits

**Acceptance Criteria**:
-   Initial page load completes within 3 seconds (10 Mbps connection)
-   3D model loads within 5 seconds
-   Map tiles load progressively (no blocking)
-   Images lazy-load when scrolling
-   Loading spinners show during waits
-   Critical CSS inlined for faster first paint
-   JavaScript bundle is code-split by route

**Priority**: High (P0)  
**Story Points**: 8  
**Status**:   Completed

---

## Epic 7: Navigation & Error Handling

### Story 7.1: Navigate Between Pages
**As a** user exploring the app  
**I want to** easily navigate between different sections  
**So I can** access all features without confusion

**Acceptance Criteria**:
-   Top navigation bar visible on all pages
-   "Home" button returns to main 3D viewer
-   "Map" button navigates to service locator
-   "Login" button opens authentication modal
-   Navigation doesn't cause page reloads (SPA behavior)
-   Active route is visually indicated
-   Browser back/forward buttons work correctly

**Priority**: High (P0)  
**Story Points**: 5  
**Status**:   Completed

---

**Document Version**: 1.0  
**Last Updated**: December 17, 2025  
**Prepared by**: Tamerlan (UX/UI), Kuanishkerey (QA), Nurken (Developer)  
**Total Stories**: 22 (20 MVP + 4 Backlog)  

