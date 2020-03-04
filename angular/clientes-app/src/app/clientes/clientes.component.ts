import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {id: 1, nombre: 'Adrián', apellido: 'Navarro', email: 'adrian@adrian.com', createAt: '2020-03-04'},
    {id: 2, nombre: 'Mr. John', apellido: 'Doe', email: 'john.doe@gmail.com', createAt: '2017-11-11'},
    {id: 3, nombre: 'Linus', apellido: 'Torvalds', email: 'linus.torvalds@gmail.com', createAt: '2018-09-02'},
    {id: 4, nombre: 'Rasmus', apellido: 'Lerdorf', email: 'rasmus.lerdorf@gmail.com', createAt: '2015-12-23'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
