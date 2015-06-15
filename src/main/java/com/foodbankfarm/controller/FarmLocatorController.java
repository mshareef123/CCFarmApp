package com.foodbankfarm.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbankfarm.transfer.Farm;

@RestController("farmLocatorController")
public class FarmLocatorController {
	
	@RequestMapping(value = "/")
	public String hi(){
		return "hi";
	}
	@RequestMapping(value = "/listing")
	public List<Farm> getFarmlisting(){
		List<Farm> farms = new ArrayList<>();
		farms.add(new Farm("Paoli Farm", "Paoli, PA", new String[]{"milk","eggs","honey"}));
		farms.add(new Farm("Malvern Farm", "Malvern, PA", new String[]{"milk","eggs","corn"}));
		return farms;
	}


}
