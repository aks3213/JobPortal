import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { ModalService } from '../_modal';
declare var require: any
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css']
})
export class ViewNotificationComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router,private route:ActivatedRoute,private modalService: ModalService) { }

  dummy:any={}
  userdata:any=[]
  Accept:any={}
  type!: string;
  user:any=[]
  //userid!:String ;
  public param!:Params;

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['email'];
      //this.param.toString()
    });

    this.gethire()
  }

  ViewJob(id: string,iid:string){
    this.job.getOnejobs(iid).subscribe(
      res =>{

        this.dummy=res;
        console.log(this.dummy)
       //alert(JSON.stringify(this.dummy, null, 4));
      }
    )
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  viewResume(id:string){
    this.job.getResumes(id).subscribe(
      res => {
     //   console.log(res);
        this.user=res;
      //  console.log(this.user[0] )
      //  console.log(this.user[0][0].Name);
        this.generatePDF()
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

  gethire(){
    this.job.getApply(this.param.toString()).subscribe(
      res => {
              this.userdata= res; 
              console.log(this.userdata);
              this.type = this.userdata[0].type;
              console.log(this.type);
            },
        err => {
          if( err instanceof HttpErrorResponse ) {
           // if (err.status === 401) {
             console.log(err)
              //this._router.navigate(['/home'])
           // }
          }
        }
    )

  }

  accept(id:string,email:string,jemail:string,job:string){

    this.Accept._id = id;
    this.Accept.Answer = true
    this.Accept.email = email
    this.Accept.jemail = jemail
    this.Accept.job = job
    console.log(this.Accept)
    this.job.Accept(this.Accept).subscribe(
      res => {
              console.log(res),
              this._router.navigate(['/home'])
            },
        err => {
          console.log(err.error)
          if(err.error=="empty"){

            var t = confirm("No Vacancy");
        	  if(t==true){
              this._router.navigate(['/home']);
            }

          }else{
            var t = confirm("You already accepted one job!!");
            if(t==true){
              this._router.navigate(['/home']);
            }
          }
          
        }
    )
  }

  acceptApply(id:string,email:string,jemail:string,job:string){

    this.Accept._id = id;
    this.Accept.Answer = true
    this.Accept.email = email
    this.Accept.jemail = jemail
    this.Accept.job = job
    console.log(this.Accept)
    this.job.ApplyAccept(this.Accept).subscribe(
      res => {
              console.log(res),
              this._router.navigate(['/home'])
            },
        err => {

          console.log(err.error)
          if(err.error=="empty"){

            var t = confirm("No Vacancy");
        	  if(t==true){
              this._router.navigate(['/home']);
            }

          }else{
            var t = confirm("You already accepted this user!!");
            if(t==true){
              this._router.navigate(['/home']);
            }
          }

          
        }
    )
  }

  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        
        {
          text: `${this.user[0].Name}`,
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
              
              { text:`${this.user[0].CurrentCity},${this.user[0].Current2ndCity}`,
                alignment: 'right' },
              { text: this.user[0].email,
                alignment: 'right' },
              { text: this.user[0].contactNo ,
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
                    [ { text: 'Degree', bold: true ,alignment:'center'}, {text:`${this.user[0].Degree}`,alignment:'center'}],
                    [ { text: 'College', bold: true ,alignment:'center'}, {text:`${this.user[0].College}`,alignment:'center'}],
                    [{ text: 'Duration', bold: true,alignment:'center' }, {text:`${this.user[0].Startyear} - ${this.user[0].Endyear}\n `,alignment:'center'}]
                  ]
                }
              },
              {
                text:`\n`,
                bold:true
              },


              {
                text:`Senior Secondary (XII),${this.user[0].StreamMatriculation}`,
                bold:true,
                fontSize:13
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Year of Completion', bold: true ,alignment:'center'}, {text:`${this.user[0].YearOfCompletionMatriculation}`,alignment:'center'}],
                    [ { text: 'Stream', bold: true ,alignment:'center'}, {text:`${this.user[0].StreamMatriculation}`,alignment:'center'}],
                    [{ text: 'Board', bold: true,alignment:'center' }, {text:`${this.user[0].BoardMatriculation}`,alignment:'center'}],
                    [{ text: 'Performance', bold: true,alignment:'center' }, {text:`${this.user[0].PerformanceMatriculation}`,alignment:'center'}],
                    [{ text: '`Name of the School', bold: true,alignment:'center' }, {text:`${this.user[0].SchoolNameMatriculation}`,alignment:'center'}]
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
                    [ { text: 'Year of Completion', bold: true ,alignment:'center'}, {text:`${this.user[0].YearOfCompletionItermediate}`,alignment:'center'}],
                    [{ text: 'Board', bold: true,alignment:'center' }, {text:`${this.user[0].BoardItermediate}`,alignment:'center'}],
                    [{ text: 'Performance', bold: true,alignment:'center' }, {text:`${this.user[0].PerformanceItermediate}`,alignment:'center'}],
                    [{ text: '`Name of the School', bold: true,alignment:'center' }, {text:`${this.user[0].SchoolNameItermediate}`,alignment:'center'}]
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
                    [ { text: 'Profile', bold: true ,alignment:'center'}, {text:`${this.user[0].Profile}`,alignment:'center'}],
                    [{ text: 'Organization', bold: true,alignment:'center' }, {text:`${this.user[0].Organization}`,alignment:'center'}],
                    [{ text: 'Location', bold: true,alignment:'center' }, {text:`${this.user[0].Location}`,alignment:'center'}],
                    [{ text: 'Start date', bold: true,alignment:'center' }, {text:`${this.user[0].Startdate}`,alignment:'center'}],
                    [{ text: 'End date', bold: true,alignment:'center' }, {text:`${this.user[0].Enddate}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user[0].Description}`,alignment:'center'}]
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
                    [ { text: 'Profile', bold: true ,alignment:'center'}, {text:`${this.user[0].iProfile}`,alignment:'center'}],
                    [{ text: 'Organization', bold: true,alignment:'center' }, {text:`${this.user[0].iOrganization}`,alignment:'center'}],
                    [{ text: 'Location', bold: true,alignment:'center' }, {text:`${this.user[0].iLocation}`,alignment:'center'}],
                    [{ text: 'Start date', bold: true,alignment:'center' }, {text:`${this.user[0].iStartdate}`,alignment:'center'}],
                    [{ text: 'End date', bold: true,alignment:'center' }, {text:`${this.user[0].iEnddate}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user[0].iDescription}`,alignment:'center'}]
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
                    [ { text: 'Title', bold: true ,alignment:'center'}, {text:`${this.user[0].Title}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user[0].pDescription}`,alignment:'center'}],
                    [{ text: 'Start month', bold: true,alignment:'center' }, {text:`${this.user[0].Startmonth}`,alignment:'center'}],
                    [{ text: 'End month', bold: true,alignment:'center' }, {text:`${this.user[0].Endmonth}`,alignment:'center'}],
                    [{ text: 'Link', bold: true,alignment:'center' }, {text:`${this.user[0].Projectlink}`,link:`${this.user[0].Projectlink}`,alignment:'center'}]
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
                    [ { text: 'Skill 1 ', bold: true ,alignment:'center'}, {text:`${this.user[0].level1}`,alignment:'center'}],
                    [{ text: 'Skill 2', bold: true,alignment:'center' }, {text:`${this.user[0].level2}`,alignment:'center'}],
                    [{ text: 'Skill 3', bold: true,alignment:'center' }, {text:`${this.user[0].level3}`,alignment:'center'}]
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



