import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Pipe, PipeTransform } from '@angular/core';
import { JobService } from '../services/job.service';
import { ModalService } from '../_modal';

declare var require: any
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  public myArr: string[] =[];

  constructor(private _auth: AuthService,
    private _router: Router,private  http:HttpClient,private job: JobService,private modalService: ModalService) { }

  

// public userdata!: Ijobseeker [];
    userdata:any=[]   
    usertype!:String ;

    ujobseeker = false;
    uemployer = false;
    admin = false;

    shoow=false;
    user :any=[]
    uid!:string ;

    dummy:any=[]
    dummy1:any=[]
    dummyemail:any=[]
    jobsdata:any=[]
    onejobsdata:any=[]
    rattingdata:any=[]

    // emailarray!: Array<string>;
     emailarray:any= []

  currentRate = 0;
  currentRate1 = 0;

  ecurrentRate :any= []
  ecurrentRate1 :any= []

  title = 'fileUpload';
  images!: string | Blob;

  imagename = ""
  videoname= ""

  ngOnInit(): void {
   this.getdetails()
  }

  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.patch<any>('http://localhost:3000/user/image', formData).subscribe(
      (res) => {
        console.log(res),
        this.getdetails
      },
      (err) => console.log(err)
    );
  }

  onSubmitVideo(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.patch<any>('http://localhost:3000/user/video', formData).subscribe(
      (res) => {
        console.log(res),
        this.getdetails
      },
      (err) => console.log(err)
    );
  }

  getdetails(){
  
    this._auth.getUser().subscribe(

      res => {
       // console.log(res);
        this.userdata= res;
        
      //  console.log(this.userdata);
        this.usertype=this.userdata.usertype;
        this.uid= this.userdata._id;
        this.imagename = this.userdata.image;
        this.videoname = this.userdata.video;
       //console.log(this.videoname)

        if(this.usertype=="1"){
          this.ujobseeker = true;
        }else if(this.usertype == "2"){
          this.uemployer = true;
        }else if(this.usertype == "0"){
          this.admin = true;
        }
       /* <video width="400" height="200" controls>
        <source src="../../assets/video/{{videoname}}">
    </video>*/
        for(let key in this.userdata) {   //Pay attention to the 'in'
            this.myArr.push(this.userdata[key]);
            //console.log(this.userdata[key])

            ///dataKeys.push(key);
            
        }
        //console.log(this.myArr)
       // console.log(this.myArr[5])
      },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/home'])
            }
          }
        })

      /*  for(let key in this.userdata) {   //Pay attention to the 'in'
            this.myArr.push(this.userdata[key]);
            console.log(this.userdata[key])

            ///dataKeys.push(key);
        }*/
       // console.log(this.myArr.values)

  }


  deleteuser(){
    var t = confirm("are you sure??");
    if(t==true){
    this.delete(this.myArr[0])
    }
  }
  delete(id:string){
    return this._auth.deleteUser(id).subscribe((response: any) => {
      console.log(response.data);
      //navigate to /lists/response._id
     // this.getuser();
     this._auth.logout();
     this._router.navigate(['/home'])
    });
  }

  /*show(){
    console.log(this.shoow)
    this.shoow = !this.shoow
    console.log(this.shoow)
  }*/

  MyJobs(id: string){

   // console.log(this.myArr[9])
   this.job.getjobs(this.myArr[9]).subscribe(
    res=>{
      this.dummy = res

      this.jobsdata = this.dummy.jobid
      this.rattingdata = this.dummy.Ratting

      for(let i in this.rattingdata){
        this.emailarray.push(this.rattingdata[i].id)
        console.log(this.emailarray)

        this.job.getratting().subscribe(
          res=>{
            this.dummyemail = res;
          //  console.log(this.rattingdata)
            for(let j of this.dummyemail){

              if(j.email == this.rattingdata[i].id){
                //console.log(j.email+"" +this.rattingdata[i].id)
                var numm = j.RattingAvg
                if(numm==null){
                  this.ecurrentRate1.push(0)
                }else{
                  this.ecurrentRate1.push(numm.toFixed(1))  
                }
                
                this.ecurrentRate.push(Math.ceil(j.RattingAvg))  
               // console.log(this.currentRate1)
              }

              
              
            }
          }
        )

      }

        //console.log(this.rattingdata.id)
        this.job.getratting().subscribe(
          res=>{
            this.dummy1 = res;
          //  console.log(this.rattingdata)
            for(let i of this.dummy1){

              if(i.email == this.myArr[9]){
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
        
      
      
    },err=>{
      console.log(err)
    }
  )

  this.modalService.open(id);

  }

  submitratting(i:number){

    console.log(this.emailarray[i],this.ecurrentRate[i],this.myArr[9])


    this.job.givratting(this.emailarray[i],this.ecurrentRate[i],this.myArr[9]).subscribe(
      res=>{

        

        this.getdetails()

      }
    )
  }

  GetJobs(id: string,jobid:string){

    this.job.getOnejobs(jobid).subscribe(
      res=>{
        this.onejobsdata =res
      }
    )
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getOneResume(){
    this.shoow = !this.shoow
    this.job.getResumes(this.uid).subscribe(
      res => {
     //   console.log(res);
        this.user[0]=res;
      //  console.log(this.user[0])
        console.log(this.user[0][0].Name);
       // this.generatePDF()
      },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/home'])
            }
          }
        }
    )

  }


  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        
        {
          text: `${this.user[0][0].Name}`,
          fontSize: 20,
          alignment: 'left',
          color: '#00000',
          underline:true,
          bold:true,
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              
              { text:`${this.user[0][0].CurrentCity},${this.user[0][0].Current2ndCity}`,
                alignment: 'right' },
              { text: this.user[0][0].email,
                alignment: 'right' },
              { text: this.user[0][0].contactNo ,
                alignment: 'right'},
              {
                  text: `Date: ${new Date().toLocaleString()}\n\n`,
                  alignment: 'right'
                }
            ],
          ]
        },





        
        {
          ul: [
            [
              
              {
                text:`Graduation Details`,
                bold:true,
                fontSize:13
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Degree', bold: true ,alignment:'center'}, {text:`${this.user[0][0].Degree}`,alignment:'center'}],
                    [ { text: 'College', bold: true ,alignment:'center'}, {text:`${this.user[0][0].College}`,alignment:'center'}],
                    [{ text: 'Duration', bold: true,alignment:'center' }, {text:`${this.user[0][0].Startyear} - ${this.user[0][0].Endyear}\n `,alignment:'center'}]
                  ]
                }
              },
              {
                text:`\n`,
                bold:true
              },


              {
                text:`Senior Secondary (XII),${this.user[0][0].StreamMatriculation}`,
                bold:true,
                fontSize:13
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Year of Completion', bold: true ,alignment:'center'}, {text:`${this.user[0][0].YearOfCompletionMatriculation}`,alignment:'center'}],
                    [ { text: 'Stream', bold: true ,alignment:'center'}, {text:`${this.user[0][0].StreamMatriculation}`,alignment:'center'}],
                    [{ text: 'Board', bold: true,alignment:'center' }, {text:`${this.user[0][0].BoardMatriculation}`,alignment:'center'}],
                    [{ text: 'Performance', bold: true,alignment:'center' }, {text:`${this.user[0][0].PerformanceMatriculation}`,alignment:'center'}],
                    [{ text: '`Name of the School', bold: true,alignment:'center' }, {text:`${this.user[0][0].SchoolNameMatriculation}`,alignment:'center'}]
                  ]
                }
              },
              {
                text:`\n`,
                bold:true
              },





              {
                text:`Secondary (X)`,
                bold:true,
                fontSize:13
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Year of Completion', bold: true ,alignment:'center'}, {text:`${this.user[0][0].YearOfCompletionItermediate}`,alignment:'center'}],
                    [{ text: 'Board', bold: true,alignment:'center' }, {text:`${this.user[0][0].BoardItermediate}`,alignment:'center'}],
                    [{ text: 'Performance', bold: true,alignment:'center' }, {text:`${this.user[0][0].PerformanceItermediate}`,alignment:'center'}],
                    [{ text: '`Name of the School', bold: true,alignment:'center' }, {text:`${this.user[0][0].SchoolNameItermediate}`,alignment:'center'}]
                  ]
                }
              },
              {
                text:`\n\n`,
                bold:true
              }
            ],
          ]
        },





        {
          columns: [
            [
              {
                text:'Job details\n',
                bold:true,
                fontsize:16
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Profile', bold: true ,alignment:'center'}, {text:`${this.user[0][0].Profile}`,alignment:'center'}],
                    [{ text: 'Organization', bold: true,alignment:'center' }, {text:`${this.user[0][0].Organization}`,alignment:'center'}],
                    [{ text: 'Location', bold: true,alignment:'center' }, {text:`${this.user[0][0].Location}`,alignment:'center'}],
                    [{ text: 'Start date', bold: true,alignment:'center' }, {text:`${this.user[0][0].Startdate}`,alignment:'center'}],
                    [{ text: 'End date', bold: true,alignment:'center' }, {text:`${this.user[0][0].Enddate}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user[0][0].Description}`,alignment:'center'}]
                  ]
                }
              },
              {
                text:`\n\n`,
                bold:true
              }
            ],
            [
              {
                text:'Internship details\n',
                bold:true,
                fontsize:16
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Profile', bold: true ,alignment:'center'}, {text:`${this.user[0][0].iProfile}`,alignment:'center'}],
                    [{ text: 'Organization', bold: true,alignment:'center' }, {text:`${this.user[0][0].iOrganization}`,alignment:'center'}],
                    [{ text: 'Location', bold: true,alignment:'center' }, {text:`${this.user[0][0].iLocation}`,alignment:'center'}],
                    [{ text: 'Start date', bold: true,alignment:'center' }, {text:`${this.user[0][0].iStartdate}`,alignment:'center'}],
                    [{ text: 'End date', bold: true,alignment:'center' }, {text:`${this.user[0][0].iEnddate}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user[0][0].iDescription}`,alignment:'center'}]
                  ]
                }
              },
              {
                text:`\n\n`,
                bold:true
              }
            ]

          ]
        },{
          columns: [
            [
              {
                text:'Project details\n',
                bold:true,
                fontsize:16
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Title', bold: true ,alignment:'center'}, {text:`${this.user[0][0].Title}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user[0][0].pDescription}`,alignment:'center'}],
                    [{ text: 'Start month', bold: true,alignment:'center' }, {text:`${this.user[0][0].Startmonth}`,alignment:'center'}],
                    [{ text: 'End month', bold: true,alignment:'center' }, {text:`${this.user[0][0].Endmonth}`,alignment:'center'}],
                    [{ text: 'Link', bold: true,alignment:'center' }, {text:`${this.user[0][0].Projectlink}`,link:`${this.user[0][0].Projectlink}`,alignment:'center'}]
                  ]
                }
              }
            ],
            [
              {
                text:'Skills\n',
                bold:true,
                fontsize:16
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Skill 1 ', bold: true ,alignment:'center'}, {text:`${this.user[0][0].level1}`,alignment:'center'}],
                    [{ text: 'Skill 2', bold: true,alignment:'center' }, {text:`${this.user[0][0].level2}`,alignment:'center'}],
                    [{ text: 'Skill 3', bold: true,alignment:'center' }, {text:`${this.user[0][0].level3}`,alignment:'center'}]
                  ]
                }
              }
            ]

          ]
        }

      ],       
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };


    
    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }
 
  }



  
}


