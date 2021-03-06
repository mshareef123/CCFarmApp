package com.foodbankfarm.transfer;



public class FarmTO {

private Integer id;

private String farmName;

private String address;

private String city;

private String state;

private String zip;

private String phone;

private String website;

private boolean  foodBankPartner;

private boolean acceptsSNAPEBT;

private String[] typeofOperation;

private String[] products;

private String[] specialDesignation;

private Double longitude;

private Double latitude;


public FarmTO(Integer id,String farmName, String address, String[] products) {

super();

this.id = id;

this.farmName = farmName;

this.address = address;

this.products = products;

}

public FarmTO() {

super();

}


public Integer getId() {

return id;

}

public void setId(Integer id) {

this.id = id;

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

public String getCity() {

return city;

}

public void setCity(String city) {

this.city = city;

}

public String getState() {

return state;

}

public void setState(String state) {

this.state = state;

}

public String getZip() {

return zip;

}

public void setZip(String zip) {

this.zip = zip;

}

public String getPhone() {

return phone;

}

public void setPhone(String phone) {

this.phone = phone;

}

public String getWebsite() {

return website;

}

public void setWebsite(String website) {

this.website = website;

}

public boolean isFoodBankPartner() {

return foodBankPartner;

}

public void setFoodBankPartner(boolean foodBankPartner) {

this.foodBankPartner = foodBankPartner;

}



public boolean isAcceptsSNAPEBT() {

return acceptsSNAPEBT;

}

public void setAcceptsSNAPEBT(boolean acceptsSNAPEBT) {

this.acceptsSNAPEBT = acceptsSNAPEBT;

}



public String[] getTypeOfOperation() {

return typeofOperation;

}

public void setTypeOfOperation(String[] typeOfOperation) {

this.typeofOperation = typeOfOperation;

}

public Double getLongitude() {

return longitude;

}

public void setLongitude(Double longitude) {

this.longitude = longitude;

}

public Double getLatitude() {

return latitude;

}

public void setLatitude(Double latitude) {

this.latitude = latitude;

}

public String[] getProducts() {

return products;

}

public void setProducts(String[] products) {

this.products = products;

}



public String[] getDesignation() {

return specialDesignation;

}


public void setDesignation(String[] specialDesignation) {

this.specialDesignation = specialDesignation;

}


}