// src/offline-milestones/leetcode/Algorithms.test.ts
import { twoSum } from "./TwoSum";
import { isValidParentheses } from "./ValidParentheses";

describe("LeetCode Easy Algorithms", () => {
  describe("Two Sum", () => {
    it("returns correct indices for sum", () => {
      expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
      expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    });

    it("handles no solution exist gracefully", () => {
      expect(twoSum([1, 2, 3], 10)).toEqual([]);
    });
  });

  describe("Valid Parentheses", () => {
    it("validates well-formed brackets", () => {
      expect(isValidParentheses("()")).toBe(true);
      expect(isValidParentheses("()[]{}")).toBe(true);
      expect(isValidParentheses("{[]}")).toBe(true);
    });

    it("rejects mismatched brackets", () => {
      expect(isValidParentheses("(]")).toBe(false);
      expect(isValidParentheses("([)]")).toBe(false);
      expect(isValidParentheses("]")).toBe(false);
    });
  });
});
