🧭 Project 9 — Around the U.S. (API Version)

Second resubmission PR note.

A fully interactive, API-powered photo-sharing app built with modular JavaScript, accessible UI patterns, and Webpack.

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

🌟 Overview

This project is a continuation of the interactive “Around the U.S.” photo gallery, now fully integrated with a live API. Users can:

Update profile name and description

Change their avatar

Add new image cards

Like/unlike cards

Delete their own posts

View full-size images in accessible modals

This sprint focused on API integration, form validation, accessibility, and responsive BEM architecture.

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

✨ Features

🧩 API Integration

All user data and cards are synced with a remote server, including:

User profile

Avatar

Initial cards

Likes

Delete permissions

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

📝 Dynamic Form Validation

Custom validation messages

Real-time input checking

Submit button state handling

Automatic form reset per modal

Reusable validation configuration

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

🖼️ Interactive Cards

Template-based card rendering

Like button with server persistence

Delete button only for user-owned cards

Image preview modal with caption

Smooth hover and focus transitions

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

🪟 Accessible Modals

Close on Esc

Click overlay to close

Aria labels for all buttons

Responsive layout from 320px and up

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

🎨 BEM + Modular CSS

One block per file

Clean, readable CSS

Fully responsive grid layouts

Modern variable-driven icons

Normalize + custom fonts in vendor folder

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

🔧 Webpack Build System

Asset bundling

CSS extraction

HTML minification

Autoprefixer

Dev/Prod build modes

.gitignore clean and correct (no bundles included)

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

🎥 Demo Video

(https://youtu.be/lV4fxsCVVvY?si=EeaXbaa2xTbgbXaM)

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

📁 File Structure
project-root/
│
├── blocks/
├── images/
├── pages/
├── scripts/
├── vendor/
│ ├── fonts.css
│ ├── normalize.css
│ └── Fonts/
│
├── index.html
├── package.json
├── webpack.config.js
└── Project9_ReviewerNotes.md

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

📌 Key Learnings

Integrating front-end UI with a remote REST API

Optimizing DOM updates via reusable components

Proper modal accessibility patterns

Modularized JavaScript functions

Understanding network requests, errors, and async flows

Structuring large projects in a scalable, maintainable way

⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯

🔍 Reviewer Notes

➡️ See the full detailed list of all project features and implementation details here:
Project9_ReviewerNotes.md
Git Hub: (https://github.com/riffey55/se_project_spots)
YouTube: (https://youtu.be/lV4fxsCVVvY?si=EeaXbaa2xTbgbXaM)

👤 Author

Beren Riffey
GitHub Profile

🙏 Acknowledgments

TripleTen Software Engineering Program

The OpenAI ChatGPT assistant (“Ellie”) for debugging assistance, code review, and collaborative support
