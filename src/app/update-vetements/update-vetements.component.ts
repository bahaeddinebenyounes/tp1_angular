import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vetementsService } from '../services/vetements.service';
import { Vetements } from '../model/Vetements.model';
import { Type } from '../model/Type.model';

@Component({
  selector: 'app-update-vetements',
  templateUrl: './update-vetements.component.html',
  styleUrls: ['./update-vetements.component.css']
})
export class UpdateVetementsComponent implements OnInit {

  currentvetements = new Vetements();
  Type!: Type[];
  updatedCatId!: number;


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private vetementsService: vetementsService) { }


  ngOnInit(): void {
    this.vetementsService.listetype(). subscribe(cats => {
      this.Type = cats; console.log(cats); });
      this.vetementsService.consultervetements(this.activatedRoute.snapshot.params['id']). subscribe( prod =>{ 
        this.currentvetements = prod; this.updatedCatId = this.currentvetements.type.idType; } ) ;
  }


  
  updatevetements() {
    this.currentvetements.type = this.Type.find(cat => cat.idType == this.updatedCatId)!;

    // Log the current vetements object before the update
    console.log('Updating Vetement with data:', this.currentvetements);

    this.vetementsService.updateVetements(this.currentvetements).subscribe(
        prod => { 
            console.log('Vetement updated successfully:', prod); // Log successful response
            this.router.navigate(['vetements']); 
        },
        error => {
            console.error('Error updating Vetement:', error); // Log any errors
        }
    );
}

}
