# System Architecture
## CarFix Studio - Technical Architecture Document

---

## 1. Architecture Style

**Selected Architecture**: **Client-Server with Serverless Backend (JAMstack)**

### Architecture Pattern
CarFix Studio implements a **modern JAMstack architecture** combining:
- Static site generation (SSG) for optimal performance
- Client-side rendering (CSR) with React for dynamic interactions
- Serverless functions for backend logic
- Third-party APIs for specialized services

### Justification
This architecture was chosen because:
1. **Performance**: Static assets served via CDN ensure fast global load times
2. **Scalability**: Serverless functions auto-scale based on demand without infrastructure management
3. **Cost-Efficiency**: Pay-per-use serverless model ideal for MVP stage
4. **Developer Experience**: React ecosystem provides rich tooling and component libraries
5. **Security**: Reduced attack surface with no traditional backend server
6. **Deployment**: Simple CI/CD with Netlify or Vercel

---

## 2. System Components

### 2.1 Frontend Application (React + Vite)

**Responsibility**: User interface, 3D rendering, client-side logic

**Key Technologies**:
- React 18.3.1 with TypeScript
- Vite 5.4.19 for build tooling
- Three.js for 3D graphics
- Tailwind CSS for styling
- React Router for navigation

**Subcomponents**:
- **3D Viewer Module**: Renders interactive car models
- **Parts Catalog Module**: Displays and filters car parts
- **Map Module**: Shows service centers with geolocation
- **Auth Module**: Handles user authentication UI
- **AI Chat Module**: Interface for AI assistant interactions

### 2.2 Backend as a Service (Supabase)

**Responsibility**: Authentication, database, serverless functions

**Services Used**:
- **Supabase Auth**: JWT-based authentication with email/password
- **PostgreSQL Database**: Stores user data, configurations (future)
- **Edge Functions**: Deno-based serverless functions for AI assistant
- **Storage**: Potential future use for user-uploaded images

**Why Supabase**:
- Open-source alternative to Firebase
- Built on PostgreSQL (powerful relational database)
- Real-time subscriptions capability (future features)
- Row-level security for data protection
- Auto-generated REST and GraphQL APIs

### 2.3 3D Asset Pipeline

**Responsibility**: 3D model creation, optimization, delivery

**Tools**:
- **Blender**: 3D modeling and texturing (by Kanat, 3D Designer)
- **glTF Format**: Industry-standard 3D model format (.glb)
- **Draco Compression**: Reduces model file sizes by 80-90%
- **CDN Delivery**: Models served via Netlify/Vercel CDN

**Models**:
- `corolla.glb` - Toyota Corolla (primary model, ~8MB)
- `2022_porsche_911_gt3_992.glb` - Porsche 911 GT3 (secondary model)

### 2.4 External APIs

#### Overpass API (OpenStreetMap)
**Purpose**: Query nearby auto service centers

**Query Example**:
```
[out:json][timeout:25];
(
  node["shop"="car_repair"](around:5000,43.238949,76.945465);
  node["amenity"="car_repair"](around:5000,43.238949,76.945465);
);
out center;
```

**Data Returned**: Service name, coordinates, address, phone

#### Kolesa.kz (External Marketplace)
**Purpose**: Parts purchasing platform

**Integration**: Direct hyperlinks to product listings

**Future**: Potential API partnership for real-time pricing

#### YouTube API (Indirect)
**Purpose**: Embed installation tutorial videos

**Integration**: Direct links to tutorial videos by part category

### 2.5 AI Service (Future: OpenAI or Anthropic)

**Purpose**: Power AI assistant with car expertise

**Current Implementation**: Mock responses in edge function

**Planned**: Integration with GPT-4 or Claude API for:
- Natural language understanding
- Context-aware recommendations
- Step-by-step troubleshooting guides

---

