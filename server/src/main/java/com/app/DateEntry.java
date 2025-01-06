package com.app;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

// Each row is assumed to be in local date time, not normalized to UTC + z

@Entity
public class DateEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String startTime;

    @Column
    private String endTime;

    @Column(nullable = true)
    private String note;

    public Long getId() {
        return this.id;
    }

    public DateEntry setDate(String date) {
        this.date = date;
        return this;
    }

    public String getDate() {
        return date;
    }

    public DateEntry setStartTime(String startTime) {
        this.startTime = startTime;
        return this;
    }

    public String getStartTime() {
        return this.startTime;
    }

    public DateEntry setEndTime(String endTime) {
        this.endTime = endTime;
        return this;
    }

    public String getEndTime() {
        return this.endTime;
    }

    public DateEntry setNote(String note) {
        this.note = note;
        return this;
    }

    public String getNote() {
        return this.note;
    }

    @Override
    public String toString() {
        String[] startTimeHHmm = startTime.split(":");
        String[] endTimeHHmm = endTime.split(":");
        Float startTimeHour = Float.parseFloat(startTimeHHmm[0]) + (Float.parseFloat(startTimeHHmm[1])/60.0f);
        Float endTimeHour = Float.parseFloat(endTimeHHmm[0]) + (Float.parseFloat(endTimeHHmm[1])/60.0f);
        Float duration = endTimeHour - startTimeHour;
        String formattedDuration = String.format("%.2f", duration);
        return date + ", " + startTime + ", " + endTime + ", " + formattedDuration + ", " + note + "\n";
    }
}
