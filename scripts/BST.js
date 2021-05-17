
// Enumeration to select a tour
const tours = {"PRE_ORDER": 0, "IN_ORDER": 1, "POST_ORDER": 2};
Object.freeze(tours);

let aux_dirs = [];
let aux_dirs_rem = [];

class BST { 
    
    constructor() {
        
        this.len = 0;
        this.root = null;
    }
    
    insert(node, item, pastnode=null) {

        if(!node) {

            node = new Node(item, [...aux_dirs]);
            node.draw(pastnode);
            aux_dirs = [];

        } else if(item < node.item) {

            aux_dirs.push('left');
            let time = node.animate('left');
            setTimeout( () => node.left = this.insert(node.left, item, node) , time);
            
        } else {

            aux_dirs.push('right');
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
    
            this.root = new Node(item, []);
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

    remove(node, item, pastnode=null) {
        
        if(!node) return null;

        if(item < node.item) {

            let time = node.animate('left');
            setTimeout( () => node.left = this.remove(node.left, item, node) , time);
        
        } else if(node.item < item) {
            
            let time = node.animate('right');
            setTimeout( () => node.right = this.remove(node.right, item, node), time);

        } else {
            
            // we used this tmp variable to save a possible leaf of a node
            let tmp = null;

            // if the node only has one leaf 
            if(!node.left) {
                
                tmp = node.right;

                node.remove('right', pastnode);

                node = node.right = node.left = null;
                return tmp;

            } else if (!node.right) {
                
                tmp = node.left;

                node.remove('left', pastnode);

                node = node.right = node.left = null;
                return tmp;
                
            // if the node has two leaves
            } else {

                // in this case we use the following algorithm to choose the correct substitute
                const tmp = this.minVal(node.right);
                
                let aux = node.item;
                node.item = tmp.item;
                tmp.item = aux.item;

                node.elm.textContent = node.item;
                tmp.elm.textContent = tmp.item;

                tmp.imgright = node.imgright;

                //no borra la imagen del puntero porque no estoy eliminando ese nodo si no el que se selecciono con el algoritmo 


                node.right = this.remove(node.right, node.item, node);
            }
        }
        
        return node;
    }
    
    minVal(node) {
        
        let current = node;
        
        while(current.left) current = current.left;
        
        return current;
    }
    
    Remove(item) {

        if(!this.root) return false;
        if(!this.Search(item)) return false;
        
        let res = Boolean(this.remove(this.root, item));
        
        --this.len;
    
        return res;
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

            let time = node.animate('left');
            this.pre_order(node.left, f);

            time = node.animate('right');
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
            pastnode.post_order(node.left, f);
            pastnode.post_order(node.right, f);
            f(node.item);
        }
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
                    pastnode.post_order(this.root, f);
                    break;
            }
        } 
    }

    isEmpty() {
        return this.len == 0;
    }
}
