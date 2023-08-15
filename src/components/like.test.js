import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe('how many time is like called',()=>{
    const blog = { user: ["zu"], liked: ["a", "b"] };
    const mockHandler = jest.fn()

  render(
    <Blog blog={blog} handleLike={mockHandler} />
  )
  test("after clicking the button, children are displayed",  () => {
    const button = screen.getByText("like");
    userEvent.click(button);
    userEvent.click(button);

expect(mockHandler.mock.calls).toHaveLength(2)
  });
})