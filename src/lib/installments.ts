import type { Product } from "@/lib/catalog";

export type InstallmentPlan = {
  totalPrice: number;
  currency: string;
  installmentCount: number;
  schedule: string;
  terms: string;
};

// Add an entry only after AutoUp confirms the complete plan and product price.
export const INSTALLMENT_PLANS: Partial<Record<string, InstallmentPlan>> = {};

export function isTwentyLitreVariant(variant?: string) {
  return /^\s*20\s*(?:L|lit(?:re|er)s?)\b/i.test(variant ?? "");
}

export function configuredInstallmentPlan(product: Product, variant?: string) {
  if (!isTwentyLitreVariant(variant)) return undefined;
  const plan = INSTALLMENT_PLANS[product.slug];
  if (
    !plan ||
    product.price === undefined ||
    plan.totalPrice !== product.price ||
    !Number.isFinite(plan.totalPrice) ||
    plan.totalPrice <= 0 ||
    !Number.isInteger(plan.installmentCount) ||
    plan.installmentCount < 2 ||
    !plan.currency.trim() ||
    !plan.schedule.trim() ||
    !plan.terms.trim()
  ) {
    return undefined;
  }
  return plan;
}

export function installmentAmount(plan: InstallmentPlan) {
  return plan.totalPrice / plan.installmentCount;
}
