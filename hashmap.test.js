import { experiments } from "webpack";
import HashMap from "./src/hashmap.js";

describe("HashMap", () => {
  let map;
  beforeEach(() => {
    // runs before each test
    map = new HashMap(); // creates an empty map so that tests are independent of each other
  });

  test("set adds a new key-value pair", () => {
    map.set("cat", "meow");

    expect(map.size).toBe(1);
    expect(map.get("cat")).toBe("meow");
  });

  test("set updates existing key", () => {
    map.set("cat", "meow");
    map.set("cat", "purr");

    expect(map.size).toBe(1);
    expect(map.get("cat")).toBe("purr");
  });

  test("get returns undefined for a key that doesn't exist", () => {
    expect(map.get("dog")).toBeUndefined();
  });

  test("get returns the correct value for existing keys", () => {
    map.set("dog", "woof");
    map.set("cat", "meow");

    expect(map.get("dog")).toBe("woof");
    expect(map.get("cat")).toBe("meow");
  });

  test("has returns true if the key exists", () => {
    map.set("dog", "woof");
    map.set("cat", "meow");

    expect(map.has("dog")).toBe(true);
    expect(map.has("parrot")).toBe(false);
  });

  test("remove should remove key if key is found", () => {
    map.set("dog", "woof");
    map.set("cat", "meow");

    expect(map.remove("dog")).toBe(true);
    expect(map.has("dog")).toBe(false);
  });

  test("remove should return false if key is not found", () => {
    map.set("dog", "woof");

    expect(map.remove("cat")).toBe(false);
  });
});
