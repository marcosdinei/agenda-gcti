import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Endereco, Enderecos } from '../endereco';
import { EnderecosService } from '../enderecos.service';
import { ModalEnderecoService } from './../../../componentes/modal-endereco/modal-endereco.service';

@Component({
  selector: 'app-editar-endereco',
  templateUrl: './editar-endereco.component.html',
  styleUrls: ['./editar-endereco.component.css']
})
export class EditarEnderecoComponent implements OnInit {

  enderecoForm!: FormGroup;
  enderecos$!: Observable<Enderecos>;
  contato_id!: number;
  mostraMsgErro: boolean = false;
  @Input() erroEndereco: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private enderecosService: EnderecosService,
    private modalEnderecoService: ModalEnderecoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contato_id = this.activatedRoute.snapshot.params['contato_id'];
    this.enderecos$ = this.enderecosService.listaDoContato(this.contato_id);

    this.enderecos$.subscribe(enderecos => {
      this.enderecosService.listaEnderecos(enderecos);
    })

    this.enderecoForm = this.formBuilder.group({
      rua: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      uf: ['AC'],
      cep: ['', [Validators.required]]
    });
  }

  removeEndereco(enderecoRemovido: Endereco) { //RESOLVER DESAPARECER ENDEREÇO EXCLUÍDO
    this.enderecosService.excluiEndereco(enderecoRemovido.id).subscribe(() => {
      this.router.navigate(['contatos/editar', this.contato_id]);
    });
  }

  salvaEndereco() { //RESOLVER APARECER NOVO ENDEREÇO CADASTRADO
    if (this.enderecoForm.valid) {
      const novoEndereco = this.enderecoForm.getRawValue();
      this.enderecosService.cadastraEndereco(this.contato_id, novoEndereco).subscribe();
      this.modalEnderecoService.desaparecer();
    } else {
      this.mostraMsgErro = true;
    }
  }

}
