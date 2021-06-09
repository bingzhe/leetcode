# Leetcode24: 两两交换链表中的节点

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

### 示例

```
输入：head = [1,2,3,4]
输出：[2,1,4,3]
```

```
输入：head = []
输出：[]
```

```
输入：head = [1]
输出：[1]
```

## 题解一 递归

- 递归的终止条件是链表中没有节点，或者链表中只有一个节点，此时无法进行交换。
- 设需要交换的两个点为 head 和 newHead，head 连接后面交换完成的子链表，newHead 连接 head，完成交换,返回交换完成的子链表 newHead

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
var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head;

  return newHead;
};
```

### 复杂度分析

- 时间复杂度：O(n)，其中 n 是链表的节点数量。
- 空间复杂度：O(n)，其中 n 是链表的节点数量。空间复杂度主要取决于递归调用的栈空间

## 题解二 迭代

- 设置 dummy 节点简化操作，初始化 current 为 dummy,first 为第一个节点，second 为第二个节点.
- 进行节点交换
  ```js
  first.next = second.next;
  second.next = first;
  current.next = second;
  ```
- 移动 current 节点两格
- 重复

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
var swapPairs = function (head) {
  const dummyhead = new ListNode(0, head);

  let current = dummyhead;

  while (current.next !== null && current.next.next !== null) {
    const first = current.next;
    const second = current.next.next;

    first.next = second.next;
    second.next = first;
    current.next = second;

    current = current.next.next;
  }

  return dummyhead.next;
};
```

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
