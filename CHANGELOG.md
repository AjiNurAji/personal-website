# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Global Live Preview**: Added a `PreviewModal` component to the `AdminLayout` header, allowing administrators to preview the frontend landing page directly from any admin page without opening a new tab.
- **Responsive Preview Toggles**: The Live Preview modal includes device simulation toggles (Desktop, Tablet, Mobile) to ensure cross-device compatibility checks.
- **Skill Icon Picker**: Integrated `react-icons/si` (Simple Icons) into a custom `IconPicker` component for the `SkillForm`, providing a visual search interface to select technology logos instead of typing text.

### Changed
- **Skill Priority Sorting**: Modified the `HomeController` to sort Skills and Experiences in ascending order (`asc`) based on priority, aligning the frontend display logic with the admin instruction (`lower = higher up`).
- **Skills Admin Table UI**: Rearranged the columns in the Admin Skills table to display the rendered SVG Icon directly next to the priority column for better visual context.
- **Skill Icon Rendering**: Updated the public `skills.tsx` section to dynamically extract the slug from the saved `react-icons/si` string (e.g., `SiLaravel` -> `laravel`) to fetch the exact logo from the SimpleIcons CDN, rather than guessing the logo from the skill name.

### Fixed
- **Live Preview Modal Alignment**: Disabled the default absolute-positioned close button in Shadcn's `DialogContent` and manually placed a `DialogClose` button in the header's flex container for perfect vertical alignment with other header actions.

---
*This log corresponds to commit `6ec9dec` on the master branch.*
