import prisma from '../../prisma/index.js';

class CobayeRepository {
    constructor() {
        this.db = prisma.user;
    }

    async getById(id) {
        return await this.db.findUnique({
            where: { id: id },
        });
    }

    async getByName(name) {
        return await this.db.findUnique({
            where: { nom: name },
        });
    }

    getAll = async () => {
        return await this.db.findMany();
    };

    deleteAll = async () => {
        return await this.db.deleteMany();
    };

    async create(cobaye) {
        return await this.db.create({
            data: cobaye,
        });
    };

    async update(cobaye) {
        return await this.db.update({
            where: { id: cobaye.id },
            data: {
                nom: cobaye.nom,
                prenom: cobaye.prenom,
                dateDeNaissance: cobaye.dateDeNaissance,
                sexe: cobaye.sexe,
                resultatsTestsOphtalmiques: cobaye.resultatsTestsOphtalmiques
            },
        });
    }

    async deleteById(id) {
        return await this.db.delete({
            where: { id: id },
        });
    }
}

export default CobayeRepository;