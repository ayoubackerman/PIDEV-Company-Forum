import { Component } from '@angular/core';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {

  company: any[] =  [
    {
      id: 1,
      name: "Pyxis",
      description: "Innovative solutions for tech advancements.",
      logo: "/assets/Pyxis-ba52.png"  // Adjust path as necessary
    },
    {
      id: 2,
      name: "Axe Finance",
      description: "Leading provider in financial software solutions.",
      logo: "/assets/mndhsl2asct8hdu4ij66-1327.jpg"
    },
    {
      id: 3,
      name: "Huawei",
      description: "Global leader in telecommunications and electronics.",
      logo: "/assets/huawei-logo-3e2a.jpg"
    },
    {
      id: 4,
      name: "IBM",
      description: "Pioneering in computing, technology, and IT.",
      logo: "/assets/IBM-1d45.jpg"
    },
    {
      id: 5,
      name: "Cisco",
      description: "Worldwide leader in IT and networking.",
      logo: "/assets/Cisco-9786.jpg"
    },
    {
      id: 6,
      name: "Amazon Web Services",
      description: "Comprehensive cloud computing services from Amazon.",
      logo: "/assets/Amazon Web Services-9b70.jpg"
    },
    {
      id: 7,
      name: "Google",
      description: "Specializes in Internet-related services and products.",
      logo: "/assets/Google-4af1.jpg"
    },
    {
      id: 8,
      name: "Microsoft",
      description: "Multinational corporation that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      logo: "/assets/Microsoft 1-04f6.jpg"
    },
    {
      id: 9,
      name: "Dell EMC",
      description: "Part of Dell Technologies, Dell EMC enables your digital transformation with data storage, cloud, and big data solutions.",
      logo: "/assets/EMC-61ff.jpg"
    },
    {
      id: 10,
      name: "Tunisie Telecom",
      description: "Leading telecom services in Tunisia, providing extensive services from mobile to broadband.",
      logo: "/assets/Tunisie Télécom-ffb6.jpg"
    }
  ];


}
