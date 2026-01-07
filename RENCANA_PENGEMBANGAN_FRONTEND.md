# 📋 Rencana Pengembangan Frontend - Thesis Finder

**Status**: Planning Phase  
**Date**: January 6, 2026  
**Tech Stack**: Next.js 14, TypeScript, TailwindCSS, Zustand, Axios, React Hot Toast

---

## 🎯 **Phase 1: Core Pages (Week 1-2)**

### ✅ Task 1.1: Setup & Utilities
- [x] Install `react-hot-toast` (notifications)
- [x] Install `react-icons` (icons)
- [x] Install `react-hook-form` (form validation)
- [ ] Create `components/` folder structure
- [ ] Create `pages/` folder structure (if needed)
- [ ] Create reusable component wrappers

### 📄 Task 1.2: Auth Pages
**Pages to Create:**
1. `/auth/login` - User login page
2. `/auth/register` - User registration page

**Components Needed:**
- `LoginForm` component
- `RegisterForm` component
- Form validation with react-hook-form
- Error/success toast notifications
- Redirect after auth

**API Endpoints to Use:**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

---

### 📄 Task 1.3: Search Detail Page
**Page to Create:** `/thesis/[id]` - Detail halaman thesis

**Components Needed:**
- `ThesisDetail` component
- `RelatedThesis` component (recommendations)
- `MethodRecommender` component
- Action buttons (favorite, download, share)

**API Endpoints to Use:**
- `GET /api/search/{id}` - Get thesis detail
- `GET /api/search/{id}/related` - Get related thesis
- `POST /api/search/recommend-method` - Get method recommendations

**Features:**
- Display full thesis info (title, field, keywords, abstract, method)
- Show related/recommended thesis
- Show recommended research methods
- Add to favorites button
- Download button
- Share button

---

### 📄 Task 1.4: User Dashboard
**Page to Create:** `/dashboard` - User profile & history

**Components Needed:**
- `UserProfile` component
- `SearchHistory` component
- `FavoriteThesis` component
- `AccountSettings` component

**Features:**
- Show user info (name, email, role)
- Show search history (last 20 searches)
- Show favorite thesis (saved thesis)
- Account settings
- Logout button
- Edit profile button

---

## 🎯 **Phase 2: Enhanced Features (Week 2-3)**

### 🔧 Task 2.1: Add Shared Components
- [ ] Header/Navbar component
- [ ] Footer component
- [ ] Loading spinner component
- [ ] Error boundary component
- [ ] Modal/Dialog component
- [ ] Card component (reusable)
- [ ] Button variants component
- [ ] Badge/Tag component

### 🔧 Task 2.2: Improve State Management
- [ ] Add `useFavorites` hook (Zustand store)
- [ ] Add `useHistory` hook (Zustand store)
- [ ] Add `useAuth` hook (improve existing)
- [ ] Persist favorites to localStorage
- [ ] Persist history to localStorage

### 🔧 Task 2.3: Add Advanced Search
- [ ] Search by field of study filter
- [ ] Search by keywords filter
- [ ] Pagination component
- [ ] Sort by (relevance, date, etc)
- [ ] Advanced search modal

---

## 🎯 **Phase 3: Polish & Optimization (Week 3-4)**

### 🎨 Task 3.1: UI Polish
- [ ] Add loading states to all pages
- [ ] Add empty states (no results, no data)
- [ ] Add error states & error handling
- [ ] Improve responsive design (mobile)
- [ ] Add dark mode toggle
- [ ] Add animations with Framer Motion

### 🔒 Task 3.2: Security & Performance
- [ ] Add route protection (middleware)
- [ ] Add input validation
- [ ] Add CSRF protection (if needed)
- [ ] Optimize images
- [ ] Add meta tags for SEO
- [ ] Add analytics tracking

### 🧪 Task 3.3: Testing & Docs
- [ ] Create component storybook
- [ ] Add JSDoc comments
- [ ] Create UI documentation
- [ ] Manual testing checklist

---

## 📁 **Folder Structure Target**

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (home search)
│   ├── globals.css
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── thesis/
│   │   └── [id]/page.tsx
│   └── dashboard/
│       └── page.tsx
│
├── components/
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── Modal.tsx
│   ├── forms/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── SearchForm.tsx
│   ├── thesis/
│   │   ├── ThesisCard.tsx
│   │   ├── ThesisDetail.tsx
│   │   ├── ThesisList.tsx
│   │   └── RelatedThesis.tsx
│   └── dashboard/
│       ├── UserProfile.tsx
│       ├── SearchHistory.tsx
│       └── FavoriteThesis.tsx
│
├── lib/
│   ├── api.ts (existing)
│   ├── store.ts (existing)
│   ├── hooks/ (new)
│   │   ├── useAuth.ts
│   │   ├── useFavorites.ts
│   │   └── useHistory.ts
│   └── utils/ (new)
│       ├── format.ts
│       ├── validation.ts
│       └── constants.ts
│
├── styles/
│   └── tailwind.config.ts (existing)
│
└── package.json
```

---

## 📊 **Development Prioritas**

### **🔴 High Priority (Critical for MVP)**
1. Auth Pages (Login/Register) - blocking other features
2. Search Detail Page - core feature
3. Navigation/Layout - needed everywhere
4. Error handling - avoid broken UX

### **🟡 Medium Priority (Important)**
1. Dashboard - user experience
2. Favorites - engagement
3. Search History - UX improvement
4. Responsive design - mobile support

### **🟢 Low Priority (Nice-to-have)**
1. Dark mode
2. Advanced search filters
3. Analytics tracking
4. SEO optimization

---

## 🚀 **Quick Start Commands**

### Install dependencies:
```bash
cd frontend
npm install react-hot-toast react-icons react-hook-form
```

### Development:
```bash
npm run dev
# Opens at http://localhost:3001
```

### Build:
```bash
npm run build
npm start
```

---

## 📝 **API Checklist**

### Auth APIs (for login/register pages)
- [x] POST `/api/auth/register` - Create user account
- [x] POST `/api/auth/login` - Login with email/password
- [x] POST `/api/auth/logout` - Logout
- [x] GET `/api/auth/me` - Get current user

### Search APIs (for detail & dashboard)
- [x] GET `/api/search/{id}` - Get thesis detail
- [x] GET `/api/search/{id}/related` - Get related thesis
- [x] POST `/api/search/recommend-method` - Get method recommendations
- [x] POST `/api/search` - Search thesis (already implemented)

### Dataset APIs (for downloads)
- [x] GET `/api/dataset` - Get all datasets
- [x] GET `/api/dataset/{id}` - Get dataset detail
- [x] POST `/api/dataset/{id}/download` - Download dataset

### Payment APIs (future)
- [x] POST `/api/payment/create` - Create payment
- [x] GET `/api/payment/{transactionId}` - Get payment status

---

## ✨ **Success Criteria**

By end of Phase 1:
- [ ] User dapat login/register
- [ ] User dapat melihat detail thesis dari search results
- [ ] User dapat melihat dashboard mereka
- [ ] Aplikasi fully functional tanpa errors

By end of Phase 2:
- [ ] Semua shared components ready
- [ ] State management proper
- [ ] Advanced search working

By end of Phase 3:
- [ ] Responsive design working
- [ ] Performance optimized
- [ ] UI polished
- [ ] Ready for production

---

## 📞 **Questions to Answer**

1. Berapa user capacity yang ditargetkan?
2. Ada feature tambahan yang ingin ditambahkan?
3. Timeline yang ketat?
4. Budget untuk third-party services?
5. Analytics yang diperlukan?

