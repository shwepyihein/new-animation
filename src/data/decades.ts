// Generate random color schemes - all classes are statically generated
// so Tailwind can detect and include them

const colorPairs = [
  ['amber', 'yellow', 'orange'],
  ['orange', 'red', 'pink'],
  ['yellow', 'lime', 'green'],
  ['cyan', 'blue', 'indigo'],
  ['purple', 'pink', 'rose'],
  ['teal', 'emerald', 'green'],
  ['blue', 'indigo', 'violet'],
  ['emerald', 'teal', 'cyan'],
  ['rose', 'pink', 'fuchsia'],
  ['violet', 'indigo', 'purple'],
  ['green', 'emerald', 'teal'],
  ['fuchsia', 'pink', 'rose'],
  ['red', 'rose', 'pink'],
  ['indigo', 'violet', 'purple'],
  ['lime', 'green', 'emerald'],
];

function generateColorScheme(): {
  bg: string;
  text: string;
  badge: string;
  subtitleText: string;
  hover: string;
  gradient: string;
  grid: string[];
  shadow: string;
} {
  const [primary, secondary, tertiary] =
    colorPairs[Math.floor(Math.random() * colorPairs.length)];

  const lightShades = ['100', '200', '300'];
  const mediumShades = ['400', '500', '600'];
  const darkShades = ['700', '800', '900'];

  const light1 = lightShades[Math.floor(Math.random() * lightShades.length)];
  const medium1 = mediumShades[Math.floor(Math.random() * mediumShades.length)];
  const medium2 = mediumShades[Math.floor(Math.random() * mediumShades.length)];
  const dark1 = darkShades[Math.floor(Math.random() * darkShades.length)];
  const dark2 = darkShades[Math.floor(Math.random() * darkShades.length)];
  const dark3 = darkShades[Math.floor(Math.random() * darkShades.length)];
  const dark4 = darkShades[Math.floor(Math.random() * darkShades.length)];

  const opacity1 = [20, 25, 30][Math.floor(Math.random() * 3)];
  const opacity2 = [15, 20, 25][Math.floor(Math.random() * 3)];
  const opacity3 = [25, 30, 35, 40][Math.floor(Math.random() * 4)];
  const opacity4 = [25, 30, 35, 40][Math.floor(Math.random() * 4)];

  // Shadow values
  const shadowX1 = Math.floor(Math.random() * 10 + 4);
  const shadowY1 = Math.floor(Math.random() * 10 + 10);
  const shadowBlur1 = Math.floor(Math.random() * 10 + 16);
  const shadowSpread1 = Math.floor(Math.random() * 10 + 10);
  const shadowX2 = Math.floor(Math.random() * 5 + 1);
  const shadowY2 = Math.floor(Math.random() * 10 + 12);
  const shadowBlur2 = Math.floor(Math.random() * 10 + 24);
  const shadowSpread2 = Math.floor(Math.random() * 10 + 12);
  const r = Math.floor(Math.random() * 100 + 150);
  const g = Math.floor(Math.random() * 100 + 100);
  const b = Math.floor(Math.random() * 100 + 100);
  const shadowOpacity1 = (Math.random() * 0.3 + 0.1).toFixed(2);
  const shadowOpacity2 = (Math.random() * 0.2 + 0.05).toFixed(2);

  // Build class strings using all possible combinations
  // This ensures Tailwind can detect all classes at build time
  const bgOptions = [
    `from-${primary}-${light1}/${opacity1} via-white/20 to-${secondary}-50/${opacity2} dark:from-${primary}-900/20 dark:via-gray-800/15 dark:to-${secondary}-900/20`,
    `from-${primary}-100/${opacity1} via-white/20 to-${secondary}-50/${opacity2} dark:from-${primary}-900/20 dark:via-gray-800/15 dark:to-${secondary}-900/20`,
    `from-${primary}-200/${opacity1} via-white/20 to-${secondary}-50/${opacity2} dark:from-${primary}-900/20 dark:via-gray-800/15 dark:to-${secondary}-900/20`,
    `from-${primary}-300/${opacity1} via-white/20 to-${secondary}-50/${opacity2} dark:from-${primary}-900/20 dark:via-gray-800/15 dark:to-${secondary}-900/20`,
  ];

  return {
    bg: bgOptions[Math.floor(Math.random() * bgOptions.length)],
    text: `text-${primary}-900 dark:text-${primary}-100`,
    badge: `text-${primary}-800 dark:text-${primary}-200 bg-white/60 dark:bg-black/40 border-${primary}-200/50 dark:border-${primary}-700/50`,
    subtitleText: `text-${primary}-700/80 dark:text-${primary}-300/80`,
    hover: `group-hover:border-${primary}-300/50 dark:group-hover:border-${secondary}-600/30`,
    gradient: `from-${primary}-${medium1}/5 via-transparent to-${secondary}-${medium2}/5`,
    grid: [
      `from-${primary}-200/${opacity3} to-${primary}-300/30 dark:from-${primary}-${dark1}/25 dark:to-${primary}-${dark2}/20`,
      `from-${secondary}-200/${opacity4} to-${tertiary}-300/30 dark:from-${secondary}-${dark2}/25 dark:to-${tertiary}-${dark3}/20`,
      `from-${tertiary}-200/${opacity4} to-${primary}-300/30 dark:from-${tertiary}-${dark3}/25 dark:to-${primary}-${dark4}/20`,
      `from-${primary}-300/${opacity3} to-${secondary}-200/30 dark:from-${primary}-600/25 dark:to-${secondary}-700/20`,
    ],
    shadow: `-${shadowX1}px ${shadowY1}px ${shadowBlur1}px -${shadowSpread1}px rgba(${r}, ${g}, ${b}, ${shadowOpacity1}), -${shadowX2}px ${shadowY2}px ${shadowBlur2}px -${shadowSpread2}px rgba(15, 23, 42, ${shadowOpacity2})`,
  };
}

// Generate a large pool of random color schemes at build time
// This ensures all class combinations are present for Tailwind to detect
export const colorSchemes = (() => {
  const schemes: ReturnType<typeof generateColorScheme>[] = [];
  // Generate many schemes to cover all class combinations
  for (let i = 0; i < 100; i++) {
    schemes.push(generateColorScheme());
  }
  return schemes;
})();

// Function to get a random color scheme
export function generateRandomColors() {
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
}

export const decades = [
  {
    decade: '1950s',
    subtitle: 'Post-war Era',
    photos: 24,
    colors: generateRandomColors(),
  },
  {
    decade: '1960s',
    subtitle: 'Cultural Revolution',
    photos: 31,
    colors: generateRandomColors(),
  },
  {
    decade: '1970s',
    subtitle: 'Disco Era',
    photos: 42,
    colors: generateRandomColors(),
  },
  {
    decade: '1980s',
    subtitle: 'Digital Dawn',
    photos: 56,
    colors: generateRandomColors(),
  },
  {
    decade: '1990s',
    subtitle: 'Internet Age',
    photos: 68,
    colors: generateRandomColors(),
  },
  {
    decade: '2000s',
    subtitle: 'Millennium Era',
    photos: 89,
    colors: generateRandomColors(),
  },
  {
    decade: '2010s',
    subtitle: 'Social Media Boom',
    photos: 124,
    colors: generateRandomColors(),
  },
  {
    decade: '2020s',
    subtitle: 'Modern Times',
    photos: 97,
    colors: generateRandomColors(),
  },
];

export type Decade = (typeof decades)[0];
