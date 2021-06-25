# Leetcode143: 重排链表

给定一个单链表  L：L0→L1→…→Ln-1→Ln ，
将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换

### 示例

```
给定链表 1->2->3->4, 重新排列为 1->4->2->3.
```

```
给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
```

## 题解一 数组

链表不支持下表访问，所有先用数组存起来，在按照顺序访问指定链表，重建链表

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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (head === null || head.next === null || head.next.next === null) {
    return;
  }

  const arr = [];

  while (head) {
    arr.push(head);
    head = head.next;
  }

  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    arr[i].next = arr[j];
    i++;

    if (i === j) break;

    arr[j].next = arr[i];
    j--;
  }
  arr[i].next = null;
};
```

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n), 主要为数组的开销

## 题解二 链表中点 + 链表逆序 + 合并链表

- 寻找链表中点，讲链表分成两半
- 第二个链表逆序
- 按照要求连接链表

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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (head === null || head.next === null) return head;

  function reverseList(head) {
    let prev = null;
    let cur = head;

    while (cur) {
      const next = cur.next;

      cur.next = prev;
      prev = cur;
      cur = next;
    }

    return prev;
  }

  function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  function mergeList(l1, l2) {
    let temp1;
    let temp2;

    while (l1 && l2) {
      temp1 = l1.next;
      temp2 = l2.next;

      l1.next = l2;
      l1 = temp1;

      l2.next = l1;
      l2 = temp2;
    }
  }

  const middleHead = middleNode(head);
  const rightList = middleHead.next;
  middleHead.next = null; // 避免链表出现环
  const reverse = reverseList(rightList);
  mergeList(head, reverse);
};
```

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
