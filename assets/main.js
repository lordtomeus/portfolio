// Основной JavaScript файл для портфолио

// Проекты - редактируйте здесь
// tags: массив тегов для проекта
const projectsData = {
    index: [
        { name: 'Проект 1', description: 'Описание проекта', url: 'https://github.com', icon: '🚀', tags: ['веб', 'frontend'] },
        { name: 'CoinGlass Scanner', description: 'Сканер для криптобирж', url: 'https://github.com', icon: '📊', tags: ['криптовалюта', 'трейдинг'] },
        { name: 'Проект 2', description: 'Описание проекта', url: 'https://github.com', icon: '💡', tags: ['backend', 'api'] }
    ],
    finance: [
        { name: 'CoinGlass Scanner', description: 'Сканер для криптобирж', url: 'https://github.com', icon: '📊', tags: ['криптовалюта', 'трейдинг'] }
    ],
    category2: [
        { name: 'Проект 2', description: 'Описание проекта', url: 'https://github.com', icon: '💡', tags: ['backend', 'api'] }
    ],
    category3: [
        { name: 'Проект 3', description: 'Описание проекта', url: 'https://github.com', icon: '⚡', tags: ['мобильный', 'ios'] }
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
            ${project.tags && project.tags.length > 0 ? `<div class="project-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
        `;
        
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});
