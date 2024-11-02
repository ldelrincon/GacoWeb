import { Injectable, Component, Inject, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-content',
  templateUrl: '../../shared/loading-screen/loading-screen.component.html',
  styleUrls: ['../../shared/loading-screen/loading-screen.component.css']
})
export class LoadingComponent implements AfterViewChecked {
  constructor(
    private ref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: MatDialogRef<LoadingComponent>;
  loadingExp: MatDialogRef<LoadingComponent>;
  loadingDetExp: MatDialogRef<LoadingComponent>;
  loadingDetP: MatDialogRef<LoadingComponent>;

  isOpen = false;
  isOpenExp = false;
  isOpenDetExp = false;
  isOpenDetP = false;
  constructor( private dialog: MatDialog) { }



  open(): void {
    // Comprobar si la conexion es lenta
    const _navigator = navigator;
    const _conexion = _navigator['connection'];


    if (!this.isOpen) {
      this.loading = this.dialog.open(LoadingComponent, {
        width: '280px',
        disableClose: true,
      });
      this.isOpen = true;
    }
  }
  close(): void {
    if (this.loading) {
      this.loading.close();
      this.isOpen = false;
    }
  }

  openExp(): void {

    const _navigator = navigator;
    const _conexion = _navigator['connection'];

    if (!this.isOpenExp) {
      this.loadingExp = this.dialog.open(LoadingComponent, {
        width: '280px',
        disableClose: true,
      });
      this.isOpenExp = true;
    }
  }
  closeExp(): void {
    if (this.loadingExp) {
      this.loadingExp.close();
      this.isOpenExp = false;
    }
  }


  openDetExp(): void {
    const _navigator = navigator;
    const _conexion = _navigator['connection'];

    if (!this.isOpenDetExp) {
      this.loadingDetExp = this.dialog.open(LoadingComponent, {
        width: '280px',
        disableClose: true,
      });
      this.isOpenDetExp = true;
    }
  }
  closeDetExp(): void {
    if (this.loadingDetExp) {
      this.loadingDetExp.close();
      this.isOpenDetExp = false;
    }
  }


  openDetP(): void {
    const _navigator = navigator;
    const _conexion = _navigator['connection'];

    if (!this.isOpenDetP) {
      this.loadingDetP = this.dialog.open(LoadingComponent, {
        width: '280px',
        disableClose: true,
      });
      this.isOpenDetP = true;
    }
  }
  closeDetP(): void {
    if (this.loadingDetP) {
      this.loadingDetP.close();
      this.isOpenDetP = false;
    }
  }

}
