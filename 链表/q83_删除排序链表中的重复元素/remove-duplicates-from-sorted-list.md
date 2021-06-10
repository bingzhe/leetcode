# Leetcode83: 删除排序链表中的重复元素

存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。

返回同样按升序排列的结果链表。

### 示例

```
输入：head = [1,1,2]
输出：[1,2]
```

```
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```

## 题解一 迭代

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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  let cur = head;

  while (cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return head;
};
```

### 复杂度分析

- 时间复杂度：O(n)，其中 n 是链表的节点数量。
- 空间复杂度：O(1)

## 题解一 递归

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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let newhead = head.next;

  if (head.val === newhead.val) {
    head.next = newhead.next;
    head = deleteDuplicates(head);
  } else {
    head.next = deleteDuplicates(newhead);
  }
  return head;
};
```

### 复杂度分析

- 时间复杂度：O(n)，其中 n 是链表的节点数量。
- 空间复杂度：O(n)
