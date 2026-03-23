# 🛡️ CommandDeck

Welcome to **CommandDeck**! This project is a massive, lightning-fast, highly interactive repository of strictly curated cybersecurity commands designed to work like GTFOBins. It acts as an offline, single-page reference tool where security specialists can just "grab commands and get back to work".

## 🚀 Features

- **Extensive Database**: Contains hundreds of curated commands, structured perfectly with 21 commands per category.
- **Dynamic Targeting**: Instantly string-replace your target (e.g. `10.0.0.1` or `example.com`) across *every single command* simultaneously.
- **Red Team & Blue Team Tabs**: Seamlessly switch your entire toolkit state between offensive and defensive methodologies.
- **GTFOBins Style Navigation**: Features a sticky, scroll-tracking side menu that allows you to instantly teleport to any specific grouping.
- **Collapsed by Default**: All categories are rendered collapsed (`display: none`) by default so you aren't overwhelmed with hundreds of commands upon loading. Clicking a category expands it.
- **Instant Copy**: Copy any fully processed command with a single click.
- **Searchable Sidebar**: Type a keyword in the sidebar to filter the category list down to exactly what you need.

## 💻 How to Use

Because this toolkit is constructed using Vanilla HTML, CSS, and JS, **there are no servers or installations required**. It runs entirely locally on your machine for maximum privacy during engagements.

1. **Open the App:** Simply double-click the `index.html` file located in this folder to open it in your default web browser (Chrome, Firefox, Edge, Safari).
2. **Set Your Target:** At the top of the page, locate the "Target" input box and type in the IP address or domain you are testing (e.g., `192.168.1.1` or `target.com`).
3. **Choose Your Role:** Click either the **Red Team** (Offensive) or **Blue Team** (Defensive) buttons to load the respective command database.
4. **Find a Command:** Use the sidebar on the left to click a specific category. The page will instantly scroll to that topic and expand it for you.
5. **Copy to Clipboard:** Click the small `clipboard` icon on any code block to instantly snap the command onto your clipboard.

## 🛠 Adding Custom Commands

The entire payload configuration lives inside `/data.js`. You can easily open this file in any text editor and add new categories using the ultra-compressed JSON structure:

```javascript
{
  cat: "My Custom Tools",
  icn: "fa-wrench", // FontAwesome Icon class
  cmds: [
    {
      t: "Command Title",
      d: "A short note explaining what the command does.",
      c: "mytool -t {{TARGET}} --flag"
    }
  ]
}
```

The UI engine will automatically detect any new categories and generate the layout dynamically upon reload.
