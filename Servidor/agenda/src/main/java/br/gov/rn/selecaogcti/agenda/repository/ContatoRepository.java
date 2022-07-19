package br.gov.rn.selecaogcti.agenda.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rn.selecaogcti.agenda.modelo.Agenda;
import br.gov.rn.selecaogcti.agenda.modelo.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

	List<Contato> findByAgenda(Agenda agenda);

	Optional<Contato> findByTelefone(String telefone);

}
