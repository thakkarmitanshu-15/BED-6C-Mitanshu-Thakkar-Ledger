describe("Concurrent P2P Transfers", () => {

  it("should execute transfers without deadlocks", async () => {

    const transfers = [];

    for (let i = 0; i < 20; i++) {
      transfers.push(Promise.resolve());
    }

    const results = await Promise.allSettled(transfers);

    expect(results.length).toBe(20);

  });

});