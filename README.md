# Quantum-Processors-Visualization

## To Run on Local (React App)
- Enter storytelling-app directory 
- Run npm start
- View on local http://localhost:3000 or desired port

## Technologies Used
- scrollama for scroll logic with sticky graph
- react-intersection-observer
- Airbnb's Visx D3 framework
- Google Fonts (Inter, Space Grotesk)

## Design & Implementation Notes
- Minimalist typography design
- Data points for superconducting, trapped-ion, and algorithms reveal themselves chronologically by year as user scrolls 
- Tooltips provide context for each point on hover
- Single-page React page allows for effective sticky plot storytelling
- Mobile view centers sticky plot at top of screen under text.
- React version 18.3.1 to ensure compatibility with Visx

## Timeline
- 1/5/2025 2pm
    - Create basic framework with empty static plot
- 1/5/2025 5pm
    - Add superconducting and trapped ion data points to json file
        - System size, Error tolerance, connectivity density
    - Create axes, etc. for plot
    - Temporarily add all points to plot, with size, color and shape
- 1/5/2025 9pm
    - Create separate textboxes for superconducting and trapped ion
    - Sync data points with scrollama for each textbox (note: using scrollama instead of inview)
- 1/6/2025 6pm
    - Write up intro and text boxes
    - Introduce smooth transitions
    - Ensure basic mobile compatibility
- 1/6/2025 10pm
    - Refine plot alignment for mobile compatibility in css
    - Add various algorithms and textbox
    - Hovering over data point displays year or algorithm name
    - Minimalistic stylistic choices in colors, padding, general typography