## 3. Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              React Frontend Application                   │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │  3D Viewer  │  │ Parts Catalog│  │  Map Component  │  │  │
│  │  │  (Three.js) │  │  (partsData) │  │   (Leaflet.js)  │  │  │
│  │  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘  │  │
│  │         │                 │                    │           │  │
│  │  ┌──────┴────────┬────────┴────────┬───────────┴────────┐ │  │
│  │  │  Auth Module  │  AI Chat Module │   Router (Pages)   │ │  │
│  │  └───────┬───────┴────────┬────────┴───────────┬────────┘ │  │
│  └──────────┼────────────────┼────────────────────┼──────────┘  │
└─────────────┼────────────────┼────────────────────┼─────────────┘
              │                │                    │
              │                │                    │
    ┌─────────▼─────────┐  ┌───▼─────────────┐  ┌─▼──────────────┐
    │   Supabase Auth   │  │ Supabase Edge   │  │ Overpass API   │
    │   (JWT Tokens)    │  │   Functions     │  │ (OpenStreetMap)│
    └─────────┬─────────┘  │  (AI Assistant) │  └────────────────┘
              │            └───┬─────────────┘
              │                │
    ┌─────────▼────────────────▼─────────┐
    │     Supabase PostgreSQL DB         │
    │  (users, sessions, configs)        │
    └────────────────────────────────────┘

    External Services:
    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
    │  Kolesa.kz   │   │   YouTube    │   │ Google Maps  │
    │ (Hyperlinks) │   │ (Tutorials)  │   │ (Directions) │
    └──────────────┘   └──────────────┘   └──────────────┘

    CDN Delivery:
    ┌───────────────────────────────────────┐
    │   Netlify/Vercel CDN                  │
    │   • Static HTML/CSS/JS                │
    │   • 3D Model Files (.glb)             │
    │   • Images and Assets                 │
    └───────────────────────────────────────┘
```

---

## 4. Data Flow

### 4.1 User Viewing 3D Model & Part Selection

```
1. User → Opens Homepage
2. React App → Loads from CDN (Netlify/Vercel)
3. React App → Fetches corolla.glb from /public folder
4. Three.js → Parses GLTF, renders to WebGL canvas
5. User → Clicks "Side Mirror" in sidebar
6. React State → Updates selectedPart = "Side Mirror"
7. CarViewer → Calculates camera target position
8. Three.js → Animates camera over 1 second
9. User → Clicks 3D mirror mesh
10. CorollaModel → Calls onPartClick("Side Mirror")
11. React State → Opens PartDetailsModal
12. Modal → Displays data from partsData.ts
13. User → Clicks "Buy on Kolesa.kz"
14. Browser → Opens new tab with marketplace URL
```

### 4.2 User Authentication Flow

```
1. User → Clicks "Login" button
2. React → Opens LoginModal component
3. User → Enters email + password, clicks "Sign Up"
4. React → Calls supabase.auth.signUp(email, password)
5. Supabase Auth → Creates user record in auth.users table
6. Supabase → Sends verification email
7. Supabase → Returns { user, session: null }
8. React → Shows "Check your email" message
9. User → Clicks verification link in email
10. Supabase → Confirms email, generates JWT token
11. User → Returns to app, clicks "Login"
12. React → Calls supabase.auth.signInWithPassword(email, password)
13. Supabase → Validates credentials, returns JWT token
14. React → Stores session in localStorage
15. React → Updates auth state, shows "Logout" button
16. Future API calls → Include JWT in Authorization header
```

### 4.3 Map & Service Location Flow

```
1. User → Navigates to /map route
2. React Router → Renders Map.tsx component
3. Map Component → Calls navigator.geolocation.getCurrentPosition()
4. Browser → Prompts user for location permission
5. User → Grants permission
6. Browser → Returns coordinates (lat, lon)
7. Map Component → Sets userLocation state
8. Map Component → Calls searchNearbyServices(lat, lon)
9. Fetch API → Sends Overpass API query
   Query: Find all car repair shops within 5km radius
10. Overpass API → Searches OpenStreetMap database
11. Overpass API → Returns JSON with service locations
12. Map Component → Parses response, creates service markers
13. Leaflet → Renders map with user marker (blue) + service markers (red)
14. User → Clicks service marker
15. Leaflet → Shows popup with service details
16. User → Clicks "Get Directions"
17. Browser → Opens Google Maps with destination coordinates
```

### 4.4 AI Assistant Interaction Flow

```
1. User → Clicks floating AI assistant button
2. React → Opens AIAssistantModal
3. User → Types "How do I change a side mirror?"
4. React → Calls sendMessage(userMessage)
5. Fetch API → POST to Supabase Edge Function
   URL: /functions/v1/ai-assistant
   Body: { message: "How do I change a side mirror?" }
