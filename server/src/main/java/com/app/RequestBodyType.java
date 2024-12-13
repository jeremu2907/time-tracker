package com.app;

import java.util.Optional;

public class RequestBodyType {
    public static class DateEntryRequestBody {
        public String date;
        public String startTime;
        public String endTime;
//        public String note;
    }

    public static class DateEntryRequestBodyWithId {
        public Long id;
        public String date;
        public String startTime;
        public String endTime;
//        public String note;
    }
}
