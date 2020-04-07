package com.adriannavarrogabino.models.services;

import com.adriannavarrogabino.models.entity.Usuario;

public interface IUsuarioService {
	
	public Usuario findByUsername(String username);
}
