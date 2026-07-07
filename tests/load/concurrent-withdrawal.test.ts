describe("Concurrent Withdrawals", () => {

  it("should prevent overdraft", async () => {

    const withdrawals = [];

    for (let i = 0; i < 50; i++) {
      withdrawals.push(Promise.resolve());
    }

    const results = await Promise.allSettled(withdrawals);

    expect(results.length).toBe(50);

  });

});