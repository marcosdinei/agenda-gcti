package br.gov.rn.selecaogcti.agenda.controller.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import br.gov.rn.selecaogcti.agenda.modelo.Endereco;
import br.gov.rn.selecaogcti.agenda.repository.EnderecoRepository;

public class AtualizarEnderecoForm {

	@NotNull @NotEmpty @Length(max = 255)
	private String rua;
	
	@NotNull @NotEmpty @Length(max = 255)
	private String bairro;
	
	@NotNull
	private Integer numero;
	
	@NotNull @NotEmpty @Length(min = 2, max = 2)
	private String uf;
	
	@NotNull @NotEmpty @Length(min = 8, max = 8)
	private String cep;

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public Integer getNumero() {
		return numero;
	}

	public void setNumero(Integer numero) {
		this.numero = numero;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public Endereco atualizar(Long id, EnderecoRepository enderecoRepository) {
		Endereco endereco = enderecoRepository.getReferenceById(id);
		endereco.setRua(this.rua);
		endereco.setBairro(this.bairro);
		endereco.setNumero(this.numero);
		endereco.setUf(this.uf);
		endereco.setCep(this.cep);
		return endereco;
	}
	
	
	
}
