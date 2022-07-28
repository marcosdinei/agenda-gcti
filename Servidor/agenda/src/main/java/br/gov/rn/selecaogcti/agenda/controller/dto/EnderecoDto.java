package br.gov.rn.selecaogcti.agenda.controller.dto;

import java.util.List;
import java.util.stream.Collectors;

import br.gov.rn.selecaogcti.agenda.modelo.Endereco;

//classe DTO (Data Transfer Object) que passa pro ContatoDto apenas alguns atributos do Endereco
public class EnderecoDto {

	private Long id;
	private String rua;
	private String bairro;
	private Integer numero;
	private String uf;
	private String cep;
	
	public EnderecoDto(Endereco endereco) {
		this.id = endereco.getId();
		this.rua = endereco.getRua();
		this.bairro = endereco.getBairro();
		this.numero = endereco.getNumero();
		this.uf = endereco.getUf();
		this.cep = endereco.getCep();
	}

	public Long getId() {
		return id;
	}
	
	public String getRua() {
		return rua;
	}

	public String getBairro() {
		return bairro;
	}

	public Integer getNumero() {
		return numero;
	}

	public String getUf() {
		return uf;
	}

	public String getCep() {
		return cep;
	}

	public static List<EnderecoDto> converter(List<Endereco> enderecos) {
		//linha de comando que usa a API de Stream do Java 8 para converter
		//a lista de Contatos para uma lista de ContatosDto  
		return enderecos.stream().map(EnderecoDto::new).collect(Collectors.toList());
	}
	
	
	
}
