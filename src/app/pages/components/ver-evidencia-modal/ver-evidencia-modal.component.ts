import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvidenciaService } from '../../../services/evidencia.service';
import { UtilidadesService } from '../../../services/utilidades.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-evidencia-modal',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf],
  templateUrl: './ver-evidencia-modal.component.html',
  styleUrl: './ver-evidencia-modal.component.css'
})
export class VerEvidenciaModalComponent implements OnInit {
  id: number;
  base64Data: string = '';
  file: any;
  isLoading: boolean = true;
  safePdfUrl: SafeResourceUrl | null = null;

  public evidenciaService = inject(EvidenciaService);
  public utilidadesService = inject(UtilidadesService);
  private sanitizer = inject(DomSanitizer);

  constructor(
    public dialogRef: MatDialogRef<VerEvidenciaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; file: any; }
  ) {
    this.id = data.id;
    this.file = data.file;
    console.log('Datos recibidos:', data);
  }

  ngOnInit(): void {
    if (this.id == 0) {
      const mimeType = this.utilidadesService.fnGetMimeType(this.file.extension);
      this.base64Data = `data:${mimeType};base64,${this.file.base64}`;

      if (this.isPdf()) {
        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Data);
      }
    }
    else {
      this.evidenciaService.EvidenciaPorId(this.id).subscribe({
        next: (response) => {
          if (response.success) {
            const mimeType = this.utilidadesService.fnGetMimeType(response.data.extension);
            this.base64Data = `data:${mimeType};base64,${response.data.base64}`;

            if (this.isPdf()) {
              this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Data);
            }
          }
          else {
          }
        },
        error: (err) => {
        }
      });
    }
  }

  isImage(): boolean {
    return this.base64Data.startsWith('data:image/');
  }

  isPdf(): boolean {
    return this.base64Data.startsWith('data:application/pdf');
  }

  cerrar() {
    this.dialogRef.close();
  }

  imagenCargada() {
    this.isLoading = false; // Oculta el loader cuando la imagen ha cargado
  }
}
