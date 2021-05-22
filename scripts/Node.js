let offsetX = 0;
let offsetY = 0;
let offsetX_center = 0;

const set_offset = (x, y, x_center) => {
    
    offsetX = x;
    offsetY = y;
    offsetX_center = x_center;
}

class Node {

    constructor(item, dirs) {

        this.item = item;
        this.right = this.left = null;
        this.elm = this.imgleft = this.imgright = null;
        this.dirs = dirs;
        this.pos = {};
        this.inicialieze_DOM();
    }
    
    inicialieze_DOM() {

        // create DOM elements
        this.elm = document.createElement('div');
        this.elm.classList.add('node');
        this.elm.textContent = this.item;
        this.elm.setAttribute('id', `node${this.item}`);

        this.imgleft = new Image();
        this.imgleft.src = './images/pointerL.png';
        this.imgright = new Image();
        this.imgright.src = './images/pointerR.png';

        this.imgleft.classList.add('pointer');
        this.imgright.classList.add('pointer');
        
        this.imgleft.setAttribute('id', `pointerL${this.item}`);
        this.imgright.setAttribute('id', `pointerR${this.item}`);
    }

    draw(pastnode=null) {

        // if is the root
        if(this.dirs.length === 0) {
            
            this.elm.style.animationName = 'enlarge'
            tree.appendChild(this.elm);
            setTimeout( () => this.elm.style.animationName = null , 1000);
            this.pos = this.elm.getBoundingClientRect();
            return;
        } 
        
        let pos = this.set_nodepos(pastnode);
        
        if(this.dirs[this.dirs.length - 1] === 'left') {

            this.set_imgpos('left', pos, pastnode)
                .then(() => {

                    pastnode.imgleft.style.animationName = 'enlarge'; 
                    tree.appendChild(pastnode.imgleft);
                    setTimeout( () => pastnode.imgleft.style.animationName = null , 1000);
                });

        } else {

            this.set_imgpos('right', pos, pastnode)
                .then(() => {

                    pastnode.imgright.style.animationName = "enlarge"; 
                    tree.appendChild(pastnode.imgright);
                    setTimeout( () => pastnode.imgright.style.animationName = null , 1000);
                });
        }

        this.elm.style.animationName = 'enlarge';
    
        setTimeout( () => {
            tree.appendChild(this.elm);
            this.pos = this.elm.getBoundingClientRect();
        }, 1000);

        setTimeout( () => this.elm.style.animationName = null , 2000);
    }

    set_nodepos(pastnode) {

        if(this.dirs[this.dirs.length - 1] === 'left') {

            if(this.dirs.includes('right'))
                return this.nodepos(-offsetX_center, offsetY, pastnode);

            else 
                return this.nodepos(-offsetX, offsetY, pastnode);
            
        } else {

            if(this.dirs.includes('left')) 
                return this.nodepos(offsetX_center, offsetY, pastnode);

            else 
                return this.nodepos(offsetX, offsetY, pastnode);
            
        } 
    }

    nodepos(_x, _y, pastnode) {

        let x = pastnode.pos.left + _x; 
        let y = pastnode.pos.top + _y; 
    
        this.elm.style.left = x + 'px';
        this.elm.style.top = y + 'px';

        return {
            x,
            y,
        };
    }

    set_imgpos(dir, pos, pastnode) {
        
        return new Promise((resolve) => {

            if(dir === 'left') {
                
                // angle between nodes

                // first point
                let x1 = pastnode.pos.left;
                let y1 = pastnode.pos.top + pastnode.pos.height - 10;
                
                // second point
                let x2 = pos.x + pastnode.pos.width;
                let y2 = pos.y;

                let leg_opposite_angle = Math.abs(y1 - y2);
                let hypotenuse = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                let angle = Math.round(Math.asin(leg_opposite_angle / hypotenuse) * 100) / 100;

                pastnode.imgleft.style.transform = `rotate(${-angle}rad)`;
                pastnode.imgleft.style.width = hypotenuse + 'px';

                // position pointer left
                pastnode.imgleft.style.left = x1 - hypotenuse + 'px';
                pastnode.imgleft.style.top = y1 + 'px';

            } else {
                
                // angle between nodes

                // first point
                let x1 = pastnode.pos.left + pastnode.pos.width;
                let y1 = pastnode.pos.top + pastnode.pos.height - 10;
                
                // second point
                let x2 = pos.x;
                let y2 = pos.y;

                let leg_opposite_angle = Math.abs(y1 - y2);
                let hypotenuse = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                let angle = Math.round(Math.asin(leg_opposite_angle / hypotenuse) * 100) / 100;

                pastnode.imgright.style.transform = `rotate(${angle}rad)`;
                pastnode.imgright.style.width = hypotenuse + 'px';

                // position pointer right
                pastnode.imgright.style.left = x1 + 'px';
                pastnode.imgright.style.top = y1 + 'px';
            }

            resolve();
        });
    }

    animate(dir="") {
        
        if(dir === 'left' && this.left) {

            this.elm.style.animationName = 'enlarge';
            setTimeout( () => this.elm.style.animationName = null , 1000);

            setTimeout( () => {
                this.imgleft.style.animationName = 'enlarge'; 
                setTimeout( () => this.imgleft.style.animationName = null , 1000);
            }, 1000);

        } else if(dir === 'right' && this.right) {

            this.elm.style.animationName = 'enlarge';
            setTimeout( () => this.elm.style.animationName = null , 1000);

            setTimeout( () => {
                this.imgright.style.animationName = 'enlarge'; 
                setTimeout( () => this.imgright.style.animationName = null , 1000);
            }, 1000);

        } else {

            this.elm.style.animationName = 'enlarge';
            setTimeout( () => this.elm.style.animationName = null , 1000);

            return 1000;
        }

        return 2000;
    }
}
