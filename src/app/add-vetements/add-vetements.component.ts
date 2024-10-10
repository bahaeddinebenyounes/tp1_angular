import { Component } from '@angular/core';
import { Vetements } from '../model/Vetements.model';
import { vetementsService } from '../services/vetements.service';
import { Router } from '@angular/router';
import { Type } from '../model/Type.model';

@Component({
  selector: 'app-add-vetements',
  templateUrl: './add-vetements.component.html',
  styleUrls: ['./add-vetements.component.css']
})
export class AddVetementsComponent {
  newvetements = new Vetements();
  message : string | undefined;
  type! : Type[];
  newIdType! : number; 
  newType! : Type;


  constructor(private vetementsService: vetementsService,private router:Router) {}


  ngOnInit():void {
    this.vetementsService.listetype(). 
    subscribe(tp => {this.type = tp; 
      console.log(tp); });
     }
  addvetement(){ 
    this.newvetements.type = this.type.find(cat => cat.idType == this.newIdType)!; 
    this.vetementsService.ajoutervetements(this.newvetements) .subscribe(vet => { 
      console.log(vet); 
      this.router.navigate(['vetements']); }); }
  }
  
 
