package br.gov.rn.selecaogcti.agenda.controller;

import java.net.URI;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.gov.rn.selecaogcti.agenda.config.security.TokenService;
import br.gov.rn.selecaogcti.agenda.controller.dto.TokenDto;
import br.gov.rn.selecaogcti.agenda.controller.form.LoginForm;
import br.gov.rn.selecaogcti.agenda.modelo.Agenda;
import br.gov.rn.selecaogcti.agenda.modelo.Usuario;
import br.gov.rn.selecaogcti.agenda.repository.AgendaRepository;
import br.gov.rn.selecaogcti.agenda.repository.UsuarioRepository;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private AgendaRepository agendaRepository;
	
	@PostMapping
	public ResponseEntity<TokenDto> autenticar(@RequestBody @Valid LoginForm loginForm, UriComponentsBuilder uriBuilder) {
		
		UsernamePasswordAuthenticationToken dadosLogin = loginForm.converter();
		
		try {
			Authentication authentication = authManager.authenticate(dadosLogin);
			String token = tokenService.gerarToken(authentication);
			
			Long idUsuario = tokenService.getIdUsuario(token);
			Usuario usuario = usuarioRepository.findById(idUsuario).get();
			Optional<Agenda> agenda = agendaRepository.findByUsuario(usuario);
			Agenda novaAgenda = new Agenda();
			if (!agenda.isPresent()) {
				novaAgenda = new Agenda(usuario);
				agendaRepository.save(novaAgenda);
			}
			
			URI uri = uriBuilder.path("/contatos/{agenda_id}").buildAndExpand(novaAgenda.getId()).toUri();
			return ResponseEntity.created(uri).body(new TokenDto(token, "Bearer"));
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		
	}
	
}
