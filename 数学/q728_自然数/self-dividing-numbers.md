# Leetcode728: 自然数（easy）

自除数   是指可以被它包含的每一位数整除的数。

- 例如，128 是一个 自除数 ，因为  128 % 1 == 0，128 % 2 == 0，128 % 8 == 0。

自除数 不允许包含 0 。

给定两个整数  left  和  right ，返回一个列表，列表的元素是范围  [left, right]  内所有的 自除数 。

### 示例

```
输入：left = 1, right = 22
输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
```

```
输入：left = 47, right = 85
输出：[48,55,66,77]
```

## 题解一

模拟，数学题

### 实现

```js
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
  const result = [];

  for (let i = left; i <= right; i++) {
    if (isSelfDividing(i)) {
      result.push(i);
    }
  }

  return result;
};

function isSelfDividing(num) {
  let temp = num;

  while (temp > 0) {
    const n = temp % 10;

    if (n === 0 || num % n !== 0) {
      return false;
    }
    temp = Math.floor(temp / 10);
  }
  return true;
}
```

> 时间复杂度：令 n = right - left + 1，复杂度为 O(n log right)。

> 空间复杂度：O(1)。
