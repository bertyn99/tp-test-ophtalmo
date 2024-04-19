
import { expect, it, describe,vi } from 'vitest';
import UserService from "./user.service.js";

describe('UserService', () => {

    const mockUsers = [
        { email: "42@email.com", password: "42", _id: "4200a8f5185294c4fee1b41e" },
        { email: "user1@example.com", password: "password", _id: "661fa8f5185294c4fee1b41e" },
        { email: "user2@example.com", password: "password", _id: "001fa8f5185294c4fee1b41e" },
        { email: "user3@example.com", password: "password", _id: "111fa8f5185294c4fee1b41e" }
    ];

    const mockUserRepository = {
        getById: vi.fn((id) => mockUsers[0]),
        getByEmail: vi.fn((email) => mockUsers[0]),
        getAll: vi.fn(() => mockUsers),
        deleteById: vi.fn((id) => undefined),
        deleteAll: vi.fn(() => undefined),
        create: vi.fn((user) => ({ email: user.email, password: user.password, _id: "661fa8f5185294c4fee1b41e" })),
        update: vi.fn((user) => user),
    };

    const userService = new UserService(mockUserRepository);

    describe('addUser', () => {
        it('nominal case - should add a new user to the users array', async () => {
            // GIVEN
            const user = {email:'test@example.com', password:'password123'};
            const customMockUserRepository = {
                getByEmail: vi.fn(() => null ),
                create: vi.fn((user) =>( {email:user.email, password:user.password, _id:"661fa8f5185294c4fee1b41e"}))
            }
            const customUserService = new UserService(customMockUserRepository);

            // WHEN
            const res = await customUserService.addUser(user);
            console.log('rer',res);
            // THEN
            expect(res.email).toBe(user.email);
            expect(res.password).toBe(user.password);
            expect(res.age).toBe(user.age);
            expect(res._id).toBeDefined();
        });

        it('functional error - should throw an error if a user with the same email already exists', async () => {
            // GIVEN
            const existingUser = {...mockUsers[0]};

            // WHEN + THEN
            await expect(userService.addUser(existingUser)).rejects.toThrow('User already exists');
        });
    });

    describe('getUsers', () => {
        it('nominal case - should return an empty array if there are no users in the database', () => {
            // GIVEN
            const customMockUserRepository = {
                getAll: vi.fn(() => [])
            }
            const customUserService = new UserService(customMockUserRepository);

            // WHEN
            const res = customUserService.getUsers();

            // THEN
            expect(res).toEqual([]);
        });

        it('nominal case - should return an array of all users in the database', () => {
            expect(userService.getUsers().length).toEqual(4);
        });
    });

    describe('getUserById', () => {
        it('functional error - should throw an error if the user is not found', async () => {
            // GIVEN
            const customMockUserRepository = {
                getById: vi.fn(() => undefined)
            }
            const customUserService = new UserService(customMockUserRepository);

            // WHEN - THEN
            await expect(customUserService.getUserById("0")).rejects.toThrow('User does not exists');
        });

        it('nominal case - should return the correct user if the user is found', async () => {
            const res = await userService.getUserById(mockUsers[0]._id);
            expect(res).toEqual(mockUsers[0]);
        });
    });

    describe('login', () => {
        it('functional error - should throw an error if the email is not found', async () => {
            // GIVEN
            const customMockUserRepository = {
                getByEmail: vi.fn(() => undefined)
            }
            const customUserService = new UserService(customMockUserRepository);

            // WHEN
            try {
                await customUserService.login('name@a.com', '123456');

            // THEN
            } catch (error) {
                expect(error.message).toBe('Invalid Login');
            }
        });

        it('functional error - should throw an error if the password is incorrect', async () => {
            try {
                await userService.login(mockUsers[0].email, "wrong password");
            } catch (error) {
                expect(error.message).toBe('Invalid Login');
            }
        });

        it('nominal case - should return nothing', async () => {
            const res = await userService.login(mockUsers[0].email, mockUsers[0].password);
            expect(res).toBe(mockUsers[0]);
        });
    });

    // TODO updateUser & deleteUserById
});
