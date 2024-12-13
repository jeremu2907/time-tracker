package com.app;

public class RequestBodyType {
     public static class TimeZone {
        public int zone;
    }

    public static class EntryAndZone {
         public long id;
         public int zone;
         public long startTime;
         public long endTime;
    }
}
