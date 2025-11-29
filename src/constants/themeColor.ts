export const buttonTheme = {
  mint: {
    primary: {
      base: `
        bg-[var(--color-mint-light)]
        text-white
      `,
      hover: `
        hover:bg-[var(--color-mint-dark)] 
      `,
    },
    muted: {
      base: `
        bg-[var(--color-mint-lighter)]
        text-[var(--color-mint-light)]
      `,
      hover: `
        hover:bg-gray-50
      `,
    },
  },
  disabled: {
    primary: {
      base: `bg-gray-200 text-gray-500 cursor-not-allowed`,
      hover: ``,
    },
    muted: {
      base: `bg-gray-200 text-gray-500 cursor-not-allowed`,
      hover: ``,
    },
  },
} as const;

export type ThemeKey = keyof typeof buttonTheme;
export type VariantKey<T extends ThemeKey> = keyof (typeof buttonTheme)[T];
