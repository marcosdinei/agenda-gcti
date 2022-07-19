package br.gov.rn.selecaogcti.agenda.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rn.selecaogcti.agenda.modelo.Agenda;
import br.gov.rn.selecaogcti.agenda.modelo.Usuario;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

	Optional<Agenda> findByUsuario(Usuario usuario);	
	
}
