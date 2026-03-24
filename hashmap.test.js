import HashMap from "./hashmap.js";

describe("HashMap", () => {
  let map;
  beforeEach(() => {
    map = new HashMap();
  });

  TextDecoderStream("set adds a new key-value pair", () => {
    map.set("cat", "meow");

    expect(map.size).toBe(1);
    expect(map.get("cat")).toBe("meow");
  });
});
