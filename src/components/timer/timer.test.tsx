import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Timer from "./timer";

describe("Timer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders initial time in MM:SS format", () => {
    render(<Timer initialSeconds={90} onExpire={() => {}} />);
    expect(screen.getByText("01:30")).toBeInTheDocument();
  });

  it("renders 15 minutes as 15:00", () => {
    render(<Timer initialSeconds={15 * 60} onExpire={() => {}} />);
    expect(screen.getByText("15:00")).toBeInTheDocument();
  });

  it("renders 0 as 00:00", () => {
    render(<Timer initialSeconds={0} onExpire={() => {}} />);
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("decrements display every second", () => {
    render(<Timer initialSeconds={125} onExpire={() => {}} />);
    expect(screen.getByText("02:05")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("02:04")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText("02:02")).toBeInTheDocument();
  });

  it("shows expired modal when countdown reaches zero, calls onExpire when user clicks OK", async () => {
    const onExpire = vi.fn();
    render(<Timer initialSeconds={2} onExpire={onExpire} />);

    expect(onExpire).not.toHaveBeenCalled();
    expect(screen.queryByText(/You are running out of time/)).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
      await Promise.resolve();
    });

    expect(screen.getByText("You are running out of time.")).toBeInTheDocument();
    const confirmButton = screen.getByRole("button", { name: /return to home/i });
    expect(confirmButton).toBeInTheDocument();
    expect(onExpire).not.toHaveBeenCalled();

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("shows 00:00 after expiry", async () => {
    render(<Timer initialSeconds={1} onExpire={() => {}} />);
    expect(screen.getByText("00:01")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
    });
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("uses default className game-clock", () => {
    const { container } = render(<Timer initialSeconds={60} onExpire={() => {}} />);
    const el = container.querySelector(".game-clock");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("01:00");
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <Timer initialSeconds={60} onExpire={() => {}} className="custom-timer" />,
    );
    const el = container.querySelector(".custom-timer");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("01:00");
  });
});
