/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 *
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *
 * 示例 1：
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 */

function backtrack(result, template, phoneMap, digits, index) {
  if (index === digits.length) {
    return result.push(template);
  }
  const phoneStr = phoneMap.get(digits.charAt(index));
  console.log(phoneStr);

  for (let i = 0; i < phoneStr.length; i++) {
    template = template + phoneStr.charAt(i);
    backtrack(result, template, phoneMap, digits, index + 1);
    template = template.substring(0, template.length - 1);
  }
}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const phoneMap = new Map();
  const result = [];

  phoneMap.set("2", "abc");
  phoneMap.set("3", "def");
  phoneMap.set("4", "ghi");
  phoneMap.set("5", "jkl");
  phoneMap.set("6", "mno");
  phoneMap.set("7", "pqrs");
  phoneMap.set("8", "tuv");
  phoneMap.set("9", "wxyz");

  backtrack(result, "", phoneMap, digits, 0);
  return result
};
