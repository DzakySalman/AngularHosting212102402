// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-forex',
//   templateUrl: './forex.component.html',
//   styleUrls: ['./forex.component.css']
// })
// export class ForexComponent {

// }

import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit, AfterViewInit {
  private _table1: any;

  constructor(private renderer: Renderer2, private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');

    this._table1 = $('#table1').DataTable({
      columnDefs: [
        {
          targets: 2,
          className: 'text-right'
        }
      ]
    });
    this.getData();
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  getData() {
    console.log('getData()');

    const url = 'https://openexchangerates.org/api/latest.json?app_id=9d00a8c0800644d6a358ddf3b33b49c2';

    this.http.get(url)
      .subscribe((data: any) => {
        console.log(data);

        const rates = data.rates;

        // Urutkan nilai rates dari yang terbesar ke yang terkecil
        const sortedCurrencies = Object.keys(rates).sort((a, b) => rates[b] - rates[a]);

        // Ambil 10 mata uang dengan nilai terbesar
        const topCurrencies = sortedCurrencies.slice(0, 50);

        topCurrencies.forEach((currency: string, index: number) => {
          const rate = rates[currency];
          const formattedRate = this.formatCurrency(rate, 'en-US', currency);

          // Menghilangkan simbol mata uang dari string
          const rateWithoutSymbol = formattedRate.substring(currency.length).trim();

          console.log(`${currency}: ${rateWithoutSymbol}`);
          const row = [index + 1, currency, rateWithoutSymbol];
          this._table1.row.add(row);
        });

        this._table1.draw(false);
      });
  }

  // Method untuk melakukan format currency
  formatCurrency(value: number, locale: string, currency: string): string {
    return formatCurrency(value, locale, currency);
  }
}