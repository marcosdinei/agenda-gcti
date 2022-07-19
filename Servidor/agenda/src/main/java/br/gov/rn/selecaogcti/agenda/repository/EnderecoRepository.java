package br.gov.rn.selecaogcti.agenda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.gov.rn.selecaogcti.agenda.modelo.Contato;
import br.gov.rn.selecaogcti.agenda.modelo.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

	List<Endereco> findByContato(Contato contato);

}
