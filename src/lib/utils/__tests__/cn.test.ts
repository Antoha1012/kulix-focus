import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn utility function", () => {
	describe("basic functionality", () => {
		it("should return empty string for no arguments", () => {
			expect(cn()).toBe("");
		});

		it("should return single class name", () => {
			expect(cn("class1")).toBe("class1");
		});

		it("should join multiple class names", () => {
			expect(cn("class1", "class2", "class3")).toBe(
				"class1 class2 class3"
			);
		});

		it("should handle undefined and null values", () => {
			expect(cn("class1", undefined, "class2", null, "class3")).toBe(
				"class1 class2 class3"
			);
		});

		it("should handle empty strings", () => {
			expect(cn("class1", "", "class2", "class3")).toBe(
				"class1 class2 class3"
			);
		});
	});

	describe("conditional classes", () => {
		it("should include conditional classes when condition is true", () => {
			expect(cn("class1", true && "class2", "class3")).toBe(
				"class1 class2 class3"
			);
		});

		it("should exclude conditional classes when condition is false", () => {
			expect(cn("class1", false && "class2", "class3")).toBe(
				"class1 class3"
			);
		});

		it("should handle multiple conditional classes", () => {
			expect(
				cn(
					"class1",
					true && "class2",
					false && "class3",
					true && "class4",
					"class5"
				)
			).toBe("class1 class2 class4 class5");
		});
	});

	describe("object syntax", () => {
		it("should include classes when object values are true", () => {
			expect(
				cn({
					class1: true,
					class2: false,
					class3: true,
				})
			).toBe("class1 class3");
		});

		it("should handle empty object", () => {
			expect(cn({})).toBe("");
		});

		it("should handle object with all false values", () => {
			expect(
				cn({
					class1: false,
					class2: false,
				})
			).toBe("");
		});
	});

	describe("mixed arguments", () => {
		it("should handle string and object arguments", () => {
			expect(
				cn(
					"class1",
					{
						class2: true,
						class3: false,
					},
					"class4"
				)
			).toBe("class1 class2 class4");
		});

		it("should handle complex mixed arguments", () => {
			expect(
				cn(
					"base",
					true && "conditional",
					{
						"object-true": true,
						"object-false": false,
					},
					"end"
				)
			).toBe("base conditional object-true end");
		});
	});

	describe("edge cases", () => {
		it("should handle whitespace in class names", () => {
			// clsx and twMerge trim whitespace, so we expect trimmed result
			expect(cn("  class1  ", "  class2  ")).toBe("class1 class2");
		});

		it("should handle duplicate class names", () => {
			expect(cn("class1", "class2", "class1")).toBe(
				"class1 class2 class1"
			);
		});

		it("should handle very long class names", () => {
			const longClass = "a".repeat(1000);
			expect(cn(longClass)).toBe(longClass);
		});

		it("should handle many class names", () => {
			const manyClasses = Array.from(
				{ length: 100 },
				(_, i) => `class-${i}`
			);
			const result = cn(...manyClasses);
			expect(result).toBe(manyClasses.join(" "));
		});
	});

	describe("real-world examples", () => {
		it("should handle typical React className patterns", () => {
			const isActive = true;
			const isDisabled = false;
			const variant = "primary";

			expect(
				cn(
					"btn",
					{
						"btn-active": isActive,
						"btn-disabled": isDisabled,
					},
					`btn-${variant}`,
					"btn-base"
				)
			).toBe("btn btn-active btn-primary btn-base");
		});

		it("should handle Tailwind CSS patterns", () => {
			const isLarge = true;
			const isDark = false;

			expect(
				cn(
					"px-4 py-2 rounded",
					{
						"text-lg": isLarge,
						"text-sm": !isLarge,
						"bg-gray-800 text-white": isDark,
						"bg-white text-gray-900": !isDark,
					},
					"font-medium"
				)
			).toBe(
				"px-4 py-2 rounded text-lg bg-white text-gray-900 font-medium"
			);
		});
	});
});
