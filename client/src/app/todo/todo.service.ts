import { Injectable } from '@angular/Core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService{
    constructor(private http : Http){
        //Do something
    }

    //Get A Task
    getTasks(){
        return this.http.get('api/todo')
                    .map(response => response.json());
    }


    //Add A Task
    addTask(task){
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        return this.http.post('api/todo', JSON.stringify(task), {headers : headers})
                    .map(response => response.json())
    }

    //Delete A Task
    removeTask(id){
        return this.http.delete('api/todo/'+id)
                    .map(response => response.json())
    }

    //Complete Task
    completeTask(task){
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        return this.http.put('api/todo/'+task._id, JSON.stringify(task), {headers : headers})
                        .map(response => response.json())
    }
}
