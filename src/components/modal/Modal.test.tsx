import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal Component", () => {
  const onCloseMock = vi.fn();

  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        Secret Message
      </Modal>,
    );
    expect(screen.queryByText(/secret message/i)).not.toBeInTheDocument();
  });

  it("renders children when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Visible Message
      </Modal>,
    );
    expect(screen.getByText(/visible message/i)).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Content
      </Modal>,
    );

    await user.click(screen.getByText("×"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when clicking the overlay, but NOT the content", async () => {
    const user = userEvent.setup();
    const localOnClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={localOnClose}>
        <div data-testid="modal-inner">Content</div>
      </Modal>,
    );

    const innerContent = screen.getByTestId("modal-inner");
    await user.click(innerContent);

    expect(localOnClose).not.toHaveBeenCalled();

    const overlay = document.querySelector(".modal-overlay");
    if (overlay) await user.click(overlay);

    expect(localOnClose).toHaveBeenCalledTimes(1);
  });
});
