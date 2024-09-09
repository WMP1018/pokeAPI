import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PokeapiService } from '../../servicios/pokeapi.service';

@Component({
  selector: 'app-dialogo',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, HttpClientModule],
  providers: [PokeapiService],
  templateUrl: './dialogo.component.html',
  styleUrl: './dialogo.component.scss'
})
export class DialogoComponent implements OnInit{
  listaPokemones: any;
  pokemonesCompleto: any[] = []
  constructor(private pokeApi: PokeapiService) {}

  ngOnInit(): void {
    this.pokeApi.obtenerListadoPokemones().subscribe({
      next: (data: any) => {
        this.listaPokemones = data;
        this.listaPokemones.results.forEach((element: any) => {
          this.pokeApi.obtenerUnPokemon(element.url).subscribe({
            next:(data:any) => {
              this.pokemonesCompleto.push(data)
            },
          })          
        });
        console.log(this.listaPokemones);
        console.log(this.pokemonesCompleto);
      },
      error: (err: any) => {console.log(err)}
    })
  }

  playSound(soundSource: string){
    const audio = new Audio();
    audio.src = soundSource;
    audio.load();
    audio.play();
    }
  
}
