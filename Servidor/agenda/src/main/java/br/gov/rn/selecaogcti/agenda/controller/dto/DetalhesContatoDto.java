package br.gov.rn.selecaogcti.agenda.controller.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import br.gov.rn.selecaogcti.agenda.modelo.Contato;

//classe DTO (Data Transfer Object) que passa pra Agenda apenas alguns atributos do Contato
public class DetalhesContatoDto {

	private String nome;
	private String telefone;
	private boolean whatsapp;
	private String email;
	private List<EnderecoDto> enderecos = new ArrayList<>();
	private LocalDateTime data_cadastro;
	
	public DetalhesContatoDto(Contato contato) {
		this.nome = contato.getNome();
		this.telefone = contato.getTelefone();
		this.whatsapp = contato.isWhatsapp();
		this.email = contato.getEmail();
		this.enderecos = EnderecoDto.converter(contato.getEnderecos());
		this.data_cadastro = contato.getData_cadastro();
	}
	
	public String getNome() {
		return nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public boolean isWhatsapp() {
		return whatsapp;
	}

	public String getEmail() {
		return email;
	}

	public List<EnderecoDto> getEnderecos() {
		return enderecos;
	}

	public LocalDateTime getData_cadastro() {
		return data_cadastro;
	}

	public static List<DetalhesContatoDto> converter(List<Contato> contatos) {
		//linha de comando que usa a API de Stream do Java 8 para converter
		//a lista de Contatos para uma lista de ContatosDto  
		return contatos.stream().map(DetalhesContatoDto::new).collect(Collectors.toList());
	}
	
	
	
}
