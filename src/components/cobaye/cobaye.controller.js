import Cobaye from './cobaye.entities.js';
import e from "express";

class CobayeController {
  constructor(cobayeService) {
    this.cobayeService = cobayeService;
  }

  createCobaye = async (req, res) => {
    try {
      const createdCobaye = await this.cobayeService.addCobaye(new Cobaye(req.body.nom, req.body.prenom, req.body.dateDeNaissance, req.body.sexe, req.body.resultatsTestsOphtalmiques));
      res.status(201).send(createdCobaye.toJSON());
    } catch (err) {
      res.status(403).send(err.message);
    }
  };

  updateCobaye = async (req, res) => {
    try {
      const updatedCobaye = await this.cobayeService.updateCobaye(new Cobaye(req.body.nom, req.body.prenom, req.body.dateDeNaissance, req.body.sexe, req.body.resultatsTestsOphtalmiques, req.body.id));
      res.status(200).send(updatedCobaye.toJSON());
    } catch (err) {
      res.status(404).send(err.message);
    }
  };

  getCobayes = async (_, res) => {
    try {
      const cobayes = await this.cobayeService.getCobayes();
      const cobayesJSON = cobayes.map(cobaye => cobaye.toJSON());
      res.status(200).send(cobayesJSON);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  getCobayeById = async (req, res) => {
    try {
      const { id } = req.params;
      const cobaye = await this.cobayeService.getCobayeById(id);
      res.status(200).send(cobaye);
    } catch (err) {
      res.status(404).send(err.message);
    }
  };

  deleteCobayeById = async (req, res) => {
    try {
      const { id } = req.params;
      await this.cobayeService.deleteCobayeById(id);
      res.status(200).send({ message: 'Cobaye deleted successfully' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  deleteCobayes = async (_, res) => {
    try {
      await this.cobayeService.deleteCobayes();
      res.status(200).send({ message: 'All cobayes deleted successfully' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
}

export default CobayeController;