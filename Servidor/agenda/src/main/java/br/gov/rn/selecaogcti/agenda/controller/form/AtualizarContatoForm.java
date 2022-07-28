package br.gov.rn.selecaogcti.agenda.controller.form;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import br.gov.rn.selecaogcti.agenda.modelo.Contato;
import br.gov.rn.selecaogcti.agenda.repository.ContatoRepository;

public class AtualizarContatoForm {

	@NotNull @Length(max = 255)
	private String nome;
	
	@NotNull @Length(min = 11, max = 11)
	private String telefone;
	
	@NotNull @Length(max = 50)
	private String email;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Contato atualizar(Long id, ContatoRepository contatoRepository) {
		Contato contato = contatoRepository.getReferenceById(id);
		contato.setNome(this.nome);
		contato.setTelefone(this.telefone);
		contato.setEmail(this.email);
		return contato;
	}
	
	
}
