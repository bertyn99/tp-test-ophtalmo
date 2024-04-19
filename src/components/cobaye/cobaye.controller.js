import Cobaye from './cobaye.entities.js';
import e from "express";

class CobayeController {
  constructor(cobayeService) {
    this.cobayeService = cobayeService;
  }

  createCobaye = async (req, res) => {
    this.cobayeService.addCobaye(new Cobaye(req.body.nom, req.body.prenom, req.body.dateDeNaissance, req.body.sexe, req.body.resultatsTestsOphtalmiques))
      .then(createdCobaye => res.status(201).send(createdCobaye.toJSON()))
      .catch(err => res.status(403).send(err.message))
  };

  updateCobaye = async (req, res) => {
    this.cobayeService.updateCobaye(new Cobaye(req.body.nom, req.body.prenom, req.body.dateDeNaissance, req.body.sexe, req.body.resultatsTestsOphtalmiques, req.body.id))
      .then(createdCobaye => res.status(200).send(createdCobaye.toJSON()))
      .catch(err => res.status(404).send(err.message))
  };

  getCobayes = async (_, res) => {
    const cobayes = await this.cobayeService.getCobayes();
    const cobayesJSON = cobayes.map(cobaye => cobaye.toJSON());
    res.status(200).send(cobayesJSON);
  };

  getCobayeById = async (req, res) => {
    const { id } = req.params;
    this.cobayeService.getCobayeById(id)
      .then(createdCobaye => res.status(200).send(createdCobaye))
      .catch(err => res.status(404).send(err.message))
  };

  deleteCobayeById = (req, res) => {
    const { id } = req.params;
    res.status(200).send(this.cobayeService.deleteCobayeById(id));
  };

  deleteCobayes = (_, res) => res.status(200).send(this.cobayeService.deleteCobayes());
}

export default CobayeController;