package com.foodbankfarm.xlsxreadwrite;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;

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
	private static int TYPE_OF_OPP_COL = 7;
	private static int SPECIALTIES_COL = 8;
	private static int SPECIAL_DESIGNATION_COL = 9;
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
	 7 type of operation
	 8 Specialities 	
	 9 special designation
	 10 Latitude	
	 11 Longitude

	 */
	
	public List<FarmTO> parseFarms(ServletContext context) { 
		List<FarmTO> farms = new ArrayList<FarmTO>();
		InputStream in = null;

		try {
 		    in = context.getResourceAsStream("/src/main/resources/FarmAppData.xlsx"); // example
			XSSFWorkbook workBook = new XSSFWorkbook (in);
			XSSFSheet sheet = workBook.getSheetAt(0);
			Iterator<Row> rowIterator = sheet.iterator();
			rowIterator.next();
			int id = 1;
			while (rowIterator.hasNext()) { 
				FarmTO farm = new FarmTO();
				Row row = rowIterator.next(); 
				String farmName = row.getCell(NAME_COL).getStringCellValue();	
				if(!farmName.trim().equals("")){
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
				String specialities = row.getCell(SPECIALTIES_COL).getStringCellValue();
				String typeOfOpp = row.getCell(TYPE_OF_OPP_COL).getStringCellValue();
				String specialDesignation = row.getCell(SPECIAL_DESIGNATION_COL).getStringCellValue();
				Cell latCell = row.getCell(LATITUDE_COL);
				latCell.setCellType(Cell.CELL_TYPE_STRING); 
//				if(latCell.getCellType() == Cell.CELL_TYPE_NUMERIC){
				if(!latCell.getStringCellValue().trim().equals("")){
//					System.out.println(latCell.getStringCellValue());
					Double lat = Double.valueOf(latCell.getStringCellValue());
					farm.setLatitude(lat);
				}
				//}
				Cell lngCell = row.getCell(LONGITUDE_COL);
				lngCell.setCellType(Cell.CELL_TYPE_STRING); 

				if(!lngCell.getStringCellValue().trim().equals("")){
//				if(lngCell.getCellType() == Cell.CELL_TYPE_NUMERIC){
//					System.out.println(lngCell.getStringCellValue());

				Double lng = Double.valueOf(lngCell.getStringCellValue());
				farm.setLongitude(lng);
				}
				//}
				
				farm.setFarmName(farmName);
				farm.setAddress(street);
				farm.setCity(city);
				farm.setId(id);
				farm.setPhone(phone);
				farm.setProducts(cleanData(specialities));
				farm.setTypeOfOperation(cleanData(typeOfOpp));
				farm.setDesignation(cleanData(specialDesignation));
				farm.setState(state);
				farm.setWebsite(website);
				farm.setZip(zip);
				farms.add(farm);
				id++;
				}else{
					break;
				}
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
	private String[] cleanData(String input){
		String[] list = input.split(",");
		String result[] = new String[list.length];
		int i = 0;
		for(String str:list){
			result[i] = str.trim().toLowerCase();
			i++;
		}
		return result;
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

