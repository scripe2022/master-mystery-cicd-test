import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Storyline from "./Storyline";

// Mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Storyline Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders first slide", () => {
    render(
      <MemoryRouter>
        <Storyline />
      </MemoryRouter>,
    );

    expect(screen.getByText(/During a school tour/i)).toBeInTheDocument();
  });

  test("clicking NEXT advances to next slide", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Storyline />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/The system overloads/i)).toBeInTheDocument();
  });

  test("clicking READY navigates to /room1", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Storyline />
      </MemoryRouter>,
    );

    // Go to final slide
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.click(screen.getByRole("button", { name: /ready/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/room1");
  });
});
