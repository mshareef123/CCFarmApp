package com.foodbankfarm.xlsxreadwrite;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.foodbankfarm.transfer.FarmTO;

public class XLSXReader {

	private static int NAME_COL = 0;
	private static int STREET_COL = 1;
	private static int CITY_COL = 2;
	private static int STATE_COL = 3;
	private static int ZIP_COL = 4;
	private static int PHONE_COL = 5;
	private static int WEBSITE_COL = 6;
	private static int SPECIALITIES_COL = 7;
	private static int PRODUCTS_COL = 9;
	private static int LATITUDE_COL = 10;
	private static int LONGITUDE_COL = 11;
	
	/*
	 0 Farm/Business Name	
	 1 Street Address	
	 2 City	
	 3 State	
	 4 Zip	
	 5 Phone	
	 6 Website	
	 7 Specialties 	
	 8 Products	
	 9 Latitude	
	 10 Longitude

	 */
	public List<FarmTO> parseFarms() { 
		List<FarmTO> farms = new ArrayList<FarmTO>();
		File myFile = new File("resources/FarmAppData.xlsx");
		try {
			FileInputStream fis = new FileInputStream(myFile);
			XSSFWorkbook workBook = new XSSFWorkbook (fis);
			XSSFSheet sheet = workBook.getSheetAt(0);
			Iterator<Row> rowIterator = sheet.iterator();
			rowIterator.next();
			int id = 1;
			while (rowIterator.hasNext()) { 
				FarmTO farm = new FarmTO();
				Row row = rowIterator.next(); 
				String farmName = row.getCell(NAME_COL).getStringCellValue();			
				String street = row.getCell(STREET_COL).getStringCellValue();
				String city = row.getCell(CITY_COL).getStringCellValue();
				String state = row.getCell(STATE_COL).getStringCellValue();
				Cell zipCell = row.getCell(ZIP_COL);
				String zip;
				if (zipCell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
					zip = String.valueOf(zipCell.getNumericCellValue());
				} else {
					zip = zipCell.getStringCellValue();
				}
				String phone = row.getCell(PHONE_COL).getStringCellValue();
				String website = row.getCell(WEBSITE_COL).getStringCellValue();
				String specialities = row.getCell(SPECIALITIES_COL).getStringCellValue();
				String products = row.getCell(PRODUCTS_COL).getStringCellValue();
				Cell latCell = row.getCell(LATITUDE_COL);
				Double lat = latCell.getNumericCellValue();
				Cell lngCell = row.getCell(LONGITUDE_COL);
				Double lng = lngCell.getNumericCellValue();
				
				farm.setFarmName(farmName);
				farm.setAddress(street);
				farm.setCity(city);
				farm.setId(id);
				farm.setLatitude(lat);
				farm.setLongitude(lng);
				farm.setPhone(phone);
				farm.setProducts(products.split(","));
				farm.setSpecialities(specialities.split(","));
				farm.setState(state);
				farm.setWebsite(website);
				farm.setZip(zip);
				farms.add(farm);
				id++;
			}
			//write(myFile, workBook);
			workBook.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return farms;
	}
	
	private void write(File file, XSSFWorkbook workBook) { 
		FileOutputStream outputStream;
		try {
			outputStream = new FileOutputStream(file);
			workBook.write(outputStream);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
