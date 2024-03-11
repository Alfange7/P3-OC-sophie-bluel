async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:5678/api/works'); // Get the projects from the back-end
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

// Fonction pour afficher les travaux dans la galerie
async function displayProjects() {
    const galleryElement = document.getElementById('gallery'); // Display the projects in the gallery
    try {
        // Get the projects from the back-end
        const projects = await fetchProjects();
        
        // Empty the gallery if it's not already empty
        galleryElement.innerHTML = '';

        // Add a figure for each project in the gallery
        projects.forEach(project => {
            const figureElement = document.createElement('figure');
            
            // Create the image element to display the project image
            const imageElement = document.createElement('img');
            imageElement.src = project.imageUrl; // get the image URL from the project
            imageElement.alt = project.title; // get the title from the project
            figureElement.appendChild(imageElement);
        
            // Create the figcaption element to display the project title
            const figcaptionElement = document.createElement('figcaption');
            figcaptionElement.textContent = project.title; 
            figureElement.appendChild(figcaptionElement);
        
            // Add the figure to the gallery
            galleryElement.appendChild(figureElement);

        });
    } catch (error) {
        console.error('Erreur lors de l\'affichage des projets :', error);
    }
}

// Call the function to display the projects when the DOM is loaded
window.addEventListener('DOMContentLoaded', displayProjects);
