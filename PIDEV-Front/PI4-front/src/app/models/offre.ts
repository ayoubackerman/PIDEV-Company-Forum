

export interface Offre {
    reference: string;
    title: string;
    location: string;
    description: string;
    deadline: Date;
    contratType: string;
    skills: string;
    experienceLevel: string;
    favorite:boolean;
    publicationDate: Date; 
    rating: number;
    ratings: number[];
    
  }
  