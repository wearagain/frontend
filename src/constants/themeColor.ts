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
  cancel: {
    primary: {
      base: `
        bg-[#D9D9D9]
        text-[#222222]
      `,
      hover: `
        hover:bg-[#C8C8C8]
      `,
    },
    muted: {
      base: `
        bg-[#E6E6E6]
        text-[#4A4A4A]
      `,
      hover: `
        hover:bg-[#D0D0D0]
      `,
    },
  },
} as const;

export type ThemeKey = keyof typeof buttonTheme;
export type VariantKey<T extends ThemeKey> = keyof (typeof buttonTheme)[T];
