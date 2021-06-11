# Leetcode82: 删除排序链表中的重复元素 II

存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中   没有重复出现   的数字。

返回同样按升序排列的结果链表。

### 示例

```
输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5]
```

```
输入：head = [1,1,1,2,3]
输出：[2,3]
```

## 题解 遍历

- 头节点可能会北删除，所以增加一个 dummy 节点方便操作

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

  const dummyhead = new ListNode(-101, head);

  let prev = dummyhead;
  let cur = head;

  while (cur.next) {
    let flag = false;
    // 如果cur节点的与下一个节点的val值相同，向前移动cur指针
    while (cur.next && cur.val === cur.next.val) {
      flag = true;
      cur = cur.next;
    }

    // 有重复元素需要删除重复节点，否则向前移动prev指针
    if (flag) {
      prev.next = cur.next;
    } else {
      prev = prev.next;
    }

    // 移动cur指针到下一个需要判断的节点
    if (cur.next) {
      cur = cur.next;
    }
  }

  return dummyhead.next;
};
```

### 复杂度分析

- 时间复杂度：O(n)，其中 n 是链表的节点数量。
- 空间复杂度：O(1)
