import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-body-dialog',
  templateUrl: './cadastrar-dialog.component.html',
  styleUrls: ['./cadastrar-dialog.component.css']
})
export class CadastrarDialogComponent {
  titulo: string;
  //botao para cancelar caso o usario deseja parar a ediçao
  //Construtor para usar o matdialog e fazer o dialog e levar para o body
  constructor(public dialogRef: MatDialogRef<CadastrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.titulo = data.titulo || '';
    }
    
  cancel(): void {
    this.dialogRef.close();
  }
}
