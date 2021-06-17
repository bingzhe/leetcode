# Leetcode92: 反转链表 II

给你单链表的头指针 head 和两个整数  left 和 right ，其中  left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

### 示例

```
输入：head = [1,2,3,4,5], left = 2, right = 4
输出：[1,4,3,2,5]
```

```
输入：head = [5], left = 1, right = 1
输出：[5]
```

## 题解

关键点

- 可以拆解为取出反转的小段链表，反转完成后在插入到原先的链表中
- 用 p1,p2,p3,p4 来记录四个特殊的节点，其中 p1 为反转的子链表中的前一个节点,p4 为反转的子链表中的后一个节点,p1,p4 节点在子链表反转完成后拼接时使用，p2，p3，需要反转的子链表的头尾节点
- 使用虚拟节点 dummy 简化操作

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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (head === null || head.next === null) return head;

  const dummyhead = new ListNode(0, head);

  let cur = dummyhead.next;
  let pre = cur; // 因为要反转，因此我们需要记住前一个节点
  let index = 0;

  let p1 = null,
    p2 = null,
    p3 = null,
    p4 = null;

  while (cur) {
    const next = cur.next;
    index++;

    // 对 (left - right) 范围内的节点进行反转
    if (index > left && index <= right) {
      cur.next = pre;
    }

    if (index === left - 1) {
      p1 = cur;
    }

    if (index === left) {
      p2 = cur;
    }

    if (index === right) {
      p3 = cur;
    }

    if (index === right + 1) {
      p4 = cur;
    }

    pre = cur;
    cur = next;
  }

  // 两个链表合并起来
  (p1 || dummyhead).next = p3;
  p2.next = p4;

  return dummyhead.next;
};
```

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
