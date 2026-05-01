# Mobile Menu Implementation Plan

## Issue Description
Currently, the sidebar and the links in the topbar (Exhibition, Collection) are not present in mobile view. 

**Reason:** 
The `Sidebar.jsx` component and the desktop navigation wrapper in `Topbar.jsx` are styled with Tailwind's `hidden lg:flex` classes. This hides them on smaller screens to conserve space. However, a mobile alternative (like a hamburger menu) was not fully implemented. The `Topbar` has a "MENU" button, but it currently does not do anything when clicked.

## Proposed Changes

To correct this and provide full navigation on mobile devices, we need to implement a mobile menu overlay.

### 1. `components/MobileMenu.jsx` [NEW]
Create a new component for the mobile navigation drawer/overlay.
- It will use the `glass-frost` and dark aesthetic to match the rest of the application.
- It will display all navigation links that are normally split between the Sidebar and Topbar:
  - Home
  - Search
  - Exhibition
  - Collection
  - Analysis
  - Profile
  - Settings
- It will use `framer-motion` for a smooth slide-in or fade-in transition.
- It will include a close button to dismiss the menu.

### 2. `components/Topbar.jsx` [MODIFY]
Update the Topbar to manage the state of the mobile menu.
- Add a `useState` hook: `const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)`.
- Update the existing "MENU" button to toggle this state: `onClick={() => setIsMobileMenuOpen(true)}`.
- Render the `<MobileMenu />` component, passing the state and the close handler as props.

## User Review Required
> [!IMPORTANT]
> The mobile menu will combine links from both the Topbar and Sidebar into a single full-screen glass-frost overlay. Does this approach align with your design vision for mobile devices?

## Verification Plan
1. Test the application in mobile view (screen width < 1024px).
2. Verify that clicking the "MENU" button in the Topbar opens the mobile menu overlay.
3. Verify that all links (Exhibition, Collection, Home, etc.) are present and clickable.
4. Verify that clicking a link navigates to the correct page and closes the menu overlay.
