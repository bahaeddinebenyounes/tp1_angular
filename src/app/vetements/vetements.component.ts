import { Component } from '@angular/core';
import { vetementsService } from '../services/vetements.service';
import { AuthService } from '../services/auth.service';
import { Vetements } from '../model/Vetements.model';

@Component({
  selector: 'app-vetements',
  templateUrl: './vetements.component.html',
  styleUrls: ['./vetements.component.css']
})
export class VetementsComponent {
  vetements   : any;
  constructor(private vetementsService: vetementsService,
    public authService: AuthService ) {
    /* this.vetements = vetementsService.listevetements(); */
  /*console.log(this.vetements); */
  }
  
  ngOnInit(): void {
  this.vetementsService.listevetements().subscribe(vets => {
    console.log(vets);
    for (let i of vets) {
      if (i.type && i.type.nomType) {
        console.log(i.type.nomType);
      } else {
        console.log('Type or nomType is null or undefined for vetement:', i);
      }
    }
    this.vetements = vets;
  });
}
  
  chargervetements(){ this.vetementsService.listevetements().subscribe(vet => { console.log(vet); this.vetements = vet; }); }
  supprimervetements(p: Vetements) { 
    let conf = confirm("Etes-vous sûr ?"); 
    if (conf) this.vetementsService.supprimervetements(p.idVetemnt).subscribe(() => {
       console.log("vetements supprimé"); this.chargervetements(); }); 
      }
}


