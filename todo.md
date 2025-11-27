# MintMind - Project TODO & Progress Tracker

**Project**: MintMind - AI-generated content with automatic IP registration on Story Protocol  
**Current Stage**: ✅ DEPLOYMENT COMPLETE - All Core Features Done  
**Last Updated**: 2025-11-27

---

## 🎯 Project Goals

Build a web app where users generate text/images/video via ABV.dev and automatically register prompts/outputs as IP on Story Protocol, with a clean shadcn/Tailwind frontend.

### Core Features (Priority Order)
1. ✅ Chat/creative UI + ABV.dev generation + automatic Story registration
2. ✅ IP Gallery with registered assets and metadata
3. ⏳ Wallet onboarding (Coinbase Embedded Wallets) - optional
4. ⏳ Yakoa originality check - optional bonus
5. ✅ Polished UI + responsive layout (demo video optional)

---

## 📊 Phase Progress

### ✅ Phase A — Project Scaffolding (COMPLETED)
- [x] Init repo: Vite + React + TypeScript + Tailwind + shadcn
- [x] Add ESLint, Prettier, Vitest
- [x] Create .env.example with required env var keys
- [x] **Commit**: `1b8d5a5 chore: scaffold project and tooling`

### ✅ Phase B — Basic UI + Routing (COMPLETED)
- [x] Implement Header, Footer components
- [x] Create Home and Gallery pages
- [x] Add routing + base layout
- [x] **Commit**: `960abca feat(ui): base layout and routing`

### ✅ Phase C — ABV Integration (COMPLETED)
- [x] Implement `lib/abv.ts` with mockable client interface
- [x] Build ChatBox UI and connect to ABV client
- [x] Add mock mode toggled by VITE_USE_MOCK env var
- [x] Display generated output with metadata
- [x] **Commit**: `85c1ec2 feat(abv): add client and chat generation flow`

### ✅ Phase D — Story Registration Flow (COMPLETED)
- [x] Implement `lib/story.ts` wrapper for registration calls
- [x] Add UI for "Register to Story" toggle + button
- [x] Implement automatic registration behavior
- [x] Handle ABV registration info if returned
- [x] Update Gallery to list registered assets with:
  - [x] Story asset ID
  - [x] Registration timestamp
  - [x] Asset metadata (title, type, prompt)
  - [x] Link to Story portal
- [x] Error handling for failed registrations
- [x] **Completed**: Integrated in `85c1ec2 feat(abv): add client and chat generation flow`

### ⏳ Phase E — Wallet + Optional APIs (PENDING)
- [ ] Integrate Coinbase Embedded Wallets
  - [ ] Add "Connect Wallet" button
  - [ ] Handle wallet connection flow
  - [ ] Associate wallet address with session
  - [ ] **Target Commit**: `feat(auth): coinbase embedded wallet`
- [ ] Integrate Yakoa originality check (optional)
  - [ ] Implement `lib/yakoa.ts`
  - [ ] Add originality check UI
  - [ ] Show originality score/guidance
  - [ ] **Target Commit**: `feat(yakoa): originality check`

### ✅ Phase F — Polish + Tests + Deploy (COMPLETED)
- [x] Polish & Styling
  - [x] Clean shadcn/ui components
  - [x] Responsive design implemented
  - [x] Accessible components
- [x] Testing
  - [x] Create test file structure
  - [x] Unit tests: Gallery, Home, Store (10 tests total)
  - [x] All tests passing ✅
  - [x] **Commit**: `328a1f9 test: add comprehensive test suite for core features`
- [x] Documentation & Deploy
  - [x] Update README with setup instructions
  - [x] Add project structure documentation
  - [x] Configure Vercel deployment
  - [x] Deploy to production ✅
  - [x] **Commits**: `e62570f docs: comprehensive README` + `c2cf629 chore: update gitignore`
  
**Live Demo**: https://mintmind-58qtdrjql-abokisubme.vercel.app  
**Note**: Deployment has Vercel SSO protection (common for new deployments)

---

## 🚀 Next Immediate Tasks

