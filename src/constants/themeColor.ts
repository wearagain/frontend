export const buttonTheme = {
  mint: {
    primary: {
      base: `
        bg-[var(--color-mint-light)]
        text-white
        border-[var(--color-mint-light)]
      `,
      hover: `
        hover:bg-[var(--color-mint-dark)] 
        hover:text-white
        hover:bg-[var(--color-mint-dark)] 
      `,
    },
    muted: {
      base: `
        bg-[var(--color-mint-lighter)]
        text-[var(--color-mint-light)]
        border-[var(--color-mint-lighter)]
      `,
      hover: `
        hover:bg-gray-50
        hover:border-gray-50
      `,
    },
  },
  disabled: {
    primary: {
      base: `bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed`,
      hover: ``,
    },
    muted: {
      base: `bg-gray-200 border-gray-200 text-gray-500 cursor-not-allowed`,
      hover: ``,
    },
  },
  cancel: {
    primary: {
      base: `
        bg-[#D9D9D9]
        text-[#222222]
        border-[#D9D9D9]
      `,
      hover: `
        hover:bg-[#C8C8C8]
        hover:border-[#C8C8C8]
      `,
    },
    muted: {
      base: `
        bg-[#E6E6E6]
        text-[#4A4A4A]
        border-[#E6E6E6]
      `,
      hover: `
        hover:bg-[#D0D0D0]
        hover:border-[#D0D0D0]
      `,
    },
  },
  purple: {
    primary: {
      base: `
        bg-[var(--color-purple-light)]
        text-[#FFFFFF]
        border-[var(--color-purple-light)]
      `,
      hover: `
        hover:bg-[var(--color-purple-dark)]
        hover:border-[var(--color-purple-dark)]
      `,
    },
    muted: {
      base: `
        bg-[var(--color-purple-lighter)]
        text-[#424242]
        border-[var(--color-purple-lighter)]
      `,
      hover: `
        hover:bg-[var(--color-purple-light)]
        hover:border-[var(--color-purple-light)]
      `,
    },
  },
} as const;

export type ThemeKey = keyof typeof buttonTheme;
export type VariantKey<T extends ThemeKey> = keyof (typeof buttonTheme)[T];

export const filterTheme = {
  normal: `
    bg-white
    text-gray-700
    border-gray-300
    hover:bg-gray-100
    hover:text-gray-700
  `,
  mint: `
        bg-[var(--color-mint-lighter)]
        text-[var(--color-mint-light)]
        border-[var(--color-mint-light)]
      `,
  disabled: "",
  cancel: "",
  purple: `
    bg-[var(--color-purple-lighter)]
    text-[var(--color-purple-light)]
    border-[var(--color-purple-light)]`,
};

export type FilterThemeKey = keyof typeof filterTheme;
