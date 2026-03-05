import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HintButton from "./HintButton";

describe("HintButton Integration", () => {
  it("opens the modal with the correct hint when clicked", async () => {
    const user = userEvent.setup();
    const secretHint = "The treasure is under the palm tree";

    render(<HintButton hint={secretHint} />);

    expect(screen.queryByText(secretHint)).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /hint/i });
    await user.click(trigger);

    expect(screen.getByText(secretHint)).toBeInTheDocument();

    const closeBtn = screen.getByText("×");
    await user.click(closeBtn);

    expect(screen.queryByText(secretHint)).not.toBeInTheDocument();
  });
});
