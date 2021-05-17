// GET DOM elements

// insert
const insert_btn = document.getElementById('insert-btn');
const insert_input = document.getElementById('insert-input');

// remove
const remove_btn = document.getElementById('remove-btn');
const remove_input = document.getElementById('remove-input');

// tours
const tours_btn = document.getElementById('tours-btn');
const menu_tours = document.getElementById('menu-tours');

const in_order_btn = document.getElementById('in-order');
const pre_order_btn = document.getElementById('pre-order');
const post_order_btn = document.getElementById('post-order');
    
// delete
const delete_btn = document.getElementById('delete-btn');

// error message
const error_msg = document.getElementById('error-msg');

// tree
const tree = document.getElementById('tree');

// BST
const bst = new BST();



// establish space beetween nodes 
const width = tree.getBoundingClientRect().width;

if(width > 1120)
    set_offset(90, 70, 60);

else if(width > 830) 
    set_offset(70, 60, 40);

else 
    set_offset(60, 40, 30);




// events

const empty_tree_msg = () => {

    error_msg.innerHTML = 'tree empty';
    setTimeout( () => error_msg.innerHTML= '' , 1000 * 5);
}

insert_btn.onclick = () => {

    if(!bst.Insert(Number(insert_input.value))) {

        error_msg.innerHTML = 'duplicate values, error when inserting';

        setTimeout( () => error_msg.innerHTML = '' , 1000 * 5);
    }
}

remove_btn.onclick = () => {

    if(bst.isEmpty()) {
        empty_tree_msg();
    } else if(!bst.Remove(Number(remove_input.value))) {
        error_msg.innerHTML = 'value not found';
        setTimeout( () => {
            error_msg.innerHTML= '';
        }, 1000 * 5);
    }
}


tours_btn.onclick = () => {

    if(window.getComputedStyle(menu_tours).getPropertyValue('display') == 'none') {
        menu_tours.style.display = 'block';
    } else {
        menu_tours.style.display = 'none';
    }
};


pre_order_btn.onclick = () => {
    if(bst.isEmpty()) {
        empty_tree_msg();
    } else {
        bst.Traverse(tours.PRE_ORDER, (item) => {
            console.log(item);
        });
    }
}


in_order_btn.onclick = () => {
    if(bst.isEmpty()) {
        empty_tree_msg();
    } else {
        bst.Traverse(tours.IN_ORDER, (item) => {
            console.log(item);
        });
    }
}


post_order_btn.onclick = () => {
    if(bst.isEmpty()) {
        empty_tree_msg();
    } else {
        bst.Traverse(tours.POST_ORDER, (item) => {
            console.log(item);
        });
    }
}

remove_btn.disabled = true;
delete_btn.disabled = true;
tours_btn.disabled = true;
