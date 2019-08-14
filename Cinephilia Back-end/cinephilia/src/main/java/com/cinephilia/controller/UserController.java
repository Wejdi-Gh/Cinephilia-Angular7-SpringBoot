package com.cinephilia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cinephilia.dto.UserDTO;
import com.cinephilia.service.UserService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	
	private UserService userService ;
	
	
	@PostMapping(path = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody UserDTO createUser(@RequestBody UserDTO newUser) {

		return userService.createUser(newUser);

	}
	
	
	@GetMapping(path = "/admin/users", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List <UserDTO> findAllUsersDtos () {

		return userService.getAllUsers();

	}
	
	
	@GetMapping(path = "/signup/{mail}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody boolean checkUserExist (@PathVariable String mail) {

		return userService.checkUserExist(mail);

	}
	
	
	
	

}
