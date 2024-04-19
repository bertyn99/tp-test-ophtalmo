import prisma from '../../prisma/index.js';
class SessionRepository {
    constructor() {
        this.db = prisma.session;
    }

    async createSession(startTime, endTime, pauses = []) {
        return await this.db.create({
            data: {
                startTime: startTime,
                endTime: endTime,
                pauses: pauses
            },
        });
    }

    async getAllSessions() {
        return await this.db.findMany();
    }

    async updateSession(id, updates) {
        return await this.db.update({
            where: { id: id },
            data: updates,
        });
    }

    async deleteSessionById(id) {
        return await this.db.delete({
            where: { id: id },
        });
    }

    async deleteAllSessions() {
        return await this.db.deleteMany();
    }
}

export default SessionRepository;