package br.gov.rn.selecaogcti.agenda.controller.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import br.gov.rn.selecaogcti.agenda.modelo.Contato;
import br.gov.rn.selecaogcti.agenda.modelo.Endereco;
import br.gov.rn.selecaogcti.agenda.repository.ContatoRepository;

public class EnderecoForm {

	@NotNull
	private Long contato_id;
	
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
	
	public Long getContato_id() {
		return contato_id;
	}
	public void setContato_id(Long contato_id) {
		this.contato_id = contato_id;
	}
	
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
	
	public Endereco converter(ContatoRepository contatoRepository) {
		Contato contato = contatoRepository.getReferenceById(contato_id);
		return new Endereco(contato, rua, bairro, numero, uf, cep);
	}
	
}
