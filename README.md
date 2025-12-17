# CarFix Studio - Professional Car Tuning & Modification Platform
## LINK: https://carfix-studio.netlify.app/
## Overview
CarFix Studio is an advanced web-based platform for car modification and tuning visualization. The application provides an interactive 3D car model viewer that allows users to explore various car parts, view detailed information about components, find nearby auto service centers, and receive AI-powered assistance for car maintenance and repairs.
<img width="1900" height="901" alt="image" src="https://github.com/user-attachments/assets/17593a6a-881a-49e2-9ae4-6c8bf21b64bb" />

**Problem Statement:**  
Car owners and enthusiasts often struggle to visualize modifications before purchase, find reliable information about car parts, and locate trusted auto service centers. Traditional catalogs lack interactivity, and finding authentic parts with installation guidance remains challenging.

**Solution:**  
CarFix Studio provides an immersive 3D visualization platform where users can:
- Interact with detailed 3D car models
- Explore clickable car components with specifications and pricing
- Access direct links to purchase authentic parts from kolesa.kz
- Watch installation tutorial videos
- Find nearby auto service centers using geolocation
- Get AI-powered assistance for car-related queries

**Target Users:**
- Car enthusiasts seeking modifications and upgrades
- Car owners requiring maintenance information
- Auto mechanics and service professionals
- Car parts dealers and vendors
- AI assistnat integrated
<img width="1850" height="886" alt="image" src="https://github.com/user-attachments/assets/5cd1a1fa-49e2-45e3-936f-f0e0f6138fae" />

## Tech Stack

### Front End
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 11.18.2** - Animation library
- **React Router DOM 6.30.1** - Client-side routing
- **Shadcn/UI** - Accessible component library built on Radix UI

### 3D Visualization
- **Three.js 0.170.0** - 3D rendering engine
- **@react-three/fiber 8.18.0** - React renderer for Three.js
- **@react-three/drei 9.122.0** - Helper components for 3D scenes

### Maps & Geolocation
- **Leaflet 1.9.4** - Interactive maps library
- **React Leaflet 4.2.1** - React components for Leaflet
<img width="1836" height="859" alt="image" src="https://github.com/user-attachments/assets/c74c7069-0fec-4943-9980-e60fb2a29104" />

### Backend & Database
- **Supabase 2.81.1** - Backend as a Service (PostgreSQL database, authentication, storage)
- **TanStack Query 5.83.0** - Server state management

### Form Management & Validation
- **React Hook Form 7.61.1** - Performant form handling
- **Zod 3.25.76** - TypeScript-first schema validation

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React 0.462.0** - Icon library
- **Sonner 1.7.4** - Toast notifications

### Development Tools
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint 8.38.0** - TypeScript-specific linting rules
- **PostCSS 8.5.6** - CSS transformation
- **Autoprefixer 10.4.21** - CSS vendor prefixing

## Project Structure

```
carfix-studio/
├── public/                 # Static assets
│   ├── corolla.glb        # Toyota Corolla 3D model
│   ├── 2022_porsche_911_gt3_992.glb  # Porsche 911 GT3 3D model
│   ├── _redirects         # Netlify routing configuration
│   └── favicon.ico        # Application icon
├── src/
│   ├── components/        # React components
│   │   ├── 3D/           # 3D model components
│   │   │   ├── CarModel.tsx        # Porsche model component
│   │   │   ├── CarViewer.tsx       # 3D viewer with controls
│   │   │   └── CorollaModel.tsx    # Toyota Corolla with clickable parts
│   │   ├── Layout/       # Layout components
│   │   │   ├── Sidebar.tsx         # Parts navigation sidebar
│   │   │   └── TopBar.tsx          # Application header
│   │   └── UI/           # UI components (Shadcn)
│   │       ├── button.tsx, input.tsx, dialog.tsx, etc.
│   │       ├── LoginModal.tsx      # User authentication modal
│   │       ├── PartDetailsModal.tsx # Part information modal
│   │       └── AIAssistantModal.tsx # AI chat interface
│   ├── pages/            # Application pages
│   │   ├── Index.tsx     # Main 3D viewer page
│   │   ├── Map.tsx       # Auto service locator
│   │   ├── Auth.tsx      # Authentication page
│   │   └── NotFound.tsx  # 404 error page
│   ├── data/             # Static data
│   │   └── partsData.ts  # Car parts catalog
│   ├── integrations/     # External service integrations
│   │   └── supabase/     # Supabase client configuration
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── main.tsx          # Application entry point
├── supabase/             # Supabase configuration
│   ├── config.toml       # Local development config
│   └── functions/        # Edge functions
│       └── ai-assistant/ # AI chatbot implementation
├── docs/                 # Project documentation
│   ├── README.md         # This file
│   ├── PRD.md           # Product Requirements Document
│   ├── Architecture.md   # System architecture
│   ├── API.md           # API specification
│   └── User_Stories.md   # User stories
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── .env.example          # Environment variables template
```

## How to Run the Project

### System Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or **bun** v1.0.0+)
- **Modern web browser** with WebGL support (Chrome, Firefox, Safari, Edge)
- **Internet connection** for map features and external resources

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/mukhametzhan-dev/carfix-studio.git
cd carfix-studio
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server**
```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## How to Run Tests

Currently, the project is in MVP stage and uses manual QA testing. Automated tests will be implemented in future iterations.

### Manual Testing Checklist
1. 3D Model Loading and Interaction
2. Part Selection and Details Display
3. Map Functionality and Geolocation
4. User Authentication Flow
5. AI Assistant Integration
6. Responsive Design on Mobile/Tablet/Desktop
7. External Links (Kolesa.kz, YouTube tutorials)
8. Search and Filter Functionality

For detailed test results, see the QA Testing Report in project documentation.

## Features

### Core Features (MVP v0.1)
- ✅ Interactive 3D car model visualization
- ✅ Clickable car parts (Front Windshield, Side Mirror, Left Body Panel Door)
- ✅ Part information modal with specifications and pricing
- ✅ Direct links to purchase parts on kolesa.kz
- ✅ YouTube tutorial links for part installation
- ✅ Interactive map showing nearby auto service centers
- ✅ Geolocation-based service search (5-10km radius)
- ✅ User authentication (sign up/login via Supabase)
- ✅ AI-powered chat assistant for car queries
- ✅ Responsive design for desktop and mobile
- ✅ Search functionality for parts catalog

### Planned Features (Backlog)
- User profile and saved configurations
- Part comparison tool
- User reviews and ratings
- Booking system for auto services
- Multiple car models support
- Custom color picker for paint visualization
- Augmented Reality (AR) preview
- Social sharing of car configurations

## Additional Documents

### Product Documentation
- [Product Requirements Document (PRD)](./docs/PRD.md)
- [System Architecture](./docs/Architecture.md)
- [API Specification](./docs/API.md)
- [User Stories](./docs/User_Stories.md)

### Development
- [Environment Variables Template](./.env.example)

## Team

- **Project Manager & 3D Designer**: Kanat
- **Front End & Back End Developer**: Nurken
- **UX/UI Designer**: Tamerlan
- **QA & Tester**: Kuanishkerey

## License

This project is proprietary software developed for educational purposes.

## Contact & Support

For questions, issues, or contributions, please contact the development team or open an issue in the GitHub repository.

---

**CarFix Studio** - Visualize, Customize, Drive


