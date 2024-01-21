const {Component, mount, xml, useState} = owl
import { Task } from "./task.js";


class Root extends Component {
    static template = xml`
   
    <div>
        <div class="input-group-lg w-100 d-flex border rounded align-items-center">
            <input type="text" class="form-control-lg flex-fill border-0 me-1" placeholder="Add your new task "
             aria-label="Recipient's username" aria-describedby="button-addon2" t-model="state.name"/>
            <input type="color" class="form-control-lg form-control-color border-0 bg-white m-0"
            id="exampleColorInput" value="#563d7c" title="Choose your color" t-model="state.color"/>
            <button class="btn btn-primary" type="button" id="button-addon2" t-on-click="addTask"><i class="bu bi-plus-lg fs-3"></i ></button>
        </div>
    </div>


    <ul class="d-flex flex-column mt-5 p-0">
        <t t-foreach="tasks" t-as="task" t-key="task.id">

            <Task task="task" onDelete.bind="deleteTask" onEdit.bind="editTask"/>
        </t>
    </ul>

    `

    static components = {Task}
    setup(){
        this.state =useState({
            name:"",
            color:"#FFF000",
            isCompleted:false
        })
        this.tasks = useState([])
    
    }

    addTask(){
        if (!this.state.name){
            alert("Please provide name of task")
            return
        }
        const id = Math.random().toString().substring(2,12)
        this.tasks.push({
            id:id,
            name:this.state.name,
            color:this.state.color,
            isCompleted:false
        })
        let state =this.state
        this.state = {...state, name:"", color:"#FFF000"}

    }
    deleteTask(task) {
        const index = this.tasks.findIndex(t=>t.id == task.id)
        this.tasks.splice(index, 1)

    }

    editTask(task) {
        const index = this.tasks.findIndex(t=>t.id == task.id)
        this.tasks.splice(index, 1,task)

    }
    
}

mount(Root, document.getElementById("root"))