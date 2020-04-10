import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';

 


@Injectable()
 export class DataService{

    private messageService = new BehaviorSubject<any[]>([{name:"Test"}]);
    private rolesData = new BehaviorSubject<any[]>([]);
    private flagService=new BehaviorSubject<boolean>(false);
    private dashboardMenu=new BehaviorSubject<any[]>([]);
    currentObject = this.messageService.asObservable();
    rolesDataObject=this.rolesData.asObservable();
    flagObject=this.flagService.asObservable();
    dashboardmenu=this.dashboardMenu.asObservable();
    constructor(){}

    changeMessage(menu:any[]){
        this.messageService.next(menu);
    }

    setdata(data:any[]){
        this.rolesData.next(data);
    }

    getFlag(flag:boolean){
        this.flagService.next(flag);
    }

    setDashBoardMenu(data:any[]){
        this.dashboardMenu.next(data);
    }

 }