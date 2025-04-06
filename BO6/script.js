function toggleSubMenu(card) {
    // Masquer tous les sous-menus
    document.getElementById('terminusSubMenu').style.display = 'none';
    document.getElementById('libertyFallsSubMenu').style.display = 'none';
    document.getElementById('citadelleSubMenu').style.display = 'none';  // Ajout pour Citadelle
    document.getElementById('thetombSubMenu').style.display = 'none';  // Ajout pour Citadelle
    document.getElementById('shatteredveilSubMenu').style.display = 'none';  // Ajout pour Citadelle

    // Afficher le sous-menu correspondant à la carte sélectionnée
    if (card === 'terminus') {
        document.getElementById('terminusSubMenu').style.display = 'block';
    } else if (card === 'libertyFalls') {
        document.getElementById('libertyFallsSubMenu').style.display = 'block';
    } else if (card === 'citadelle') {  // Ajout pour Citadelle
        document.getElementById('citadelleSubMenu').style.display = 'block';
    } else if (card === 'thetomb') {
        document.getElementById('thetombSubMenu').style.display = 'block';
    } else if (card === 'shattredveil') {
        document.getElementById('shatteredveilSubMenu').style.display = 'block';
    }
}

// Initialiser tous les sous-menus comme cachés dès le chargement de la page
window.onload = function() {
    document.getElementById('terminusSubMenu').style.display = 'none';
    document.getElementById('libertyFallsSubMenu').style.display = 'none';
    document.getElementById('citadelleSubMenu').style.display = 'none';
    document.getElementById('thetombSubMenu').style.display = 'none';
    document.getElementById('shatteredveilSubMenu').style.display = 'none';
};
