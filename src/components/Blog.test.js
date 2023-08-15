import React from "react";
import { render, screen } from "@testing-library/react";


import Blog from "./Blog";

test("render of title and author", () => {
  const blog = { author: "test", title: "test2" };
  render(<Blog blog={blog}/>);
  const element = screen.getByText("test2" && "test");
  expect(element).toBeDefined();
});
