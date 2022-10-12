import React from 'react';

const Footer = () => {
  return (
    <footer>
      <nav>
        <div className="footer">
          <h2>A propos</h2>
          <ul>
            <li>
              <a href="#">Fonctionnement du site</a>
            </li>
            <li>
              <a href="#">Conditions générales de vente</a>
            </li>
            <li>
              <a href="#">Données et confidentialité</a>
            </li>
          </ul>
        </div>

        <div className="footer">
          <h2>Nos Hébergements</h2>
          <ul>
            <li>
              <a href="#">Charte qualité</a>
            </li>
            <li>
              <a href="#">Soumettre votre hôtel</a>
            </li>
          </ul>
        </div>

        <div className="footer">
          <h2>Assistance</h2>
          <ul>
            <li>
              <a href="#">Centre d'aide</a>
            </li>
            <li>
              <a href="#">Nous contacter</a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
