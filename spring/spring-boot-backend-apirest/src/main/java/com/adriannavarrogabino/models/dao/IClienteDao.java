package com.adriannavarrogabino.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adriannavarrogabino.models.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

}
