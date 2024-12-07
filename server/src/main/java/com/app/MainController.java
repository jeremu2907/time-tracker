package com.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import java.util.Optional;

@Controller
@RequestMapping(path = "/date-entry")
public class MainController {

    @Autowired
    private DateEntryRepository dateEntryRepository;

    @GetMapping(path = "")
    public @ResponseBody ResponseEntity<?> ping() {
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/all")
    public @ResponseBody ResponseEntity<?> all() {
        return ResponseEntity.ok(
                dateEntryRepository.findAll()
        );
    }

    @PostMapping(path = "/post")
    public @ResponseBody ResponseEntity<?> post (
            @RequestBody DateEntry entry
    ) {
        DateEntry dateEntry = new DateEntry();
        dateEntry.setStartTime(entry.getStartTime());
        dateEntryRepository.save(dateEntry);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/patch")
    public @ResponseBody ResponseEntity<?> patch (
            @RequestBody DateEntry entry
    ) {
        Optional<DateEntry> dateEntry = dateEntryRepository.findById(entry.getId());

        if(dateEntry.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        if(!dateEntry.get().getStartTime().equals(entry.getStartTime())) {
            dateEntry.get().setStartTime(entry.getStartTime());
        }

        if(!dateEntry.get().getEndTime().equals(entry.getEndTime())) {
            dateEntry.get().setEndTime(entry.getEndTime());
        }

        dateEntryRepository.save(dateEntry.get());

        return ResponseEntity.ok(dateEntry.get());
    }
}
