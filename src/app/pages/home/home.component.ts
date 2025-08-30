import { NgChartsModule } from 'ng2-charts';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChartOptions, ChartData } from 'chart.js';
import { BusquedaGenericoRequest } from '../../models/requests/BusquedaGenericoRequest';
import { ReporteServicioService } from '../../services/reporte-servicio.service';
import { ClienteVenta } from '../../models/requests/clientes/ReportCliente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgChartsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Variables
  top5Clientes: ClienteVenta[] = [];
  dataSource = new MatTableDataSource<any>([]);
  Inicio: number = 0;
  strGasto: string = "";
  strVenta: string = "";
  totalSolicitudes: number = 0;
  terminado: number = 0;
  facturado: number = 0;
  pagado: number = 0;

  // Charts
 barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: true, position: 'top' },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw as number;
          return `$${value.toLocaleString()}`;
        }
      }
    }
  },
  scales: {
    y: { beginAtZero: true }
  }
};
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

 pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: { display: false, position: 'bottom' },
    tooltip: {
      enabled: false,
      callbacks: {
        label: (context) => {
          const value = context.raw as number;
          const label = context.label || '';
          return `${label}: $${value.toLocaleString()}`;
        }
      }
    }
  }
};
  pieChartData: ChartData<'pie'> = {
    labels: ['Terminado', 'Facturado', 'Pagado'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#42A5F5', '#26A69A', '#FFCA28'] }]
  };

  // Servicios
  private swalLoading = inject(LoadingService);
  reporteServicioService = inject(ReporteServicioService);

  constructor() {}

  ngOnInit(): void {
    const inicioGuardado = localStorage.getItem('inicio');
    if (inicioGuardado == "0") {
      this.Inicio = 1;
      localStorage.setItem('inicio', '1');
      window.location.reload();
    }
    this.busquedaSeguimentoActivo('');
  }

  busquedaSeguimentoActivo(busqueda: string, numeroPagina: number = 1, cantidadPorPagina: number = 100) {
    try {
      this.swalLoading.showLoading();

      const request: BusquedaGenericoRequest = { busqueda, numeroPagina, cantidadPorPagina };
      this.reporteServicioService.TotalesSeguimentoActivo(request).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.strGasto = response.data.totalGastoStr;
          this.strVenta = response.data.totalVentaStr;
          this.totalSolicitudes = response.data.totalSolicitudes;
          this.terminado = response.data.totalTerminado;
          this.facturado = response.data.totalfacturado;
          this.pagado = response.data.totalPagado;
          this.top5Clientes = response.data.top5Clientes || [];

          // 🔹 Actualizar pie chart
          this.pieChartData = {
            labels: ['Terminado', 'Facturado', 'Pagado'],
            datasets: [
              {
                data: [this.terminado, this.facturado, this.pagado],
                backgroundColor: ['#42A5F5', '#26A69A', '#FFCA28']
              }
            ]
          };

          // 🔹 Actualizar bar chart
          this.barChartData = {
            labels: this.top5Clientes.map(c => c.cliente),
            datasets: [
              {
                data: this.top5Clientes.map(c => c.totalVenta),
                label: 'Ventas',
                backgroundColor: '#42A5F5'
              }
            ]
          };

          this.swalLoading.close();
        },
        error: (err) => {
          console.error('Error al cargar lista de seguimento', err);
          this.swalLoading.close();
        }
      });
    } catch (ex) {
      console.error('busquedaSeguimentoActivo', ex);
      this.swalLoading.close();
    }
  }
}
