import { Component, OnInit } from '@angular/core';
import { PackServiceService } from 'app/services/pack/pack-service.service';

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  styleUrls: ['./pack-list.component.css']
})
export class PackListComponent implements OnInit {

  packs: any[] = [];

  constructor(private packService: PackServiceService) { }

  ngOnInit(): void {
    this.loadPacks();
  }

  loadPacks() {
    this.packService.getItem().subscribe((data: any) => {
      this.packs = data;
    }, error => {
      console.error('Error loading packs:', error);
    });
  }

  deletePack(id: any) {
    this.packService.deleteItemById(id).subscribe(() => {
      // Reload the packs after deletion
      this.loadPacks();
    }, error => {
      console.error('Error deleting pack:', error);
    });
  }

}
