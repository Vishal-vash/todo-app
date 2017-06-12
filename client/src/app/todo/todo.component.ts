import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
    selector : 'todo-list',
    templateUrl : './todo.component.html',
    styleUrls : ['./todo.component.css'],
    providers : [TodoService]
})

export class TodoComponent implements OnInit{
    //Variables
    tasks : Array<Object> = [];
    task : Object = {
        taskName : '',
        isCompleted : false
    }
    tasksDone : number = 0;
    showAddTask : boolean = false;
    innerHeight : number = 0;
    inputFocus : boolean = false;
    constructor(private todoService : TodoService){
        //do something
        this.innerHeight = window.outerHeight - 125;
    }

    getTasks(){
        this.todoService.getTasks().subscribe(tasks => (this.tasks = tasks, this.tasksDone = 0, tasks.map((v,i) => v['isCompleted'] ? this.tasksDone += 1 : this.tasksDone)));
    }

    addTask(){
        this.todoService.addTask(this.task).subscribe(task => this.tasks.push(task));
        this.getTasks();
        this.task = {
            taskName : '',
            isCompleted : false
        }
        this.showAddTask = false;
        this.inputFocus = false;
    }

    removeTask(id){
        this.todoService.removeTask(id).subscribe(task => this.tasks.filter((v,i) => v["_id"] != id));
        this.getTasks();
    }

    completeTask(task){
        var _task = {
            _id : task._id,
            taskName : task.taskName,
            isCompleted : !task.isCompleted
        }
       // this.todoService.completeTask(_task).subscribe(data => (data.isCompleted) ? (this.tasksDone -= 1) : (this.tasksDone += 1));
        this.todoService.completeTask(_task).subscribe(data => console.log("Working"));
        this.getTasks();
    }

    ngOnInit(){
        this.getTasks();
    }
}
