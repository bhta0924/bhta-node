import request from "supertest";
import { createServer } from "../../src/server";
import { requestCallbackHandler } from "../helpers";

const fetchMock = jest.fn();

globalThis.fetch = fetchMock;

const app = createServer();

// TODO: Add more tests (default list params, bad request, more than 10 source entries, etc).
describe("GET /players", () => {
  describe("happy path", () => {
    beforeEach(() => {
      fetchMock.mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            test_id: {
              first_name: "Test",
              last_name: "Test Name",
              player_id: "test_id",
              position: "A",
            },
            test_id_2: {
              first_name: "Test",
              last_name: "Test Name",
              player_id: "test_id_2",
            },
            test_id_3: {
              first_name: "Test",
              last_name: "Test Name",
              player_id: "test_id_3",
              position: "B",
            },
          })
        )
      );
    });

    it("responds with status 200 OK", (done) => {
      request(app)
        .get("/players")
        .expect(200)
        .expect(
          {
            result: [
              {
                first_name: "Test",
                last_name: "Test Name",
                image_url: null,
                player_id: "test_id",
                position: "A",
              },
              {
                first_name: "Test",
                last_name: "Test Name",
                image_url: null,
                player_id: "test_id_2",
              },
              {
                first_name: "Test",
                last_name: "Test Name",
                image_url: null,
                player_id: "test_id_3",
                position: "B",
              },
            ],
            totalResults: 3,
          },
          requestCallbackHandler(done)
        );
    });

    it("responds with status 200 OK for given position", (done) => {
      request(app)
        .get("/players?position=B")
        .expect(200)
        .expect(
          {
            position: "B",
            result: [
              {
                first_name: "Test",
                last_name: "Test Name",
                image_url: null,
                player_id: "test_id_3",
                position: "B",
              },
            ],
            totalResults: 1,
          },
          requestCallbackHandler(done)
        );
    });

    it("responds with status 200 OK for given limits", (done) => {
      request(app)
        .get("/players?offset=1&limit=1")
        .expect(200)
        .expect(
          {
            limit: 1,
            offset: 1,
            result: [
              {
                first_name: "Test",
                last_name: "Test Name",
                image_url: null,
                player_id: "test_id_2",
              },
            ],
            totalResults: 1,
          },
          requestCallbackHandler(done)
        );
    });
  });

  describe("error path", () => {
    describe("failed response from data source", () => {
      beforeEach(() => {
        fetchMock.mockRejectedValueOnce(new Response());
      });

      it("responds with status 200 OK and empty array", (done) => {
        request(app).get("/players").expect(200).expect(
          {
            result: [],
            totalResults: 0,
          },
          requestCallbackHandler(done)
        );
      });
    });

    describe("unexpected data structure in data source", () => {
      beforeEach(() => {
        fetchMock.mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              1: {
                image_url: null,
                last_name: "Test Name",
                player_id: "test_id",
              },
              true: {
                first_name: "Test",
                image_url: null,
                last_name: "Test Name",
                player_id: "test_id_2",
              },
              test_id_3: {
                first_name: "Test",
                image_url: null,
                last_ame: "Test Name",
                player_id: "test_id_3",
              },
            })
          )
        );
      });

      it("responds with status 200 OK and empty array", (done) => {
        request(app).get("/players").expect(200).expect(
          {
            result: [],
            totalResults: 0,
          },
          requestCallbackHandler(done)
        );
      });
    });
  });
});
