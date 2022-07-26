package br.gov.rn.selecaogcti.agenda.controller.form;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import br.gov.rn.selecaogcti.agenda.modelo.Contato;
import br.gov.rn.selecaogcti.agenda.modelo.Endereco;
import br.gov.rn.selecaogcti.agenda.repository.ContatoRepository;

public class EnderecoForm {

	@NotNull @Length(max = 255)
	private String rua;
	
	@NotNull @Length(max = 255)
	private String bairro;
	
	@NotNull
	private Integer numero;
	
	@NotNull @Length(min = 2, max = 2)
	private String uf;
	
	@NotNull @Length(min = 8, max = 8)
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
	
	public Endereco converter(ContatoRepository contatoRepository, Long contato_id) {
		Contato contato = contatoRepository.getReferenceById(contato_id);
		return new Endereco(contato, rua, bairro, numero, uf, cep);
	}
	
}
