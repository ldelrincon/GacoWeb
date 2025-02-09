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
  isLoading: boolean = true;
  safePdfUrl: SafeResourceUrl | null = null;

  public evidenciaService = inject(EvidenciaService);
  public utilidadesService = inject(UtilidadesService);
  private sanitizer = inject(DomSanitizer);

  constructor(
    public dialogRef: MatDialogRef<VerEvidenciaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; }
  ) {
    this.id = data.id;
    console.log('Datos recibidos:', data);
  }

  ngOnInit(): void {
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
