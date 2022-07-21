package br.gov.rn.selecaogcti.agenda.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
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

import br.gov.rn.selecaogcti.agenda.controller.dto.ContatoDto;
import br.gov.rn.selecaogcti.agenda.controller.dto.DetalhesContatoDto;
import br.gov.rn.selecaogcti.agenda.controller.form.AtualizarContatoForm;
import br.gov.rn.selecaogcti.agenda.controller.form.ContatoForm;
import br.gov.rn.selecaogcti.agenda.modelo.Agenda;
import br.gov.rn.selecaogcti.agenda.modelo.Contato;
import br.gov.rn.selecaogcti.agenda.modelo.Usuario;
import br.gov.rn.selecaogcti.agenda.repository.AgendaRepository;
import br.gov.rn.selecaogcti.agenda.repository.ContatoRepository;
import br.gov.rn.selecaogcti.agenda.repository.UsuarioRepository;

@RestController
@RequestMapping
public class AgendaController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private AgendaRepository agendaRepository;
	
	@Autowired
	private ContatoRepository contatoRepository;
	
	public void criarAgenda(Long usuario_id) {
		Usuario usuario = usuarioRepository.findById(usuario_id).get();
		Optional<Agenda> agenda = agendaRepository.findByUsuario(usuario);
		Agenda novaAgenda = new Agenda();
		if (!agenda.isPresent()) {
			novaAgenda = new Agenda(usuario);
			agendaRepository.save(novaAgenda);
		}
	}
	
	@GetMapping("/agenda/{usuario_id}")
	public ResponseEntity<Long> retornaIdAgendaPeloUsuario(@PathVariable Long usuario_id) {
		
		criarAgenda(usuario_id);
		
		Usuario usuario = usuarioRepository.findById(usuario_id).get();
		Optional<Agenda> agenda = agendaRepository.findByUsuario(usuario);
		
		if (agenda.isPresent()) {
			return ResponseEntity.ok(agenda.get().getId());
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping("/contatos/{agenda_id}")
	@Cacheable(value = "listaC")
	public List<ContatoDto> listarContatos(@PathVariable Long agenda_id) {
		
		Agenda agenda = agendaRepository.findById(agenda_id).get();
		List<Contato> contatos = contatoRepository.findByAgenda(agenda);
		List<Contato> contatosAtivos = new ArrayList<>();
		
		contatos.forEach(c -> {
			if (c.isAtivo()) {
				contatosAtivos.add(c);
			}
		});
		
		return ContatoDto.converter(contatosAtivos);
	}
	
	@PostMapping("/contatos/{agenda_id}")
	@Transactional
	@CacheEvict(value = "listaEnderecos", allEntries = true)
	public ResponseEntity<List<ContatoDto>> novoContato(@PathVariable Long agenda_id, @RequestBody @Valid ContatoForm contatoForm, UriComponentsBuilder uriBuilder) {
		
		Contato contato = contatoForm.converter(agendaRepository, agenda_id);
		
		Optional<Contato> verificaTelefone = contatoRepository.findByTelefone(contato.getTelefone());
		if (verificaTelefone.isPresent()) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		
		contatoRepository.save(contato);
		return ResponseEntity.ok(listarContatos(agenda_id));
	}
	
	@GetMapping("/contatos/{agenda_id}/{id}")
	public ResponseEntity<DetalhesContatoDto> detalharContato(@PathVariable Long id) {
		
		Optional<Contato> contato = contatoRepository.findById(id);
		if (contato.isPresent()) {
			return ResponseEntity.ok(new DetalhesContatoDto(contato.get()));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/contatos/{agenda_id}/{id}")
	@Transactional
	@CacheEvict(value = "listaEnderecos", allEntries = true)
	public ResponseEntity<ContatoDto> atualizarContato(@PathVariable Long id, @RequestBody @Valid AtualizarContatoForm atualizarContatoForm) {
		
		Optional<Contato> contatoOp = contatoRepository.findById(id);
		if (contatoOp.isPresent()) {
			Contato contato = atualizarContatoForm.atualizar(id, contatoRepository);
			return ResponseEntity.ok(new ContatoDto(contato));
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/contatos/{agenda_id}/{id}")
	@Transactional
	@CacheEvict(value = "listaEnderecos", allEntries = true)
	public ResponseEntity<List<ContatoDto>> removerContato(@PathVariable Long agenda_id, @PathVariable Long id) {
		
		Optional<Contato> contatoOp = contatoRepository.findById(id);
		if (contatoOp.isPresent()) {
			Contato contato = contatoRepository.getReferenceById(id);
			contato.setAtivo(false);
			
			return ResponseEntity.ok(listarContatos(agenda_id));
		}
		
		return ResponseEntity.notFound().build();
	}
	
}
