// backend/src/utils/trie.js
class TrieNode {
    constructor() {
      this.children = {};
      this.snippetIds = new Set();
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word, snippetId) {
      let current = this.root;
      
      // Convert to lowercase for case-insensitive search
      word = word.toLowerCase();
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!current.children[char]) {
          current.children[char] = new TrieNode();
        }
        current = current.children[char];
        // Add snippet ID at each level for prefix search
        current.snippetIds.add(snippetId);
      }
      
      current.isEndOfWord = true;
    }
  
    search(word) {
      let current = this.root;
      
      // Convert to lowercase for case-insensitive search
      word = word.toLowerCase();
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!current.children[char]) {
          return new Set(); // No matches found
        }
        current = current.children[char];
      }
      
      return current.snippetIds;
    }
  
    delete(word, snippetId) {
      this._deleteHelper(this.root, word.toLowerCase(), 0, snippetId);
    }
  
    _deleteHelper(node, word, index, snippetId) {
      if (index === word.length) {
        if (node.isEndOfWord) {
          node.snippetIds.delete(snippetId);
          return node.snippetIds.size === 0;
        }
        return false;
      }
  
      const char = word[index];
      if (!node.children[char]) {
        return false;
      }
  
      const shouldDeleteChild = this._deleteHelper(
        node.children[char], 
        word, 
        index + 1, 
        snippetId
      );
  
      // Remove the snippet ID from current node's set
      node.snippetIds.delete(snippetId);
  
      // If child should be deleted and current node has no other children
      if (shouldDeleteChild && Object.keys(node.children[char].children).length === 0) {
        delete node.children[char];
      }
  
      return node.snippetIds.size === 0 && Object.keys(node.children).length === 0;
    }
  }
  
  module.exports = Trie;