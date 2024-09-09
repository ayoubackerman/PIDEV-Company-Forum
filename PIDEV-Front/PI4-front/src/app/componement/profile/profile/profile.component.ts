// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm !: FormGroup;
  imageSrc !: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
      img: [null],
      skills: ['', Validators.required]
    });

    this.loadProfile();
  }

  loadProfile() {
   /* this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profileForm.patchValue({
          phoneNumber: data.phoneNumber,
          address: data.address,
          skills: data.skills.join(', ')
        });
        if (data.img) {
          this.imageSrc = 'data:image/jpeg;base64,' + btoa(
            new Uint8Array(data.img)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        }
      },
      error: (error) => console.error(error)
    });*/
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            this.imageSrc = reader.result as string;
            if (this.imageSrc.startsWith('data:image')) { // Ensure it's an image
                this.profileForm.patchValue({
                    img: this.imageSrc.split(',')[1] // Extracts base64 part of the image
                });
            }
        };

        reader.onerror = error => {
            console.error('Error reading file:', error);
            // Handle errors here if file read fails
        };
    }
}


  updateProfile() {
   /* if (this.profileForm.valid) {
      this.profileService.updateProfile(this.profileForm.value).subscribe({
        next: (res) => console.log('Profile updated successfully!'),
        error: (error) => console.error('Failed to update profile', error)
      });
    }*/
  }
}
