# Project Fixes September 24, 2025

## Fix 1: Normalize first

- Moved `normalize.css` above `fonts.css` in `index.css`.

## Fix 2: Card images clickable

- Added `cursor: pointer;` to `.card__image`.
- Added `.card__image_hover-zoom` with hover effect in `card.css`.
- Updated `<img>` in template to include `card__image card__image_hover-zoom`.

## Fix 3: Form validation

- Added `required` attributes to the New Post form inputs in `index.html`.
- Removed silent check `if (!name || !link) return;` in `index.js`.

## Fix 4: Image preview placeholder

- Updated `<img>` in the Image Preview Modal to `src="#" alt="Preview image"`.
