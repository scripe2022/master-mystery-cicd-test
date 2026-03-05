import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeactivationPuzzle from "./DeactivationPuzzle";

describe("DeactivationPuzzle Component", () => {
  const onSuccessMock = vi.fn();
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderPuzzle = () =>
    render(<DeactivationPuzzle onSuccess={onSuccessMock} onClose={onCloseMock} />);

  it("renders overlay with title and all three metrics set to ON", () => {
    renderPuzzle();

    expect(screen.getByTestId("deactivation-overlay")).toBeInTheDocument();
    expect(
      screen.getByText("What should we deactivate to make the plasma back into gas?"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("metric-electricity")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("metric-magnetism")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("metric-heat")).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles metrics ON and OFF when clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPuzzle();

    const electricity = screen.getByTestId("metric-electricity");
    await user.click(electricity);
    expect(electricity).toHaveAttribute("aria-pressed", "false");

    await user.click(electricity);
    expect(electricity).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPuzzle();

    await user.click(screen.getByLabelText("Close"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("shows CORRECT and calls onSuccess when electricity and heat are deactivated", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPuzzle();

    await user.click(screen.getByTestId("metric-electricity"));
    await user.click(screen.getByTestId("metric-heat"));
    await user.click(screen.getByTestId("deactivation-submit"));

    expect(screen.getByTestId("deactivation-result")).toHaveTextContent("CORRECT!");
    expect(screen.getByTestId("deactivation-submit")).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });

  it("shows TRY AGAIN for wrong answer and clears after delay", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPuzzle();

    await user.click(screen.getByTestId("metric-electricity"));
    await user.click(screen.getByTestId("deactivation-submit"));

    expect(screen.getByTestId("deactivation-result")).toHaveTextContent("TRY AGAIN");

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByTestId("deactivation-result")).not.toBeInTheDocument();
    expect(onSuccessMock).not.toHaveBeenCalled();
  });

  it("prevents toggling metrics while result is displayed", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPuzzle();

    await user.click(screen.getByTestId("deactivation-submit"));
    expect(screen.getByTestId("deactivation-result")).toBeInTheDocument();

    const electricity = screen.getByTestId("metric-electricity");
    await user.click(electricity);
    expect(electricity).toHaveAttribute("aria-pressed", "true");
  });

  it("allows retrying after incorrect answer clears", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderPuzzle();

    await user.click(screen.getByTestId("deactivation-submit"));
    expect(screen.getByTestId("deactivation-result")).toHaveTextContent("TRY AGAIN");

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    await user.click(screen.getByTestId("metric-electricity"));
    await user.click(screen.getByTestId("metric-heat"));
    await user.click(screen.getByTestId("deactivation-submit"));

    expect(screen.getByTestId("deactivation-result")).toHaveTextContent("CORRECT!");
  });
});
