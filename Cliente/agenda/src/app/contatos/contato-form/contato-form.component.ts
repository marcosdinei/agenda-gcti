import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {

  @Input() contatoForm!: FormGroup;
  @Input() tipoForm!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
