import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./src/shared/test/jest-setup.ts', 'jest-extended/all'],
};

export default config;
