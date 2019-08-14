package com.cinephilia.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.cinephilia.dto.UserDTO;
import com.cinephilia.helper.ModelMapperConverter;
import com.cinephilia.helper.PasswordEncryption;
import com.cinephilia.persistence.entity.UserEntity;
import com.cinephilia.persistence.repository.UserRepository;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class UserService {
	
	@Autowired	
	 private UserRepository userRepository ;	
	
	
	
	public UserDTO createUser (UserDTO newUser) {
		
		newUser.setPassword(PasswordEncryption.encryptionPass(newUser.getPassword()));
		
		UserEntity userEntity =   ModelMapperConverter.convertToEntity(newUser, UserEntity.class) ;
		
		 UserEntity newUserCreatedEntity = userRepository.save(userEntity);
		 
		 return  ModelMapperConverter.convertToDTO(newUserCreatedEntity , UserDTO.class);
		
	}
	

	
	public List <UserDTO>  getAllUsers() {
		
		
		List<UserEntity> usersEntities =  userRepository.findAll(Sort.by(Sort.Direction.ASC, "lastName"));
		
		
		return usersEntities.stream().map(user -> ModelMapperConverter.convertToDTO(user, UserDTO.class)).collect(Collectors.toList());
		
	}
	
	
	public boolean checkUserExist( String mail) {
		 
		 
		return userRepository.existsById(mail);
	} 
	
	
}
