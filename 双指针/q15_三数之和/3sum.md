# leetcode15: 三数之和

给你一个包含 n 个整数的数组  nums，判断  nums  中是否存在三个元素 a，b，c ，使得  a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组

### 示例

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

```
输入：nums = []
输出：[]
```

```
输入：nums = [0]
输出：[]
```

## 题解一 排序 + 双指针

### 解题思路

暴力破解，三层枚举，O（n^3）效率太低,可以利用双指针夹逼，通过排序来避免重复

- 如果数组长度小于 3,返回[]
- 对数组进行排序
- 遍历排序后的数组
  - 若 `nums[i]>0`：因为已经排序好，所以后面不可能有三个数加和等于 0，直接返回结果。
  - 对于重复元素：跳过，避免出现重复解
  - 左指针 `left=i+1`，右指针 `right=n-1`，当 `left<righ` 时，执行循环：
    - 当 `nums[i]+nums[left]+nums[right]===0`，执行循环，判断左界和右界是否和下一位置重复，去除重复解。并同时将 `left`,`right` 移到下一位置，寻找新的解
    - 若和大于 0，说明 `nums[right]` 太大，`right` 左移
    - 若和小于 0，说明 `nums[left]` 太小，`left` 右移

### 实现

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const n = nums.length;
  const result = [];

  if (n < 3) return result;
  nums.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum > 0) {
        --right;
      } else if (sum < 0) {
        ++left;
      } else {
        result.push([nums[i], nums[left], nums[right]]);

        while (nums[left] === nums[left + 1]) {
          ++left;
        }
        while (nums[right] === nums[right - 1]) {
          --right;
        }
        ++left;
        --right;
      }
    }
  }

  return result;
};
```

> 时间复杂度 O(n^2)

> 空间复杂度 O(1)
