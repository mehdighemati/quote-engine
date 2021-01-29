package com.shutl.controller;

import com.shutl.model.Quote;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class QuoteController {

    

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/quote", method = POST)
    public @ResponseBody Quote quote(@RequestBody Quote quote) {
        HashMap<String, Double> markup = new HashMap<String, Double>();
        markup.put("bicycle", 1.1);
        markup.put("motorbike", 1.15);
        markup.put("parcel_car", 1.2);
        markup.put("small_van", 1.3);
        markup.put("large_van", 1.4);

        Long price = Math.abs((Long.valueOf(quote.getDeliveryPostcode(), 36) - Long.valueOf(quote.getPickupPostcode(), 36))/100000000);

        if (quote.getVehicleType() != null) {
            Long markupPrice = Math.round(price * markup.get(quote.getVehicleType()));
            return new Quote(quote.getPickupPostcode(), quote.getDeliveryPostcode(),quote.getVehicleType(), markupPrice);
        }
        else {
            return new Quote(quote.getPickupPostcode(), quote.getDeliveryPostcode(), price);
        }
    }
}
