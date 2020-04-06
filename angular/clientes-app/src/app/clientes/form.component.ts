import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: String = "Crear cliente";
  public errores: string[];
  public regiones: Region[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente)
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => { // En el service hemos mapeado el json para tener solo el cliente
         this.router.navigate(['/clientes'])
         swal.fire(
           'Nuevo cliente',
           `Cliente ${cliente.nombre} creado con éxito`,
           'success');
       },
       err => {
         this.errores = err.error.errors as string[];
         console.error('Código de error desde el backend: ' + err.status);
         console.error(err.error.errors);
       }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => { // La variable json es el Map creado en spring con el controller
        this.router.navigate(['/clientes'])
        swal.fire(
          'Cliente actualizado',
          `Cliente ${json.cliente.nombre} actualizado con éxito`,
          'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if(o1 === undefined && o2 === undefined)
    {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }
}
