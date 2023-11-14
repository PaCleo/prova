import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarDialogComponent } from './cadastrar-dialog/cadastrar-dialog.component'
import { EditarDialogComponent } from './editar-dialog/editar-dialog.component'


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

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
    ) {}

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
  /*
  Cria a função de cadastrar e quando ela é ativada aciona o dialogRef que leva a referencia de outro componente 
  Serve apenas para abrir o dialogo
  */
  Cadastrar(): void {
    const dialogRef = this.dialog.open(CadastrarDialogComponent, {
      data: {
        titulo: '',
      },
    });
    //Apos concluida ele espera a resposta do outro componente quando recebe faz o post e cria um produto
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const titulo = result.titulo;
        this.http.post('https://dummyjson.com/products/add',{ title: titulo }, {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe(
          (response) => {
            console.log('Post bem sucedido', response)
          }
        )
        console.log('Titulo diálogo:', result.titulo)
      }
    });
  }


  //Parecida com a função anteriro a diferença que leva um paremetro a mais com o id
  Editar(): void {
    const dialogRef = this.dialog.open(EditarDialogComponent, {
      data: {
        titulo: '',
        id: ''
      },
    });
  
    /*
    Bem parecida com a função antererior a ddiferença que leva o id junto, ele vai na url
    para acessar o produto indicado e o put leva o title para ser trocado
    */
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const titulo = result.titulo;
        const id = result.id
        console.log('id, titulo',id, titulo);
        this.http.put(`https://dummyjson.com/products/${id}`, 
          { title: titulo }, {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe(
          (response) => {
            console.log('Produto editado', response)
          }
        )
        console.log('Titulo diálogo:', titulo)
      }
    });
  }
}