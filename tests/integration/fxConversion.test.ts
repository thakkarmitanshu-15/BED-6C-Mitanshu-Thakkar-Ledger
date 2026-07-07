import { fxConversion } from "../../src/services/transactionHandlers/fxConversion";

describe("FX Conversion",()=>{

    it("should generate multi currency entries",()=>{

        const entries=fxConversion(
            2,
            1,
            4003,
            100,
            8625,
            50
        );

        expect(entries.length).toBe(3);

    });

});