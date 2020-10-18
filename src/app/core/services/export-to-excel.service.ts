import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {

  constructor(private datePipe: DatePipe) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    for(let i = 0 ; i < json.length; i++ ){
      let runAOH = json[i]["runAOH"] != "" && json[i]["runAOH"] != undefined ? json[i]["runAOH"] : 0
      console.log(" "+i+" "+runAOH)
      let runEFHi = json[i]["runEFHi"] != "" && json[i]["runEFHi"] != undefined ? json[i]["runEFHi"] : 0
      let totalAOH = json[i]["totalAOH"] != "" && json[i]["totalAOH"] != undefined ? json[i]["totalAOH"]: 0
      let totalEFHi = json[i]["totalEFHi"] != "" && json[i]["totalEFHi"] != undefined ? json[i]["totalEFHi"]: 0
      let sinceAOH = json[i]["sinceAOH"] != "" && json[i]["sinceAOH"] != undefined ? json[i]["sinceAOH"]: 0
      let sinceEFHi = json[i]["sinceEFHi"] && json[i]["sinceEFHi"] != undefined ? json[i]["sinceEFHi"]: 0

      json[i]["runAOH"] = json[i]["runAOH"] != "" && json[i]["runAOH"] != undefined ? this.twoDecimalFormat(runAOH): json[i]["runAOH"]
      json[i]["runEFHi"] = json[i]["runEFHi"] != "" && json[i]["runEFHi"] != undefined ? this.twoDecimalFormat(runEFHi): json[i]["runEFHi"]
      json[i]["totalAOH"] = json[i]["totalAOH"] != "" && json[i]["totalAOH"] != undefined ? this.twoDecimalFormat(totalAOH): json[i]["totalAOH"]
      json[i]["totalEFHi"] = json[i]["totalEFHi"] != "" && json[i]["totalEFHi"] != undefined ? this.twoDecimalFormat(totalEFHi): json[i]["totalEFHi"]
      json[i]["sinceAOH"] = json[i]["sinceAOH"] != "" && json[i]["sinceAOH"] != undefined ? this.twoDecimalFormat(sinceAOH): json[i]["sinceAOH"]
      json[i]["sinceEFHi"] = json[i]["sinceEFHi"] && json[i]["sinceEFHi"] != undefined ? this.twoDecimalFormat(sinceEFHi): json[i]["sinceEFHi"]
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile( excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '-' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + EXCEL_EXTENSION);
  }

  twoDecimalFormat(value){
    var n = value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    return n;
  }
}
