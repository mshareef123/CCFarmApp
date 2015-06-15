package com.foodbankfarm.transfer;

public class Farm {
	String farmName;
	String address;
	String[] products;
	
	public Farm(String farmName, String address, String[] products) {
		super();
		this.farmName = farmName;
		this.address = address;
		this.products = products;
	}
	public Farm() {	
		super();
	}
	public String getFarmName() {
		return farmName;
	}
	public void setFarmName(String farmName) {
		this.farmName = farmName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String[] getProducts() {
		return products;
	}
	public void setProducts(String[] products) {
		this.products = products;
	}
	
}