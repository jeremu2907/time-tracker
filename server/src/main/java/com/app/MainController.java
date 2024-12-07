package com.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.Nested;
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
            @RequestBody RequestBodyType.TimeZone timeZone
    ) {
        DateEntry dateEntry = new DateEntry();
        dateEntry.updateStartTimeToNow(timeZone.zone);
        dateEntry.updateEndTimeToNow(timeZone.zone);
        dateEntryRepository.save(dateEntry);
        return ResponseEntity.ok(dateEntry);
    }

    @PatchMapping(path = "/patch")
    public @ResponseBody ResponseEntity<?> patch (
            @RequestBody RequestBodyType.EntryAndZone entryAndZone
    ) {
        Optional<DateEntry> dateEntry = dateEntryRepository.findById(entryAndZone.id);

        if(dateEntry.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        dateEntry.get().updateEndTimeToNow(entryAndZone.zone);

        dateEntryRepository.save(dateEntry.get());

        return ResponseEntity.ok(dateEntry.get());
    }

    @PutMapping(path = "/put")
    public @ResponseBody ResponseEntity<?> put (
            @RequestBody RequestBodyType.EntryAndZone entryAndZone
    ) {
        Optional<DateEntry> dateEntry = dateEntryRepository.findById(entryAndZone.id);

        if(dateEntry.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        dateEntry.get().updateStartTimeToNow(entryAndZone.zone);
        dateEntry.get().updateEndTimeToNow(entryAndZone.zone);

        dateEntryRepository.save(dateEntry.get());

        return ResponseEntity.ok(dateEntry.get());
    }
}
