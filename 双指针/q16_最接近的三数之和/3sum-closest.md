# leetcode16: 最接近的三数之和

给定一个包括  `n` 个整数的数组  `nums`   和 一个目标值  `target`。找出  `nums`  中的三个整数，使得它们的和与  `target`   最接近。返回这三个数的和。假定每组输入只存在唯一答案。

### 示例

```
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
```

## 题解一 排序 + 双指针

基本于leetcode15类似

- 对数组先进行升序排序
- 便利排序后的数组
  - 对于数组重复的元素跳过，减少枚举的次数
  - 左指针 `left=i+1`，右指针 `right=n-1`，当 `left<righ` 时，执行循环
    - 如果枚举到恰好 `nums[i]+nums[left]+nums[right]===target` 时，可以直接返回`target`，不会有比这个更接近的值了
    - 枚举的时候通过绝对值判断当前枚举的是否时更接近`target`的值，进行更新
    - 如果和大于等于 `target`，`right`指针向左移动，因为数组时升序排列，如果固定`right`指针，向右移动`left`指针，只会和越来越大，不会有比目前更接近`target`的值，这里的思路和 [q11\_盛最多水的容器](../q11_盛最多水的容器/container-with-most-water.md)类似
    - 如果和小于 `target`，`left` 指针向右移动，原因同上。

### 实现

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  let result = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < n; i++) {
    let left = i + 1;
    let right = n - 1;

    if (i > 0 && nums[i] === nums[i - 1]) continue;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === target) {
        return target;
      }

      if (Math.abs(sum - target) < Math.abs(result - target)) {
        result = sum;
      }

      if (sum > target) {
        while (nums[right] === nums[right - 1]) {
          --right;
        }

        --right;
      } else {
        while (nums[left] === nums[left + 1]) {
          ++left;
        }
        ++left;
      }
    }
  }
  return result;
};
```

> 时间复杂度：O(N^2)，其中 N 是数组 nums 的长度。我们首先需要 O(NlogN) 的时间对数组进行排序，随后在枚举的过程中，使用一重循环 O(N) 枚举 a，双指针 O(N) 枚举 b 和 c，故一共是 O(N^2)。
