package com.app;

import jakarta.persistence.*;

import java.time.*;
import java.time.format.DateTimeFormatter;

@Entity
public class DateEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String startTime;

    @Column(nullable = false)
    private String endTime;

    public Integer getId() {
        return this.id;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getStartTime() {
        return this.startTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getEndTime() {
        return this.endTime;
    }

    public void updateStartTimeToNow(int z) {
        OffsetDateTime now = OffsetDateTime.now(ZoneOffset.ofHours(z));
        setStartTime(now.toString());
    }

    public void updateEndTimeToNow(int z) {
        OffsetDateTime now = OffsetDateTime.now(ZoneOffset.ofHours(z));
        setEndTime(now.toString());
    }

    @Override
    public String toString() {
        // Parse the timestamp string into ZonedDateTime
        ZonedDateTime originalStartTime= ZonedDateTime.parse(this.startTime);
        ZonedDateTime originalEndTime= ZonedDateTime.parse(this.endTime);

        // Convert to the desired time zone (example: UTC)
        ZoneId targetZone = ZoneId.of(originalStartTime.getZone().toString());  // You can change this to any time zone of interest
        ZonedDateTime convertedStartTime = originalStartTime.withZoneSameInstant(targetZone);
        ZonedDateTime convertedEndTime = originalEndTime.withZoneSameInstant(targetZone);

        // Define the desired output format
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM dd yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        // Format the converted time
        String formattedDate = convertedStartTime.format(dateFormatter);
        String formattedStartTime = convertedStartTime.format(timeFormatter);
        String formattedEndTime = convertedEndTime.format(timeFormatter);

        // Output the result
        return formattedDate + ", " + formattedStartTime + ", " + formattedEndTime + "\n";
    }
}
