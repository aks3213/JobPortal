import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';
declare var require: any
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class User{
  uid!: string;
  Name!: string ;
  CurrentCity!:string;
  Current2ndCity!:string;
  contactNo!: string;
  email!: string;

  YearOfCompletionItermediate!:string;
  BoardItermediate!:string;
  PerformanceItermediate!:string;
  SchoolNameItermediate!:string;

  StreamMatriculation!:string;
  SchoolNameMatriculation!:string;
  YearOfCompletionMatriculation!:string;
  BoardMatriculation!:string;
  PerformanceMatriculation!:string;

  Graduationstatus!:string;
  College!:string;
  Startyear!:string;
  Endyear!:string;
  Degree!:string;
  Performance!:string;

  Profile!:string;
  Organization!:string;
  Location!:string;
  Startdate!:Date;
  Enddate!:Date;
  Description!:String;
  Currently !: boolean;

  iProfile!:string;
  iOrganization!:string;
  iLocation!:string;
  iStartdate!:Date;
  iEnddate!:Date;
  iDescription!:String;
  iCurrently !: boolean;

  Title!:string;
  Startmonth!:Date;
  Endmonth!:Date;
  pDescription!:String;
  Projectlink !: boolean;
  pCurrently !: boolean;

  Skill1!:String;
  Skill2!:String;
  Skill3!:String;
  level1!:String;
  level2!:String;
  level3!:String;

}

@Component({
  selector: 'app-pdfmaker',
  templateUrl: './pdfmaker.component.html',
  styleUrls: ['./pdfmaker.component.css']
})
export class PdfmakerComponent implements OnInit {

  constructor(private job: JobService,
    private _router: Router) { }

  ngOnInit(): void {
   // pdfMake.createPdf(docDefinition).open();
   // this.generatePDF()
  }

  userdata:any=[]

  valid = false;

  getid(){

   
    this.job.getId().subscribe(
      res => {///this.userid=res.toString(),
              //console.log(res)
              this.userdata= res;
        
             // console.log(this.userdata);
              this.user.uid=this.userdata._id;
              //console.log(this.userid)
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

  onSubmit(){
    this.valid = true;

    console.log(this.user);
    this.job.createResume(this.user)
    .subscribe(
      (res:any) => {
      console.log(res)
       // this._router.navigate(['/home'])
      }
    ) 

  }

  user = new User(); 
  
  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        
        {
          text: `${this.user.Name}`,
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
              
              { text:`${this.user.CurrentCity},${this.user.Current2ndCity}`,
                alignment: 'right' },
              { text: this.user.email,
                alignment: 'right' },
              { text: this.user.contactNo ,
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
                    [ { text: 'Degree', bold: true ,alignment:'center'}, {text:`${this.user.Degree}`,alignment:'center'}],
                    [ { text: 'College', bold: true ,alignment:'center'}, {text:`${this.user.College}`,alignment:'center'}],
                    [{ text: 'Duration', bold: true,alignment:'center' }, {text:`${this.user.Startyear} - ${this.user.Endyear}\n `,alignment:'center'}]
                  ]
                }
              },
              {
                text:`\n`,
                bold:true
              },


              {
                text:`Senior Secondary (XII),${this.user.StreamMatriculation}`,
                bold:true,
                fontSize:13
              },
              {
                layout: 'lightHorizontalLines',
                table: {
                  widths: [ 'auto', 'auto' ],
          
                  body: [
                    ['',''],
                    [ { text: 'Year of Completion', bold: true ,alignment:'center'}, {text:`${this.user.YearOfCompletionMatriculation}`,alignment:'center'}],
                    [ { text: 'Stream', bold: true ,alignment:'center'}, {text:`${this.user.StreamMatriculation}`,alignment:'center'}],
                    [{ text: 'Board', bold: true,alignment:'center' }, {text:`${this.user.BoardMatriculation}`,alignment:'center'}],
                    [{ text: 'Performance', bold: true,alignment:'center' }, {text:`${this.user.PerformanceMatriculation}`,alignment:'center'}],
                    [{ text: '`Name of the School', bold: true,alignment:'center' }, {text:`${this.user.SchoolNameMatriculation}`,alignment:'center'}]
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
                    [ { text: 'Year of Completion', bold: true ,alignment:'center'}, {text:`${this.user.YearOfCompletionItermediate}`,alignment:'center'}],
                    [{ text: 'Board', bold: true,alignment:'center' }, {text:`${this.user.BoardItermediate}`,alignment:'center'}],
                    [{ text: 'Performance', bold: true,alignment:'center' }, {text:`${this.user.PerformanceItermediate}`,alignment:'center'}],
                    [{ text: '`Name of the School', bold: true,alignment:'center' }, {text:`${this.user.SchoolNameItermediate}`,alignment:'center'}]
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
                    [ { text: 'Profile', bold: true ,alignment:'center'}, {text:`${this.user.Profile}`,alignment:'center'}],
                    [{ text: 'Organization', bold: true,alignment:'center' }, {text:`${this.user.Organization}`,alignment:'center'}],
                    [{ text: 'Location', bold: true,alignment:'center' }, {text:`${this.user.Location}`,alignment:'center'}],
                    [{ text: 'Start date', bold: true,alignment:'center' }, {text:`${this.user.Startdate}`,alignment:'center'}],
                    [{ text: 'End date', bold: true,alignment:'center' }, {text:`${this.user.Enddate}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user.Description}`,alignment:'center'}]
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
                    [ { text: 'Profile', bold: true ,alignment:'center'}, {text:`${this.user.iProfile}`,alignment:'center'}],
                    [{ text: 'Organization', bold: true,alignment:'center' }, {text:`${this.user.iOrganization}`,alignment:'center'}],
                    [{ text: 'Location', bold: true,alignment:'center' }, {text:`${this.user.iLocation}`,alignment:'center'}],
                    [{ text: 'Start date', bold: true,alignment:'center' }, {text:`${this.user.iStartdate}`,alignment:'center'}],
                    [{ text: 'End date', bold: true,alignment:'center' }, {text:`${this.user.iEnddate}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user.iDescription}`,alignment:'center'}]
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
                    [ { text: 'Title', bold: true ,alignment:'center'}, {text:`${this.user.Title}`,alignment:'center'}],
                    [{ text: 'Description', bold: true,alignment:'center' }, {text:`${this.user.pDescription}`,alignment:'center'}],
                    [{ text: 'Start month', bold: true,alignment:'center' }, {text:`${this.user.Startmonth}`,alignment:'center'}],
                    [{ text: 'End month', bold: true,alignment:'center' }, {text:`${this.user.Endmonth}`,alignment:'center'}],
                    [{ text: 'Link', bold: true,alignment:'center' }, {text:`${this.user.Projectlink}`,link:`${this.user.Projectlink}`,alignment:'center'}]
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
                    [ { text: 'Skill 1 ', bold: true ,alignment:'center'}, {text:`${this.user.level1}`,alignment:'center'}],
                    [{ text: 'Skill 2', bold: true,alignment:'center' }, {text:`${this.user.level2}`,alignment:'center'}],
                    [{ text: 'Skill 3', bold: true,alignment:'center' }, {text:`${this.user.level3}`,alignment:'center'}]
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
