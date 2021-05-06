
// Enumeration to select a tour
const tours = {"PRE_ORDER": 0, "IN_ORDER": 1, "POST_ORDER": 2};
Object.freeze(tours);

// Save some important data from a DOM object
const properties  = {
    pos: {},
    dirs: [],
};

class BST { 
    
    constructor() {
        
        this.len = 0;
        this.root = null;
    }
    
    insert(node, item, pastnode=null) {

        if(!node) {

            node = new Node(item);
            node.draw(pastnode);

        } else if(item < node.item) {
            
            properties.pos = node.elm.getBoundingClientRect();
            properties.dirs.push('left');

            let time = node.animate('left');

            setTimeout( () => node.left = this.insert(node.left, item, node) , time);
            
        } else {
            
            properties.pos = node.elm.getBoundingClientRect();
            properties.dirs.push('right');
            
            let time = node.animate('right');

            setTimeout( () => node.right = this.insert(node.right, item, node) , time);
        } 
        
        return node;
    }
    
    Insert(item) {       
    
        // Do not want duplicates
        if(this.Search(item)) return false;
        
        let res = false;
    
        if(!this.root) {
    
            this.root = new Node(item);
    
            this.root.draw();
    
            res = Boolean(this.root);

        } else {
    
            res = Boolean(this.insert(this.root, item));
        }
    
        ++this.len;
    
        return res; 
    }

    search(node, item) {
        
        if(!node) 
            return null;
        
        if(node.item === item) 
            return node;

        else if(item < node.item)
            return this.search(node.left, item);

        else
            return this.search(node.right, item);

    }
    
    Search(item) {

        if(!this.root) return false;
        return Boolean(this.search(this.root, item));
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
