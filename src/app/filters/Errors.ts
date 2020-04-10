

export class Errors{
 private error:Map<number,string>;
 constructor(){
     this.error=new Map<number,string>();
     this.error.set(400,'Invalid Credetials : Please try again.');
     this.error.set(401,'Invalid Credetials : Please try again.');
     this.error.set(402,'Invalid Credetials : Please try again.');
     this.error.set(403,'Invalid request. FORBIDDEN');
     this.error.set(404,'Server is not running...');
     this.error.set(405,'Method not supported.');
    
 }

 public get(code:number):string{
     return this.error.get(code);
 }

     
}