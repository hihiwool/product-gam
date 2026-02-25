# Project Overview: Lottery Number Generator

A modern, simple, and visually appealing web application that generates random lottery numbers (1-45).

## Features
- **Random Number Generation:** Generates 6 unique numbers between 1 and 45.
- **Dynamic Styling:** Numbers are color-coded based on their value ranges (consistent with common lottery patterns).
- **Responsive Design:** Works perfectly on both desktop and mobile devices.
- **Dark/Light Mode:** Support for theme switching with persistence using `localStorage`.
- **Modern UI:** Uses CSS variables, gradients, and smooth transitions for a premium feel.
- **Affiliate Inquiry Form:** Integrated with Formspree to receive inquiries via email.

## Technical Details
- **Frontend:** Vanilla HTML5, CSS3 (Modern Baseline features), and JavaScript (ES6+).
- **Theme Management:** Utilizes CSS variables and a body-level class (`.dark-mode`) toggled via JavaScript.
- **Form Handling:** Uses the `fetch` API to submit form data to Formspree asynchronously without page reloads.

## Plan & Progress
1. [x] Basic HTML structure and styling.
2. [x] Random number generation logic.
3. [x] Range-based color coding for numbers.
4. [x] Add Dark/Light mode support.
5. [x] Implement theme persistence.
6. [x] **Add Affiliate Inquiry Form (Formspree).**
7. [ ] Add animation for number appearance.
