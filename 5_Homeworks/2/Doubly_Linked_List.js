class Node {
  constructor(value, prev, next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.firstNode = null;
    this.length = 0;
  }

  isEmpty() {
    return this.head === null;
  }

  prepend(value) {
    this.head = new Node(value, null, this.head);
    this.firstNode = this.head;
    this.length += 1;
  }

  append(value) {
    while (this.head.next) {
      this.head = this.head.next;
    }
    this.head.next = new Node(value, this.head, null);
    this.head = this.firstNode;
    this.length += 1;
  }

  setHead(index) {
    for (let i = 0; i < index; i++) {
      this.head = this.head.next;
    }
    this.firstNode = this.head;
    this.head.prev = null;
  }

  access(index) {
    for (let i = 0; i < index; i++) {
      this.head = this.head.next;
    }
    this.head = this.firstNode;
    return this.head.value;
  }

  insert(index, value) {
    if (index === 0) {
      this.prepend(value);
      return;
    }
    for (let i = 0; i < index; i++) {
      this.head = this.head.next;
    }
    const nextNode = this.head;
    const newNode = new Node(value, nextNode.prev, nextNode);
    nextNode.prev = newNode;
    this.head = newNode.prev;
    this.head.next = newNode;
    this.head = this.firstNode;
    this.length += 1;
  }

  remove(index) {
    if (index === 0) {
      this.firstNode = this.head.next;
    }
    for (let i = 0; i < index; i++) {
      this.head = this.head.next;
    }
    const removeNode = this.head;
    removeNode.prev.next = removeNode.next;
    if (removeNode.next) {
      removeNode.next.prev = removeNode.prev;
    }
    this.head = this.firstNode;
    this.length -= 1;
  }

  print() {
    const array = [];
    while (this.head) {
      array.push(this.head.value);
      this.head = this.head.next;
    }
    this.head = this.firstNode;
    console.log(array);
  }
}
