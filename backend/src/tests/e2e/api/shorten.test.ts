import request from "supertest";
// @ts-ignore
import app from "../../../entrypoint/index"; // app must export `app`

describe("POST /api/link", () => {
  it("should return a shortCode for a valid URL", async () => {
    const res = await request(app)
      .post("/api/link/shorten")
      .send({ originalUrl: "https://google.com", userId: 4 }) // ✅ thêm userId
      .set("Content-Type", "application/json");
      console.log(res.body); // In ra body của response để kiểm tra lỗi chi tiết

    expect(res.status).toBe(200);
    expect(res.body.shortCode).toBeDefined();
  });
});
