import { describe, it, expect } from "vitest";
import { cn } from "./utils/cn";

describe("cn utility", () => {
	it("should merge class names correctly", () => {
		expect(cn("class1", "class2")).toBe("class1 class2");
	});

	it("should handle conditional classes", () => {
		expect(cn("base", true && "conditional")).toBe("base conditional");
		expect(cn("base", false && "conditional")).toBe("base");
	});

	it("should handle undefined and null values", () => {
		expect(cn("base", undefined, null, "valid")).toBe("base valid");
	});
});
