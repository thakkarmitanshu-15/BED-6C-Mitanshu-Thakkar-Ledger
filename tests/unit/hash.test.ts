import { calculateHash } from "../../src/utils/hash";

describe("Hash Chain",()=>{

    it("should generate same hash",()=>{

        const h1=calculateHash("abc","xyz");
        const h2=calculateHash("abc","xyz");

        expect(h1).toEqual(h2);

    });

    it("should generate different hashes",()=>{

        const h1=calculateHash("abc","xyz");
        const h2=calculateHash("abc","123");

        expect(h1).not.toEqual(h2);

    });

});