package br.gov.rn.selecaogcti.agenda.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.gov.rn.selecaogcti.agenda.modelo.Contato;

//classe DTO (Data Transfer Object) que passa pra Agenda apenas alguns atributos do Contato
public class ContatoDto {

	private String nome;
	private String telefone;
	
	public ContatoDto(Contato contato) {
		this.nome = contato.getNome();
		this.telefone = contato.getTelefone();
	}
	
	public String getNome() {
		return nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public static List<ContatoDto> converter(List<Contato> contatosAtivos) {
		//linha de comando que usa a API de Stream do Java 8 para converter
		//a lista de Contatos para uma lista de ContatosDto
		return contatosAtivos.stream().map(ContatoDto::new).collect(Collectors.toList());
	}
	
	
	
}