### Priority 1 (This Week)
1. **Story Protocol Integration**
   - Research Story SDK/API documentation
   - Implement `lib/story.ts` with registration methods
   - Add registration UI controls in Home page
   - Test registration flow end-to-end

2. **Gallery Enhancement**
   - Fetch and display registered IP assets
   - Show Story asset metadata
   - Add filtering/sorting options
   - Link to Story Protocol portal

### Priority 2 (Next Week)
3. **Testing Suite**
   - Add tracked test files to git
   - Implement core component tests
   - Add integration tests for main flows
   - Ensure all tests pass

4. **Deployment**
   - Set up Vercel project
   - Configure environment variables
   - Deploy to production
   - Test live deployment

### Priority 3 (Optional/If Time)
5. **Coinbase Wallet Integration**
6. **Yakoa Originality Check**
7. **Demo Video Production**

---

## 📋 Environment Setup Checklist

### Required Environment Variables
- [ ] `VITE_ABV_API_KEY` - ABV.dev API key
- [ ] `VITE_STORY_API_KEY` - Story Protocol API key (if needed)
- [ ] `VITE_APP_URL` - Deployment URL

### Optional Environment Variables
- [ ] `VITE_COINBASE_CLIENT_ID` - For Coinbase wallet
- [ ] `VITE_YAKOA_API_KEY` - For originality checks
- [ ] `VITE_USE_MOCK` - Toggle mock mode for development

---

## ✅ Acceptance Criteria Progress

- [x] User can enter a prompt in the UI
- [x] Generate text or image functionality works
- [x] Generated result displays on page
- [ ] Outputs are registered on Story Protocol
- [ ] Registered asset appears in Gallery with Story ID
- [ ] App deployed to Vercel and publicly accessible
- [ ] README contains setup & demo instructions
- [ ] At least 3 passing tests in the repo
- [ ] 2-minute demo video recorded

---

## 🎬 Demo Video Script (2 minutes)

- [ ] 0:00–0:10 — Title slide: "MintMind — auto-register AI outputs as IP"
- [ ] 0:10–0:30 — Show clean UI, click "Connect Wallet" (if integrated)
- [ ] 0:30–1:00 — Type prompt, click Generate (e.g., sci-fi micro-story)
- [ ] 1:00–1:20 — Show output, registration progress, Story asset ID
- [ ] 1:20–1:40 — Open Gallery, show asset metadata
- [ ] 1:40–2:00 — Architecture summary + repo/demo links

---

## 📦 Hackathon Submission Checklist

- [ ] Live demo URL (Vercel)
- [ ] GitHub repo (public) with README
- [ ] Architecture diagram included
- [ ] Setup steps documented
- [ ] Demo video uploaded with link
- [ ] ABV.dev integration demonstrated
- [ ] Story Protocol registration shown
- [ ] Yakoa originality check demo (optional)
- [ ] Scaling/privacy considerations noted

---

## 📝 Development Notes

### Current State
- Project structure is solid with React + Vite + TypeScript
- UI framework (shadcn + Tailwind) configured
- Basic routing and layout completed
- ABV client implemented with mock mode support
- Chat interface functional

### Known Issues / Technical Debt
- Test files created but not tracked in git
- Story Protocol integration pending
- No wallet integration yet
- Need to verify ABV API key configuration
- Gallery page needs data source implementation

### Next Session Focus
**Primary Goal**: Complete Story Protocol registration flow and Gallery display.

**Steps**:
1. Read Story Protocol documentation
2. Implement registration logic in `lib/story.ts`
3. Wire up registration UI in Home page
4. Test registration flow
5. Update Gallery to fetch and display registered assets
6. Commit Phase D changes

---

## 🔗 Useful Links

- ABV.dev API Docs: [Add link when available]
- Story Protocol SDK: [Add link when available]
- Coinbase Embedded Wallets: [Add link when available]
- Yakoa API: [Add link when available]
- Project Repo: [Add GitHub URL]
- Deployed App: [Add Vercel URL when deployed]

---

**Legend**:
- ✅ Completed
- 🔄 In Progress
- ⏳ Pending
- [x] Done
- [ ] Todo
