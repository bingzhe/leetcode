# Leetcode3: 无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

### 示例 1:

```
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

### 示例 2:

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

### 示例 3:

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

## 题解一 维护数组

### 解题思路

遍历字符串，判断字符串是否在滑动窗口数组里

- 不在 push 进数组中
- 在，删除滑动窗口数组里相同字符及相同字符前的字符，然后将当前字符 push 进数组
- 更新 max 为当前最长字串的长度

### 实现

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const arr = [];
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = s[i];
    const index = arr.indexOf(cur);

    if (index !== -1) {
      arr.splice(0, index + 1);
    }

    arr.push(cur);
    max = Math.max(arr.length, max);
  }

  return max;
};
```

> 时间复杂度：O(n2)， 其中 arr.indexOf() 时间复杂度为 O(n) ，arr.splice(0, index+1) 的时间复杂度也为 O(n)

> 空间复杂度：O(n)

## 题解二 双指针,优化的 Map

### 解题思路

- 使用 `map`来存储当前已经遍历过的字符，`key` 为字符，`value` 为下标

- 使用 `left` 来标记无重复子串开始下标，`right` 为当前遍历字符下标

- 遍历字符串，判断当前字符是否已经在 `map` 中存在，存在则更新无重复子串开始下标 `left` 为相同字符的下一位置，此时从 `left` 到 `right` 为最新的无重复子串，更新 `max` ，将当前字符与下标放入`map` 中

* 最后，返回 max 即可

### 实现

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const map = new Map();
  let left = 0,
    right = 0,
    max = 0;

  while (right < s.length) {
    const cur = s.charAt(right);
    if (map.has(cur)) {
      left = Math.max(map.get(cur) + 1, left);
    }
    max = Math.max(max, right - left + 1);
    map.set(cur, right);
    ++right;
  }

  return max;
};
```

> 时间复杂度：O(n)

> 空间复杂度：O(n)
