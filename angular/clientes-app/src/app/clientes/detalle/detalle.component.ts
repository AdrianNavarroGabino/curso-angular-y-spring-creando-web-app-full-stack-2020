import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Factura } from 'src/app/facturas/models/factura';
import { FacturaService } from 'src/app/facturas/services/factura.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteService: ClienteService,
      private facturaService: FacturaService,
      public modalService: ModalService,
      public authService: AuthService) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);

    if(this.fotoSeleccionada.type.indexOf('image') < 0)
    {
      swal.fire('Error seleccionar imagen:', 'El archivo debe ser de tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if(!this.fotoSeleccionada) {
      swal.fire('Error upload:', 'Debe seleccionar una foto', 'error');
    }
    else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          if(event.type === HttpEventType.UploadProgress)
          {
            this.progreso = Math.round(event.loaded / event.total * 100);
          }
          else if(event.type === HttpEventType.Response)
          {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            this.modalService.notificarUpload.emit(this.cliente);

            swal.fire(
              'La foto se ha subido correctamente',
              response.mensaje,
              'success');
          }
          //this.cliente = cliente;
        });
    }
  }

  cerrarModal() {
    this.fotoSeleccionada = null;
    this.progreso = 0;
    this.modalService.cerrarModal();
  }

  delete(factura: Factura): void {
    const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro?',
    text: `¿Seguro que desea eliminar la factura ${factura.descripcion}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, eliminar!',
    cancelButtonText: '¡No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {

      this.facturaService.delete(factura.id).subscribe(
        response => {
          this.cliente.facturas = this.cliente.facturas.filter(f => f != factura)
          swal.fire(
            'Factura eliminada',
            `Factura ${factura.descripcion} eliminada con éxito`,
            'success'
          )
        }
      )
    }
  })
  }
}
