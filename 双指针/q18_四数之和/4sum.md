# leetcode18: 四数之和

给定一个包含  n 个整数的数组  nums  和一个目标值  target，判断  nums  中是否存在四个元素 a，b，c  和 d ，使得  a + b + c + d  的值与  target  相等？找出所有满足条件且不重复的四元组。

注意：答案中不可以包含重复的四元组。

### 示例

```
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

```
输入：nums = [], target = 0
输出：[]
```

## 题解一 排序 + 双指针

### 解题思路

和[q15\_三数之和](/双指针/q15_三数之和/3sum.md)相似，解法也相似

- 特判 如果数组长度小于 4,返回[]
- 对数组进行排序
- 使用两重循环分别枚举前两个数，然后在两重循环枚举到的数之后使用双指针枚举剩下的两个数。假设两重循环枚举到的前两个数分别位于下标 `i` 和 `j`，其中 `i<j`。初始时，左右指针分别指向下标 `j+1` 和下标 `n-1`。
  - 如果和等于 `target`，则将枚举到的四个数加到答案中，然后将左指针右移直到遇到不同的数，将右指针左移直到遇到不同的数；
  - 如果和小于 `target`，则将左指针右移一位；
  - 如果和大于 `target`，则将右指针左移一位；
- 实现的时候还有一些剪枝操作

### 实现

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const n = nums.length;
  const result = [];

  if (n < 4) return [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;

    if (nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) continue;

    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
      if (nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) continue;

      let left = j + 1;
      let right = n - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          while (left < right && nums[left] === nums[left + 1]) {
            ++left;
          }

          while (left < right && nums[right] === nums[right - 1]) {
            --right;
          }

          ++left;
          --right;
        } else if (sum > target) {
          --right;
        } else {
          ++left;
        }
      }
    }
  }

  return result;
};
```

> 时间复杂度 O(n^3)

> 空间复杂度 O(n)
