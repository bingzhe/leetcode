# Leetcode2: 两数相加

给你两个 **非空** 的链表，表示两个 **非负** 的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

### 示例

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807
```

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

## 题解 链表

### 解题思路

设立一个表示进位的变量 `carry`，建立一个新链表，把输入的两个链表从头往后同时处理，每两个相加，将结果加上 `carry` 后的值作为一个新节点到新链表后面，并更新 `carry` 值即可。

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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let cur1 = l1;
  let cur2 = l2;

  let dummyHead = new ListNode(0);
  let cur = dummyHead;
  let carry = 0;

  while (cur1 || cur2) {
    let val1 = cur1 ? cur1.val : 0;
    let val2 = cur2 ? cur2.val : 0;
    let sum = val1 + val2 + carry;

    let newNode = new ListNode(sum % 10);
    carry = sum >= 10 ? 1 : 0;
    cur.next = newNode;
    cur = cur.next;

    if (cur1) {
      cur1 = cur1.next;
    }
    if (cur2) {
      cur2 = cur2.next;
    }
  }
  if (carry > 0) {
    cur.next = new ListNode(carry);
  }

  return dummyHead.next;
};
```

> 时间复杂度：O(n)

> 空间复杂度：O(1)
