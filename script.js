import './styles.scss';
import { vaccines } from './src/data';

function render() {
  let injection = `<h1>Covid Killer</h1>
  <header>
  <div id= "headerButtons">
  <button id="classerPrix">Classer par prix</button>
  <button id="selectionVaccin">Vaccins approuvés</button>
  </div>
  </header>
  <main>`;

  // affichage cartes
  for (let i = 0; i < vaccines.length; i++) {
    injection += `<div class= "card">
      <h3> Nom: ${vaccines[i].nom}</h3>
      <img src= "${vaccines[i].img}">
      <p> Inventeurs : ${vaccines[i].inventeurs}</p>
      <p> Lieux de production : ${vaccines[i].lieux_production}</p>
      <p> Technologie : ${vaccines[i].technologie}</p>
      <p> Quantité : ${vaccines[i].quantite}</p>
      <p> Prix Unitaire : ${vaccines[i].prix_unitaire}$</p>
      <p> Approuvé : ${vaccines[i].approuve ? 'oui' : 'non'} </p>
      <label for="fquantite">Quantité commande:</label>
      <input type="number" class="fquantite" name="fquantite" min="0" step="1" />
      <button class="boutonReserver">Réserver</button>
      </div>`;
  }

  injection += `</main>
  <footer id="footerCommande">
  <span>Votre commande</span>
  <button id= "boutonCommande">Passer la commande</button>
  </footer>`;
  const app = document.getElementById('app');
  app.innerHTML = injection;

  document.body.addEventListener('click', (e) => {
    // event click montrer seulement les vaccins approuvés
    if (e.target.matches('#selectionVaccin')) {
      for (let i = 0; i < vaccines.length; i++) {
        if (vaccines[i].approuve === false) {
          const vaccinesPasApprouve = document.querySelectorAll('.card')[i];
          if (vaccinesPasApprouve.style.display !== 'none') {
            document.querySelector('#selectionVaccin').innerHTML = 'Tous les vaccins';
            vaccinesPasApprouve.style.display = 'none';
          } else if (vaccinesPasApprouve.style.display !== 'block') {
            document.querySelector('#selectionVaccin').innerHTML = 'Vaccins approuvés';
            vaccinesPasApprouve.style.display = 'block';
          }
        }
      }
    }
    // event click montrer message commande bien enregistrée
    if (e.target.matches('#boutonCommande')) {
      app.innerHTML = '<h1>la commande a bien été enregistrée</h1>';
    }
  });

  // reservation vaccin
  const boutonsReserver = document.querySelectorAll('.boutonReserver');
  for (let i = 0; i < boutonsReserver.length; i++) {
    boutonsReserver[i].addEventListener('click', () => {
      const interiorFooter = document.getElementById('footerCommande');
      const uniteVaccin = document.querySelectorAll('.fquantite');
      // le vaccin apparaît dans la commande du footer avec la quantité demandée
      interiorFooter.innerHTML += `<p>${vaccines[i].nom} Unités: ${uniteVaccin[i].value}</p>`;
      // l'input de quantité disparaît de la carte
      uniteVaccin[i].style.display = 'none';
      // le bouton "réserver" de ce vaccin devient disabled
      boutonsReserver[i].disabled = true;
    });
  }
}

render();
