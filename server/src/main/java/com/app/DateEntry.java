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
    private long id;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String startTime;

    @Column
    private String endTime;

    @Column(nullable = true)
    private String note;

    public long getId() {
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

    @Override
    public String toString() {
        return date + ", " + startTime + ", " + endTime + ", "  + note + "\n";
    }
}
