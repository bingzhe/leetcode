// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 输出:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]

function backtrack(list, template, nums, remain, start) {
  if (remain < 0) return;
  if (remain === 0) return list.push([...template]);

  for (let i = start; i < nums.length; i++) {
    if (i > start && nums[i] === nums[i - 1]) {
      continue;
    }

    template.push(nums[i]);
    backtrack(list, template, nums, remain - nums[i], i + 1);
    template.pop();
  }
}

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const result = [];

  backtrack(
    result,
    [],
    candidates.sort((a, b) => a - b),
    target,
    0
  );

  return result;
};
