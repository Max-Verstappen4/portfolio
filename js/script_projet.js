var container = document.getElementById("projet");
var titresProjet = Array.from(document.querySelectorAll("#projet > h2"));

function mettreAJourTitreSelectionne(index) {
    titresProjet.forEach((titre, titreIndex) => {
        var isSelected = titreIndex === index;
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

function getTitreLePlusHautVisible() {
    if (!container) {
        return -1;
    }

    var containerRect = container.getBoundingClientRect();
    var titreSelectionneIndex = -1;
    var plusPetitTop = Infinity;

    titresProjet.forEach((titre, index) => {
        var rect = titre.getBoundingClientRect();
        var visible = rect.bottom > containerRect.top && rect.top < containerRect.bottom;

        if (visible && rect.top < plusPetitTop) {
            plusPetitTop = rect.top;
            titreSelectionneIndex = index;
        }
    });

    return titreSelectionneIndex;
}

function synchroniserSelectionAvecScroll() {
    var index = getTitreLePlusHautVisible();

    if (index !== -1) {
        mettreAJourTitreSelectionne(index);
    }
}

function ouvrirDetail(titre) {
    var detail = titre.nextElementSibling;

    if (detail && detail.classList.contains("projet_details")) {
        detail.classList.add("is-open");
    }
}

function fermerDetail(titre) {
    var detail = titre.nextElementSibling;

    if (detail && detail.classList.contains("projet_details")) {
        detail.classList.remove("is-open");
    }
}

if (container) {
    container.addEventListener("scroll", () => {
        synchroniserSelectionAvecScroll();
        
    });
}

titresProjet.forEach((titre, index) => {
    titre.addEventListener("click", () => {
        if (!titre.classList.contains("selectione")) {
            titre.scrollIntoView({ behavior: "smooth", block: "start" });
            mettreAJourTitreSelectionne(index);
            return;
        }

        var detail = titre.nextElementSibling;

        if (detail && detail.classList.contains("projet_details")) {
            detail.classList.toggle("is-open");
        }
    });
});

if (titresProjet.length > 0) {
    mettreAJourTitreSelectionne(0);
    synchroniserSelectionAvecScroll();
}
