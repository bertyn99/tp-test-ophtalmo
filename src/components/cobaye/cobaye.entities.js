import User from './user.entities.js';

class Cobaye extends User {
  constructor(nom, prenom, dateDeNaissance, sexe, resultatsTestsOphtalmiques, _id = null) {
    super(_id);
    this.nom = nom;
    this.prenom = prenom;
    this.dateDeNaissance = dateDeNaissance;
    this.sexe = sexe;
    this.resultatsTestsOphtalmiques = resultatsTestsOphtalmiques;
  }

  toJSON() {
    return {
      id: this._id,
      nom: this.nom,
      prenom: this.prenom,
      dateDeNaissance: this.dateDeNaissance,
      sexe: this.sexe,
      resultatsTestsOphtalmiques: this.resultatsTestsOphtalmiques
    };
  }

  static fromDocument(doc) {
    return new Cobaye(doc.nom, doc.prenom, doc.dateDeNaissance, doc.sexe, doc.resultatsTestsOphtalmiques, doc._id);
  }
}

export default Cobaye;