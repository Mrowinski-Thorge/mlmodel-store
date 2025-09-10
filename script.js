document.addEventListener('DOMContentLoaded', () => {
    const modelContainer = document.getElementById('model-container');
    const searchInput = document.getElementById('search-input');
    const noResultsMessage = document.getElementById('no-results-message');
    let allModels = [];

    const categoryIcons = {
        'Image Classifier': 'image',
        'Text Classifier': 'file-text',
        'default': 'cpu'
    };

    function renderModels(models) {
        modelContainer.innerHTML = '';
        if (models.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }

        models.forEach((model, index) => {
            const card = document.createElement('div');
            card.className = 'model-card';
            card.style.animationDelay = `${index * 0.05}s`;

            const iconName = categoryIcons[model.category] || categoryIcons['default'];

            card.innerHTML = `
                <div class="model-card-header">
                    <i data-feather="${iconName}" class="icon"></i>
                    <h2>${model.name}</h2>
                </div>
                <p class="category">${model.category}</p>
                <p>${model.description}</p>
                <a href="${model.download_url}" class="download-btn" download>
                    <i data-feather="download-cloud" class="icon"></i>
                    Download
                </a>
            `;
            modelContainer.appendChild(card);
        });
        feather.replace();
    }

    fetch('models.json')
        .then(response => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
        .then(data => {
            allModels = data.models || [];
            renderModels(allModels);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Modelldaten:', error);
            modelContainer.innerHTML = '<p class="no-results">Fehler beim Laden der Modelle. Bitte versuchen Sie es später erneut.</p>';
        });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredModels = allModels.filter(model => 
            model.name.toLowerCase().includes(searchTerm) ||
            model.category.toLowerCase().includes(searchTerm) ||
            model.description.toLowerCase().includes(searchTerm)
        );
        renderModels(filteredModels);
    });
});
