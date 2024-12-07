package com.app;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Date;

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
}
