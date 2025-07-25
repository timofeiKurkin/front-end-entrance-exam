import { defineConfig } from "vite";
import { fileURLToPath } from "url";

export default defineConfig({
    server: {
        host: true,
        port: 5173,
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./", import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        const modulePath = id.split("node_modules/")[1];
                        const topLevelFolder = modulePath?.split("/")[0];
                        if (topLevelFolder !== ".pnpm") {
                            return topLevelFolder;
                        }

                        const scopedPackageName = modulePath?.split("/")[1];
                        return scopedPackageName?.split("@")[scopedPackageName.startsWith("@") ? 1 : 0];
                    }
                },
            },
        },
    },
});
