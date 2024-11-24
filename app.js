// Sélection du conteneur principal dans le DOM
const mainContainer = document.querySelector('.quiz-container'); // Assurez-vous d'avoir un élément avec cette classe dans votre HTML

// Fonction pour charger le fichier JSON
async function loadQuizQuestions() {
    try {
        const response = await fetch('questions.json'); // Charge le fichier JSON
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json(); // Convertit la réponse en objet JavaScript
        const questions = data.questions; // Récupère le tableau de questions

        // Parcourir et afficher chaque question
        questions.forEach((question) => {
            // Crée un conteneur pour chaque question
            const containerQuestion = document.createElement("div");
            containerQuestion.className = "container choix-unique question-container border border-infos mb-2";

            // Crée l'élément pour le texte de la question
            const h2 = document.createElement("h2");
            h2.classList.add("question-text");
            h2.textContent = question.questionText;
            containerQuestion.appendChild(h2);

            // Ajoute les options pour chaque question
            question.options.forEach((option) => {
                const proposition = document.createElement("div");
                proposition.className = "form-check mt-4 proposition";

                const input = document.createElement("input");
                input.setAttribute("type", "radio");
                input.setAttribute("name", `question-${question.questionId}`); // Associe chaque groupe d'options à une question
                input.setAttribute("id", `option-${question.questionId}-${option.optionId}`);
                input.className = "form-check-input";

                const label = document.createElement("label");
                label.className = "form-check-label label-proposition";
                label.setAttribute("for", `option-${question.questionId}-${option.optionId}`);
                label.textContent = option.optionText;

                // Ajoute l'input et le label au conteneur d'option
                proposition.appendChild(input);
                proposition.appendChild(label);

                // Ajoute la proposition au conteneur de question
                containerQuestion.appendChild(proposition);
                
            });
            
            // Ajoute le conteneur de question au conteneur principal
            mainContainer.appendChild(containerQuestion);
        });
    } catch (error) {
        console.log('Il y a eu un problème avec la récupération des questions:', error);
    }
}

// Appel de la fonction pour charger les questions
loadQuizQuestions();
