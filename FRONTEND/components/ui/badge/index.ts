import { type VariantProps, cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        pending:
          "bg-alertWarningBg text-white dark:bg-dark-alertWarningBg hover:bg-alertWarningBg/80 text-dark-background",
        attended:
          "bg-buttonSuccess text-white dark:bg-dark-alertSuccessBg hover:bg-buttonSuccess/80",
        canceled:
          "bg-buttonDanger text-white dark:bg-dark-alertErrorBg hover:bg-buttonDanger/80",
        active:
          "bg-buttonPrimary text-white dark:bg-dark-buttonPrimary hover:bg-buttonPrimary/80",
        inactive:
          "bg-buttonSecondary text-white dark:bg-dark-buttonSecondary hover:bg-buttonSecondary/80",
        in_revision:
          "bg-buttonWarning text-white dark:bg-dark-buttonWarning hover:bg-buttonWarning/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
