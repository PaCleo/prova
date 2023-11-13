import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


//Interface do meu produto e os campos que eu vou mostrar.
interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'brand'];//Configurando como vai ser mostrado os meus campos
  product: Product[] = [];
  dataSource = new MatTableDataSource<Product>();//Cria minha tabela do produto

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  //Fazendo o get de acordo como estava instruido na API
  fetchData() {
    this.http.get<{ products: Product[]}>('https://dummyjson.com/products?limit=50').subscribe(
      (response) => {
        /*
          Aqui eu pego o objeto de produto e pego os respectivos produtos e jogo para meu dataSource para criar uma Tabela que o MatTable
          seja compativel.       
        */
        this.product = response.products;
        this.dataSource = new MatTableDataSource(this.product);
        this.dataSource.paginator = this.paginator; //paginação
        console.log(this.dataSource) //usado para ver como esta meu dataSource
      },
      (error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }
}