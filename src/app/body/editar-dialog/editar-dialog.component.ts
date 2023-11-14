import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-dialog',
  templateUrl: './editar-dialog.component.html',
  styleUrls: ['./editar-dialog.component.css']
})
export class EditarDialogComponent {
  titulo: string;
  id: number;

//Construtor para usar o matdialog e fazer o dialog e levar para o body
  constructor(public dialogRef: MatDialogRef<EditarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.titulo = data.titulo || '';
      this.id = data.id || '';
    }
    
  //botao para cancelar caso o usario deseja parar a ediçao  
  cancel(): void {
    this.dialogRef.close();
  }
}
