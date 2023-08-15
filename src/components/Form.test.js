import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CreateNewForm from "./createNewForm";

describe("form test", () => {
  const mockHandler = jest.fn();
  render(<CreateNewForm setBlogs={mockHandler} />);
  const input = screen.getByPlaceholderText("Title");
  const button = screen.getByText("create");
  userEvent.type(input, "hello");
  userEvent.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].content).toBe("hello");
});
