import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-my-employes',
  templateUrl: './my-employes.component.html',
  styleUrls: ['./my-employes.component.css']
})
export class MyEmployesComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,private route:ActivatedRoute,private _auth:AuthService,private modalService: ModalService) { }

    public param!:Params;
    jobsdata:any=[]
    userdata:any=[]
    rattingdata:any=[]
    dummy:any={}
    uid!:string
    shows=false;


    currentRate = 0;
    currentRate1 = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['jobid'];
      //this.param.toString()
    });
    this.getemployes()
  }

  //*ngIf="job.vacancy>0"

  getemployes(){
    this.job.getemployes(this.param.toString()).subscribe(
      res=>{
        this.jobsdata  =res
        console.log(this.jobsdata)
        
      }//601cecf003451a2b0c7b934a
    )//6014f19927a2fb412cd85dd8
  }



  showDetails(id: string,email:string) {

    this.shows = !this.shows;
    this.job.UsernamebyEmail(email).subscribe(
      res=>{
          this.userdata=res;
          
          //console.log(this.userdata);

          this.job.getratting().subscribe(
            res=>{
              this.rattingdata = res;
            //  console.log(this.rattingdata)
              for(let i of this.rattingdata){

                if(i.email == email){
                 // console.log(i.RattingAvg)
                  var num = i.RattingAvg
                  if(num==null){
                    this.currentRate1=0
                  }else{
                    this.currentRate1 = num.toFixed(1)
                  }
                  
                  this.currentRate = Math.ceil(i.RattingAvg)
                 // console.log(this.currentRate1)
                }
                
              }
            }
          )
      })

    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  submitratting(email:string){

    
    this.job.getId().subscribe(
      res => {///this.userid=res.toString(),
              //console.log(res)
              this.dummy= res;
        
              //console.log(this.dummy);
              this.uid=this.dummy.email;
             // console.log(this.uid)

             // console.log(email,this.currentRate,this.uid)

              this.job.givratting(email,this.currentRate,this.uid).subscribe(
                res=>{

                  this._router.navigate(['/MyEmployes', this.param.toString()])

                }
              )
            }
    )
  }


}
