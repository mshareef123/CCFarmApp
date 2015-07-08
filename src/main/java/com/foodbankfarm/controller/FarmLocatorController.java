package com.foodbankfarm.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbankfarm.transfer.FarmTO;

@RestController("farmLocatorController")
public class FarmLocatorController {
	
	@RequestMapping(value = "/")
	public String hi(){
		return "hi";
	}
	@RequestMapping(value = "/listing")
	public List<FarmTO> getFarmlisting(){
		
		return getMockFarms();
	}
	
	private List<FarmTO> getMockFarms(){
		List<FarmTO> farms = new ArrayList<FarmTO>();
		FarmTO farm = new FarmTO(1,"Paradocx Vineyard", "1833 Flint Hill Rd.", new String[]{"wine"});
		farm.setWebsite("www.paradocx.com");
		farm.setPhone("610-255-5684");
		farm.setZip("19350");
		farm.setState("PA");
		farm.setCity("Landenberg");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(false);
		farms.add(farm);
		
		farm = new FarmTO(2,"North Star Orchard", "3226 Limestone Rd.", new String[]{"CSA", "fruit", "vegetables"});
		farm.setWebsite("www.northstarorchard.com");
		farm.setPhone("610-593-0314");
		farm.setZip("19330");
		farm.setState("PA");
		farm.setCity("Cochranville");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(true);
		farms.add(farm);

		farm = new FarmTO(3,"Pete's Produce Farm at Westtown School", "1225 East Street Rd.", new String[]{"cheese", "eggs", "fruit", "honey", "meat", "vegetables", "CSA"});
		farm.setWebsite("www.petesproducefarm.com");
		farm.setPhone("610-399-3711");
		farm.setZip("19382");
		farm.setState("PA");
		farm.setCity("West Chester");
		farm.setAcceptsSNAPEBT(true);
		farm.setFoodBankPartner(true);
		farms.add(farm);

		farm = new FarmTO(4,"Anselma Farmers’ and Artisans’ Market", "1730 Conestoga Rd.", new String[]{"cheese", "eggs", "fruit", "meat", "vegetables", "Farmers' Market"});
		farm.setWebsite("www.anselmamill.org");
		farm.setPhone("610-827-1906");
		farm.setZip("19425");
		farm.setState("PA");
		farm.setCity("Chester Springs");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(false);
		farms.add(farm);

		farm = new FarmTO(5,"Artisan Exchange West Chester", "208 Carter Drive Suite 13-B", new String[]{"cheese", "eggs", "fruit", "meat", "vegetables", "Farmers' Market"});
		farm.setWebsite("www.artisanexchangewcpa.com");
		farm.setPhone("610-719-0232");
		farm.setZip("19382");
		farm.setState("PA");
		farm.setCity("West Chester");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(false);
		farms.add(farm);

		return farms;
	}


}
