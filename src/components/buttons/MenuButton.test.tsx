import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuButton from "./MenuButton";

describe("MenuButton", () => {
  it("opens and closes the default menu modal", async () => {
    const user = userEvent.setup();

    render(<MenuButton />);

    expect(screen.queryByText(/Menu not implemented/i)).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /open menu/i });
    await user.click(trigger);

    expect(screen.getByText(/Menu not implemented/i)).toBeInTheDocument();

    const closeBtn = screen.getByText("×");
    await user.click(closeBtn);

    expect(screen.queryByText(/Menu not implemented/i)).not.toBeInTheDocument();
  });

  it("renders custom menu content when provided", async () => {
    const user = userEvent.setup();
    const customLabel = "Back to Home";

    render(
      <MenuButton>
        <button>{customLabel}</button>
      </MenuButton>,
    );

    const trigger = screen.getByRole("button", { name: /open menu/i });
    await user.click(trigger);

    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });
});
