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

    @GetMapping(path = "/by-year-month")
    public @ResponseBody ResponseEntity<?> month(
            @RequestParam("year") String year,
            @RequestParam("month") String month
    ) {
        Iterable<DateEntry> dateEntries = dateEntryRepository.findByDateStartingWith(
                FormatUtils.yearMonthFormat(year, month),
                Sort.by(Sort.Direction.DESC, "date", "startTime")
        );

        return ResponseEntity.ok(dateEntries);
    }

    @GetMapping(path = "csv")
    public @ResponseBody ResponseEntity<?> csv(
            @RequestParam("year") String year,
            @RequestParam("month") String month
    ) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Writer writer = new OutputStreamWriter(byteArrayOutputStream);

        Iterable<DateEntry> dateEntries = dateEntryRepository.findByDateStartingWith(
                FormatUtils.yearMonthFormat(year, month),
                Sort.by(Sort.Direction.DESC, "date", "startTime")
        );

        for (DateEntry entry : dateEntries) {
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
    public @ResponseBody ResponseEntity<?> delete(
            @RequestParam long id
    ) {
        dateEntryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(path = "/post")
    public @ResponseBody ResponseEntity<?> post(
            @RequestBody RequestBodyType.DateEntryRequestBody body
    ) {
        DateEntry dateEntry = new DateEntry();
        dateEntry.setDate(body.date).setStartTime(body.startTime).setEndTime(body.endTime);

        dateEntryRepository.save(dateEntry);

        return ResponseEntity.ok(dateEntry);
    }

    @PatchMapping(path = "/patch")
    public @ResponseBody ResponseEntity<?> patch(
            @RequestBody RequestBodyType.DateEntryRequestBodyWithId body
    ) {
        Optional<DateEntry> result = dateEntryRepository.findById(body.id);

        if (result.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        DateEntry dateEntry = result.get();

        if(!body.date.equals(dateEntry.getDate())) {
            dateEntry.setDate(body.date);
        }
        if(!body.startTime.equals(dateEntry.getStartTime())) {
            dateEntry.setStartTime(body.startTime);
        }
        if(!body.endTime.equals(dateEntry.getEndTime())) {
            dateEntry.setEndTime(body.endTime);
        }

        dateEntryRepository.save(dateEntry);

        return ResponseEntity.ok(dateEntry);
    }

    @PutMapping(path = "/put")
    public @ResponseBody ResponseEntity<?> put(
            @RequestBody RequestBodyType.DateEntryRequestBodyWithId body
    ) {
        Optional<DateEntry> result = dateEntryRepository.findById(body.id);

        if (result.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        DateEntry dateEntry = result.get();

        dateEntry.setDate(body.date).setStartTime(body.startTime).setEndTime(body.endTime);

        dateEntryRepository.save(dateEntry);

        return ResponseEntity.ok(dateEntry);
    }
}
