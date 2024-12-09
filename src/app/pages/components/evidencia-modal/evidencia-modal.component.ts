import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-evidencia-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDivider,
  ],
  templateUrl: './evidencia-modal.component.html',
  styleUrl: './evidencia-modal.component.css'
})
export class EvidenciaModalComponent {
  evidenciaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EvidenciaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.evidenciaForm = this.fb.group({
      // files: this.fb.array([]),
    });
  }

  fileList: {
    name: string;
    size: number;
    base64?: string;
    showBase64: boolean;
  }[] = [];

  displayedColumns: string[] = ['name', 'extension', 'size', 'base64', 'actions'];
  isDragging = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const filesArray = Array.from(event.dataTransfer.files);
      this.processFiles(filesArray);
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const filesArray = Array.from(input.files);
      this.processFiles(filesArray);
      console.log('onFilesSelected', filesArray);
    }
  }

  processFiles(files: File[]): void {
    const newFiles: Promise<{
      name: string;
      size: number;
      base64?: string;
      showBase64: boolean;
    }>[] = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            size: file.size,
            base64: (reader.result as string).split(',')[1], // Base64 sin prefijo
            showBase64: false,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newFiles).then((resolvedFiles: {
      name: string;
      size: number;
      base64?: string;
      showBase64: boolean;
    }[]) => {
      this.fileList = [...this.fileList, ...resolvedFiles];
    });
  }

  removeFile(index: number): void {
    this.fileList = [...this.fileList.slice(0, index), ...this.fileList.slice(index + 1)];
  }

  toggleBase64(file: { showBase64: boolean }): void {
    file.showBase64 = !file.showBase64;
  }

  aceptar(): void {
    if (this.evidenciaForm.valid) {
      this.dialogRef.close(this.evidenciaForm.value);
    }
  }
}
