import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider, useCart } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { ProfessionalGallonCard } from "@/components/ProfessionalGallonCard";
import { ProductCard } from "@/components/ProductCard";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { Footer } from "@/components/Footer";
import { PolishSection } from "@/components/PolishSection";
import { PaymentPartners } from "@/components/PaymentPartners";
import { LocaleProvider, useLocale } from "@/lib/i18n";

// Mock @tanstack/react-router Link
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string | object }) => (
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

function Wrapper({ children, locale = "en" }: { children: React.ReactNode; locale?: "ar" | "en" }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialLocale={locale}>
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

  it("offers Add to Cart and an installment information ribbon on 20L gallon cards", () => {
    localStorage.removeItem("autoup-cart");

    function CartInspector() {
      const { items, open } = useCart();
      return (
        <output data-testid="gallon-cart">
          {items.map((item) => `${item.name}:${item.variant}:${item.qty}`).join("|")}:
          {open ? "open" : "closed"}
        </output>
      );
    }

    render(
      <Wrapper>
        <ProfessionalGallonCard
          product={{
            slug: "lifelines-colour-wax-shampoo",
            name: "Colour Wax Shampoo",
            packageType: "gallon",
            category: "Car Shampoo",
            short: "Professional 20L shampoo.",
            description: "Professional shampoo.",
            variants: ["20 L"],
            usage: "Dilute before use.",
            image: "gallon.jpg",
            featured: 1,
          }}
        />
        <CartInspector />
      </Wrapper>,
    );

    expect(screen.getByText(/Installment options available/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Request Installment Quote" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));
    expect(screen.getByTestId("gallon-cart")).toHaveTextContent("Colour Wax Shampoo:20 L:1:open");
    localStorage.removeItem("autoup-cart");
  });

  it("opens WhatsApp with the latest cart items, variants, quantities, and installment choice", () => {
    localStorage.removeItem("autoup-cart");
    const openWhatsApp = vi.spyOn(window, "open").mockReturnValue(null);

    function CartActions() {
      const { add, setQty, setOpen } = useCart();
      return (
        <>
          <button
            onClick={() =>
              add({
                slug: "lifelines-colour-wax-shampoo",
                name: "Colour Wax Shampoo",
                variant: "20 L",
                qty: 1,
                image: "gallon.jpg",
                paymentOption: "installment-quote",
              })
            }
          >
            Add gallon
          </button>
          <button
            onClick={() =>
              add({
                slug: "custom-polish",
                name: "Car Polish & Shine",
                variant: "1 L",
                qty: 1,
                image: "polish.jpg",
              })
            }
          >
            Add polish
          </button>
          <button
            onClick={() => setQty("lifelines-colour-wax-shampoo", "20 L", 3, "installment-quote")}
          >
            Change gallon quantity
          </button>
          <button onClick={() => setOpen(true)}>Open cart</button>
        </>
      );
    }

    render(
      <Wrapper>
        <CartActions />
        <CartDrawer />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Add gallon" }));
    fireEvent.click(screen.getByRole("button", { name: "Add polish" }));
    fireEvent.click(screen.getByRole("button", { name: "Change gallon quantity" }));
    fireEvent.click(screen.getByRole("button", { name: "Open cart" }));
    fireEvent.click(screen.getByRole("button", { name: "Proceed to Checkout" }));

    expect(openWhatsApp).toHaveBeenCalledOnce();
    const [url, target, features] = openWhatsApp.mock.calls[0]!;
    expect(url).toContain("https://wa.me/971558604161?text=");
    expect(target).toBe("_blank");
    expect(features).toBe("noopener,noreferrer");
    const message = decodeURIComponent(url!.split("?text=")[1]!);
    expect(message).toContain("Colour Wax Shampoo (20 L)");
    expect(message).toContain("Quantity: 3");
    expect(message).toContain("Installment quote requested");
    expect(message).toContain("Car Polish & Shine (1 L)");
    expect(message).toContain("Quantity: 1");
    expect(message).not.toContain("Unit Price:");
    expect(message).not.toContain("Cart Subtotal:");
    expect(localStorage.getItem("autoup-cart")).toContain("Car Polish & Shine");

    openWhatsApp.mockRestore();
    localStorage.removeItem("autoup-cart");
  });

  it("localizes the checkout message and encodes Arabic product names and special characters", () => {
    localStorage.removeItem("autoup-cart");
    const openWhatsApp = vi.spyOn(window, "open").mockReturnValue(null);

    function CartActions() {
      const { add, setOpen } = useCart();
      return (
        <>
          <button
            onClick={() =>
              add({
                slug: "arabic-product",
                name: "ملمع & عناية",
                variant: "20 L",
                qty: 2,
                image: "arabic-product.jpg",
                paymentOption: "installment-quote",
              })
            }
          >
            Add Arabic product
          </button>
          <button onClick={() => setOpen(true)}>Open cart</button>
        </>
      );
    }

    render(
      <Wrapper locale="ar">
        <CartActions />
        <CartDrawer />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Add Arabic product" }));
    fireEvent.click(screen.getByRole("button", { name: "Open cart" }));
    fireEvent.click(screen.getByRole("button", { name: "المتابعة إلى واتساب" }));

    const url = openWhatsApp.mock.calls[0]![0]!;
    const message = decodeURIComponent(url.split("?text=")[1]!);
    expect(message).toContain("مرحباً فريق Auto Up!");
    expect(message).toContain("ملمع & عناية (20 L)");
    expect(message).toContain("الكمية: 2");
    expect(message).toContain("طلب عرض تقسيط");
    expect(url).toContain(encodeURIComponent("ملمع & عناية"));

    openWhatsApp.mockRestore();
    localStorage.removeItem("autoup-cart");
  });

  it("excludes removed items and prevents checkout for an empty cart", () => {
    localStorage.removeItem("autoup-cart");
    const openWhatsApp = vi.spyOn(window, "open").mockReturnValue(null);

    function CartActions() {
      const { add, remove, setOpen } = useCart();
      return (
        <>
          <button
            onClick={() =>
              add({
                slug: "temporary",
                name: "Temporary Product",
                qty: 1,
                image: "temporary.jpg",
              })
            }
          >
            Add temporary item
          </button>
          <button
            onClick={() =>
              add({
                slug: "kept-product",
                name: "Kept Product",
                qty: 1,
                image: "kept.jpg",
              })
            }
          >
            Add kept item
          </button>
          <button onClick={() => remove("temporary", undefined)}>Remove temporary item</button>
          <button onClick={() => remove("kept-product", undefined)}>Remove kept item</button>
          <button onClick={() => setOpen(true)}>Open cart</button>
        </>
      );
    }

    render(
      <Wrapper>
        <CartActions />
        <CartDrawer />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Add temporary item" }));
    fireEvent.click(screen.getByRole("button", { name: "Add kept item" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove temporary item" }));
    fireEvent.click(screen.getByRole("button", { name: "Open cart" }));
    fireEvent.click(screen.getByRole("button", { name: "Proceed to Checkout" }));
    const message = decodeURIComponent(openWhatsApp.mock.calls[0]![0]!.split("?text=")[1]!);
    expect(message).toContain("Kept Product");
    expect(message).not.toContain("Temporary Product");

    fireEvent.click(screen.getByRole("button", { name: "Remove kept item" }));
    expect(screen.getByRole("button", { name: "Proceed to Checkout" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Proceed to Checkout" }));
    expect(openWhatsApp).toHaveBeenCalledOnce();

    openWhatsApp.mockRestore();
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
    fireEvent.click(addButtons[0]!);

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
      packageType: "gallon" as const,
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

  it("renders B2B Footer with commercial attributes and product categories, without a duplicate WhatsApp link", () => {
    render(
      <Wrapper>
        <Footer />
      </Wrapper>,
    );

    expect(screen.getByText(/care in every mile/i)).toBeInTheDocument();
    expect(screen.getByText(/commercial bulk supply/i)).toBeInTheDocument();
    expect(screen.getByText(/professional formulations/i)).toBeInTheDocument();
    expect(screen.queryByText(/chat on whatsapp/i)).not.toBeInTheDocument();
    expect(screen.getByText("Car Shampoo")).toBeInTheDocument();
    expect(screen.getByText("Cleaning Chemicals")).toBeInTheDocument();
    expect(screen.getByText("Car Wax & Polish")).toBeInTheDocument();
  });
});
