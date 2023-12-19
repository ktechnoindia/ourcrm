  import { Component, OnInit, ViewChild } from '@angular/core';
  import { CommonModule, formatDate } from '@angular/common';
  import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
  import { IonicModule, ToastController } from '@ionic/angular';
  import { Router, RouterModule } from '@angular/router';
  import { QuotationService, quotestore } from '../services/quotation.service';
  import { GsttypeService } from '../services/gsttype.service';
  import { UnitnameService } from '../services/unitname.service';
  import { AdditemService } from '../services/additem.service';
  import { CustomerService } from '../services/customer.service';
  import { EncryptionService } from '../services/encryption.service';
  import { Observable } from 'rxjs';
  import { FormValidationService } from '../form-validation.service';

  interface Quote {
    posttax: number;
    pretax: number;
    barcode: string;
    itemcode: number;
    itemname: number,
    description: string;
    quantity: number;
    unitname: number;
    mrp: number;
    basicrate: number;
    netrate: number;
    grossrate: number;
    taxrate: number;
    CGST: number;
    SGST: number;
    IGST: number;
    discount: number;
    discountamt: number;
    totaltax: number;
    total: number;
    taxrate1: number;
    itemid:number;
  }

  @Component({
    selector: 'app-add-quot',
    templateUrl: './add-quot.page.html',
    styleUrls: ['./add-quot.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterModule, FormsModule, // Add this line
      ReactiveFormsModule]
  })
  export class AddQuotPage implements OnInit {
    gstTypes: any[] = [];

    @ViewChild('firstInvalidInput') firstInvalidInput: any;

    billformate: number = 0;
    quoteNumber: number = 0;
    quateDate: string = '';
    custcode: string = '';
    custname: number = 0;
    refrence: string = '';
    refdate: string = '';

    //table data
    /*barcode: string = '';
    itemcode: string = '';
    itemname: number = 0;
    description: string = '';
    quantity: string = '';
    unitname: number = 0;
    mrp: string = '';
    basicrate: string = '';
    netrate: string = '';
    grossrate: string = '';
    taxrate: string = '';
    CGST: string = '';
    SGST: string = '';
    IGST: string = '';
    discount: string = '';
    discountamt: string = '';
    totaltax: string = '';
    total: string = '';*/

    totalitemno: string = '';
    totalquantity: string = '';
    totalgrossamt: string = '';
    totaldiscountamt: string = '';
    totaltaxamount: string = '';
    totalnetamount: string = '';
    companyid:number=0;
    userid:number=0;
    roundoff: string = '';
    pretax: string = '0';
    posttax: string = '0';
    deliverydate: string = '';
    deliveryplace: string = 'Jaipur';
    openingbalance: string = '';
    closingbalance: string = '';
    debit: string = '';
    credit: string = '';
    // deliveryplace: string = "Jaipur";


    quoteData: Quote[] = [{
      barcode: '',
      itemcode: 0,
      itemname: 0,
      description: '',
      quantity: 0,
      unitname: 0,
      mrp: 0,
      basicrate: 0,
      netrate: 0,
      grossrate: 0,
      taxrate: 0,
      CGST: 0,
      SGST: 0,
      IGST: 0,
      discount: 0,
      discountamt: 0,
      totaltax: 0,
      total: 0,
      taxrate1: 0,
      pretax: 0,
      posttax: 0,
      itemid:0,
    }];
    ttotal!: number;
    myform: FormGroup;

    totalItemNo: number = 0;
    totalQuantity: number = 0;
    totalGrossAmt: number = 0;
    totalDiscountAmt: number = 0;
    totalTaxAmt: number = 0;
    totalNetAmt: number = 0;
    itemnames$: Observable<any[]>;
    unitname$: Observable<any[]>;
    taxrate$: Observable<any[]>;
    customer$: any;
    session: any;

    constructor(private formBuilder: FormBuilder, private custname1: CustomerService, private encService: EncryptionService, private itemService: AdditemService, private unittype: UnitnameService, private gstsrvs: GsttypeService, private router: Router, private toastCtrl: ToastController, private quote: QuotationService, private formService: FormValidationService) {
      const compid = '1';
      this.taxrate$ = this.gstsrvs.getgsttype();
      this.gstsrvs.getgsttype().subscribe((types) => {
        this.gstTypes = types
      });
      this.unitname$ = this.unittype.getunits();
      this.itemnames$ = this.itemService.getAllItems();
      this.customer$ = this.custname1.fetchallCustomer(encService.encrypt(compid), '', '');
      this.quateDate = new Date().toISOString().split('T')[0]; 
      this.refdate =  new Date().toISOString().split('T')[0]; 
      this.deliverydate =  new Date().toISOString().split('T')[0]; 



      this.myform = this.formBuilder.group({
        billformate: [''],
        quoteNumber: ['', Validators.required],
        quateDate: [''],
        custcode: ['', Validators.required],
        custname: ['', Validators.required],
        refrence: [''],
        refdate: [''],

        //table
        barcode: [''],
        itemcode: 0,
        itemname: [''],
        description: [''],
        quantity: 0,
        unitname: 0,
        mrp: 0,
        basicrate:0,
        netrate: 0,
        grossrate: 0,
        taxrate: 0,
        IGST: 0,
        CGST: 0,
        SGST: 0,
        discount: 0,
        discountamt: 0,
        totaltax: 0,
        total: 0,
        discountType: ['amount'], // 'amount' or 'percentage'
        totalitemno: [''],
        totalquantity: [''],
        totalgrossamt: [''],
        totaldiscountamt: [''],
        totaltaxamount: [''],
        totalnetamount: [''],
        deliverydate: [''],
        deliveryplace: [''],

        roundoff: [''],
        pretax: [''],
        posttax: [''],
        openingbalance: [''],
        closingbalance: [''],
        debit: [''],
        credit: [''],

        ttotal: [''],
        itemid:['']

      });

    }
    async getquoteNo(){
      const user =await this.session.getValue('userid');
      const keys = formatDate(new Date(), 'yMMddHH', 'en-IN'); 
      this.quote.fetchallQuoteno(0,keys,user).subscribe((response:any)=>{
        if(response.status){
        //  this.cname=response![0].username;
        this.quoteNumber=response!.invno;
        }else{
          this.openToast('Error fetching invoice no');
        }
      // console.log('--'+response);
      //  this.filteredTableData = this.products;
      }, (error) => {                              //Error callback
      console.log('error caught in component'+error.message) 
      });  
    }
    openToast(arg0: string) {
      throw new Error('Method not implemented.');
    }
  async onSubmit(form: FormGroup,quoteData: Quote[]) {
      const fields = { quoteNumber: this.quoteNumber, custcode: this.custcode, custname: this.custcode }
      // const isValid = await this.formService.validateForm(fields);
      if (await this.formService.validateForm(fields)) {

        console.log('Your form data : ', JSON.stringify(this.myform.value)+   '    -> '+JSON.stringify(quoteData));
        

        for (const element of quoteData) {
          element.grossrate = element.basicrate * element.quantity;
          element.netrate=element.basicrate + element.taxrate1;
          element.CGST= element.taxrate1/2;
          element.SGST = element.taxrate1/2;
          element.IGST = element.taxrate1;
          element.total= element.totaltax+element.grossrate;
          element.totaltax =  element.quantity*(element.taxrate1/100*element.basicrate);
         
          console.log(element); 
          const companyid=1;
          const userid=1;
          let quotedatas: quotestore[]=[];
      
        const quotedata: quotestore = {
          billformate: this.myform.value.billformate,
          quoteNumber: this.myform.value.quoteNumber,
          quateDate: this.myform.value.quateDate,
          custcode: this.myform.value.custcode,
          custname: this.myform.value.custname,
          refrence: this.myform.value.refrence,
          refdate: this.myform.value.refdate,
          
          barcode: element.barcode,
          itemcode: element.itemcode,
          itemname: element.itemname,
          description: element.description,
          quantity: element.quantity,
          unitname: element.unitname,
          mrp: element.mrp,
          basicrate: element.basicrate,
          netrate: element.netrate,
          grossrate: element.grossrate, // Add grossrate
          taxrate: element.taxrate,
          IGST: element.IGST,
          CGST: element.CGST,
          SGST: element.SGST,
          discount: element.discount,
          discountamt: element.discountamt,
          totaltax: element.totaltax,
          total: element.total,
          totalitemno: this.myform.value.totalitemno,
          totalquantity: this.myform.value.totalquantity,
          totalgrossamt: this.myform.value.totalgrossamt,
          totaldiscountamt: this.myform.value.totaldiscountamt,
          totaltaxamount: this.myform.value.totaltaxamount,
          totalnetamount: this.myform.value.totalnetamount,
          deliverydate: this.myform.value.deliverydate,
          deliveryplace: this.myform.value.deliveryplace,
          roundoff: this.myform.value.roundoff,
          pretax: element.pretax,
          posttax: element.posttax,
          openingbalance: this.myform.value.openingbalance,
          closingbalance: this.myform.value.closingbalance,
          debit:this.myform.value.debit,
          credit: this.myform.value.credit,
          ttotal:0,

          companyid:companyid,
          userid:userid,
        };
        
        quotedatas.push(quotedata);
        this.quote.createquote(quotedatas, '', '').subscribe(
          (response: any) => {
            console.log('POST request successful', response);
            setTimeout(() => {
              this.formService.showSuccessAlert();
            }, 1000);
            this.formService.showSaveLoader()
          },
          (error: any) => {
            console.error('POST request failed', error);
            setTimeout(() => {
              this.formService.showFailedAlert();
            }, 1000);
            this.formService.shoErrorLoader();
          }
        );
      }
      } else {
        //If the form is not valid, display error messages
        Object.keys(this.myform.controls).forEach(controlName => {
          const control = this.myform.get(controlName);
          if (control?.invalid) {
            control.markAsTouched();
          }
        });
        if (this.firstInvalidInput) {
          this.firstInvalidInput.setFocus();
        }
      }
      
    }
    getItems(quote: any) {
      const compid = 1;
      const identifier = quote.itemcode ? 'itemname' : 'itemcode';
      const value =  quote.itemcode;
    
      this.itemService.getItems(compid, value).subscribe(
        (data) => {
          console.log('Data received:', data);
    
          if (data && data.length > 0) {
            const itemDetails = data[0];
    
            // Update the quote properties
            quote.itemcode = itemDetails.tid;
            quote.itemname = itemDetails.itemDesc;
            quote.barcode = itemDetails.barcode.toString();
            quote.unitname = itemDetails.unitname;
            quote.taxrate = itemDetails.selectGst;
    
            // Update form control values
            this.myform.patchValue({
              itemcode: quote.itemcode,
              itemname: quote.itemname,
              // Other form controls...
            });
          } else {
            console.error('No data found for the selected item.');
          }
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    }
    
    
    
    addQuote() {

      console.log('addquotewww' + this.quoteData.length);
      // You can initialize the new row data here
      let  newRow: Quote = {
        barcode: '',
        itemcode: 0,
        itemname: 0,
        description: '',
        quantity: 0,
        unitname: 0,
        mrp: 0,
        basicrate: 0,
        netrate: 0,
        taxrate: 0,
        CGST: 0,
        SGST: 0,
        IGST: 0,
        discount: 0,
        discountamt: 0,
        totaltax: 0,
        total: 0,
        taxrate1: 0,
        pretax: 0,
        posttax: 0,
        itemid: 0,// Calculate grossrate after other properties
        grossrate: 0,
      
      };
      

      this.quoteData.push(newRow);
      // Reset newRow back to an empty object to prepare for the next iteration

    }
    calculateTotal(quote: Quote) {
      quote.total = quote.totaltax + quote.grossrate;
      this.calculateTotals();
    }

    removeQuote(index: number, quote: Quote) {
      this.ttotal = this.ttotal - quote.total;
      this.quoteData.splice(index, 1);
    }
    calculateTotals() {
      // Add your logic to calculate totals based on the salesData array
      this.totalItemNo = this.quoteData.length;

      // Example calculation for total quantity and gross amount
      this.totalQuantity = this.quoteData.reduce((total, quote) => total + quote.quantity, 0);
      this.totalGrossAmt = this.quoteData.reduce((total, quote) => total + (quote.grossrate * quote.quantity), 0);

      // Add similar calculations for other totals
    }
    // Inside your component class
    // Inside your component class
    getAllRows() {
      console.log('Number of Rows:', this.quoteData.length);

      for (let i = 0; i < this.quoteData.length; i++) {
        const quote = this.quoteData[i];
        console.log('Row:', quote);
      }
    }

    onNew(){
      location.reload();
    }

    // calculateTotalSum() {
    //   let sum = 0;
    //   for (const row of this.quoteData) {
    //     sum += this.quote.total;
    //   }
    //   this.ttotal = sum;
    // }
    // async onSubmit() {
    //   if (this.quoteNumber === null) {
    //     const toast = await this.toastCtrl.create({
    //       message: "Quatation Number is required",
    //       duration: 3000,
    //       color: 'danger',

    //     });
    //     toast.present();
    //   }else if(this.quateDate===''){
    //     const toast = await this.toastCtrl.create({
    //       message: "Quatation Date is required",
    //       duration: 3000,
    //       color: 'danger'
    //     });
    //     toast.present();
    //   }else if(this.quoteGroup===''){
    //     const toast = await this.toastCtrl.create({
    //       message: "Quatation Group is required",
    //       duration: 3000,
    //       color: 'danger'
    //     });
    //     toast.present();
    //   
    //   }else{
    //     const toast = await this.toastCtrl.create({
    //       message: "Successfully !",
    //       duration: 3000,
    //       color: 'success',
    //       position:'top'
    //     });
    //     toast.present();
    //   }
    // }
    getTotalQuantity(): number {
      return this.quoteData.reduce((total, quote) => total + +quote.quantity, 0);
    }

    getTotalGrossAmount(): number {
      const totalGrossAmount = this.quoteData.reduce((total, quote) => {
        const grossAmount = quote.quantity * quote.basicrate;
        return total + grossAmount;
      }, 0);

      return totalGrossAmount;
    }


    getTotalnetAmount(): number {
      return this.quoteData.reduce((total, quote) => total + (((quote.basicrate * quote.quantity) + quote.taxrate1) - quote.discount), 0)
    }
    getGrandTotal(): number {
      const grandTotal = this.quoteData.reduce((total, quote) => {
        const itemTotal = (((+quote.pretax + quote.posttax) + (quote.basicrate * quote.quantity) + quote.taxrate1) - quote.discount);
        return total + itemTotal;
      }, 0);

      return grandTotal;
    }


    getTotalTaxAmount(): number {
      return this.quoteData.reduce((total, quote) => total + (quote.taxrate1 / 100 * quote.basicrate) * quote.quantity, 0);
    }
    
    getTotalDiscountAmount(): number {
      return this.quoteData.reduce((total, quote) => total + (quote.discount / 100) * quote.basicrate * quote.quantity, 0);
    }
    getRoundoff(): number {
      // Calculate the total amount without rounding
      const totalAmount = this.quoteData.reduce((total, quote) => total + (((quote.basicrate * quote.quantity) + quote.taxrate1) - quote.discount), 0);

      // Use the toFixed method to round off the total to the desired number of decimal places
      const roundedTotalAmount = +totalAmount.toFixed(2); // Change 2 to the desired number of decimal places

      return roundedTotalAmount;
    }

    //table formaula
    getnetrate(quote: Quote): number {
      return quote.basicrate + (quote.taxrate1 / 100 * quote.basicrate);
    }
    getTotaltax(quote: Quote): number {
      return quote.quantity * (quote.taxrate1 / 100 * quote.basicrate);
      //return this.quoteData.reduce((total, quote) => total + (+quote.basicrate * +quote.taxrate1 / 100 * + quote.quantity), 0);
    }
    getgrossrate(quote: Quote): number {
      return quote.quantity * quote.basicrate;
    }

    getdiscountamt(quote: Quote): number {
      const discountamt = quote.discountamt || 0; // handle null/undefined values
      const basicrate = quote.basicrate || 0; // handle null/undefined values
      const quantity = quote.quantity || 0; // handle null/undefined values
      // calculate discount percentage
      const discount = (discountamt / (basicrate * quantity)) * 100;
      // update discount percentage
      quote.discount = discount;
      // return discount amount for display
      return discountamt;
    }
    calculateDiscountAmount(quot: Quote): number {
      const discountType = this.myform.get('discountType')?.value;
      const basicrate = +quot.basicrate || 0;
      const quantity = +quot.quantity || 0;

      if (isNaN(basicrate) || isNaN(quantity)) {
        return 0;
      }

      if (discountType === 'amount') {
        return quot.discountamt || 0;
      } else if (discountType === 'percentage') {
        const discountPercentage = quot.discount || 0;
        return (discountPercentage / 100) * basicrate * quantity;
      }

      return 0;
    }
    getdiscountp(quote: Quote) {
      const discountPercentage = quote.discount || 0; // assuming discount is a property in your dcin object
      const basicrate = quote.basicrate || 0; // handle null/undefined values
      const quantity = quote.quantity || 0; // handle null/undefined values

      // calculate discount amount based on the entered percentage
      const discountAmt = (discountPercentage / 100) * basicrate * quantity;

      // update discount amount
      quote.discountamt = discountAmt;

      // return discount amount for display
      return discountAmt;
    }
    getTotalamt(quote: Quote): number {
      return (quote.basicrate * quote.quantity) + (quote.quantity * (quote.taxrate1 / 100 * quote.basicrate)) - this.calculateDiscountAmount(quote);
    }
    getcgst(quote: Quote): number {
      return quote.taxrate1 / 2;
    }

    getsgst(quote: Quote): number {
      return quote.taxrate1 / 2;
    }

    getigst(quote: Quote): number {
      return quote.taxrate1;
    }
    ngOnInit() {
      this.getquoteNo();

      // Other initialization logic...

      // Subscribe to value changes of basicrate, taxrate, and discount
      this.myform.get('basicrate')?.valueChanges.subscribe(() => this.calculateNetRate());
      this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());
      this.myform.get('discount')?.valueChanges.subscribe(() => {
        this.calculateDiscount();
        this.calculateNetRate();
      });
      this.myform.get('taxrate')?.valueChanges.subscribe(() => this.calculateNetRate());
      this.myform.get('discountamt')?.valueChanges.subscribe(() => {
        this.calculateDiscountPercentage();
      });
      
    }
    calculateDiscount() {
      const discountType = this.myform.get('discountType')?.value;
      const discount = +this.myform.get('discount')?.value || 0;
      const basicrate = +this.myform.get('basicrate')?.value || 0;
      const quantity = +this.myform.get('quantity')?.value || 0;

      if (discountType === 'amount') {
        // Calculate discount amount based on user-entered amount
        const discountAmt = discount;
        this.myform.get('discountAmt')?.setValue(discountAmt, { emitEvent: false });
      } else if (discountType === 'percentage') {
        // Calculate discount amount based on user-entered percentage
        const discountAmt = (discount / 100) * basicrate * quantity;
        this.myform.get('discountAmt')?.setValue(discountAmt, { emitEvent: false });
      }

    }

    calculateDiscountAmt() {
      // Calculate discountamt based on discount percentage
      const discount = this.myform.get('discount')?.value ?? 0;
      const basicrate = this.myform.get('basicrate')?.value ?? 0;
      const quantity = this.myform.get('quantity')?.value ?? 0;

      const discountamt = (discount / 100) * basicrate * quantity;

      // Update the discountamt in the form
      this.myform.get('discountamt')?.setValue(discountamt, { emitEvent: false }); // Avoid triggering an infinite loop
    }
    calculateDiscountPercentage() {
      // Calculate discount percentage based on discountamt
      const discountamt = this.myform.get('discountamt')?.value ?? 0;
      const basicrate = this.myform.get('basicrate')?.value ?? 0;
      const quantity = this.myform.get('quantity')?.value ?? 0;

      const discountPercentage = (discountamt / (basicrate * quantity)) * 100;

      // Update the discount in the form
      this.myform.get('discount')?.setValue(discountPercentage, { emitEvent: false }); // Avoid triggering an infinite loop
    }
    calculateNetRate() {
      // Add your logic to calculate netrate based on basicrate, taxrate, and discount
      const basicrate = this.myform.get('basicrate')?.value ?? 0; // Use the nullish coalescing operator to provide a default value if null
      const taxrate = this.myform.get('taxrate')?.value ?? 0;
      const discount = this.myform.get('discount')?.value ?? 0;
      const grossrate = this.myform.get('grossrate')?.value ?? 0;
      const quantity = this.myform.get('quantity')?.value ?? 0;

      // Perform the calculation and update the netrate in the form
      const gstAmount = (discount / 100) * basicrate * quantity;
      const netrate = basicrate + taxrate;
      this.myform.get('netrate')?.setValue(netrate);

    }

    goBack() {
      this.router.navigate(['/transactiondashboard']); // Navigate back to the previous page
    }

    onSelectChange(select: HTMLSelectElement, quote: Quote) {
      const selectedValue = select.value;
      const selectedIndex = select.selectedIndex;
      const selectedText = select.options[selectedIndex].text;

      console.log('Selected value:', selectedValue);
      console.log('Selected text:', selectedText);

      // Extracting a number from the selectedText using parseFloat
      const numericValue = parseFloat(selectedText);

      if (!isNaN(numericValue)) {
        console.log('Numeric value:', numericValue);
        quote.taxrate1 = numericValue;
        // Use numericValue as needed
      } else {
        quote.taxrate1 = 0;
        console.error('Selected text does not represent a valid number.');
      }
    }

    // checkFocus(custcodeValue: string) {
    //   // console.log('Element lost focus. ccode value:', custcodeValue);
    //   this.myaction(val + '');
    //   console.log("checkfocusss  " + val);
    //   }

    checkFocus(val: number) {
      this.myaction(val + '');
      console.log("checkfocusss  " + val);
    }
    myaction(arg0: string) {
      throw new Error('Method not implemented.');
    }
    
  }
