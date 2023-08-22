import app from "../app";
import supertest from "supertest";
import postgresConnection from "../database/connection";
import { request } from "express";
jest.mock("../middleware/isAuthenticated");

describe("Test auth controller login API", () => {
    // Positives
    test("Login with the correct identifier and password", async () => {
        const result = await supertest(app).post("/api/login").send({
            identifier: "afeef97",
            password: "!Abc123!",
        });
        expect(result.statusCode).toEqual(200);
    });

    // Negatives
    test("Login with incorrect identifier and password", async () => {
        const result = await supertest(app).post("/api/login").send({
            identifier: "idontexist",
            password: "!M3neither!",
        });
        expect(result.statusCode).toEqual(403);
        expect(result.body.error.errors[0].msg).toBe("User does not exist");
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});

describe("Test protected route", () => {
    test("Access /protected with authenticated user", async () => {
        const res = await request(app.getHttpServer())
            .get("/api/protected")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual("You are authenticated");
    });

    test("Access /protected without authenticated user", async () => {
        const result = await supertest(app).get("/api/protected");
        expect(result.status).toEqual(400);
        expect(result.body.message).toEqual("Unauthorized");
    });
});

describe("Test auth controller register API", () => {
    // Positives
    test("Register new user with valid credentials", async () => {
        const result = await supertest(app).post("/api/register").send({
            username: "mockUser",
            email: "mock@email.com",
            password: "m0ckP@ssword",
        });
        expect(result.statusCode).toEqual(200);
    });

    // Negatives
    test("Register new user with invalid credentials", async () => {
        const result = await supertest(app).post("/api/register").send({
            username: "mock",
            email: "mock.email.com",
            password: "mockpassword",
        });
        expect(result.statusCode).toEqual(403);
        expect(result.body.error.errors[0].msg).toEqual(
            "Your passwords need to have 8 characters minimum with at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
        );
        expect(result.body.error.errors[1].msg).toEqual(
            "Username needs to be at least 5 characters"
        );
        expect(result.body.error.errors[2].msg).toEqual("Invalid email format");
    });

    afterAll((done) => {
        postgresConnection.query(
            "DELETE FROM users WHERE username = 'mockUser' OR username = 'mock'"
        );
        done();
    });
});
