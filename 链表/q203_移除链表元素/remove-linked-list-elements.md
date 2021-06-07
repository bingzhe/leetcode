# Leetcode203: 移除链表元素

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

### 示例

```
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

```
输入：head = [], val = 1
输出：[]
```

```
输入：head = [7,7,7,7], val = 7
输出：[]
```

## 题解一 递归

### 解题思路

递归的终止条件是 `head` 为空，此时直接返回 `head`。当 `head` 不为空时，递归地进行删除操作，然后判断 `head` 的节点值是否等于 `val` 并决定是否要删除 `head`。

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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (head === null) {
    return head;
  }
  head.next = removeElements(head.next, val);

  return head.val === val ? head.next : head;
};
```

> 时间复杂度：O(n) 其中 n 是链表的长度。递归过程中需要遍历链表一次。

> 空间复杂度：O(n) 其中 n 是链表的长度。空间复杂度主要取决于递归调用栈，最多不会超过 n 层。

## 题解一 迭代

由于链表的头节点 `head` 有可能需要被删除，因此创建 `dummy` 来处理。

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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let cur = dummy;

  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return dummy.next;
};
```

> 时间复杂度：O(n) 其中 n 是链表的长度。递归过程中需要遍历链表一次。

> 空间复杂度：O(1)
