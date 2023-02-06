showtask();
let input = document.getElementById("input");
let btn = document.getElementById("btn");

btn.addEventListener("click", function(){
    val = input.value;
    if(val.trim()!=0){
        let storage = localStorage.getItem("Mytask");
        if(storage == null){
            obj = [];
        }
        else{
            obj = JSON.parse(storage);
        }
        obj.push({'task_name':val, 'completeStatus':false});
		// console.log(obj, 'Ashendra');
        localStorage.setItem("Mytask", JSON.stringify(obj));
        input.value = '';
    }
    showtask();
})

// showtask
function showtask(){
    let storage = localStorage.getItem("Mytask");
    if(storage == null){
        obj = [];
    }
    else{
        obj = JSON.parse(storage);
    }
    let html = '';
    let newList = document.getElementById("newList");
    obj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr draggable="true" ondragstart="start()" ondragover="dragover()" class="table-warning" >
                   
                 
                    ${taskCompleteValue}
                    
                    <td><button type="button" class="f1 text-success" onclick="completetask(${index})" id=${index}>Finish</button></td>
                    <td id="p1" class="d-none"><button type="button" class="text-secondary "  onclick="pauseitem(${index})">Pause</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger">Delete</button></td>
                    <td><button type="button" onclick="startitem(${index})" id="s1" class="text-primary" >start</button></td>
                     <td><button type="button" class="text-secondary d-none" id="p2" ></button></td>
                </tr>
               `;
    });
    newList.innerHTML = html;
}

function startitem(index){
document.getElementById("newList").rows[index].cells[5].innerText="started"
document.getElementById("newList").rows[index].cells[5].style.color="blue"
let abc= document.querySelectorAll("#p1")
abc[index].classList.remove("d-none");
console.log(abc);
console.log(document.querySelector("#p1"));
console.log(index);



// console.log();
}




function pauseitem(index){
    document.getElementById("newList").rows[index].cells[5].innerHTML="paused"
    document.getElementById("newList").rows[index].cells[5].style.color="red"
    console.log(document.getElementById("newList").rows[index ].cells[5].innerHTML.value);
    console.log(index);
}

// deleteitem   
function deleteitem(index){
    let storage = localStorage.getItem("Mytask");
    let obj = JSON.parse(storage);
    obj.splice(index, 1);
    localStorage.setItem("Mytask", JSON.stringify(obj));
    showtask();
}

//complete task
function completetask(index){

    document.getElementById("newList").rows[index].cells[5].innerHTML = "Task Completed"
    document.getElementById("newList").rows[index].cells[4].style.display="none"//pause
    document.getElementById("newList").rows[index].cells[2].style.display="none"//complete

} 

let newList = document.getElementById("newList");
    newList.addEventListener("click", function(e){
        
        let storage = localStorage.getItem("Mytask");
        let obj = JSON.parse(storage);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
        
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            
            
            for (keys in obj[mytargetid]) {
                if(keys == 'completeStatus' && obj[mytargetid][keys]==true){
                    obj[mytargetid].completeStatus = false;
                }else if(keys == 'completeStatus' && obj[mytargetid][keys]==false){
                    obj[mytargetid].completeStatus = true;
                }
              }
              
        localStorage.setItem("Mytask", JSON.stringify(obj));
        showtask();
    }
    })

    



// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let btn = document.getElementById("btn");
    let storage = localStorage.getItem("Mytask");
    let obj = JSON.parse(storage);
    if(storage == null){
        obj = [];
    }
    else{
        obj = JSON.parse(storage);
        obj = [];
    }
    savetaskbtn.style.display="none";
    btn.style.display="block";
    localStorage.setItem("Mytask", JSON.stringify(obj));
    showtask();

})



var row;
function start() {
    row = event.target;
}
function dragover() {
    var e= event;
    e.preventDefault();

    let children = Array.from(e.target.parentNode.parentNode.children);
    if (children.indexOf(e.target.parentNode) > children.indexOf(row))
        e.target.parentNode.after(row);
        
    else
        e.target.parentNode.before(row);
}