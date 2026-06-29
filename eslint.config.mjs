import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// Import các gói bạn mới cài đặt thông qua bộ đối sánh compat (vì standard là cấu hình cũ)
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = defineConfig([
  // 1. Giữ nguyên cấu hình Next.js gốc của bạn
  ...nextVitals,
  ...nextTs,

  // 2. Chèn bộ quy tắc Standard style vào hệ thống Flat Config
  ...compat.extends("eslint-config-standard"),

  // 3. Chèn plugin check class của Tailwind CSS
  ...compat.extends("plugin:tailwindcss/recommended"),

  // 4. LUÔN ĐỂ PRETTIER Ở CUỐI CÙNG để nó đè và tắt các quy tắc format gây xung đột
  eslintConfigPrettier,

  // 5. Giữ nguyên cấu hình globalIgnores gốc của bạn
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;