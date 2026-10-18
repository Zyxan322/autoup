import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider, useCart } from "@/lib/cart";
import { HomeServices } from "@/components/HomeServices";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Footer } from "@/components/Footer";

// Mock @tanstack/react-router Link
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, className, ...props }: any) => (
    <a href={typeof to === "string" ? to : "#"} className={className} {...props}>
      {children}
    </a>
  ),
}));

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
}

describe("Components Functionality Verification", () => {
  it("renders HomeServices with exactly 5 compact cards and both action buttons", () => {
    render(
      <Wrapper>
        <HomeServices />
      </Wrapper>
    );

    // Verify 5 service titles
    expect(screen.getByRole("heading", { name: "Car Shampoo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cleaning Chemicals" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Car Wax & Polish" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Interior Care" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Exterior Care" })).toBeInTheDocument();

    // Verify 5 Add to Cart buttons
    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addButtons).toHaveLength(5);

    // Verify 5 View Details buttons
    const viewButtons = screen.getAllByRole("button", { name: /view details/i });
    expect(viewButtons).toHaveLength(5);
  });

  it("adds service product to cart when Add to Cart is clicked", () => {
    let currentCartCount = 0;
    function CartInspector() {
      const { count } = useCart();
      currentCartCount = count;
      return <div data-testid="cart-count">{count}</div>;
    }

    render(
      <Wrapper>
        <CartInspector />
        <HomeServices />
      </Wrapper>
    );

    const initialCount = currentCartCount;
    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    fireEvent.click(addButtons[0]);

    expect(screen.getByTestId("cart-count").textContent).toBe(String(initialCount + 1));
  });

  it("renders BeforeAfter comparison slider with accessible inputs and labels", () => {
    render(<BeforeAfter />);

    expect(screen.getByText("BEFORE")).toBeInTheDocument();
    expect(screen.getByText("AFTER")).toBeInTheDocument();

    const rangeInput = screen.getByRole("slider", { name: /interactive before and after comparison slider/i });
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute("min", "0");
    expect(rangeInput).toHaveAttribute("max", "100");

    // Slider position can be adjusted
    fireEvent.change(rangeInput, { target: { value: "75" } });
    expect(rangeInput).toHaveValue("75");
  });

  it("renders enhanced Footer with brand tagline, WhatsApp button, and contact info", () => {
    render(<Footer />);

    expect(screen.getByText(/care in every mile/i)).toBeInTheDocument();
    expect(screen.getByText(/chat on whatsapp/i)).toBeInTheDocument();
    expect(screen.getByText("Clear-Coat Safe")).toBeInTheDocument();
    expect(screen.getByText("Ceramic Friendly")).toBeInTheDocument();
  });

  it("renders compact ProductCard with quantity stepper and working Add to Cart", () => {
    const testProduct = {
      slug: "lifelines-colour-wax-shampoo",
      name: "Colour Wax Shampoo",
      code: undefined,
      category: "Car Shampoo" as const,
      short: "Advanced formula that preserves paint and delivers a long-lasting attractive luster.",
      description: "LifeLines Colour Wax Shampoo is a new and advanced formula.",
      variants: ["20 L"],
      usage: "Mix 1 litre with 100 litres of water for hand washing.",
      image: "test-image.jpg",
      featured: 1,
    };

    render(
      <Wrapper>
        <ProductCard p={testProduct} />
      </Wrapper>
    );

    expect(screen.getByRole("link", { name: "Colour Wax Shampoo" })).toBeInTheDocument();
    expect(screen.getByText("20 L")).toBeInTheDocument();

    const increaseBtn = screen.getByRole("button", { name: /increase quantity/i });
    expect(increaseBtn).toBeInTheDocument();
    fireEvent.click(increaseBtn);
    expect(screen.getByText("2")).toBeInTheDocument();

    const addToCartBtn = screen.getByRole("button", { name: /add to cart/i });
    expect(addToCartBtn).toBeInTheDocument();
    fireEvent.click(addToCartBtn);
  });

  it("opens details modal dialog when View Details is clicked on ServiceCard", () => {
    const testService = {
      slug: "car-shampoo",
      title: "Premium Car Shampoo",
      description: "Rich foaming shampoos that lift dirt while being gentle on paint.",
      image: "test-service.jpg",
    };

    render(
      <Wrapper>
        <ServiceCard s={testService} index={0} />
      </Wrapper>
    );

    const viewDetailsBtn = screen.getByRole("button", { name: /view details/i });
    fireEvent.click(viewDetailsBtn);

    // Modal dialog content should now be visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Key Advantages & Benefits/i)).toBeInTheDocument();
    expect(screen.getByText(/High-lubricity foam prevents swirl marks/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request category quote/i })).toBeInTheDocument();
  });
});
