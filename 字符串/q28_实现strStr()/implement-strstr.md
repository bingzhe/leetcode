# leetcode28: 实现 strStr()

实现 `strStr()` 函数

给你两个字符串  `haystack` 和 `needle` ，请你在 `haystack` 字符串中找出 `needle` 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回   -1 。

### 说明

当  `needle`  是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当  `needle`  是空字符串时我们应当返回 0 。这与 C 语言的  `strstr()`  以及 Java 的  `indexOf()`  定义相符。

### 示例

```
输入：haystack = "hello", needle = "ll"
输出：2
```

```
输入：haystack = "aaaaa", needle = "bba"
输出：-1
```

```
输入：haystack = "", needle = ""
输出：0

```

## 题解一 暴力匹配

### 解题思路

枚举原串中的每个字符作为「发起点」，每次从原串的「发起点」和匹配串的「首位」开始尝试匹配：

- 匹配成功：返回本次匹配的原串「发起点」。
- 匹配失败：枚举原串的下一个「发起点」，重新尝试匹配。

### 实现

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const n = haystack.length;
  const m = needle.length;

  let res = -1;

  for (let i = 0; i + m <= n; i++) {
    let flag = true;
    for (let j = 0; j < m; j++) {
      if (needle[j] !== haystack[i + j]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      res = i;
      break;
    }
  }

  return res;
};
```

> 时间复杂度：n 为原串的长度，m 为匹配串的长度。其中枚举的复杂度为 O(n−m)，构造和比较字符串的复杂度为 O(m)。整体复杂度为 O((n - m) \* m)。不考虑剪枝的话复杂度是 O(m \* n)。

> 空间复杂度：O(1)。

## 题解二 KMP 解法（待补充）
