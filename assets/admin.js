// Админ-панель для управления проектами портфолио

// Хранилище проектов
let projects = {
    index: [],
    finance: [],
    category2: [],
    category3: []
};

// Загрузка проектов из localStorage
function loadProjects() {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
        projects = JSON.parse(saved);
    } else {
        // Начальные данные
        projects = {
            index: [
                { id: 1, name: 'Проект 1', description: 'Описание проекта будет здесь', url: 'https://github.com', icon: '🚀', tags: ['веб'], date: '2024-01-01' }
            ],
            finance: [
                { id: 2, name: 'CoinGlass Scanner', description: 'Сканер для криптобирж', url: 'https://github.com', icon: '📊', tags: ['крипта'], date: '2024-01-15' }
            ],
            category2: [
                { id: 3, name: 'Проект 2', description: 'Описание проекта будет здесь', url: 'https://github.com', icon: '💡', tags: ['frontend'], date: '2024-02-01' }
            ],
            category3: [
                { id: 4, name: 'Проект 3', description: 'Описание проекта будет здесь', url: 'https://github.com', icon: '⚡', tags: ['backend'], date: '2024-02-15' }
            ]
        };
        saveProjects();
    }
}

// Сохранение проектов в localStorage
function saveProjects() {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
}

// Генерация ID
function generateId() {
    return Date.now();
}

// Отображение списка проектов
function renderProjectsList() {
    const container = document.getElementById('projectsList');
    container.innerHTML = '';
    
    const allProjects = [
        ...projects.index.map(p => ({...p, category: 'index', categoryName: 'Все'})),
        ...projects.finance.map(p => ({...p, category: 'finance', categoryName: 'Финансы'})),
        ...projects.category2.map(p => ({...p, category: 'category2', categoryName: 'Категория 2'})),
        ...projects.category3.map(p => ({...p, category: 'category3', categoryName: 'Категория 3'}))
    ];
    
    if (allProjects.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8;">Пока нет проектов</p>';
        return;
    }
    
    allProjects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.innerHTML = `
            <div class="project-item-info">
                <span class="project-item-icon">${project.icon || '📁'}</span>
                <div class="project-item-details">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <small style="color: #64748b;">Категория: ${project.categoryName}</small>
                </div>
            </div>
            <div class="project-item-actions">
                <button class="btn btn-danger" onclick="deleteProject('${project.category}', ${project.id})">Удалить</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Добавление проекта
function addProject(projectData) {
    const category = projectData.category || 'index';
    const project = {
        id: generateId(),
        name: projectData.name,
        description: projectData.description,
        url: projectData.url,
        icon: projectData.icon || '📁',
        tags: projectData.tags ? projectData.tags.split(',').map(t => t.trim()) : [],
        date: new Date().toISOString().split('T')[0]
    };
    
    if (!projects[category]) {
        projects[category] = [];
    }
    
    projects[category].push(project);
    saveProjects();
    
    return project;
}

// Удаление проекта
function deleteProject(category, id) {
    if (!projects[category]) return;
    
    projects[category] = projects[category].filter(p => p.id !== id);
    saveProjects();
    renderProjectsList();
    
    showMessage('Проект удалён', 'success');
}

// Показать сообщение
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    
    setTimeout(() => {
        messageEl.className = 'message';
    }, 3000);
}

// Обработка формы
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    renderProjectsList();
    
    const form = document.getElementById('projectForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const projectData = {
            name: formData.get('name'),
            description: formData.get('description'),
            url: formData.get('url'),
            category: formData.get('category'),
            icon: formData.get('icon'),
            tags: formData.get('tags')
        };
        
        addProject(projectData);
        renderProjectsList();
        
        showMessage('Проект успешно добавлен!', 'success');
        form.reset();
    });
});
