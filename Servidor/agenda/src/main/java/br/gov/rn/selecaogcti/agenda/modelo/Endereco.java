package br.gov.rn.selecaogcti.agenda.modelo;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
public class Endereco {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne @NotNull @NotEmpty
	private Contato contato;
	
	@NotNull @NotEmpty @Length(max = 255)
	private String rua;
	
	@NotNull @NotEmpty @Length(max = 255)
	private String bairro;
	
	@NotNull @NotEmpty
	private Integer numero;
	
	@NotNull @NotEmpty @Length(min = 2, max = 2)
	private String uf;
	
	@NotNull @NotEmpty @Length(min = 8, max = 8)
	private String cep;
	
	public Endereco() {
		
	}
	
	public Endereco(Contato contato, String rua, String bairro, Integer numero, String uf, String cep) {
		super();
		this.contato = contato;
		this.rua = rua;
		this.bairro = bairro;
		this.numero = numero;
		this.uf = uf;
		this.cep = cep;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Endereco other = (Endereco) obj;
		return Objects.equals(id, other.id);
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Contato getContato() {
		return contato;
	}
	public void setContato(Contato contato) {
		this.contato = contato;
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
	
}
