# User stories

## Admin (Dashboard) user stories

### Authentication

* **As an Admin**, I want to **log in** to the dashboard, so that **only authorized people can manage FAQs**.  
  **Acceptance criteria**
  * Invalid credentials show an error without revealing which field was wrong.
  * After login, I’m redirected to the FAQ list.
  * Authenticated state persists across refresh (token/session).

* **As an Admin**, I want to **log out**, so that **my session is ended on shared devices**.  
  **Acceptance criteria**
  * Logout clears auth state and redirects to login.
  * Protected pages cannot be accessed after logout.

### Manage FAQs (CRUD)

* **As an Admin**, I want to **create a FAQ** (question + answer), so that **new content appears on the site**.  
  **Acceptance criteria**
  * Question and answer are required.
  * Basic validation (min/max length) with inline errors.
  * New FAQ appears in the list after saving.

* **As an Admin**, I want to **edit an existing FAQ**, so that **I can fix or update content**.  
  **Acceptance criteria**
  * I can update question and/or answer.
  * Saving updates the “Last updated” timestamp.

* **As an Admin**, I want to **delete a FAQ**, so that **obsolete content is removed**.  
  **Acceptance criteria**
  * Requires confirmation (modal/dialog).
  * Deleted FAQ no longer appears in the list or public site.

### Publishing

* **As an Admin**, I want to **publish/unpublish a FAQ**, so that **I can control what is visible publicly**.  
  **Acceptance criteria**
  * Each FAQ has a visible status (Published / Unpublished).
  * Public frontend only shows Published FAQs.
  * Toggling status updates immediately and persists after refresh.

### Ordering + metadata

* **As an Admin**, I want to **reorder FAQs**, so that **the public site shows them in the intended order**.  
  **Acceptance criteria**
  * I can change order (drag & drop or move up/down).
  * Order persists after refresh and on the public site.

* **As an Admin**, I want to **see when each FAQ was last modified**, so that **I can audit recent changes**.  
  **Acceptance criteria**
  * List view shows “Last updated” per FAQ.
  * Updated timestamp changes on edit.

### Search & filter

* **As an Admin**, I want to **search and filter FAQs**, so that **I can manage larger lists efficiently**.  
  **Acceptance criteria**
  * Search by keyword across question (and optionally answer).
  * Filter by status (Published / Unpublished).
  * Works together with ordering (ordering still applies to filtered results).

## Public (FAQ page) user stories

* **As a visitor**, I want to **expand/collapse an answer by clicking its question**, so that **I can quickly read what I need**.  
  **Acceptance criteria**
  * Clicking the question toggles the answer.
  * Visual indicator updates (e.g., plus/minus icon rotation).

* **As a visitor**, I want the FAQ to behave as an **accordion (single-open)**, so that **only one answer can be open at a time** and the page stays compact.  
  **Acceptance criteria**
  * Opening a question **closes any previously open** question.
  * Clicking an **open** question **closes** it (leaving all closed).
  * Behavior is consistent for **mouse and keyboard** (`Enter` / `Space` on the focused question).
  * The active item updates `aria-expanded="true"` and inactive items are `aria-expanded="false"`.

* **As a keyboard-only user**, I want to **navigate and toggle FAQs using the keyboard**, so that **the page is fully usable without a mouse**.  
  **Acceptance criteria**
  * Questions are focusable in a logical order.
  * `Enter`/`Space` toggles the focused item.
  * Visible focus styles are present.
  * Uses accessible semantics (e.g., button + `aria-expanded` + `aria-controls`).

* **As a visitor**, I want the layout to **adapt to my screen size**, so that **it’s readable on mobile and desktop**.  
  **Acceptance criteria**
  * No horizontal scrolling at common breakpoints.
  * Typography and spacing remain comfortable on small screens.

* **As a visitor**, I want to **see hover and focus states** on interactive elements, so that **it feels responsive and accessible**.  
  **Acceptance criteria**
  * Hover styles apply on pointer devices.
  * Focus styles are clearly visible and not removed.