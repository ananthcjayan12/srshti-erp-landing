# Dent.Cue360 Mobile - Design Asset Recording Guide

This guide outlines the key workflows and screens to capture for the Dent.Cue360 Landing Page marketing materials (screenshots and video demos).

**Target URL**: `https://dentcharts.srshti.co.in/` (or your local dev instance)

## 1. The "Command Center" (Dashboard)
**Route**: `/home` (or `/dashboard`)
**Goal**: Show that the clinic is under control at a glance.
**Capture Instructions**:
-   **Screenshot**: Capture the top section with the "Today's Stats" cards (Appointments, Pending, Confirmed).
-   **Video**:
    1.  Start at the top.
    2.  Click the "Search Patients" bar to show the overlay.
    3.  Type a common name (e.g., "Sar") to show instant results.
    4.  Scroll down to the "Today's Appointments" list.

## 2. Business Intelligence (Financials)
**Route**: `/financial-dashboard`
**Goal**: Demonstrate the "Pro" analytics capabilities.
**Capture Instructions**:
-   **Screenshot**: Capture the "Revenue Trend" line chart and the "Payment Modes" donut chart side-by-side (desktop view) or scrolling (mobile view).
-   **Video**:
    1.  Hover over the "Revenue Trend" graph to show tooltips with specific numbers.
    2.  Scroll down to "Top Procedures" to show where the money is coming from.
    3.  Highlight the "Outstanding" card to show debt tracking features.

## 3. Clinical Workflow (Patient & Charting)
**Route**: `/patients` -> Select a Patient -> `/prescriptions/:id`
**Goal**: Show the core medical functionality.
**Capture Instructions**:
-   **Screenshot**: The patient profile header with the "New Prescription" button.
-   **Video**:
    1.  Navigate to a patient's profile.
    2.  Click "New Prescription" (if available) or view an existing one.
    3.  Show the "Fill-in-the-blank" or medicine selection interface to demonstrate speed.

## 4. Scheduling (Calendar)
**Route**: `/appointments`
**Goal**: Show ease of booking.
**Capture Instructions**:
-   **Screenshot**: The calendar view or list of upcoming slots.
-   **Video**:
    1.  Click the "New Appointment" FAB (Floating Action Button).
    2.  Show the date/time picker interaction.

## 5. Patient Experience (Public Booking)
**Route**: `/public/clinic/1` (Replace `1` with a valid test clinic ID)
**Goal**: Show what the *patients* see.
**Capture Instructions**:
-   **Screenshot**: The clean booking form with the calendar slots.
-   **Video**:
    1.  Select a date.
    2.  Pick a time slot.
    3.  Fill in a dummy name/phone to show the smooth flow.

## 6. Design System Details (Polish)
**Route**: Any page
**Goal**: Highlight the premium "Glass" aesthetic.
**Capture Instructions**:
-   **Zoomed Screenshots**:
    -   The "Glassmorphic" Sidebar or Bottom Navigation bar.
    -   The gradient backgrounds on the Financial cards.
    -   The shadow details on the Search bar.

## 7. Visual Dental Charting (The "DentCharts" Core)
**Route**: `/patients` -> Select Patient -> "Dental Chart" Tab (or equivalent)
**Goal**: Showcase the interactive 3D/2D tooth charting capabilities.
**Capture Instructions**:
-   **Screenshot**: A full view of the dental chart with mixed conditions (e.g., some red "cavity" teeth, some blue "crowned" teeth) to show data density.
-   **Video**:
    1.  **Tooth Selection**: Click on a specific tooth number (e.g., 18 or 46).
    2.  **Add Condition**: Open the "Add Condition" modal and select "Cavity" or "Crown".
    3.  **Visual Feedback**: Show the tooth changing color/icon after the update.
    4.  **Jaw Switch**: Toggle between "Adult" and "Pediatric" views if available to show versatility.
    5.  **Multi-Select**: Demonstrate holding Shift/Ctrl to select multiple teeth at once.

---
**Technical Note for Developer**:
These routes correspond to the definitions in `src/App.tsx`. Ensure the app is populated with dummy data (at least 5-10 appointments and records) before recording to make the screens look "lived-in" and professional.
