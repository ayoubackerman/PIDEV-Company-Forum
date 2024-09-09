import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-post.component.html',
  styleUrls: ['./post-post.component.css']
})
export class PostFormComponent implements OnInit {
openDialog() {
throw new Error('Method not implemented.');
}
selectedFile: any;
imagePreview: any;
addItem() {
throw new Error('Method not implemented.');
}
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}
  postForm: FormGroup;
  imageUploadError: string | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      content: ['', Validators.required],
      location: [''],
      tags: [''],
      image: [null]
    });
  }

  ngOnInit(): void {
  }

  submitPost() {
    // Handle post submission logic here
    console.log(this.postForm.value);
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // in MB
    const allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(file.type)) {
      this.imageUploadError = 'Only PNG and JPEG files are allowed.';
      return;
    }

    if (fileSize > 5) {
      this.imageUploadError = 'File size exceeds the limit of 5MB.';
      return;
    }

    this.imageUploadError = '';

    // Here you can handle further image upload logic, like converting to base64
  }
}
