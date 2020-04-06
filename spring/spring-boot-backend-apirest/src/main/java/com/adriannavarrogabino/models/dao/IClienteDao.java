package com.adriannavarrogabino.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.adriannavarrogabino.models.entity.Cliente;
import com.adriannavarrogabino.models.entity.Region;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

	@Query("from Region")
	public List<Region> findAllRegiones();
}
