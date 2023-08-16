describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "Test",
      password: "12345678",
      name: "Marko",
    });
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "Zoki",
      password: "12345678",
      name: "Zoki",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form by default", function () {
    cy.contains("login");
  });
  it("Login form passed", () => {
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "markooo",
      password: "12345678",
      name: "Marko",
    });
    cy.get("#login").click();
    cy.get("#username").type("markooo");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();
    cy.contains("markooo has logged in");
  });
  it("Login form failed", () => {
    cy.get("#login").click();
    cy.get("#username").type("qqqq");
    cy.get("#password").type("eeee");
    cy.get("#submit").click();
    cy.get("html").should("contain", "invalid username or password");
    cy.get("p").should("have.css", "color", "rgb(255, 0, 0)");
  });
  it("new blog", () => {
    cy.request("POST", "http://localhost:3003/api/login", {
      username: "Test",
      password: "12345678",
    }).then((response) => {
      localStorage.setItem("loggedUser", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
    cy.contains("create new").click();
    cy.get("#title").type("Test from cypress");
    cy.get("#author").type("MarkoM");
    cy.get("#url").type("http://aa");
    cy.get("#create").click();
    cy.contains("a new blog Test from cypress by MarkoM");
  });
  it("Post like", () => {
    cy.request("POST", "http://localhost:3003/api/login", {
      username: "Test",
      password: "12345678",
    }).then((response) => {
      localStorage.setItem("loggedUser", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
    cy.contains("create new").click();
    cy.get("#title").type("Test from cypress");
    cy.get("#author").type("MarkoM");
    cy.get("#url").type("http://aa");
    cy.get("#create").click();
    cy.contains("a new blog Test from cypress by MarkoM");

    cy.get("#view0").click();
    cy.get("#like").click();
    cy.get("span").should("contain", 1);
  });
  it("Remove button only visible to user", () => {
    cy.request("POST", "http://localhost:3003/api/login", {
      username: "Test",
      password: "12345678",
    }).then((response) => {
      localStorage.setItem("loggedUser", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
    cy.contains("create new").click();
    cy.get("#title").type("Test from cypress");
    cy.get("#author").type("MarkoM");
    cy.get("#url").type("http://aa");
    cy.get("#create").click();
    cy.contains("a new blog Test from cypress by MarkoM");
    cy.get("button:first").click();

    cy.request("POST", "http://localhost:3003/api/login", {
      username: "Zoki",
      password: "12345678",
    }).then((response) => {
      localStorage.setItem("loggedUser", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
    cy.contains("create new").click();
    cy.get("#title").type("aa");
    cy.get("#author").type("bb");
    cy.get("#url").type("http://rr");
    cy.get("#create").click();
    cy.contains("a new blog aa by bb");

    cy.get("#view0").click();
    cy.contains("remove").should("not.exist");
  });
  it("Sort ", () => {
    cy.request("POST", "http://localhost:3003/api/login", {
      username: "Test",
      password: "12345678",
    }).then((response) => {
      localStorage.setItem("loggedUser", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
    cy.contains("create new").click();
    cy.get("#title").type("Test from cypress");
    cy.get("#author").type("MarkoM");
    cy.get("#url").type("http://aa");
    cy.get("#create").click();
    cy.contains("a new blog Test from cypress by MarkoM");
    cy.get("button:first").click();

    cy.request("POST", "http://localhost:3003/api/login", {
      username: "Zoki",
      password: "12345678",
    }).then((response) => {
      localStorage.setItem("loggedUser", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
    cy.contains("create new").click();
    cy.get("#title").type("aa");
    cy.get("#author").type("bb");
    cy.get("#url").type("http://rr");
    cy.get("#create").click();
    cy.contains("a new blog aa by bb");

    cy.get("#view0").click();
    cy.get("#like").click();
    cy.contains("Hide").click();

    cy.get(".test").eq(0).should("contain", "Test from cypress");
    cy.get(".test").eq(1).should("contain", "aa");
  });
});
