# Leetcode142: 环形链表 II

给定一个链表，返回链表开始入环的第一个节点。  如果链表无环，则返回  null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

说明：不允许修改给定的链表。

进阶：你是否可以使用 O(1) 空间解决此题？

### 示例

```
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点
```

## 题解一 哈希表

### 实现

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  const set = new Set();

  while (head) {
    if (set.has(head)) {
      return head;
    }

    set.add(head);
    head = head.next;
  }

  return null;
};
```

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)

## 题解二 快慢指针

- 设两个指针 fast, slow 指向链表头部 head,其中 fast 每轮走两步，slow 每轮走一步。
  - fast 如果走到了链表末端，说明无环，返回 null
  - 有环的时候，fast 指针一定会追上 slow 指针，当 fast===slow 时候，两个指针第一次相遇，此时 fast,slow 走过的步数关系如下
    - 设链表共有 a+b 个节点，其中 链表头部到链表入口 有 a 个节点（不计链表入口节点）， 链表环 有 b 个节点（这里需要注意，a 和 b 是未知数）；设两指针分别走了 f，s 步，
      1. f = 2s；（fast 每轮走 2 步）
      2. f = s + nb；（双指针都走过 aa 步，然后在环内绕圈直到重合，重合时 fast 比 slow 多走 环的长度整数倍）
      3. 由上面两个可以得出 s=nb,f=2nb
- 如果让指针从链表头部一直向前走并统计步数 k，那么所有 走到链表入口节点时的步数 是：k=a+nb（先走 a 步到入口节点，之后每绕 1 圈环（ b 步）都会再次到入口节点）。
  - slow 已经走了 nb 步，所以只需要再让 slow 走 a 步停下，就到了环的入口。
  - 将 fast 值向 head,slow 和 fast 同时每轮向前走 1 步；
  - 第二次相遇的时候，f 走了 a 步，slow 走了 a+nb 步，指向了链表环入口
- 放回 fast 指针指向的节点

### 实现

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (head === null || head.next === null) {
    return null;
  }

  let slow = head;
  let fast = head;

  while (true) {
    if (fast === null || fast.next === null) {
      return null;
    }

    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) break;
  }

  fast = head;

  while (slow !== fast) {
    fast = fast.next;
    slow = slow.next;
  }

  return fast;
};
```

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
