import { afterEach, describe, expect, it } from "vitest";
import { ANTHROPIC_BASH_SECTION, addAnthropicBashToPayload, isAnthropicBashEnabled } from "../src/index.js";

const ANTHROPIC_BASH_ENV = "PI_ANTHROPIC_BASH";

afterEach(() => {
	delete process.env[ANTHROPIC_BASH_ENV];
});

describe("anthropic-bash extension", () => {
	it("is a no-op when env var is unset, even on anthropic-messages", () => {
		const payload = {
			tools: [{ name: "some_tool", description: "function tool" }],
		};

		const result = addAnthropicBashToPayload("anthropic-messages", payload);

		expect(result).toBe(payload);
	});

	it("injects native bash_20250124 when enabled and no native tool exists", () => {
		process.env[ANTHROPIC_BASH_ENV] = "true";

		const result = addAnthropicBashToPayload("anthropic-messages", {
			tools: [{ name: "read", description: "function read" }],
		}) as { tools: Array<Record<string, unknown>> };

		expect(result.tools).toContainEqual({
			type: "bash_20250124",
			name: "bash",
		});
	});

	it("strips function-shape bash and preserves caller native bash", () => {
		process.env[ANTHROPIC_BASH_ENV] = "on";

		const result = addAnthropicBashToPayload("anthropic-messages", {
			tools: [
				{ name: "bash", description: "bash function", input_schema: { type: "object" } },
				{ type: "bash_20251215", name: "bash" },
			],
		}) as { tools: Array<Record<string, unknown>> };

		const bashTools = result.tools.filter((tool) => tool.name === "bash");
		expect(bashTools).toHaveLength(1);
		expect(bashTools[0]).toEqual({ type: "bash_20251215", name: "bash" });
	});

	it("isAnthropicBashEnabled returns true for truthy values", () => {
		for (const envValue of ["1", "true", "yes", "on", " TRUE ", "\tYes\n"] as const) {
			process.env[ANTHROPIC_BASH_ENV] = envValue;
			expect(isAnthropicBashEnabled()).toBe(true);
		}
	});

	it("isAnthropicBashEnabled returns false for falsy and unknown values", () => {
		for (const envValue of ["0", "false", "no", "off", "", "garbage"] as const) {
			process.env[ANTHROPIC_BASH_ENV] = envValue;
			expect(isAnthropicBashEnabled()).toBe(false);
		}
	});

	it("ANTHROPIC_BASH_SECTION mentions bash", () => {
		expect(ANTHROPIC_BASH_SECTION.trim().length).toBeGreaterThan(0);
		expect(ANTHROPIC_BASH_SECTION.toLowerCase()).toContain("bash");
	});
});
