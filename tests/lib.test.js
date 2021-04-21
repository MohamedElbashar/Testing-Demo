/** @format */
const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");
describe("absolute", () => {
  it("should return positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return positive number if input is negative", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("bashar");
    expect(result).toMatch(/bashar/);
    expect(result).toContain("bashar");
  });
});

describe("getCurrencies", () => {
  it("should return supported currenceies", () => {
    const result = lib.getCurrencies();

    //too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //to specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    //to proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");

    //ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});
describe("getProduct", () => {
  it("should return the product with the given ID", () => {
    const result = lib.getProduct(1);
    // expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("you should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("fake reading customer....");
      return { id: customerId, points: 20 };
    };
    const order = { id: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
describe("notifyCustomer", () => {
  it("should send an email to customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });

    mail.send = jest.fn();
    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    //with out using JestMockFuntion
    // db.getCustomerSync = function (customerId) {
    //   return { email: "a" };
    // };
    // let mailSent = false;
    // mail.send = function (email, message) {
    //   mailSent = true;
    //   console.log("fake mail");
    // };
    // lib.notifyCustomer({ customerId: 1 });
    // expect(mailSent).toBe(true);
  });
});
