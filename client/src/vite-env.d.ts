/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;

  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
