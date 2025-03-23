const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("album", () => {
	it("should return 200", async () => {
		const response = await fetch("http://localhost:8787/api/album");
		expect(response.status).toBe(200);
	});
});
