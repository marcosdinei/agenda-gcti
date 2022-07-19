package br.gov.rn.selecaogcti.agenda.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.gov.rn.selecaogcti.agenda.controller.dto.EnderecoDto;
import br.gov.rn.selecaogcti.agenda.controller.form.AtualizarEnderecoForm;
import br.gov.rn.selecaogcti.agenda.controller.form.EnderecoForm;
import br.gov.rn.selecaogcti.agenda.modelo.Contato;
import br.gov.rn.selecaogcti.agenda.modelo.Endereco;
import br.gov.rn.selecaogcti.agenda.repository.ContatoRepository;
import br.gov.rn.selecaogcti.agenda.repository.EnderecoRepository;

@RestController
@RequestMapping("/enderecos/{contato_id}")
public class EndedrecoController {

	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private ContatoRepository contatoRepository;
	
	@GetMapping
	public List<EnderecoDto> listarEnderecos(@PathVariable Long contato_id) {
		
		Contato contato = contatoRepository.findById(contato_id).get();
		List<Endereco> enderecos = enderecoRepository.findByContato(contato);
		
		return EnderecoDto.converter(enderecos);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<EnderecoDto> adicionarEndereco(@PathVariable Long contato_id, @RequestBody @Valid EnderecoForm enderecoForm, UriComponentsBuilder uriBuilder) {
		
		Endereco endereco = enderecoForm.converter(contatoRepository);
		enderecoRepository.save(endereco);
		
		URI uri = uriBuilder.path("/enderecos/{id}").buildAndExpand(endereco.getId()).toUri();
		return ResponseEntity.created(uri).body(new EnderecoDto(endereco));
	}
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<EnderecoDto> atualizarEndereco(@PathVariable Long contato_id, @PathVariable Long id, @RequestBody @Valid AtualizarEnderecoForm atualizarEnderecoForm) {
		
		Optional<Endereco> enderecoOp = enderecoRepository.findById(id);
		if (enderecoOp.isPresent()) {
			Endereco endereco = atualizarEnderecoForm.atualizar(id, enderecoRepository);
			return ResponseEntity.ok(new EnderecoDto(endereco));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<List<EnderecoDto>> removerEndereco(@PathVariable Long contato_id, @PathVariable Long id) {
		
		Optional<Endereco> enderecoOp = enderecoRepository.findById(id);
		if (enderecoOp.isPresent()) {
			enderecoRepository.deleteById(id);
			return ResponseEntity.ok(listarEnderecos(contato_id));
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
