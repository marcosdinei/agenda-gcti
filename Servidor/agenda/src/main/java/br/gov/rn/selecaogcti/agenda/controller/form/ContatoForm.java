package br.gov.rn.selecaogcti.agenda.controller.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import br.gov.rn.selecaogcti.agenda.modelo.Agenda;
import br.gov.rn.selecaogcti.agenda.modelo.Contato;
import br.gov.rn.selecaogcti.agenda.repository.AgendaRepository;

public class ContatoForm {

	@NotNull @NotEmpty @Length(max = 255)
	private String nome;
	
	@NotNull @NotEmpty @Length(min = 11, max = 11)
	private String telefone;
	
	@NotNull
	private boolean whatsapp;
	
	@NotNull @NotEmpty @Length(max = 50)
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

	public boolean isWhatsapp() {
		return whatsapp;
	}

	public void setWhatsapp(boolean whatsapp) {
		this.whatsapp = whatsapp;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Contato converter(AgendaRepository agendaRepository, Long agenda_id) {
		Agenda agenda = agendaRepository.getReferenceById(agenda_id);
		return new Contato(agenda, nome, telefone, whatsapp, email);
	}
	
}
