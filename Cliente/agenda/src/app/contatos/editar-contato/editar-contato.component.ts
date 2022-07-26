import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContatosService } from './../contatos.service';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent implements OnInit {

  editaContatoForm!: FormGroup;
  contato_id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private contatosService: ContatosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contato_id = this.activatedRoute.snapshot.params['contato_id'];
    this.contatosService.detalheContato(this.contato_id).subscribe((contato) => {
      this.editaContatoForm = this.formBuilder.group({
        nome: [contato.nome],
        telefone: [contato.telefone],
        email: [contato.email],
        whatsapp: [contato.whatsapp]
      });
    });
  }

  editaContato() {
    let novoContato = this.editaContatoForm.getRawValue();
    this.contatosService.editaContato(this.contato_id, novoContato).subscribe(() => {
      this.router.navigate(['contatos']);
    });
  }

  excluiContato() {
    this.contatosService.excluiContato(this.contato_id).subscribe(() => {
      this.router.navigate(['contatos']);
    });
  }

}
