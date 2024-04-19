import prisma from "../../prisma/index.js";


class UserRepository {
    constructor() {
        this.db = prisma.user;
    }
    async getById(id) {
        return await this.db.findUnique({
            where: { id: id },
        });
    }

    async getByEmail(email) {
        return await this.db.findUnique({
            where: { email: email },
        });
    }

    getAll = async () => {
        return await this.db.findMany();
    };

    deleteAll = async () => {
        return await this.db.deleteMany();
    };

    async create(user) {
        return await this.db.create({
            data: user,
        });
    };

    async update(user) {
        return await this.db.update({
            where: { id: user.id },
            data: {
                email: user.email,
                password: user.password,
                age: user.age,
            },
        });
    }

    async deleteById(id) {
        return await this.db.delete({
            where: { id: id },
        });
    }
}

export default UserRepository;