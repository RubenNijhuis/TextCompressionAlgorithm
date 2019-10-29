class Node {
    constructor(frequency, char, left, right) {
        this.frequency = frequency || null;
        this.char = char || null;
        this.left = left || null;
        this.right = right || null;
    }
}

module.exports = Node;
