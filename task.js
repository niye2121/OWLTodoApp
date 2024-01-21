const {Component, mount, xml, useState} = owl


export class Task extends Component {
  static template = xml`
  <li t-attf-style="background-color:#{state.color}" 
      class="d-flex align-item-center justify-content-between border p-3 mb-2 rounded">
  
          <div t-if="state.isEditing" class="d-flex align-items-center flex-grow-1 me-2">
              <input type="text" class="form-control me-2" t-model="state.name"/>
              <input type="color" style="width:60px" class="form-control-lg form-control-color border-0 bg-white m-0"
              id="color" title="Choose your color" t-model="state.color"/>
          </div>
          <div t-if="!state.isEditing" class="form-check form-switch fs-5 ">
  
              <input class="form-check-input" type="checkbox" value="" 
              t-att-checked="state.isCompleted" t-att-id="state.id" t-on-click="toggleTask"  t-model="state.isCompleted"/>
  
              <label class="form-check-label" t-att-for="state.id" 
              t-attf-class="#{state.isCompleted ? 'text-decoration-line-through':''}">
      
                  <t t-esc="state.name"/>
              </label>
          </div>
          <div>
              <button t-if="!state.isEditing" class="btn btn-primary me-2" t-on-click="editTask"><i class="bi bi-pencil" > </i></button>
              <button t-if="state.isEditing" class="btn btn-primary me-2" t-on-click="saveTask"><i class="bi bi-check-lg "> </i></button>
              <button class="btn btn-danger" t-on-click="deleteTask"><i class="bi bi-trash "> </i></button>
          </div>
      </li>
  `

  static props = ["task", "onDelete","onEdit"]

    setup(){
        this.state = useState({
            isEditing:false,
            id: this.props.task.id,
            name: this.props.task.name,
            color: this.props.task.color,
            isCompleted: this.props.task.isCompleted
        })
    }

    toggleTask(){
        this.props.task.isCompleted = !this.props.task.isCompleted
    }
    deleteTask(){
        this.props.onDelete(this.props.task)
    }
    editTask(){
        this.state.isEditing = true
    }
    saveTask(){
        this.state.isEditing = false
        this.props.onEdit(this.state)
    }
}