
var allTitres = Array.from(document.querySelectorAll("h2"));
var titres = allTitres.filter(t => t.nextElementSibling && t.nextElementSibling.classList.contains("projet_details"));

var projetContainer = document.getElementById("projet");
var titresProjet = titres.filter(t => projetContainer && projetContainer.contains(t));

function mettreAJourTitreSelectionneDans(list, index) {
    list.forEach((titre, i) => {
        var isSelected = i === index;
        titre.classList.toggle("selectione", isSelected);

        var detail = titre.nextElementSibling;
        if (detail && detail.classList.contains("projet_details")) {
            if (isSelected) {
                detail.classList.add("is-open");
            } else {
                detail.classList.remove("is-open");
            }
        }
    });
}

function getTitreLePlusHautVisibleDans(container, list) {
    if (!container) return -1;
    var containerRect = container.getBoundingClientRect();
    var indexSelectionne = -1;
    var plusPetitTop = Infinity;

    list.forEach((titre, index) => {
        var rect = titre.getBoundingClientRect();
        var visible = rect.bottom > containerRect.top && rect.top < containerRect.bottom;
        if (visible && rect.top < plusPetitTop) {
            plusPetitTop = rect.top;
            indexSelectionne = index;
        }
    });

    return indexSelectionne;
}

function synchroniserSelectionProjet() {
    var index = getTitreLePlusHautVisibleDans(projetContainer, titresProjet);
    if (index !== -1) {
        mettreAJourTitreSelectionneDans(titresProjet, index);
    }
}

titres.forEach((titre, index) => {
    titre.style.cursor = "pointer";
    titre.addEventListener("click", () => {
        
        if (projetContainer && projetContainer.contains(titre)) {
            var idx = titresProjet.indexOf(titre);
            if (idx !== -1 && !titre.classList.contains("selectione")) {
                titre.scrollIntoView({ behavior: "smooth", block: "start" });
                mettreAJourTitreSelectionneDans(titresProjet, idx);
                return;
            }
        }

        var detail = titre.nextElementSibling;
        if (detail && detail.classList.contains("projet_details")) {
            detail.classList.toggle("is-open");
            titre.classList.toggle("selectione", detail.classList.contains("is-open"));
        }
    });
});

if (titresProjet.length > 0) {
    mettreAJourTitreSelectionneDans(titresProjet, 0);
    if (projetContainer) {
        synchroniserSelectionProjet();
        projetContainer.addEventListener("scroll", synchroniserSelectionProjet);
    }
}
