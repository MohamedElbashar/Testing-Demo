/** @format */

const exercise = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an Exeption if input is not number", () => {
    expect(() => {
      exercise.fizzBuzz("a");
    }).toThrow();
  });
  it("Should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return Fizz if input is divisible by 3", () => {
    const result = exercise.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });
  it("should return Buzz if input is divisible by 5", () => {
    const result = exercise.fizzBuzz(5);
    expect(result).toBe("Buzz");
  });
  it("shoud return the number if not divisble by 3 or 5", () => {
    const result = exercise.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
