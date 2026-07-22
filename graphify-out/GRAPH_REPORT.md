# Graph Report - personal-website  (2026-07-22)

## Corpus Check
- 192 files · ~53,024 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 909 nodes · 1775 edges · 98 communities (65 shown, 33 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f0d3452f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- utils.ts
- User
- devDependencies
- composer.json
- Illuminate\Http\Request
- dialog.tsx
- DeleteUserForm.tsx
- Skill
- Settings/Index.tsx
- Project
- scripts
- compilerOptions
- useTheme
- Experiences/Index.tsx
- field.tsx
- AuthenticatedLayout.tsx
- AdminLayout.tsx
- Deployment Checklist — Shared Hosting
- Achievement
- Controller
- LoginRequest
- Quick Reference
- SkillForm.tsx
- UI/UX Pro Max - Design Intelligence
- [1.2.0] - 2026-06-24
- dependencies
- Experiences/Edit.tsx
- Pre-Delivery Checklist
- How to Use This Skill
- index.d.ts
- Common Rules for Professional UI
- Example Workflow
- HandleInertiaRequests
- Tips for Better Results
- When to Apply
- SecurityHeaders.php
- ExampleTest
- README.md
- global.d.ts
- projects.ts
- AGENTS.md
- axios
- bootstrap/app.php
- clsx
- framer-motion
- lucide-react
- next-themes
- postprocessing
- @radix-ui/react-checkbox
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-popover
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slot
- @radix-ui/react-tooltip
- react-github-calendar
- react-icons
- react-tooltip
- @remixicon/react
- sonner
- tailwind-merge
- three
- tw-animate-css
- @uiw/react-md-editor
- achievements.ts
- projectsData

## God Nodes (most connected - your core abstractions)
1. `cn()` - 126 edges
2. `Controller` - 39 edges
3. `User` - 26 edges
4. `useTheme()` - 23 edges
5. `buttonVariants` - 22 edges
6. `Badge()` - 20 edges
7. `Button` - 20 edges
8. `Project` - 18 edges
9. `TestCase` - 18 edges
10. `AdminLayout()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `ProjectCard()` --references--> `react`  [EXTRACTED]
  resources/js/Components/Elements/ProjectCard.tsx → package.json
- `MobileNav()` --references--> `react`  [EXTRACTED]
  resources/js/Components/Elements/mobile-nav.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  resources/js/Components/UI/sidebar.tsx → package.json
- `SidebarProvider()` --references--> `react`  [EXTRACTED]
  resources/js/Components/UI/sidebar.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  resources/js/Components/UI/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Communities (98 total, 33 thin omitted)

### Community 0 - "cn"
Cohesion: 0.06
Nodes (63): react, react, AppSidebar(), checkIsActive(), navItems, HeadingAnimation(), HeroHeadingAnimation(), ParagraphAnimation() (+55 more)

### Community 1 - "utils.ts"
Cohesion: 0.07
Nodes (49): AnimateIn(), AnimateInProps, AnimateVariant, variants, ExperienceCard(), ExperienceCardProps, Footer(), FooterProps (+41 more)

### Community 2 - "User"
Cohesion: 0.06
Nodes (22): User, UserFactory, AdminUserSeeder, DatabaseSeeder, Illuminate\Database\Console\Seeds\WithoutModelEvents, Illuminate\Database\Eloquent\Factories\Factory, Illuminate\Database\Eloquent\Factories\HasFactory, Illuminate\Database\Seeder (+14 more)

### Community 3 - "devDependencies"
Cohesion: 0.04
Nodes (41): AppServiceProvider, autoprefixer, concurrently, @headlessui/react, Illuminate\Support\ServiceProvider, @inertiajs/react, laravel-vite-plugin, devDependencies (+33 more)

### Community 4 - "composer.json"
Cohesion: 0.04
Nodes (44): pestphp/pest-plugin, php-http/discovery, autoload, autoload-dev, psr-4, psr-4, config, allow-plugins (+36 more)

### Community 5 - "Illuminate\Http\Request"
Cohesion: 0.12
Nodes (12): AuthenticatedSessionController, ConfirmablePasswordController, EmailVerificationNotificationController, EmailVerificationPromptController, NewPasswordController, PasswordController, PasswordResetLinkController, RegisteredUserController (+4 more)

### Community 6 - "dialog.tsx"
Cohesion: 0.10
Nodes (26): IconPicker(), PreviewModal(), BackgroundDecorations(), createLiquidEffect(), createTouchTexture(), PixelBlast(), PixelBlastProps, PixelBlastVariant (+18 more)

### Community 7 - "DeleteUserForm.tsx"
Cohesion: 0.16
Nodes (8): DangerButton(), InputError(), InputLabel(), Modal(), PrimaryButton(), SecondaryButton(), Guest(), UpdatePasswordForm()

### Community 8 - "Skill"
Cohesion: 0.12
Nodes (7): DashboardController, ExperienceController, SkillController, HomeController, Experience, Skill, Illuminate\Database\Eloquent\Model

### Community 9 - "Settings/Index.tsx"
Cohesion: 0.15
Nodes (20): AchievementFormProps, Experience, ExperienceFormProps, Checkbox(), FieldContent(), FieldError(), FieldLabel(), Input() (+12 more)

### Community 10 - "Project"
Cohesion: 0.14
Nodes (5): ProjectController, SettingController, ProjectController, Project, Setting

### Community 11 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, dev, post-autoload-dump, post-create-project-cmd, post-root-package-install, post-update-cmd, pre-package-uninstall, setup (+18 more)

### Community 12 - "compilerOptions"
Cohesion: 0.10
Nodes (19): resources/js/**/*.d.ts, resources/js/**/*.ts, resources/js/**/*.tsx, ./vendor/tightenco/ziggy, compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames (+11 more)

### Community 13 - "useTheme"
Cohesion: 0.16
Nodes (12): GithubStats(), DailyData, WakaTimeChart(), WakaTimeChartProps, Toaster(), getInitialTheme(), Theme, ThemeContext (+4 more)

### Community 14 - "Experiences/Index.tsx"
Cohesion: 0.24
Nodes (14): Table(), TableBody(), TableCaption(), TableCell(), TableFooter(), TableHead(), TableHeader(), TableRow() (+6 more)

### Community 15 - "field.tsx"
Cohesion: 0.15
Nodes (11): ProjectForm(), ProjectFormProps, Field(), FieldDescription(), FieldGroup(), FieldLegend(), FieldSeparator(), FieldSet() (+3 more)

### Community 16 - "AuthenticatedLayout.tsx"
Cohesion: 0.15
Nodes (4): ApplicationLogo(), Dropdown(), DropDownContext, ResponsiveNavLink()

### Community 17 - "AdminLayout.tsx"
Cohesion: 0.19
Nodes (8): Achievement, AchievementForm(), Button, ThemeToggle(), AdminLayoutProps, Props, AchievementsIndexProps, PaginatedData

### Community 18 - "Deployment Checklist — Shared Hosting"
Cohesion: 0.14
Nodes (13): 1. Pre-Deploy (Lokal), 2. Upload ke Hosting, 3. Setelah Upload — Jalankan di SSH/Terminal Hosting, 4. Shared Hosting Specific, 4a. File Permissions, 4b. PHP Version, 4c. Database, 4d. SSL (+5 more)

### Community 19 - "Achievement"
Cohesion: 0.26
Nodes (3): AchievementController, AchievementController, Achievement

### Community 20 - "Controller"
Cohesion: 0.22
Nodes (6): ImageUploadController, WakaTimeController, VerifyEmailController, Controller, Illuminate\Foundation\Auth\EmailVerificationRequest, Illuminate\Http\JsonResponse

### Community 21 - "LoginRequest"
Cohesion: 0.24
Nodes (3): LoginRequest, ProfileUpdateRequest, Illuminate\Foundation\Http\FormRequest

### Community 22 - "Quick Reference"
Cohesion: 0.18
Nodes (11): 10. Charts & Data (LOW), 1. Accessibility (CRITICAL), 2. Touch & Interaction (CRITICAL), 3. Performance (HIGH), 4. Style Selection (HIGH), 5. Layout & Responsive (HIGH), 6. Typography & Color (MEDIUM), 7. Animation (MEDIUM) (+3 more)

### Community 23 - "SkillForm.tsx"
Cohesion: 0.24
Nodes (5): Skill, SkillForm(), SkillFormProps, Props, Skill

### Community 24 - "UI/UX Pro Max - Design Intelligence"
Cohesion: 0.22
Nodes (8): Available Domains, Available Stacks, How to Use, Output Formats, Prerequisites, Rule Categories by Priority, Search Reference, UI/UX Pro Max - Design Intelligence

### Community 25 - "[1.2.0] - 2026-06-24"
Cohesion: 0.22
Nodes (8): [1.2.0] - 2026-06-24, Added, Added, Changed, Changed, Changelog, Fixed, Fixed

### Community 26 - "dependencies"
Cohesion: 0.22
Nodes (9): class-variance-authority, dependencies, class-variance-authority, @tailwindcss/postcss, @tailwindcss/typography, @types/three, @tailwindcss/postcss, @tailwindcss/typography (+1 more)

### Community 27 - "Experiences/Edit.tsx"
Cohesion: 0.29
Nodes (3): ExperienceForm(), Experience, Props

### Community 28 - "Pre-Delivery Checklist"
Cohesion: 0.33
Nodes (6): Accessibility, Interaction, Layout, Light/Dark Mode, Pre-Delivery Checklist, Visual Quality

### Community 29 - "How to Use This Skill"
Cohesion: 0.33
Nodes (6): How to Use This Skill, Step 1: Analyze User Requirements, Step 2: Generate Design System (REQUIRED), Step 2b: Persist Design System (Master + Overrides Pattern), Step 3: Supplement with Detailed Searches (as needed), Step 4: Stack Guidelines (React Native)

### Community 30 - "index.d.ts"
Cohesion: 0.33
Nodes (5): Achievement, PageProps, Project, Skill, User

### Community 31 - "Common Rules for Professional UI"
Cohesion: 0.40
Nodes (5): Common Rules for Professional UI, Icons & Visual Elements, Interaction (App), Layout & Spacing, Light/Dark Mode Contrast

### Community 32 - "Example Workflow"
Cohesion: 0.40
Nodes (5): Example Workflow, Step 1: Analyze Requirements, Step 2: Generate Design System (REQUIRED), Step 3: Supplement with Detailed Searches (as needed), Step 4: Stack Guidelines

### Community 34 - "Tips for Better Results"
Cohesion: 0.50
Nodes (4): Common Sticking Points, Pre-Delivery Checklist, Query Strategy, Tips for Better Results

### Community 35 - "When to Apply"
Cohesion: 0.50
Nodes (4): Must Use, Recommended, Skip, When to Apply

### Community 38 - "README.md"
Cohesion: 0.50
Nodes (3): About, Development, Tech Stack

### Community 39 - "global.d.ts"
Cohesion: 0.50
Nodes (3): @inertiajs/core, PageProps, Window

## Knowledge Gaps
- **246 isolated node(s):** `$schema`, `name`, `type`, `description`, `laravel` (+241 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `utils.ts`, `dialog.tsx`, `Settings/Index.tsx`, `useTheme`, `Experiences/Index.tsx`, `field.tsx`, `AdminLayout.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `cn`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `react` connect `cn` to `utils.ts`, `devDependencies`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `User` (e.g. with `.store()` and `.run()`) actually correct?**
  _`User` has 21 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `name`, `type` to the rest of the system?**
  _246 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.05627705627705628 - nodes in this community are weakly interconnected._
- **Should `utils.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06869446343130553 - nodes in this community are weakly interconnected._