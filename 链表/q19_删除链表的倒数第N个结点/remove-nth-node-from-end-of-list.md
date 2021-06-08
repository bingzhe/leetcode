# Leetcode19: 除链表的倒数第 N 个结点

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

进阶：你能尝试使用一趟扫描实现吗？

### 示例

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

```
输入：head = [1], n = 1
输出：[]
```

```
输入：head = [1,2], n = 1
输出：[1]
```

## 题解一 暴力求解

- 从头节点开始对链表进行一次遍历，得到链表的长度 L、
- 再从头节点开始对链表进行一次遍历，当遍历到第 `L−n+1` 个节点时，它就是我们需要删除的节点。

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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let length = 0;
  let tail = head;

  while (tail) {
    length++;
    tail = tail.next;
  }

  const dummyhead = new ListNode(0, head);
  tail = dummyhead;
  const noop = {
    next: null,
  };

  for (let i = 1; i < length - n + 1; i++) {
    tail = tail.next;
  }

  tail.next = (tail.next || noop).next;

  return dummyhead.next;
};
```

> 时间复杂度：O(n)

> 空间复杂度：O(1)

## 题解二 快慢指针

妨设为指针 fast 和 指针 slow。指针 fast 先移动 n 次， 指针 slow 再开始移动。当 fast 到达 null 的时候， 指针 slow 的位置正好是倒数第 n。这个时候将 slow 的指针指向 slow 的下下个指针即可完成删除工作。

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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let i = -1;
  const noop = {
    next: null,
  };
  const dummyhead = new ListNode(0, head);

  let slow = dummyhead;
  let fast = dummyhead;

  while (fast) {
    if (i === n) {
      slow = slow.next;
    }

    if (i !== n) {
      i++;
    }

    fast = fast.next;
  }

  slow.next = (slow.next || noop).next;

  return dummyhead.next;
};
```

> 时间复杂度：O(n)

> 空间复杂度：O(1)
