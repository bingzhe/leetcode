# Leetcode1606: 找到处理最多请求的服务器

你有 k 个服务器，编号为 0 到 k-1 ，它们可以同时处理多个请求组。每个服务器有无穷的计算能力但是 不能同时处理超过一个请求 。请求分配到服务器的规则如下：

* 第 i （序号从 0 开始）个请求到达。
* 如果所有服务器都已被占据，那么该请求被舍弃（完全不处理）。
* 如果第 (i % k) 个服务器空闲，那么对应服务器会处理该请求。
* 否则，将请求安排给下一个空闲的服务器（服务器构成一个环，必要的话可能从第 0 个服务器开始继续找下一个空闲的服务器）。比方说，如果第 i 个服务器在忙，那么会查看第 (i+1) 个服务器，第 (i+2) 个服务器等等。


给你一个 严格递增 的正整数数组 arrival ，表示第 i 个任务的到达时间，和另一个数组 load ，其中 load[i] 表示第 i 个请求的工作量（也就是服务器完成它所需要的时间）。你的任务是找到 最繁忙的服务器 。最繁忙定义为一个服务器处理的请求数是所有服务器里最多的。

请你返回包含所有 最繁忙服务器 序号的列表，你可以以任意顺序返回这个列表。

### 示例

```
输入：k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3] 
输出：[1] 
解释：
所有服务器一开始都是空闲的。
前 3 个请求分别由前 3 台服务器依次处理。
请求 3 进来的时候，服务器 0 被占据，所以它呗安排到下一台空闲的服务器，也就是服务器 1 。
请求 4 进来的时候，由于所有服务器都被占据，该请求被舍弃。
服务器 0 和 2 分别都处理了一个请求，服务器 1 处理了两个请求。所以服务器 1 是最忙的服务器。

```

```
输入：k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
输出：[0]
解释：
前 3 个请求分别被前 3 个服务器处理。
请求 3 进来，由于服务器 0 空闲，它被服务器 0 处理。
服务器 0 处理了两个请求，服务器 1 和 2 分别处理了一个请求。所以服务器 0 是最忙的服务器。

```

```
输入：k = 3, arrival = [1,2,3], load = [10,12,11]
输出：[0,1,2]
解释：每个服务器分别处理了一个请求，所以它们都是最忙的服务器。
```

```
输入：k = 3, arrival = [1,2,3,4,8,9,10], load = [5,2,10,3,1,2,2]
输出：[1]
```

## 题解一

### 实现

```js
/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */

var busiestServers = function (k, arrival, load) {
  const used = new PriorityQueue(),
    available = new PriorityQueue((a, b) => a < b),
    cnts = new Array(k).fill(0);
  for (let i = 0; i < k; i++) available.offer(i);
  for (let i = 0; i < arrival.length; i++) {
    const arr = arrival[i],
      duration = load[i];
    while (used.size > 0 && used.peek()[0] <= arr) {
      const cur = used.poll();
      available.offer(i + ((((cur[1] - i) % k) + k) % k));
    }
    if (available.size > 0) {
      const idx = available.poll() % k;
      cnts[idx]++;
      used.offer([arr + duration, idx]);
    }
  }
  let m = 0,
    ans = new Array();
  for (let i = 0; i < k; i++) {
    if (cnts[i] > m) {
      m = cnts[i];
      ans = [i];
    } else if (cnts[i] == m) {
      ans.push(i);
    }
  }
  return ans;
};

class PriorityQueue {
  constructor(compare = (a, b) => a[0] < b[0]) {
    this.data = [];
    this.size = 0;
    this.compare = compare;
  }

  peek() {
    return this.size === 0 ? null : this.data[0];
  }

  offer(val) {
    this.data.push(val);
    this._shifUp(this.size++);
  }

  poll() {
    if (this.size === 0) {
      return null;
    }
    this._swap(0, --this.size);
    this._shifDown(0);
    return this.data.pop();
  }

  _parent(index) {
    return (index - 1) >> 1;
  }

  _child(index) {
    return (index << 1) + 1;
  }

  _shifDown(index) {
    while (this._child(index) < this.size) {
      let child = this._child(index);
      if (
        child + 1 < this.size &&
        this.compare(this.data[child + 1], this.data[child])
      ) {
        child = child + 1;
      }
      if (this.compare(this.data[index], this.data[child])) {
        break;
      }
      this._swap(index, child);
      index = child;
    }
  }

  _shifUp(index) {
    while (
      this._parent(index) >= 0 &&
      this.compare(this.data[index], this.data[this._parent(index)])
    ) {
      this._swap(index, this._parent(index));
      index = this._parent(index);
    }
  }

  _swap(a, b) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }
}

```