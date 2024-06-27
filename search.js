const binarySearch = (sortedArr, elemToFind) => {

    let left = 0;
    let right = sortedArr.length;


    while(left <= right) {
        const mid = Math.floor((left+right)/2);

        if (sortedArr[mid] === elemToFind) {
            return mid
        } else if (sortedArr[mid] < elemToFind) {
            left = mid
        } else {
            right = mid - 1
        }
    }

    return -1
}


const searchInsert = (nums, target) => {

    let left = 0;
    let right = nums.length;


    while(left < right) {
        const mid = Math.floor((left+right)/2);

        //  0 1 2 3 4 5 6
        // [4,5,6,7,0,1,2]

        if (nums[mid] < nums[right]) {
            right = mid
        } else {
            left = mid + 1
        }
    }

    nums[left];
}

const mergedSortArray = (arr1, arr2) => {
    const n = arr1.length
    const m = arr2.length
    const merged = new Array(arr1.length + arr2.length)

    let i = 0;
    let j = 0;
    let k = 0;

    while ( i< n && j<m) {
        let val;
        if(arr1[i] <= arr2[j]) {
            val = arr1[i++]
        } else {
            val = arr2[j++]
        }
        merged[k] = val
        k++
    }
    while(i<n){
        merged[k++] = arr1[i++];
    }
    while(j<m) {
        merged[k++] = arr2[j++]
    }

    return merged
};

const mergeInPlace = (nums, m, nums2, n) => {
    let i = m-1;
    let j = n-1;
    let k = m+n-1;

    while(j>=0){
        if(i>=0 && nums[i] > nums2[j]){
            nums[k--] = muns2[i--]
        } else {
            nums[k--] = nums2[j--]
        }
    }
}

class TreeNode {
    constructor(value) {
        this.value = value; // int/number
        this.left = null;  // ThreeNode
        this.right = null; // ThreeNode
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    add(value) {
        this.root = this.addRecursive(this.root, value);
    }

    addRecursive (currentNode, value) {
        if(currentNode === null) {
            return new TreeNode(value);
        }

        if (value < currentNode.value) {
            currentNode.left = this.addRecursive(currentNode.left = value)
        } else if (value > currentNode.value) {
            currentNode.right = this.addRecursive(currentNode.right = value)
        }
        return currentNode;
        
    }

    contains(value) {
        return this.containRecursive(this.root, value)
    };

    containRecursive(currentNode, value) {
        if (currentNode == null) {
            return false
        }

        if (currentNode < currentNode.value) {
            return this.containRecursive(currentNode.left, value)
        } else {
            return this.containRecursive(currentNode.right, value)
        }
    };
}

const kthSmallest = (root, k) => {
    const result = [];
    inorder(root, result)

    return[k-1]
}

const inorder = (node, result) => {
    if(node == null) {
        return
    }
    inorder(node.left, result)
    result.push(node.val)
    inorder(node.right, result)
}