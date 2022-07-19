package br.gov.rn.selecaogcti.agenda.controller;

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
	public ResponseEntity<TokenDto> autenticar(@RequestBody @Valid LoginForm loginForm) {
		
		UsernamePasswordAuthenticationToken dadosLogin = loginForm.converter();
		
		try {
			Authentication authentication = authManager.authenticate(dadosLogin);
			String token = tokenService.gerarToken(authentication);
			
			Long idUsuario = tokenService.getIdUsuario(token);
			Usuario usuario = usuarioRepository.findById(idUsuario).get();
			Optional<Agenda> agenda = agendaRepository.findByUsuario(usuario);
			if (!agenda.isPresent()) {
				Agenda novaAgenda = new Agenda(usuario);
				agendaRepository.save(novaAgenda);
			}
			
			return ResponseEntity.ok(new TokenDto(token, "Bearer"));
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		
	}
	
}
