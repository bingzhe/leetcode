## 3. 无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

### 题解一 双指针/滑动窗口

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const map = new Map();
  let left = 0,
    right = 0,
    ans = 0;

  while (right < s.length) {
    const cur = s.charAt(right);
    if (map.has(cur)) {
      left = Math.max(map.get(cur) + 1, left);
    }
    ans = Math.max(ans, right - left + 1);
    map.set(cur, right);
    ++right;
  }

  return ans;
};
```
