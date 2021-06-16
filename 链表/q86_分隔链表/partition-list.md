# Leetcode86: 分隔链表

给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。

你应当 保留 两个分区中每个节点的初始相对位置。

### 示例

```
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
```

```
输入：head = [2,1], x = 2
输出：[1,2]
```

## 题解

关键点

- 虚拟节点 dummy 简化操作
- 遍历完成之后记得 max.next = null;否则会内存溢出

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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  if (head === null || head.next === null) return head;

  const minDummyhead = new ListNode(-101);
  const maxDummyhead = new ListNode(-101);

  let min = minDummyhead;
  let max = maxDummyhead;

  while (head) {
    if (head.val >= x) {
      max.next = head;
      max = max.next;
    } else {
      min.next = head;
      min = min.next;
    }
    head = head.next;
  }

  max.next = null;
  min.next = maxDummyhead.next;

  return minDummyhead.next;
};
```

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
