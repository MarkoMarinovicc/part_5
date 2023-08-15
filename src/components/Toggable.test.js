import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import TogglableBlog from "./TogglableBlog";

describe("ToggableBlog Component Tests", () => {
  let container;
  const blog = { url: "test", liked: ["a", "b"] };

  beforeEach(() => {
    const rendered = render(
      <TogglableBlog label="test...">
        <Blog blog={blog} />
      </TogglableBlog>
    );
    container = rendered.container;
  });

  test("after clicking the button, children are displayed", async () => {
    const button = screen.getByText("test...");
    userEvent.click(button);

    const someText = await screen.findByText("test",2);
    expect(someText).toBeInTheDocument();
  });
});
