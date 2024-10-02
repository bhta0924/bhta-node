import request from "supertest";
import { createServer } from "../../src/server";
import { requestCallbackHandler } from "../helpers";

const fetchMock = jest.fn();

globalThis.fetch = fetchMock;

const app = createServer();

// TODO: Add more tests (default list params, bad request, more than 10 source entries, etc).
describe("GET /positions", () => {
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
        .get("/positions")
        .expect(200)
        .expect(["A", "B"], requestCallbackHandler(done));
    });
  });

  describe("error path", () => {
    describe("failed response from data source", () => {
      beforeEach(() => {
        fetchMock.mockRejectedValueOnce(new Response());
      });

      it("responds with status 200 OK and empty array", (done) => {
        request(app)
          .get("/positions")
          .expect(200)
          .expect([], requestCallbackHandler(done));
      });
    });

    describe("unexpected data structure in data source", () => {
      beforeEach(() => {
        fetchMock.mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              1: {
                last_name: "Test Name",
                player_id: "test_id",
              },
              true: {
                first_name: "Test",
                last_name: "Test Name",
                player_id: "test_id_2",
              },
              test_id_3: {
                first_name: "Test",
                last_ame: "Test Name",
                player_id: "test_id_3",
              },
            })
          )
        );
      });

      it("responds with status 200 OK and empty array", (done) => {
        request(app)
          .get("/positions")
          .expect(200)
          .expect([], requestCallbackHandler(done));
      });
    });
  });
});
