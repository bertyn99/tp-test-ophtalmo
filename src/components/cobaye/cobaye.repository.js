import db from "../../mongo/db.js";
import { ObjectId } from "mongodb";
import Cobaye from "./cobaye.entities.js";

class CobayeRepository {
  constructor() {
    this.collection = db.collection("cobayes");
  }

  async getById(id) {
    const query = this.createBsonId(id);
    return Cobaye.fromDocument(await this.collection.findOne(query));
  }

  async getByName(name) {
    let query = { nom: name };
    const document = await this.collection.findOne(query);
    if (!document) {
      return undefined
    }
    return Cobaye.fromDocument(document);
  }

  getAll = async () => {
    const documents = await this.collection.find({}).toArray();
    return documents.map(doc => Cobaye.fromDocument(doc));
  };

  deleteAll = async () => await this.collection.deleteMany({});

  async create(document) {
    const res = await this.collection.insertOne(document);
    document.id = res.insertedId.toString()
    return document;
  };

  async update(document) {
    const filter = this.createBsonId(document._id);
    const updateDocument = {
      $set: {
        nom: document.nom,
        prenom: document.prenom,
        dateDeNaissance: document.dateDeNaissance,
        sexe: document.sexe,
        resultatsTestsOphtalmiques: document.resultatsTestsOphtalmiques
      }
    };
    await this.collection.updateOne(filter, updateDocument);
    return await this.getById(document._id);
  }

  async deleteById(id) {
    const query = this.createBsonId(id)
    return await this.collection.deleteOne(query);
  }

  createBsonId(id) {
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (err) {
      throw new Error('Invalid id');
    }
    return query;
  }
}

export default CobayeRepository;