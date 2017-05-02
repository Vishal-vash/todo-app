import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()

export class TodoService{
    constructor(private http: Http){}

    addTask(task){
        var headers = new Headers();
        headers.append('content-type','application/json');
        return this.http.post('api/tasklist', JSON.stringify(task), {headers : headers})
                .map(response => response.json());
    }

    getTasks(){
        return this.http.get('api/tasklist')
                    .map(response => response.json());
    }

    removeTask(id){
        return this.http.delete('api/tasklist/'+id)
                    .map(response => response.json())
    }

    completeTask(task){
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        return this.http.put('api/tasklist/'+ task._id, JSON.stringify(task), {headers : headers})
                    .map(response => response.json())
    }
}