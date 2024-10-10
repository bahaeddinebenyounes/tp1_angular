import { Injectable } from '@angular/core';
import { Type } from '../model/Type.model';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vetements } from '../model/Vetements.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) };
@Injectable({
  providedIn: 'root'
})
export class vetementsService {
  apiURL: string = 'http://localhost:8080/vetements/api';
  apiURLCat: string = 'http://localhost:8080/vetements/type';

  vetements: Vetements[]= [];
  constructor(private http : HttpClient) {
    }


  listevetements():Observable<Vetements[]>{ 
    return this.http.get<Vetements[]>(this.apiURL);
  }
  
  ajoutervetements(vet: Vetements):Observable<Vetements>{ 
    return this.http.post<Vetements>(this.apiURL, vet, httpOptions); 
  }
  supprimervetements(id : number) { 
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions); }


  vetement! : Vetements;
  consultervetements(id: number): Observable<Vetements> { const url = `${this.apiURL}/${id}`; return this.http.get<Vetements>(url); }
   triervetements(){ 
    this.vetements = this.vetements.sort((n1,n2) => {
      let x1=n1.idVetemnt;
      let x2=n2.idVetemnt;
       if (x1 > x2) { 
        return 1;
      } 
       if (n1.idVetemnt < n2.idVetemnt) { 
        return -1; 
      } 
      return 0; 
    }); 
    } 
    
    updateVetements(prod: Vetements): Observable<Vetements> { 
      const url = `${this.apiURL}/${prod.idVetemnt}`; // Ensure prod.idVetemnt is defined
      return this.http.put<Vetements>(url, prod, httpOptions); 
  }
  
    
    listetype():Observable<Type[]>{ 
      return this.http.get<Type[]>(this.apiURL+"/type"); 
    }


  
    rechercherPartype(idType: number):Observable< Vetements[]> { const url = 
      `${this.apiURL}/vetstype/${idType}`; 
      return this.http.get<Vetements[]>(url); }

      rechercherParNom(nom: string):Observable< Vetements[]> { 
        const url = `${this.apiURL}/vetsByName/${nom}`; 
        return this.http.get<Vetements[]>(url); }
      
    }

     

