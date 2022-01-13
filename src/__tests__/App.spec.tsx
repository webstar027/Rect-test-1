import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("renders search bar", () => {
    render(<App />);
    const searchInput = screen.getByLabelText("Search for images");
    expect(searchInput).toBeInTheDocument();
  });
});
