import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  // declaración de variables para tiempo de ejecución
  actividad: any;
  actividad2: any;
  fechaDia: any;
  hoy = new Date();
  fechaMin: any;
  fechaMax: any;
  horaInic: {
    horaId: number | null,
    hora: Date
  };
  horaFin: {
    horaId: number | null,
    hora: Date
  };
  act2 = false;
  horaFinal: any[] = []

  // creo arreglo para majear los horarios cada 30 minutos
  horaInicio: any[] = [
    { horaId: 1, hora: new Date(this.hoy.setHours(0, 0, 0, 0)) }, { horaId: 2, hora: new Date(this.hoy.setHours(0, 30, 0, 0)) },
    { horaId: 3, hora: new Date(this.hoy.setHours(1, 0, 0, 0)) }, { horaId: 4, hora: new Date(this.hoy.setHours(1, 30, 0, 0)) },
    { horaId: 5, hora: new Date(this.hoy.setHours(2, 0, 0, 0)) }, { horaId: 6, hora: new Date(this.hoy.setHours(2, 30, 0, 0)) },
    { horaId: 7, hora: new Date(this.hoy.setHours(3, 0, 0, 0)) }, { horaId: 8, hora: new Date(this.hoy.setHours(3, 30, 0, 0)) },
    { horaId: 9, hora: new Date(this.hoy.setHours(4, 30, 0, 0)) }, { horaId: 10, hora: new Date(this.hoy.setHours(4, 30, 0, 0)) },
    { horaId: 11, hora: new Date(this.hoy.setHours(5, 0, 0, 0)) }, { horaId: 12, hora: new Date(this.hoy.setHours(5, 30, 0, 0)) },
    { horaId: 13, hora: new Date(this.hoy.setHours(6, 0, 0, 0)) }, { horaId: 14, hora: new Date(this.hoy.setHours(6, 30, 0, 0)) },
    { horaId: 15, hora: new Date(this.hoy.setHours(7, 0, 0, 0)) }, { horaId: 16, hora: new Date(this.hoy.setHours(7, 30, 0, 0)) },
    { horaId: 17, hora: new Date(this.hoy.setHours(8, 0, 0, 0)) }, { horaId: 18, hora: new Date(this.hoy.setHours(8, 30, 0, 0)) },
    { horaId: 19, hora: new Date(this.hoy.setHours(9, 0, 0, 0)) }, { horaId: 20, hora: new Date(this.hoy.setHours(9, 30, 0, 0)) },
    { horaId: 21, hora: new Date(this.hoy.setHours(10, 0, 0, 0)) }, { horaId: 22, hora: new Date(this.hoy.setHours(10, 30, 0, 0)) },
    { horaId: 23, hora: new Date(this.hoy.setHours(11, 0, 0, 0)) }, { horaId: 24, hora: new Date(this.hoy.setHours(11, 30, 0, 0)) },
    { horaId: 25, hora: new Date(this.hoy.setHours(12, 0, 0, 0)) }, { horaId: 26, hora: new Date(this.hoy.setHours(12, 30, 0, 0)) },
    { horaId: 27, hora: new Date(this.hoy.setHours(13, 0, 0, 0)) }, { horaId: 28, hora: new Date(this.hoy.setHours(13, 30, 0, 0)) },
    { horaId: 29, hora: new Date(this.hoy.setHours(14, 0, 0, 0)) }, { horaId: 30, hora: new Date(this.hoy.setHours(14, 30, 0, 0)) },
    { horaId: 31, hora: new Date(this.hoy.setHours(15, 0, 0, 0)) }, { horaId: 32, hora: new Date(this.hoy.setHours(15, 30, 0, 0)) },
    { horaId: 33, hora: new Date(this.hoy.setHours(16, 0, 0, 0)) }, { horaId: 34, hora: new Date(this.hoy.setHours(16, 30, 0, 0)) },
    { horaId: 35, hora: new Date(this.hoy.setHours(17, 0, 0, 0)) }, { horaId: 36, hora: new Date(this.hoy.setHours(17, 30, 0, 0)) },
    { horaId: 37, hora: new Date(this.hoy.setHours(18, 0, 0, 0)) }, { horaId: 38, hora: new Date(this.hoy.setHours(18, 30, 0, 0)) },
    { horaId: 39, hora: new Date(this.hoy.setHours(19, 0, 0, 0)) }, { horaId: 40, hora: new Date(this.hoy.setHours(19, 30, 0, 0)) },
    { horaId: 41, hora: new Date(this.hoy.setHours(20, 0, 0, 0)) }, { horaId: 42, hora: new Date(this.hoy.setHours(20, 30, 0, 0)) },
    { horaId: 43, hora: new Date(this.hoy.setHours(21, 0, 0, 0)) }, { horaId: 44, hora: new Date(this.hoy.setHours(21, 30, 0, 0)) },
    { horaId: 45, hora: new Date(this.hoy.setHours(22, 0, 0, 0)) }, { horaId: 46, hora: new Date(this.hoy.setHours(22, 30, 0, 0)) },
    { horaId: 47, hora: new Date(this.hoy.setHours(23, 0, 0, 0)) }, { horaId: 48, hora: new Date(this.hoy.setHours(23, 30, 0, 0)) },
  ]



  constructor(
    // declaración relacionada al módulo Drag and Drop
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.actividad = data;
    this.horaInic = { horaId: null, hora: this.actividad.startDate };
    this.horaFin = { horaId: null, hora: this.actividad.endDate };
  }

  ngOnInit(): void {

    // función para calcular la fecha minima para filtro de fechas (para ejemplo se utilizaron 4 próximos dias)
    this.fechaMinima();

    // función para calcular la fecha maxima para filtro de fechas (para ejemplo se utilizaron 4 próximos dias)
    this.fechaMaxima();

    //función para asignarle formato de interpretación de fechas a input type="date"
    if (this.actividad.startDate != null) {
      let diaStart = this.actividad.startDate.getUTCDate();
      let mesStart = this.actividad.startDate.getUTCMonth() + 1;
      let anoStart = this.actividad.startDate.getUTCFullYear();
      if (diaStart < 10) {
        diaStart = "0" + diaStart;
      }
      if (mesStart < 10) {
        mesStart = "0" + mesStart;
      }
      this.actividad.startDate = anoStart.toLocaleString() + '-' + mesStart.toLocaleString() + '-' + diaStart.toLocaleString();
    }

  }

  // función para calcular la fecha minima para filtro de fechas (para ejemplo se utilizaron 4 próximos dias)
  fechaMinima() {
    let setDate1 = new Date(this.hoy.setHours(0, 0, 0, 0));
    let diaMin = setDate1.getUTCDate();
    let mesMin = setDate1.getUTCMonth() + 1;
    let anoMin = setDate1.getUTCFullYear();

    let diaMin2: string;
    if (diaMin < 10) {
      diaMin2 = "0" + diaMin;
    } else {
      diaMin2 = diaMin.toLocaleString();
    }
    let mesMin2: string;
    if (mesMin < 10) {
      mesMin2 = "0" + mesMin;
    } else {
      mesMin2 = mesMin.toLocaleString();
    }
    return this.fechaMin = anoMin.toLocaleString() + '-' + mesMin2.toLocaleString() + '-' + diaMin2.toLocaleString();
  }

  // función para calcular la fecha maxima para filtro de fechas (para ejemplo se utilizaron 4 próximos dias)
  fechaMaxima() {
    let setDate = new Date(this.hoy.setHours(84, 0, 0, 0));
    let diaMax = setDate.getUTCDate();
    let mesMax = setDate.getUTCMonth() + 1;
    let anoMax = setDate.getUTCFullYear();


    let diaMax2: string;
    if (diaMax < 10) {
      diaMax2 = "0" + diaMax;
    } else {
      diaMax2 = diaMax.toLocaleString();
    }
    let mesMax2: string;
    if (mesMax < 10) {
      mesMax2 = "0" + mesMax;
    } else {
      mesMax2 = mesMax.toLocaleString();
    }
    return this.fechaMax = anoMax.toLocaleString() + '-' + mesMax2.toLocaleString() + '-' + diaMax2.toLocaleString();
  }

  // Se crea un arreglo con las horas siguientes a la hora inicial
  controlHoraIni() {
    this.horaFinal = []
    for (let i = 0; i < this.horaInicio.length; i++) {
      if (this.horaInicio[i].hora > this.horaInic.hora) {
        this.horaFinal.push(this.horaInicio[i])
      }
    }
    this.horaFinal.push({ horaId: 49, hora: new Date(this.hoy.setHours(23, 59, 59, 999)) })
  }


  controlHoraFin() {
    this.act2 = true;
    this.actividad.endDate = this.horaFin.hora
    this.asignaDia2(this.fechaDia)
  }

  asignaDia(fecha: any) {
    this.fechaDia = fecha;
  }

  asignaDia2(fecha: string) {
    if (fecha == undefined) {
      fecha = this.actividad.startDate
    }
    let fechaGet = new Date(fecha + 'T00:00:00');
    let diaGet = fechaGet.getUTCDate();
    let mesGet = fechaGet.getUTCMonth();
    let yearGet = fechaGet.getUTCFullYear();
    let a = this.horaInic.hora;
    let b = this.horaFin.hora;
    this.actividad.startDate = a.setUTCDate(diaGet);
    this.actividad.startDate = a.setUTCMonth(mesGet);
    this.actividad.startDate = a.setUTCFullYear(yearGet);
    this.actividad.endDate = b.setUTCDate(diaGet);
    this.actividad.endDate = b.setUTCMonth(mesGet);
    this.actividad.endDate = b.setUTCFullYear(yearGet);
    this.actividad.startDate = new Date(this.actividad.startDate);
    this.actividad.endDate = new Date(this.actividad.endDate);
  }

}
