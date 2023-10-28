const fs = require('fs');
const path = require('path');

// Step 1: Read events from text file
const eventsTxt = fs.readFileSync(path.resolve(__dirname, 'events.txt'), 'utf-8');
const events = eventsTxt.split('\n').map(line => {
  const [title, date] = line.split(',');
  return { title, date };
});

// Step 2: Generate HTML content dynamically
let eventDivs = '';
events.forEach(event => {
  eventDivs += `<div class="event-box" id="${event.title}">${event.title}: </div>\n`;
});

// Inject the event divs into index.html
let indexHtml = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
indexHtml = indexHtml.replace('<div id="events"></div>', `<div id="events">\n${eventDivs}</div>`);

fs.writeFileSync(path.resolve(__dirname, 'index.html'), indexHtml);

// Step 3: Inject the events into countdown.js
let countdownJs = fs.readFileSync(path.resolve(__dirname, 'countdown.js'), 'utf-8');
countdownJs = countdownJs.replace('// This will be populated by the build script', `// This will be populated by the build script\n${JSON.stringify(events)}`);

fs.writeFileSync(path.resolve(__dirname, 'countdown.js'), countdownJs);
