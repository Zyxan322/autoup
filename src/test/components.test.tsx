import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { Footer } from "@/components/Footer";
import { PolishSection } from "@/components/PolishSection";
import { PaymentPartners } from "@/components/PaymentPartners";
import { LocaleProvider, useLocale } from "@/lib/i18n";

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
      <LocaleProvider initialLocale="en">
        <CartProvider>{children}</CartProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}

describe("B2B Components Functionality Verification", () => {
  it("renders the six requested payment partners with localized copy", () => {
    const brands = ["Tabby", "Tamara", "Neo", "Emkan", "MIS Pay", "Madfu"];
    const { unmount } = render(
      <LocaleProvider initialLocale="en">
        <PaymentPartners />
      </LocaleProvider>,
    );

    expect(screen.getByRole("heading", { name: "WE ACCEPT" })).toBeInTheDocument();
    expect(screen.getByText("Flexible Payment Options for Your Convenience")).toBeInTheDocument();
    for (const brand of brands) {
      expect(screen.getAllByRole("img", { name: brand })).toHaveLength(1);
    }

    unmount();
    render(
      <LocaleProvider initialLocale="ar">
        <PaymentPartners />
      </LocaleProvider>,
    );

    expect(screen.getByRole("heading", { name: "وسائل الدفع المقبولة" })).toBeInTheDocument();
    expect(screen.getByText("خيارات دفع مرنة لراحتك")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "وسائل الدفع المقبولة" })).toHaveAttribute(
      "dir",
      "rtl",
    );
  });

  it("defaults to Arabic, updates document direction, and persists a language change", () => {
    localStorage.removeItem("autoup-language");

    function LocaleInspector() {
      const { locale, setLocale } = useLocale();
      return <button onClick={() => setLocale(locale === "ar" ? "en" : "ar")}>{locale}</button>;
    }

    render(
      <LocaleProvider>
        <LocaleInspector />
      </LocaleProvider>,
    );

    expect(screen.getByRole("button")).toHaveTextContent("ar");
    expect(document.documentElement.lang).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("en");
    expect(localStorage.getItem("autoup-language")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dir).toBe("ltr");

    localStorage.removeItem("autoup-language");
  });

  it("keeps full-payment and installment quote items independently editable", () => {
    localStorage.removeItem("autoup-cart");

    function PaymentInspector() {
      const { items, add, remove } = useCart();
      const product = {
        slug: "lifelines-colour-wax-shampoo",
        name: "Colour Wax Shampoo",
        variant: "20 L",
        qty: 1,
        image: "test-image.jpg",
      };
      return (
        <div>
          <button onClick={() => add({ ...product, paymentOption: "full" })}>Add full</button>
          <button onClick={() => add({ ...product, paymentOption: "installment-quote" })}>
            Add installment
          </button>
          <button onClick={() => remove(product.slug, product.variant, "installment-quote")}>
            Remove installment
          </button>
          <output data-testid="payments">
            {items.map((item) => item.paymentOption).join(",")}
          </output>
        </div>
      );
    }

    render(
      <Wrapper>
        <PaymentInspector />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Add full" }));
    fireEvent.click(screen.getByRole("button", { name: "Add installment" }));
    expect(screen.getByTestId("payments")).toHaveTextContent("full,installment-quote");

    fireEvent.click(screen.getByRole("button", { name: "Remove installment" }));
    expect(screen.getByTestId("payments")).toHaveTextContent(/^full$/);
    localStorage.removeItem("autoup-cart");
  });

  it("adds Polish & Detailing products to the quote cart", () => {
    localStorage.removeItem("autoup-cart");

    function CartInspector() {
      const { items, open } = useCart();
      return (
        <output data-testid="polish-cart">
          {items.map((item) => `${item.slug}:${item.name}:${item.qty}`).join(",")}|
          {open ? "open" : "closed"}
        </output>
      );
    }

    render(
      <Wrapper>
        <PolishSection />
        <CartInspector />
      </Wrapper>,
    );

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addButtons).toHaveLength(7);
    fireEvent.click(screen.getByRole("button", { name: "Increase quantity for Microfiber Towel" }));
    fireEvent.click(addButtons[0]);

    expect(screen.getByTestId("polish-cart")).toHaveTextContent(
      "microfiber-towel:Microfiber Towel:2|open",
    );
    localStorage.removeItem("autoup-cart");
  });

  it("renders compact ProductCard with quantity stepper, View Details link, and Inquire button", () => {
    localStorage.removeItem("autoup-cart");

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
      </Wrapper>,
    );

    // Product name and code badge
    expect(screen.getByRole("link", { name: "Colour Wax Shampoo" })).toBeInTheDocument();
    expect(screen.getByText("CWS-1")).toBeInTheDocument();
    expect(screen.getByText("20 L")).toBeInTheDocument();
    expect(screen.getByText(/price on request|السعر عند الطلب/i)).toBeInTheDocument();

    // View Details button
    const viewDetails = screen.getAllByRole("link", { name: /view details|عرض التفاصيل/i })[0];
    expect(viewDetails).toBeInTheDocument();

    // Stepper buttons
    const increaseBtn = screen.getByRole("button", { name: /increase quantity/i });
    fireEvent.click(increaseBtn);
    expect(screen.getByText("2")).toBeInTheDocument();

    // Inquire button
    const initialCount = cartCount;
    const inquireBtn = screen.getByRole("button", { name: /inquire|استفسر/i });
    expect(inquireBtn).toBeInTheDocument();
    fireEvent.click(inquireBtn);
    expect(screen.getByTestId("cart-count").textContent).toBe(String(initialCount + 2));
  });

  it("renders StickyWhatsApp button with prefilled B2B inquiry message and accessible label", () => {
    render(
      <Wrapper>
        <StickyWhatsApp />
      </Wrapper>,
    );

    const button = screen.getByRole("link", { name: /contact autoup on whatsapp/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("target", "_blank");
    expect(button).toHaveAttribute("rel", "noopener noreferrer");

    const href = button.getAttribute("href") || "";
    expect(href).toContain("https://wa.me/971558604161");
    expect(href).toContain(encodeURIComponent("automotive cleaning products for business use"));
  });

  it("renders B2B Footer with commercial attributes, WhatsApp link, and product categories", () => {
    render(
      <Wrapper>
        <Footer />
      </Wrapper>,
    );

    expect(screen.getByText(/care in every mile/i)).toBeInTheDocument();
    expect(screen.getByText(/commercial bulk supply/i)).toBeInTheDocument();
    expect(screen.getByText(/professional formulations/i)).toBeInTheDocument();
    expect(screen.getByText(/chat on whatsapp/i)).toBeInTheDocument();
    expect(screen.getByText("Car Shampoo")).toBeInTheDocument();
    expect(screen.getByText("Cleaning Chemicals")).toBeInTheDocument();
    expect(screen.getByText("Car Wax & Polish")).toBeInTheDocument();
  });
});
