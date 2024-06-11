import Item from "./Item";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("Item component", () => {
  it("displays correct item data", () => {
    const addToCart = jest.fn();

    render(
      <Router>
        <Item
          id={1}
          name={"name"}
          image={"image"}
          description={"description"}
          stockCount={5}
          price={12}
          addToCart={addToCart}
        />
      </Router>
    );

    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByText("5 left!")).toBeInTheDocument();
    expect(screen.getByText("$12")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "image");
  });
  it("triggers callback on button click", () => {
    const addToCart = jest.fn();

    render(
      <Router>
        <Item
          id={1}
          name={"name"}
          image={"image"}
          description={"description"}
          stockCount={5}
          price={12}
          addToCart={addToCart}
        />
      </Router>
    );
    const button = screen.getByRole("link")
    fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledTimes(1);
    
  });
});
