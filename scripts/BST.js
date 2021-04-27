
// Enumeration to select a tour
const tours = {"PRE_ORDER": 0, "IN_ORDER": 1, "POST_ORDER": 2};
Object.freeze(tours);

// Save some important data from a DOM object
const properties  = {
    pos: {},
    dirs: [],
    dir: '',
};

let offsetX = 0;
let offsetY = 0;
let offsetX_center = 0;
let offsetY_center = 0;

const set_offset = (x, y, x_center, y_center) => {
    
    offsetX = x;
    offsetY = y;
    offsetX_center = x_center;
    offsetY_center = y_center;
}

class Node {

    constructor(item) {
        this.item = item;
        this.right = this.left = null;
        this.elm = null;
    }
    
    inicialieze() {

        this.elm = document.createElement('div');
        this.elm.className = 'node';
        this.elm.textContent = this.item;
        
        console.log(properties);

        if(properties.dir === 'left') {

            if(properties.dirs.includes('right')) {

                let x = properties.pos.left - offsetX_center; 
                let y = properties.pos.top + offsetY; 

                this.elm.style.left = x + 'px';
                this.elm.style.top = y + 'px';
            } else {

                let x = properties.pos.left - offsetX; 
                let y = properties.pos.top + offsetY; 
                console.log(x,y);
    
                this.elm.style.left = x + 'px';
                this.elm.style.top = y + 'px';
            }

        } else if(properties.dir === 'right') {

            if(properties.dirs.includes('left')) {
                
                let x = properties.pos.left + offsetX_center; 
                let y = properties.pos.top + offsetY; 
                this.elm.style.left = x + 'px';
                this.elm.style.top = y + 'px';
            } else {
                
                let x = properties.pos.left + offsetX; 
                let y = properties.pos.top + offsetY;
                console.log(x,y);
    
                this.elm.style.left = x + 'px';
                this.elm.style.top = y + 'px';
            }
        } 

        properties.dirs = [];
    }
}


class BST { 
    
    constructor() {
        this.len = 0;
        this.root = null;
    }

    insert(node, item) {
        if(!node) {

            node = new Node(item);
            node.inicialieze();

            tree.appendChild(node.elm);
        } else if(item < node.item) {
            
            properties.pos = node.elm.getBoundingClientRect();
            properties.dir = 'left';
            properties.dirs.push('left');

            node.left = this.insert(node.left, item);
        } else {

            properties.pos = node.elm.getBoundingClientRect();
            properties.dir = 'right';
            properties.dirs.push('right');

            node.right = this.insert(node.right, item);
        } 

        return node;
    }

    search(node, item) {
        if(!node) return null;
        else if(node.item === item) return node;
        else if(item < node.item) return this.search(node.left, item);
        else return this.search(node.right, item);
    }

    remove(node, item) {
        if(!node) return null;
        else if(item < node.item) node.left = this.remove(node.left, item);
        else if(node.item < item) node.right = this.remove(node.right, item);
        else {

            // we used this tmp variable to save a possible leaf of a node
            let tmp = null;

            // if the node only has one leaf 
            if(!node.left) {
                tmp = node.right;
                node = null;
                return tmp;

            } else if (!node.right) {
                tmp = node.left;
                node = null;
                return tmp;
            } 
            
            // if the node has two leaves
            else {

                // in this case we use the following algorithm to choose the correct substitute
                tmp = this.minVal(node.right);

                node.item = tmp.item;
                node.right = this.remove(node.right, tmp.item);
            }

            --this.len;
        }

        return node;
    }

    minVal(node) {
        let current = node;

        while(current.left) current = current.left;

        return current;
    }

    clear_all(node) {
        if(!node) return;

        this.clear_all(node.left);
        this.clear_all(node.right);

        node = null;
    }

    pre_order(node, f) {
        if(node) {
            f(node.item);
            this.pre_order(node.left, f);
            this.pre_order(node.right, f);
        }
    }

    in_order(node, f) {
        if(node) {
            this.in_order(node.left, f);
            f(node.item);
            this.in_order(node.right, f);
        }
    }

    post_order(node, f) {
        if(node) {
            this.post_order(node.left, f);
            this.post_order(node.right, f);
            f(node.item);
        }
    }

    Insert(item) {       

        if(this.Search(item)) 
            return null;
        
        let res = null;

        if(!this.root) {

            this.root = new Node(item);
            this.root.inicialieze();

            tree.appendChild(this.root.elm);
            res = this.root;
        } else {

            properties.rootdir = (this.root.item < item) ? 'right' : 'left';
            res = this.insert(this.root, item);
        }

        ++this.len;
        return res; 
    }

    Search(item) {
        if(!this.root) return false;
        return Boolean(this.search(this.root, item));
    }

    Remove(item) {

        if(!this.Search(item)) {
            return null;
        }

        if(!this.root) return false;
        let res = this.remove(this.root, item);
        --this.len;
    
        return res;
    }

    Delete() {
        if(!this.root) {
            console.log("No hay ningun elemento para eliminar");
            return;
        }

        this.clear_all(this.root);
        this.len = 0;
        this.root = null; 
    }

    Traverse(tour, f) {
        if(this.root) {
            
            console.log(`El valor de root es: ${Boolean(this.root)} y contiene el item: ${this.root.item}`);

            switch(tour) {
                case tours.PRE_ORDER:
                    console.log("preorder");
                    this.pre_order(this.root, f);
                    break;
                case tours.IN_ORDER:
                    console.log("inorder");
                    this.in_order(this.root, f);
                    break;
                case tours.POST_ORDER:
                    console.log("postorder");
                    this.post_order(this.root, f);
                    break;
            }
        } 
    }

    isEmpty() {
        return this.len == 0;
    }
}