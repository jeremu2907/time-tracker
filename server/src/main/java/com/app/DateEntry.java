package com.app;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
public class DateEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private long startTime;

    @Column(nullable = false)
    private long endTime;

    @Column(nullable = false)
    private int zone;

    public long getId() {
        return this.id;
    }

    public void setZone(int zone) {
        this.zone = zone;
    }

    public int getZone() {
        return this.zone;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    public long getStartTime() {
        return this.startTime;
    }

    public void setEndTime(long endTime) {
        this.endTime = endTime;
    }

    public long getEndTime() {
        return this.endTime;
    }

    public void updateStartTimeToNow() {
        setStartTime(Instant.now().getEpochSecond());
    }

    public void updateEndTimeToNow() {
        setEndTime(Instant.now().getEpochSecond());
    }

    @Override
    public String toString() {
        // Parse the timestamp string into ZonedDateTime
        ZonedDateTime startTimeLocal = ZonedDateTime.ofInstant(
                Instant.ofEpochSecond(this.startTime),
                ZoneOffset.ofHours(this.zone).normalized()
        );
        ZonedDateTime endTimeLocal = ZonedDateTime.ofInstant(
                Instant.ofEpochSecond(this.endTime),
                ZoneOffset.ofHours(this.zone).normalized()
        );

        // Define the desired output format
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM dd yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        // Format the converted time
        String formattedDate = startTimeLocal.format(dateFormatter);
        String formattedStartTime = startTimeLocal.format(timeFormatter);
        String formattedEndTime = endTimeLocal.format(timeFormatter);

        // Output the result
        return formattedDate + ", " + formattedStartTime + ", " + formattedEndTime + "\n";
    }
}