6. Supabase Edge Function → Receives request
7. Edge Function → Processes message (current: mock response)
8. [Future] Edge Function → Calls OpenAI API with context
9. Edge Function → Returns AI response
10. React → Updates chat history state
11. React → Displays AI message in chat UI
12. User → Continues conversation (repeats from step 3)
```

---

## 5. Database Schema

### Current Schema (Supabase PostgreSQL)

#### Table: `users` (Managed by Supabase Auth)
```sql
CREATE TABLE auth.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL,
  email_confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: `profiles` (Future: User Profiles)
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: `saved_configurations` (Future: User Configurations)
```sql
CREATE TABLE public.saved_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  car_model VARCHAR(100) NOT NULL,
  configuration_data JSONB NOT NULL,
  -- JSONB example: { "parts": ["Side Mirror", "Front Windshield"], "colors": {...} }
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: `part_reviews` (Future: User Reviews)
```sql
CREATE TABLE public.part_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  part_id VARCHAR(100) NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes
```sql
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_saved_configs_user ON public.saved_configurations(user_id);
CREATE INDEX idx_part_reviews_part ON public.part_reviews(part_id);
```

### Row Level Security (RLS)
```sql
-- Users can only read their own profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can only manage their own configurations
ALTER TABLE public.saved_configurations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own configs" ON public.saved_configurations
  FOR ALL USING (auth.uid() = user_id);
```

---

## 6. Technology Decisions

### 6.1 Why React?
**Decision**: Use React 18 with TypeScript

**Justification**:
- ✅ Massive ecosystem (libraries, components, tooling)
- ✅ TypeScript support for type safety
- ✅ Virtual DOM for efficient rendering
- ✅ Hooks API simplifies state management
- ✅ Large talent pool for team scaling
- ✅ Excellent integration with Three.js (@react-three/fiber)

**Alternatives Considered**: Vue.js (smaller ecosystem), Svelte (newer, smaller community)

### 6.2 Why Vite over Create React App?
**Decision**: Use Vite as build tool

**Justification**:
- ✅ 10-100x faster hot module replacement (HMR)
- ✅ Optimized production builds with Rollup
- ✅ Native ES modules support
- ✅ Better plugin ecosystem
- ✅ Future-proof (CRA is no longer maintained)

### 6.3 Why Three.js?
**Decision**: Use Three.js with @react-three/fiber

**Justification**:
- ✅ Industry standard for WebGL
- ✅ Rich documentation and examples
- ✅ Efficient 3D rendering performance
- ✅ GLTF/GLB model support
- ✅ @react-three/fiber provides React-friendly API
- ✅ @react-three/drei offers helpful abstractions

**Alternatives Considered**: Babylon.js (heavier), Unity WebGL (larger bundle size)

### 6.4 Why Supabase over Firebase?
**Decision**: Use Supabase for backend

**Justification**:
- ✅ Open-source (self-hosting option)
- ✅ PostgreSQL (more powerful than Firestore)
- ✅ Real-time capabilities
- ✅ Built-in auth with JWT
- ✅ Edge Functions with Deno (modern, secure)
- ✅ Better pricing for MVP stage

**Alternatives Considered**: Firebase (vendor lock-in), AWS Amplify (complex setup)

### 6.5 Why Leaflet over Google Maps?
**Decision**: Use Leaflet.js for maps

**Justification**:
- ✅ Open-source and free
- ✅ Lighter weight than Google Maps SDK
- ✅ OpenStreetMap tiles are free
- ✅ No API key required for basic usage
- ✅ Highly customizable

**Note**: Still use Google Maps for "Get Directions" (better navigation)

### 6.6 Why Tailwind CSS?
**Decision**: Use Tailwind CSS for styling

**Justification**:
- ✅ Utility-first approach speeds development
- ✅ Consistent design system
- ✅ Purging removes unused CSS (small bundle)
- ✅ Great integration with React components
- ✅ Shadcn/UI built on Tailwind

