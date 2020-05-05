import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
	providedIn: 'root'
})
export class ExcelService {
	//https://medium.com/@madhavmahesh/exporting-an-excel-file-in-angular-927756ac9857
	//https://codigofuente.io/tutorial-de-sheetjs-crear-archivo-excel-con-javascript/
	constructor() { }
	public exportAsExcelFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}
	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
	}

	public exportAsExcelBook(mapBookExcel:Map<String,Array<any>>) {
		
		var wb = XLSX.utils.book_new();
		wb.Props = {
			Title: "Monitoreo fase 2",
			Subject: "Test",
			Author: "R32",
			CreatedDate: new Date(2020, 12, 19)
		};
		let a = mapBookExcel.entries();
		for (let nextValue = a.next(); nextValue.done !== true; nextValue = a.next()) {
			wb.SheetNames.push(nextValue.value[0]+"");
			wb.Sheets[nextValue.value[0]+""] = XLSX.utils.json_to_sheet(nextValue.value[1]);
		}

		var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		this.saveAsExcelFile(wbout, "excelFileName");
	}
	public book() {
		var wb = XLSX.utils.book_new();
		wb.Props = {
			Title: "Monitoreo fase 2",
			Subject: "Test",
			Author: "R32",
			CreatedDate: new Date(2020, 12, 19)
		};

		wb.SheetNames.push("Test Sheet");
		
		wb.SheetNames.push("hoja dos");


		var ws_data = [['hello', 'world']];
		var data: any = [{
			eid: 'e101',
			ename: 'ravi',
			esal: 1000
		}, {
			eid: 'e102',
			ename: 'ram',
			esal: 2000
		}, {
			eid: 'e103',
			ename: 'rajesh',
			esal: 3000
		}];

		var ws = XLSX.utils.aoa_to_sheet(ws_data);
		var ws2 = XLSX.utils.json_to_sheet(data);

		wb.Sheets["Test Sheet"] = ws;
		wb.Sheets["hoja dos"] = ws2;

		var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

		this.saveAsExcelFile(wbout, "excelFileName");
	}
}