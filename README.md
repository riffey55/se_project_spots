# SE Project — Spots

_A responsive gallery application featuring accessible modals, reusable components, and dynamic form validation._

---

## Overview

The **Spots Project** is an interactive photo gallery that allows users to edit profile information and add new image posts dynamically.  
This sprint focused on improving the **modal user experience (UX)** and implementing a **universal form validation system** using modular JavaScript.

---

## Features

- Responsive layout that adapts seamlessly across desktop, tablet, and mobile screens
- Accessible modals that open and close via:
  - Escape key
  - Overlay click
  - Close button
- Reusable JavaScript functions (`openModal()`, `closeModal()`) for scalable modal logic
- Configurable validation system defined in a single object in `validation.js`
- Interactive gallery cards with like, delete, and preview functionality
- Subtle hover and zoom transitions to enhance visual feedback

---

## Live Demo

**View Project:** [Spots on GitHub Pages](https://berenriffey.github.io/se_project_spots/)

---

## Project Pitch Video

Watch this brief [project overview](https://www.loom.com/share/274b2877e7584aa5a32409e46ad5642f?sid=6cf3015d-79f1-477b-b4fb-fa358a30e81b),  
where I explain the challenges and improvements made to the modal UX and validation system.

---

## Tech Stack

- HTML5
- CSS3 (BEM Methodology)
- Vanilla JavaScript (modular functions)
- Git & GitHub
- Figma

---

## Figma Design

[View Original Design in Figma](https://www.figma.com/file/ADD_FIGMA_LINK_HERE)

---

## Key Learnings

- Building modular JavaScript with reusable helper functions
- Managing event listeners efficiently to prevent memory leaks
- Designing configurable validation systems for scalable form logic
- Strengthening debugging and DOM traversal skills

---

## Future Improvements

- Implement localStorage to persist profile and card data
- Add a dark/light theme toggle
- Expand form validation for URL patterns and input sanitization

---

## Fix Completion Report

**Date:** October 26, 2025  
**Author:** Beren

All reviewer feedback for the **Spots Project** has been implemented and verified.  
The project now fully complies with the required specifications for Sprint 6.

### Completed Fixes

1. Removed JavaScript scroll-reveal feature and migrated hover/zoom to CSS-only transitions.
2. Removed JS auto-contrast for the delete icon and replaced with a pure CSS chip for accessibility.
3. Replaced inline data-URI icons with exported SVG assets:
   - `/images/like-inactive.svg`
   - `/images/like-active.svg`
   - `/images/trash.svg`
4. Updated card and cards styles to match reviewer specifications:
   - Card `max-width: 413px`, square image `413×413px` with `8px` radius
   - Adjusted content gap spacing, hover, focus, and reduced-motion compliance
   - Grid layout centered cards with `repeat(auto-fit, 413px)` and `gap: 40×20`
5. Removed `animations.css` and consolidated hover transitions within `card.css`
6. Updated `index.css` imports to reflect the final block structure
7. Verified accessibility and motion preferences to ensure consistent UX on all breakpoints

### Verification

- Cards are centered and displayed with correct dimensions
- SVG heart and trash icons load correctly and respond to interactions
- No unused files or redundant imports remain
- All reviewer comments have been satisfied in the final commit

### Confirmation

This report certifies that the **Spots Project** has passed all post-review fixes and is ready for final submission.

---

## Author

**Beren Riffey**  
[GitHub Profile](https://github.com/BerenRiffey)

---

## Acknowledgments

Special thanks to the **TripleTen Software Engineering Program** for providing a structured learning experience,  
and to **OpenAI’s ChatGPT** for guidance, debugging support, and creative collaboration.