### 6.7 Why Shadcn/UI over Material-UI?
**Decision**: Use Shadcn/UI component library

**Justification**:
- ✅ Accessible by default (built on Radix UI)
- ✅ Customizable (copies components to your project)
- ✅ No runtime overhead
- ✅ Modern design aesthetics
- ✅ TypeScript support

**Alternatives Considered**: Material-UI (heavy), Chakra UI (good but less trendy)

---

## 7. Front End to Back End Interaction

### 7.1 Authentication Flow
```typescript
// Frontend: src/pages/Auth.tsx
import { supabase } from '@/integrations/supabase/client';

// Sign Up
const { user, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecurePass123!'
});

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'SecurePass123!'
});

// Get Current User
const { data: { user } } = await supabase.auth.getUser();

// Sign Out
await supabase.auth.signOut();
```

**Backend**: Supabase Auth service handles all authentication logic automatically.

### 7.2 AI Assistant Communication
```typescript
// Frontend: src/components/UI/AIAssistantModal.tsx
const sendMessage = async (userMessage: string) => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-assistant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ message: userMessage })
  });
  
  const data = await response.json();
  return data.response;
};
```

```typescript
// Backend: supabase/functions/ai-assistant/index.ts
Deno.serve(async (req) => {
  const { message } = await req.json();
  
  // Mock response for MVP
  const aiResponse = `You asked about: ${message}. Here's some advice...`;
  
  // Future: Call OpenAI API
  // const response = await openai.chat.completions.create({...});
  
  return new Response(
    JSON.stringify({ response: aiResponse }),
    { headers: { "Content-Type": "application/json" } }
  );
});
```

### 7.3 Data Fetching Pattern (TanStack Query)
```typescript
// Frontend: Example future implementation
import { useQuery } from '@tanstack/react-query';

const { data: userConfigs, isLoading } = useQuery({
  queryKey: ['configurations', userId],
  queryFn: async () => {
    const { data } = await supabase
      .from('saved_configurations')
      .select('*')
      .eq('user_id', userId);
    return data;
  }
});
```

---

## 8. Security Considerations

### 8.1 Environment Variables
- All sensitive keys stored in `.env` file (never committed to Git)
- Supabase anon key is safe for client-side use (RLS protects data)
- Future API keys (OpenAI) only accessible in Edge Functions

### 8.2 Authentication Security
- Passwords hashed with bcrypt before storage
- JWT tokens expire after 7 days
- Refresh tokens used for silent re-authentication
- Email verification required before full account access

### 8.3 Data Protection
- Row Level Security (RLS) prevents unauthorized data access
- User can only read/write their own data
- HTTPS enforced on all connections
- CORS configured to allow only app domain

### 8.4 XSS Prevention
- React automatically escapes user input in JSX
- External links use `rel="noopener noreferrer"`
- Content Security Policy headers configured in Netlify

---

## 9. Deployment Architecture

### Development Environment
```
Developer Machine
  ├── npm run dev (Vite Dev Server on :5173)
  ├── Local Supabase (optional)
  └── Environment Variables from .env
```

### Production Environment (Netlify)
```
GitHub Repository (main branch)
  ↓ (Git Push)
Netlify Build Pipeline
  ├── Install dependencies (npm install)
  ├── Build project (npm run build)
  ├── Optimize assets
  └── Deploy to CDN
     ↓
Netlify CDN (Global Edge Network)
  ├── Static HTML/CSS/JS
  ├── 3D Model Files
  └── Images/Fonts
     ↓
