import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';

@Component({
    selector : "todolist",
    templateUrl : "./todo.component.html",
    styleUrls : ["./todo.component.css"],
    providers : [TodoService]
})

export class TodoComponent implements OnInit{
    tasks : Array<Object> = [];
    showAddTaskForm : Boolean = false;
    task = {
        completed : false,
        name : ''
    }
    constructor(private todoService : TodoService){
        //do something
    }

    getTasks(){
        this.todoService.getTasks().subscribe(data => this.tasks = data);
    }

    addTask(){
        this.todoService.addTask(this.task).subscribe(data => this.tasks.push(data));
        this.getTasks();
        this.showAddTaskForm = !this.showAddTaskForm;
        this.task = null;
    }

    removeTask(id){
        this.todoService.removeTask(id)
                .subscribe(data => this.tasks.filter((v,i) => v["_id"] != id));
        this.getTasks();
    }

    completeTask(task){
        var _task = {
            _id : task._id,
            name : task.name,
            completed : !task.completed
        }
        this.todoService.completeTask(_task)
                .subscribe(data => console.log("Done Sucessfully"));
        this.getTasks();
    }

    ngOnInit(){
        this.getTasks();
    }

}
