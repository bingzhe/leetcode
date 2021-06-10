# Leetcode61: 旋转链表

给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

### 示例

```
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
```

```
输入：head = [0,1,2], k = 4
输出：[2,0,1]
```

## 题解 快慢指针

### 实现

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (k === 0 || head == null || head.next === null) {
    return head;
  }

  let now = head;
  let length = 0;

  while (now) {
    now = now.next;
    length++;
  }

  let n = k % length;

  if (n === 0) {
    return head;
  }

  let fast = head;
  let slow = head;

  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  let res = slow.next;

  fast.next = head;
  slow.next = null;

  return res;
};
```

### 复杂度分析

- 时间复杂度：O(n) 节点最多只遍历两遍
- 空间复杂度：O(1)
