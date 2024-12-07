package com.app;

public class RequestBodyType {
     public static class TimeZone {
        public int zone;
    }

    public static class EntryAndZone {
         public Integer id;
         public int zone;
         public String startTime;
         public String endTime;
    }
}
