// backend/src/utils/heap.js
class Heap {
    constructor(compareFunc = (a, b) => a.priority > b.priority) {
      this.heap = [];
      this.compare = compareFunc;
    }
  
    getParentIndex(i) {
      return Math.floor((i - 1) / 2);
    }
  
    getLeftChildIndex(i) {
      return 2 * i + 1;
    }
  
    getRightChildIndex(i) {
      return 2 * i + 2;
    }
  
    swap(i1, i2) {
      [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }
  
    insert(value) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return this;
    }
  
    siftUp(index) {
      let parent = this.getParentIndex(index);
      while (index > 0 && this.compare(this.heap[index], this.heap[parent])) {
        this.swap(index, parent);
        index = parent;
        parent = this.getParentIndex(index);
      }
    }
  
    extractTop() {
      if (this.heap.length === 0) return null;
      
      const top = this.heap[0];
      const last = this.heap.pop();
      
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.siftDown(0);
      }
      
      return top;
    }
  
    siftDown(index) {
      let largest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);
      const size = this.heap.length;
  
      if (left < size && this.compare(this.heap[left], this.heap[largest])) {
        largest = left;
      }
  
      if (right < size && this.compare(this.heap[right], this.heap[largest])) {
        largest = right;
      }
  
      if (largest !== index) {
        this.swap(index, largest);
        this.siftDown(largest);
      }
    }
  
    size() {
      return this.heap.length;
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
  
    peek() {
      return this.heap[0] || null;
    }
  }
  
  module.exports = Heap;