// script.js
const targetInput = document.getElementById('target-input');
const contentArea = document.getElementById('content-area');
const categoryNav = document.getElementById('category-nav');
const searchInput = document.getElementById('category-search');
const tabBtns = document.querySelectorAll('.tab-btn');

let currentTeam = 'red';
let sectionElements = [];

// Helper to convert category name to anchor id
const makeId = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function renderContent() {
    contentArea.innerHTML = '';
    categoryNav.innerHTML = '';
    sectionElements = [];
    
    const data = currentTeam === 'red' ? redTeamData : blueTeamData;
    const targetValue = targetInput.value.trim() || '{{TARGET}}';

    data.forEach(category => {
        // Build Sidebar Link
        const catId = makeId(category.cat);
        const navLink = document.createElement('a');
        navLink.href = `#${catId}`;
        navLink.className = 'nav-link';
        navLink.innerHTML = `<i class="fa-solid ${category.icn}"></i> <span>${category.cat}</span>`;
        categoryNav.appendChild(navLink);

        // Build Content Section
        const section = document.createElement('section');
        section.className = 'category-section';
        section.id = catId;
        sectionElements.push({ el: section, navLink: navLink });

        const title = document.createElement('h2');
        title.className = 'category-title';
        title.innerHTML = `
            <div class="category-title-left">
                <i class="fa-solid ${category.icn}"></i> ${category.cat}
            </div>
            <i class="fa-solid fa-chevron-down category-toggle-icon"></i>
        `;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'command-grid collapsed';

        title.addEventListener('click', () => {
            title.classList.toggle('open');
            grid.classList.toggle('collapsed');
        });

        navLink.addEventListener('click', () => {
            title.classList.add('open');
            grid.classList.remove('collapsed');
        });

        category.cmds.forEach(cmd => {
            const card = document.createElement('div');
            card.className = 'command-card';
            
            // Allow dynamic replacement of target value
            const processedCmd = cmd.c.replace(/{{TARGET}}/g, targetValue);

            const header = document.createElement('div');
            header.className = 'command-header';
            header.innerHTML = `<div class="command-title">${cmd.t}</div>`;

            const desc = document.createElement('div');
            desc.className = 'command-desc';
            desc.textContent = cmd.d;

            const codeBlock = document.createElement('div');
            codeBlock.className = 'code-block';
            
            const codeElem = document.createElement('code');
            codeElem.textContent = processedCmd;

            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.title = 'Copy to clipboard';
            btn.innerHTML = `<i class="fa-solid fa-copy"></i>`;
            
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(processedCmd).then(() => {
                    const icon = btn.querySelector('i');
                    icon.className = 'fa-solid fa-check';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        icon.className = 'fa-solid fa-copy';
                        btn.classList.remove('copied');
                    }, 2000);
                });
            });

            codeBlock.appendChild(codeElem);
            codeBlock.appendChild(btn);

            card.appendChild(header);
            card.appendChild(desc);
            card.appendChild(codeBlock);
            
            grid.appendChild(card);
        });

        section.appendChild(grid);
        contentArea.appendChild(section);
    });

    handleScroll(); // Init highlight
}

// Track scrolling to highlight active sidebar link
function handleScroll() {
    let currentId = null;
    const scrollPosition = window.scrollY + 100;

    sectionElements.forEach(({ el }) => {
        if (el.offsetTop <= scrollPosition) {
            currentId = el.id;
        }
    });

    sectionElements.forEach(({ el, navLink }) => {
        if (el.id === currentId) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', handleScroll);

// Sidebar Search functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const links = categoryNav.querySelectorAll('.nav-link');
    links.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = text.includes(term) ? 'flex' : 'none';
    });
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTeam = btn.getAttribute('data-team');
        
        if (currentTeam === 'blue') {
            document.body.classList.add('blue-mode');
        } else {
            document.body.classList.remove('blue-mode');
        }
        
        renderContent();
    });
});

targetInput.addEventListener('input', renderContent);

// Assuming data.js is loaded synchronously before this script
requestAnimationFrame(() => {
    renderContent();
});
