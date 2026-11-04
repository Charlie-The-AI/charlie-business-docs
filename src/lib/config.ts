export const SITE_CONFIG = {
  name: 'Charlie',
  fullName: 'Charlie the Business Advisor',
  tagline: 'Your business data has a story. Let Charlie tell it.',
  description:
    'Add powerful business analytics and AI-driven insights to your applications with a free, open-source TypeScript toolkit.',
  npmPackage: 'charlie-the-business-advisor',
  npmUrl: 'https://www.npmjs.com/package/charlie-the-business-advisor',
  // Configurable repository URL ready to connect to the canonical repository
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ||
    'https://github.com/charlie-advisor/charlie-the-business-advisor',
  license: 'MIT License',
  installCommands: {
    npm: 'npm install charlie-the-business-advisor',
    pnpm: 'pnpm add charlie-the-business-advisor',
    yarn: 'yarn add charlie-the-business-advisor',
    bun: 'bun add charlie-the-business-advisor',
  },
} as const;
