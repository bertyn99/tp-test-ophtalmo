import CobayeRepository from './cobaye.repository.js';

class CobayeService {
  constructor(repository) {
    this.repository = repository;
  }

  addCobaye = async (cobaye) => {
    if (await this.repository.getByName(cobaye.nom) == null) {
      return this.repository.create(cobaye);
    } else {
      throw new Error('Cobaye already exists');
    }
  };

  updateCobaye = async (cobaye) => {
    await this.getCobayeById(cobaye._id); // Alternatively you can create with put if it does not exist
    return await this.repository.update(cobaye);
  };

  getCobayes = () => this.repository.getAll();

  getCobayeById = async (id) => {
    const cobaye = await this.repository.getById(id);
    if (cobaye) {
      return cobaye
    } else {
      throw new Error('Cobaye does not exists');
    }
  };

  deleteCobayeById = (id) => this.repository.deleteById(id);

  deleteCobayes = () => this.repository.deleteAll();
}

export default CobayeService;