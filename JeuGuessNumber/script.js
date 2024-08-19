let nombreMystere = Math.floor(Math.random() * 100) + 1;
let essais = 0;
const maxEssais = 10;
let propositions = [];

const feedback = document.getElementById('feedback');
const previousGuesses = document.getElementById('previousGuesses');
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const resetButton = document.getElementById('resetButton');

submitGuess.addEventListener('click', verifierEstimation);
resetButton.addEventListener('click', recommencerJeu);

function verifierEstimation() {
    const estimation = Number(guessInput.value);

    if (!estimation || estimation < 1 || estimation > 100) {
        feedback.textContent = "Veuillez entrer un nombre valide entre 1 et 100.";
        return;
    }

    essais++;
    propositions.push(estimation);

    if (estimation === nombreMystere) {
        feedback.textContent = `Félicitations ! Vous avez trouvé le nombre ${nombreMystere} en ${essais} essais.`;
        terminerJeu(true);
    } else if (essais === maxEssais) {
        feedback.textContent = `Dommage ! Vous avez épuisé vos ${maxEssais} essais. Le nombre correct était ${nombreMystere}.`;
        terminerJeu(false);
    } else {
        feedback.textContent = estimation < nombreMystere ? "Trop bas ! Essayez un nombre plus grand." : "Trop haut ! Essayez un nombre plus petit.";
        previousGuesses.textContent = `Nombres déjà proposés : ${propositions.join(', ')}`;
    }

    guessInput.value = '';
    guessInput.focus();
}

function terminerJeu(gagne) {
    guessInput.disabled = true;
    submitGuess.disabled = true;
    resetButton.classList.remove('hidden');

    if (gagne) {
        feedback.style.color = '#28a745';
    } else {
        feedback.style.color = '#dc3545';
    }
}

function recommencerJeu() {
    essais = 0;
    propositions = [];
    nombreMystere = Math.floor(Math.random() * 100) + 1;

    feedback.textContent = '';
    previousGuesses.textContent = 'Nombres déjà proposés :';
    guessInput.disabled = false;
    submitGuess.disabled = false;
    resetButton.classList.add('hidden');
    feedback.style.color = '#000';
    guessInput.value = '';
    guessInput.focus();
}