End Users (Global Access)
```

**Build Command**: `npm run build`  
**Publish Directory**: `dist`  
**Environment Variables**: Set in Netlify dashboard

### CI/CD Pipeline
1. Developer pushes code to GitHub
2. Netlify detects commit
3. Runs build command
4. Runs tests (future: npm test)
5. If successful, deploys to production
6. If failed, sends notification

---

## 10. Performance Optimization Strategies

### 10.1 Code Splitting
- React.lazy() for route-based code splitting
- Dynamic imports for heavy components (3D viewer)
- Separate bundles for each route

### 10.2 Asset Optimization
- Draco compression for 3D models (80% size reduction)
- WebP images with fallback to JPEG
- Icon sprites instead of individual SVGs
- Font subsetting (only include used characters)

### 10.3 Caching Strategy
- Aggressive caching for 3D models (Cache-Control: max-age=31536000)
- Service Worker for offline support (future)
- TanStack Query caching for API responses

### 10.4 Rendering Optimization
- Three.js LOD (Level of Detail) for distant objects
- Frustum culling (don't render off-screen objects)
- Texture compression (KTX2 format)
- Debounce search inputs to reduce re-renders

---

## 11. Monitoring & Observability (Future)

### Planned Integrations
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay for debugging user issues
- **Google Analytics 4**: User behavior analytics
- **Supabase Dashboard**: Database query performance

### Key Metrics to Track
- Time to First Byte (TTFB)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- 3D model load time
- API response times

---

## 12. Future Extensions

### Phase 2: Enhanced Features
1. **Multiple Car Models**
   - Add BMW, Mercedes, Audi models
   - Model selector in UI
   - Dynamic part catalog per model

2. **Color Customization**
   - Real-time paint color preview
   - Material editor (metallic, matte, glossy)
   - Save custom color schemes

3. **User Profiles**
   - Dashboard with saved configurations
   - Garage feature (track owned cars)
   - Wishlist for future parts

### Phase 3: Marketplace Integration
1. **Direct Ordering**
   - Shopping cart functionality
   - Payment processing (Stripe/Kaspi)
   - Order tracking

2. **Booking System**
   - Schedule service appointments
   - Calendar integration
   - Reminder notifications

### Phase 4: Advanced Features
1. **Augmented Reality**
   - AR preview via smartphone camera
   - See parts on actual car before buying

2. **Social Features**
   - Share configurations on social media
   - Community forum
   - User-generated content (photos, reviews)

3. **AI Enhancements**
   - Voice assistant integration
   - Predictive maintenance recommendations
   - Personalized part suggestions based on driving habits

### Technical Improvements
- Migrate to Next.js for SSR/SSG
- Implement automated testing (Jest, Cypress)
- Add PWA capabilities for offline use
- Implement GraphQL for more efficient data fetching
- Add Redis caching layer
- Implement real-time chat between users and mechanics

---

## 13. Scalability Plan

### Current Capacity
- **Users**: Supports 1,000 concurrent users on Supabase free tier
- **Storage**: 500 MB database, 1 GB file storage
- **Edge Functions**: 500,000 invocations/month

### Growth Triggers
| Metric | Current Tier | Upgrade Threshold | Action |
|--------|-------------|-------------------|--------|
| Monthly Active Users | Free (Unlimited) | 50,000 | Upgrade to Pro ($25/mo) |
| Database Size | 500 MB | 400 MB (80%) | Optimize data, archive old records |
| Edge Function Calls | 500K/mo | 400K/mo (80%) | Implement caching, upgrade plan |
| Bandwidth | 5 GB/mo | 4 GB/mo (80%) | Optimize assets, use CDN |

### Horizontal Scaling Strategy
- Supabase auto-scales read replicas
- Netlify CDN handles global traffic distribution
- Edge Functions scale automatically
- Database connection pooling (PgBouncer)

---

## 14. Disaster Recovery

### Backup Strategy
- **Database**: Supabase automatic daily backups (7-day retention)
- **Code**: Git version control on GitHub
- **Assets**: 3D models stored in Git LFS
- **Env Variables**: Documented in .env.example

### Recovery Procedures
1. **Database Failure**: Restore from Supabase backup
2. **Deployment Failure**: Rollback to previous Netlify deployment
3. **Code Issue**: Git revert to last stable commit
4. **CDN Outage**: Netlify auto-failovers to backup region

### Monitoring Alerts
- Supabase downtime notification
- Netlify build failure emails
- Sentry error rate spikes
- Custom health check endpoint

---

**Document Version**: 1.0  
**Last Updated**: December 17, 2025  
**Prepared by**: Nurken (Developer), Kanat (PM)  
**Reviewed by**: Tamerlan (UX/UI), Kuanishkerey (QA)
