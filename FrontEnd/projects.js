// Store the fetched projects globally
let allProjects = [];

async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Impossible de récupérer les projets depuis le serveur.');
        }
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        return [];
    }
}

async function displayProjects(filteredProjects = null) {
    const galleryElement = document.getElementById('gallery');
    try {
        const projects = filteredProjects || await fetchProjects();
        // Store all projects globally
        allProjects = projects;

        // Empty the gallery
        galleryElement.innerHTML = '';

        // Add a figure for each project in the gallery
        projects.forEach(project => {
            const figureElement = document.createElement('figure');
            figureElement.dataset.id = project.id;

            const imageElement = document.createElement('img');
            imageElement.src = project.imageUrl;
            imageElement.alt = project.title;
            figureElement.appendChild(imageElement);

            const figcaptionElement = document.createElement('figcaption');
            figcaptionElement.textContent = project.title;
            figureElement.appendChild(figcaptionElement);

            galleryElement.appendChild(figureElement);
        });
    } catch (error) {
        console.error('Erreur lors de l\'affichage des projets :', error);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error('Impossible de récupérer les catégories depuis le serveur.');
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        return [];
    }
}

async function displayCategories() {
    const categories = await fetchCategories();
    const buttonsContainer = document.getElementById('filters');

    categories.forEach(category => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = category.name;
        buttonElement.dataset.categoryId = category.id;
        buttonsContainer.appendChild(buttonElement);
    });

    // Add event listeners after buttons are created
    const buttons = document.querySelectorAll('#filters button');
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            const categoryId = event.target.dataset.categoryId;
            filterProjectsByCategory(categoryId);
        });
    });
}

function filterProjectsByCategory(categoryId) {
    try {
        const buttons = document.querySelectorAll('#filters button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        const selectedButton = document.querySelector(`#filters button[data-category-id="${categoryId}"]`);
        selectedButton.classList.add('active');

        const galleryElement = document.getElementById('gallery');
        const figures = galleryElement.querySelectorAll('figure');

        figures.forEach(figure => {
            const projectCategory = allProjects.find(project => project.id === parseInt(figure.dataset.id)).categoryId;
            if (categoryId === 'tous' || projectCategory == categoryId) {
                figure.style.display = 'block';
            } else {
                figure.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Erreur lors du filtrage des projets par catégorie :', error);
    }
}

// Call the functions to display the projects and categories when the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    displayCategories();
});
