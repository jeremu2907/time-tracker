package com.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
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
                dateEntryRepository.findAll(Sort.by(Sort.Direction.DESC, "date", "startTime"))
        );
    }

    @GetMapping(path = "/month")
    public @ResponseBody ResponseEntity<?> month(
            @RequestParam("year") int year,
            @RequestParam("month") int month
    ) {
        Iterable<DateEntry> dateEntries = dateEntryRepository.findByDateStartingWith(
                FormatUtils.yearMonthFormat(year, month),
                Sort.by(Sort.Direction.DESC, "date", "startTime")
        );

        return ResponseEntity.ok(dateEntries);
    }

    @GetMapping(path = "csv")
    public @ResponseBody ResponseEntity<?> csv() throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Writer writer = new OutputStreamWriter(byteArrayOutputStream);

        Iterable<DateEntry> dateEntries = dateEntryRepository.findAll();
        for(DateEntry entry : dateEntries) {
            writer.write(entry.toString());
        }

        writer.flush();

        // Prepare the response
        byte[] csvBytes = byteArrayOutputStream.toByteArray();

        // Set headers and return the CSV file as a downloadable attachment
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=data.csv")
                .header(HttpHeaders.CONTENT_TYPE, "text/csv")
                .body(csvBytes);
    }

    @DeleteMapping(path = "/delete")
    public @ResponseBody ResponseEntity<?> delete (
            @RequestParam long id
    ) {
        dateEntryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(path = "/post")
    public @ResponseBody ResponseEntity<?> post (
            @RequestBody RequestBodyType.TimeZone timeZone
    ) {
        DateEntry dateEntry = new DateEntry();
        dateEntry.updateStartTimeToNow();
        dateEntry.updateEndTimeToNow();
        dateEntry.setZone(timeZone.zone);

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

        dateEntry.get().updateEndTimeToNow();

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

        dateEntry.get().setStartTime(entryAndZone.startTime);
        dateEntry.get().setEndTime(entryAndZone.endTime);
        dateEntry.get().setZone(entryAndZone.zone);

        dateEntryRepository.save(dateEntry.get());

        return ResponseEntity.ok(dateEntry.get());
    }
}
