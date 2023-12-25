// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// // export class ExcelService {
// //   constructor() { }

// //   generateExcel(data: any[], fileName: string) {
// //     const workbook = new ExcelJS.Workbook();
// //     const worksheet = workbook.addWorksheet('Sheet 1');

// //     // Add data to the worksheet
// //     data.forEach((row) => {
// //       worksheet.addRow(row);
// //     });

// //     // Generate the Excel file
// //     workbook.xlsx.writeBuffer().then((buffer) => {
// //       this.saveAsExcelFile(buffer, fileName);
// //     });
// //   }

// //   private saveAsExcelFile(buffer: any, fileName: string) {
// //     const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// //     const downloadLink = document.createElement('a');
// //     const url = window.URL.createObjectURL(data);
    
// //     downloadLink.href = url;
// //     downloadLink.download = fileName + '.xlsx';
// //     downloadLink.click();
// //     window.URL.revokeObjectURL(url);
// //   }
// //}
