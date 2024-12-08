package com.app;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface DateEntryRepository extends CrudRepository<DateEntry, Long>{

    List<DateEntry> findAll(Sort sort);
}
