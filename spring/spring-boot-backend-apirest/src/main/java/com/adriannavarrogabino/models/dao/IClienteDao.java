package com.adriannavarrogabino.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.adriannavarrogabino.models.entity.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long> {

}
