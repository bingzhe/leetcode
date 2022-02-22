/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

//  输入: nums = [1,3,5,6], target = 5
//  输出: 2
var searchInsert = function (nums, target) {
  let left = 0,
    right = nums.length - 1,
    mid;

  while (left <= right) {
    mid = (left + right) / 2;
    mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return left;
};
