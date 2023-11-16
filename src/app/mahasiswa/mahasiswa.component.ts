import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})
export class MahasiswaComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.bind_mahasiswa();
  }

  bind_mahasiswa(): void {
    this.http.get("https://stmikpontianak.net/011100862/tampilMahasiswa.php")
      .subscribe((data: any) => {
        console.log(data);

        data.forEach((element: any) => {
          var tempatTanggalLahir = element.TempatLahir + " , " + element.TanggalLahir;

          var row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTanggalLahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk
          ];

          console.log(tempatTanggalLahir);
          // Menggunakan $('#table1') untuk merujuk ke elemen HTML dengan ID 'table1'
          $('#table1').DataTable().row.add(row);
        });

        // Menggunakan $('#table1') untuk merujuk ke elemen HTML dengan ID 'table1'
        $('#table1').DataTable().draw(false);
      });
  }
}
