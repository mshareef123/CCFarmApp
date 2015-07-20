package com.foodbankfarm.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbankfarm.transfer.FarmTO;
import com.foodbankfarm.xlsxreadwrite.XLSXReader;

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
	private List<FarmTO> getFarmsFromDB(){
		XLSXReader reader = new XLSXReader();
		return reader.parseFarms();
	}
	private List<FarmTO> getMockFarms(){
		/**************** getting long and lat from following google geocoding api******************
		* http://maps.googleapis.com/maps/api/geocode/json?address=%223226%20Limestone%20Rd.,Cochranville,PA%22&sensor=false
		*********************************************************************************************/
		List<FarmTO> farms = new ArrayList<FarmTO>();
		FarmTO farm = new FarmTO(1,"Paradocx Vineyard", "1833 Flint Hill Rd.", new String[]{"wine"});
		farm.setWebsite("www.paradocx.com");
		farm.setPhone("610-255-5684");
		farm.setZip("19350");
		farm.setState("PA");
		farm.setCity("Landenberg");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(false);
		farm.setLongitude(39.770102);
		farm.setLatitude(-75.811791);
		farms.add(farm);
		
		farm = new FarmTO(2,"North Star Orchard", "3226 Limestone Rd.", new String[]{"CSA", "fruit", "vegetables"});
		farm.setWebsite("www.northstarorchard.com");
		farm.setPhone("610-593-0314");
		farm.setZip("19330");
		farm.setState("PA");
		farm.setCity("Cochranville");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(true);
		farm.setLongitude(39.8967412);
		farm.setLatitude(-75.9146846);

		farms.add(farm);

		farm = new FarmTO(3,"Pete's Produce Farm at Westtown School", "1225 East Street Rd.", new String[]{"cheese", "eggs", "fruit", "honey", "meat", "vegetables", "CSA"});
		farm.setWebsite("www.petesproducefarm.com");
		farm.setPhone("610-399-3711");
		farm.setZip("19382");
		farm.setState("PA");
		farm.setCity("West Chester");
		farm.setAcceptsSNAPEBT(true);
		farm.setFoodBankPartner(true);
		farm.setLongitude(39.9393476);
		farm.setLatitude(-75.5354205);

		farms.add(farm);

		farm = new FarmTO(4,"Anselma Farmers’ and Artisans’ Market", "1730 Conestoga Rd.", new String[]{"cheese", "eggs", "fruit", "meat", "vegetables", "Farmers' Market"});
		farm.setWebsite("www.anselmamill.org");
		farm.setPhone("610-827-1906");
		farm.setZip("19425");
		farm.setState("PA");
		farm.setCity("Chester Springs");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(false);
		farm.setLongitude(40.0811935);
		farm.setLatitude(-75.64406169999999);
		farms.add(farm);

		farm = new FarmTO(5,"Artisan Exchange West Chester", "208 Carter Drive Suite 13-B", new String[]{"cheese", "eggs", "fruit", "meat", "vegetables", "Farmers' Market"});
		farm.setWebsite("www.artisanexchangewcpa.com");
		farm.setPhone("610-719-0232");
		farm.setZip("19382");
		farm.setState("PA");
		farm.setCity("West Chester");
		farm.setAcceptsSNAPEBT(false);
		farm.setFoodBankPartner(false);
		farm.setLongitude(39.9489353);
		farm.setLatitude(-75.5879947);
		farms.add(farm);

		return farms;
	}


}
