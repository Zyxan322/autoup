import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
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

describe("B2B Components Functionality Verification", () => {
  it("renders compact ProductCard with quantity stepper, View Details link, and Inquire button", () => {
    const testProduct = {
      slug: "lifelines-colour-wax-shampoo",
      name: "Colour Wax Shampoo",
      code: "CWS-1",
      category: "Car Shampoo" as const,
      short: "Advanced formula that preserves paint and delivers a long-lasting attractive luster.",
      description: "LifeLines Colour Wax Shampoo is a new and advanced formula.",
      variants: ["20 L"],
      usage: "Mix 1 litre with 100 litres of water for hand washing.",
      image: "test-image.jpg",
      featured: 1,
    };

    let cartCount = 0;
    function CartInspector() {
      const { count } = useCart();
      cartCount = count;
      return <div data-testid="cart-count">{count}</div>;
    }

    render(
      <Wrapper>
        <CartInspector />
        <ProductCard p={testProduct} />
      </Wrapper>
    );

    // Product name and code badge
    expect(screen.getByRole("link", { name: "Colour Wax Shampoo" })).toBeInTheDocument();
    expect(screen.getByText("CWS-1")).toBeInTheDocument();
    expect(screen.getByText("20 L")).toBeInTheDocument();
    expect(screen.getByText("Wholesale Pricing")).toBeInTheDocument();

    // View Details button
    const viewDetails = screen.getByRole("link", { name: "View Details" });
    expect(viewDetails).toBeInTheDocument();

    // Stepper buttons
    const increaseBtn = screen.getByRole("button", { name: /increase quantity/i });
    fireEvent.click(increaseBtn);
    expect(screen.getByText("2")).toBeInTheDocument();

    // Inquire button
    const initialCount = cartCount;
    const inquireBtn = screen.getByRole("button", { name: /inquire/i });
    expect(inquireBtn).toBeInTheDocument();
    fireEvent.click(inquireBtn);
    expect(screen.getByTestId("cart-count").textContent).toBe(String(initialCount + 2));
  });

  it("renders StickyWhatsApp button with prefilled B2B inquiry message and accessible label", () => {
    render(<StickyWhatsApp />);

    const button = screen.getByRole("link", { name: /contact autoup on whatsapp/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("target", "_blank");
    expect(button).toHaveAttribute("rel", "noopener noreferrer");

    const href = button.getAttribute("href") || "";
    expect(href).toContain("https://wa.me/971558604161");
    expect(href).toContain(encodeURIComponent("automotive cleaning products for business use"));
  });

  it("renders B2B Footer with commercial attributes, WhatsApp link, and product categories", () => {
    render(<Footer />);

    expect(screen.getByText(/care in every mile/i)).toBeInTheDocument();
    expect(screen.getByText(/commercial bulk supply/i)).toBeInTheDocument();
    expect(screen.getByText(/professional formulations/i)).toBeInTheDocument();
    expect(screen.getByText(/chat on whatsapp/i)).toBeInTheDocument();
    expect(screen.getByText("Car Shampoo")).toBeInTheDocument();
    expect(screen.getByText("Cleaning Chemicals")).toBeInTheDocument();
    expect(screen.getByText("Car Wax & Polish")).toBeInTheDocument();
  });
});
