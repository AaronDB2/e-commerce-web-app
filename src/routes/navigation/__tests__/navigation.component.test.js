import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import * as reactRedux from "react-redux";
import Navigation from "../navigation.component";
import { signOutStart } from "../../../store/user/user.action";
import "jest-styled-components";

const mockedDispatch = jest.fn();

// Need to research this more!!!!!
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedDispatch,
}));

describe("Navigation tests", () => {
  test("It should render a Sign in link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const signInLinkElement = screen.getByText(/sign in/i);

    expect(signInLinkElement).toBeInTheDocument();
  });

  test("It should not render Sign In if there is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    expect(screen.queryByText("SIGN IN")).toBeNull();
  });

  test("It should render Sign Out if there is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    expect(screen.getByText("SIGN OUT")).toBeInTheDocument();
  });

  test("It should render cart dropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  test("It should not render a cart dropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    expect(screen.queryByText("Your cart is empty")).toBeNull();
  });

  test("It should dispatch signOutStart action when clicking on the Sign Out link", async () => {
    // const mockDispatch = jest.fn();
    // jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);

    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    expect(screen.getByText("SIGN OUT")).toBeInTheDocument();

    await fireEvent.click(screen.getByText("SIGN OUT"));

    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedDispatch).toHaveBeenCalledWith(signOutStart());

    // mockedDispatch.mockClear();
  });
});
