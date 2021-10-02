import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';
import { ModalService } from '../_modal';

declare var require: any
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  userdata:any=[]
  user:any=[]
  dummy:any=[]
  dummy1:any=[]
  jobsdata:any=[]
  rattingdata:any=[]
  onejobsdata:any=[]

  currentRate = 0;
  currentRate1 = 0;

  constructor(private job: JobService,
    private _router: Router,private route:ActivatedRoute,private _auth:AuthService,private modalService: ModalService) { }

  ngOnInit(): void {
    this._auth.getUsers().subscribe(
      res=>{
        this.userdata=res
      }
    )
  }

  viewResume(uid:string){
    this.job.getResumes(uid).subscribe(
      res => {
     //   console.log(res);
        this.user[0]=res;
      //  console.log(this.user[0])
        console.log(this.user[0][0].Name);
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

  viewJobs(id: string,email:string){

    this.job.getjobs(email).subscribe(
      res=>{
        this.dummy = res

        this.jobsdata = this.dummy.jobid
        this.rattingdata = this.dummy.Ratting
          console.log(this.jobsdata)

          this.job.getratting().subscribe(
            res=>{
              this.dummy1 = res;
            //  console.log(this.rattingdata)
              for(let i of this.dummy1){

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
        
        
      },err=>{
        console.log(err)
      }
    )

    this.modalService.open(id);
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
