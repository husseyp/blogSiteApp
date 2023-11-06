import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-blog-data',
  templateUrl: './blog-data.component.html',
  styleUrls: ['./blog-data.component.scss']
})
export class BlogDataComponent implements OnInit {

  allBlogList:any = [];
  myBlogList:any = [];
  userDetails:any ='';
  addBlogForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private apiService:ApiService,
              private router : Router,private utilsService : UtilsService) {

  }

  ngOnInit(): void {

    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}' );
    console.log(this.userDetails,'got my user details');
    this.initAddBlogForm();
    this.getBlogsList();
      
  }

  initAddBlogForm() {

    this.addBlogForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      content: ["", Validators.required]
    });

  }

  get f() {
    return this.addBlogForm.controls;
  }

  getBlogsList() {

    this.apiService.getServerData('getAllBlogs').subscribe({
      next : (resData) => {
          console.log(resData,'got my res data');
          this.allBlogList = resData;
          this.allBlogList.map((blog:any)=>{
                blog['userAddcomment'] = '';
          })
          this.myBlogList = resData.filter((data:any)=> data.userId == this.userDetails.email)
      },
      error : (err) => {
        console.log(err,'got my err data');
      },
    })

  }

  postComment(blogData:any) {

    console.log(blogData,'got my data');

    if(blogData.userAddcomment.length> 0) {

      let putBody = {
        "blogId" : blogData.blogId,
        "description" : blogData.userAddcomment,
        "userId" : this.userDetails.email
    }
  
      this.apiService.updateServerData('updateBlog',putBody).subscribe({
        next : (resData) => {
            console.log(resData,'got my res data');
            this.getBlogsList();
        },
        error : (err) => {
          console.log(err,'got my err data');
  
        },
      })

    }
 

  }

  postBlog() {

    if (this.addBlogForm.invalid) {
      this.addBlogForm.markAllAsTouched();
      return;
    }

    console.log(this.addBlogForm.getRawValue(),'got value');

    let formValue = this.addBlogForm.getRawValue();

    let postBody = {
      "userId": this.userDetails.email,
      ...this.addBlogForm.getRawValue()
    }

    this.apiService.createServerData('postBlog',postBody).subscribe({
      next : (resData) => {

        this.utilsService.showSuccess('Blog Posted Successfully');
        this.initAddBlogForm();
        this.getBlogsList();
      },
      error : (err) => {
        console.log(err,'got my err')
      },
    })

  }

}
