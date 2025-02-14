import ts from "@wessberg/rollup-plugin-ts";
import packageJson from "./package.json";

import {builtinModules} from "module";

export default {
	input: "src/index.ts",
	output: [
		{
			file: packageJson.main,
			format: "cjs",
			sourcemap: true
		},
		{
			file: packageJson.module,
			format: "esm",
			sourcemap: true
		}
	],
	plugins: [
		ts({
			tsconfig: process.env.NODE_ENV === "production" ? "tsconfig.dist.json" : "tsconfig.json"
		})
	],
	external: [
		...builtinModules,
		...Object.keys(packageJson.dependencies),
		...Object.keys(packageJson.devDependencies),
		...Object.keys(packageJson.peerDependencies),
		"@babel/core/lib/config/files/configuration",
		"@babel/core/lib/config/files/package"
	]
};
