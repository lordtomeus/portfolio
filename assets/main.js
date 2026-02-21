// Основной JavaScript файл для портфолио

// Проекты - редактируйте здесь
const projectsData = {
    index: [
        { name: 'Проект 1', description: 'Описание проекта', url: 'https://github.com', icon: '🚀' },
        { name: 'CoinGlass Scanner', description: 'Сканер для криптобирж', url: 'https://github.com', icon: '📊' },
        { name: 'Проект 2', description: 'Описание проекта', url: 'https://github.com', icon: '💡' }
    ],
    finance: [
        { name: 'CoinGlass Scanner', description: 'Сканер для криптобирж', url: 'https://github.com', icon: '📊' }
    ],
    category2: [
        { name: 'Проект 2', description: 'Описание проекта', url: 'https://github.com', icon: '💡' }
    ],
    category3: [
        { name: 'Проект 3', description: 'Описание проекта', url: 'https://github.com', icon: '⚡' }
    ]
};

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '') || 'index';
    return filename;
}

function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    
    const currentPage = getCurrentPage();
    const projects = projectsData[currentPage] || projectsData.index || [];
    
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('a');
        card.href = project.url;
        card.target = '_blank';
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="project-icon">${project.icon || '📁'}</div>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        `;
        
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});
