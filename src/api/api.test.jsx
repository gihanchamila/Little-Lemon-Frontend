import { describe, expect, it } from "vitest";
import { fetchAPI, submitAPI } from "../api/api"; // Update the path as needed

describe("fetchAPI", () => {
  it("should return an array of available time slots", () => {
    const date = new Date(2025, 1, 10); // Example date (Feb 10, 2025)
    const result = fetchAPI(date);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0); // Ensure at least one time slot is returned
    expect(result.every((time) => typeof time === "string")).toBe(true); // All items should be strings
  });

  it("should return the same results for the same date", () => {
    const date = new Date(2025, 1, 10);
    const result1 = fetchAPI(date);
    const result2 = fetchAPI(date);

    expect(result1).toEqual(result2); // Same input should produce same output
  });

  it("should return different results for different dates", () => {
    const date1 = new Date(2025, 1, 10);
    const date2 = new Date(2025, 1, 11);

    const result1 = fetchAPI(date1);
    const result2 = fetchAPI(date2);

    expect(result1).not.toEqual(result2); // Different input should produce different output
  });
});

describe("submitAPI", () => {
  it("should always return true", () => {
    const formData = { name: "John Doe", time: "18:00", date: "2025-02-10" };
    const result = submitAPI(formData);

    expect(result).toBe(true);
  });
});
