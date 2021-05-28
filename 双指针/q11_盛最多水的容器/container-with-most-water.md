# leetcode11: 盛最多水的容器

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点  (i, ai) 。在坐标内画 n 条垂直线，垂直线 i  的两个端点分别为  (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与  x  轴共同构成的容器可以容纳最多的水。

### 说明

你不能倾斜容器。

### 示例

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49
```

```
输入：height = [1,1]
输出：1
```

## 题解一 暴力枚举（不推荐）

### 解题思路

看到题目，最直接的想法就是两层 for 循环，不断计算最大值并更新。时间复杂度是 O(n^2)，效率不高。用可能不能通过。

### 实现

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      max = Math.max(max, (j - i) * Math.min(height[i], height[j]));
    }
  }

  return max;
};
```

## 题解二 双指针

### 解题思路

- 设置双指针 i,j 位于容器两端，根据规则移动指针，更新最大面积到 max，直到`i===j`时返回 max
- **移动规则与证明**
  - 每一个状态下水槽的面积公式为`S(i,j)=min(h[i],h[j])×(j−i)`。水槽的面积是由两版中短板决定的。
  - 在每一个状态下，无论长板或短板收窄 1 格，都会导致水槽 底边宽度 -1
    - 若向内移动短板，水槽的短板 `min(h[i], h[j])`可能变大，因此水槽面积 `S(i, j)` 可能增大。
    - 若向内移动长板，水槽的短板 `min(h[i], h[j])` 不变或变小，下个水槽的面积一定小于当前水槽面积。
  - 因此，向内收窄短板可以获取面积最大值，可以理解计算时候跳过的状态面积都是小于当前的面积，不会丢失面积最大值

### 实现

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let i = 0,
    j = height.length - 1,
    max = 0;

  while (i <= j) {
    max = Math.max(max, Math.min(height[i], height[j]) * (j - i));

    if (height[i] > height[j]) {
      --j;
    } else {
      ++i;
    }
  }

  return max;
};
```

> 时间复杂度 O(N) 双指针遍历一次底边宽度 N

> 空间复杂度 O(1) 指针使用常数额外空间。
