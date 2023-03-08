import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

// declaración de variables por tipo
type TipoActividad = 'ACTIVITY' | 'PARTY' | 'FOOD';
type Status = 'IN_PROGRESS' | 'DONE' | null;
type FechaActividad = Date;

// declaración de interface json
export interface Actividades {
  activityId: number,
  title: string,
  type: TipoActividad,
  startDate: FechaActividad,
  endDate: FechaActividad,
  status: Status
}


@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.scss']
})

export class ItinerarioComponent implements OnInit {

  // creación de arreglos 
  actividades: Actividades[] = [
    {
      activityId: 1,
      title: "Subida al cerro catedral",
      type: "ACTIVITY",
      startDate: new Date(new Date().setHours(18, 0, 0, 0)),
      endDate: new Date(new Date().setHours(19, 30, 0, 0)),
      status: "IN_PROGRESS",
    },
    {
      activityId: 2,
      title: "Fiesta de espuma",
      type: "PARTY",
      startDate: new Date(new Date().setHours(15, 0, 0, 0)),
      endDate: new Date(new Date().setHours(16, 0, 0, 0)),
      status: "DONE",
    },
    {
      activityId: 3,
      title: "Desayuno",
      type: "FOOD",
      startDate: new Date(new Date().setHours(7, 0, 0, 0)),
      endDate: new Date(new Date().setHours(8, 0, 0, 0)),
      status: null,
    },
  ];
  actividades2: Actividades[] = [];
  actividades3: Actividades[] = [];
  actividades4: Actividades[] = [];

  //manejo de fechas
  FechaHoy = new Date();
  Fecha2 = new Date(this.FechaHoy.setHours(0, 0, 0, 0));
  Fecha22 = new Date(this.FechaHoy.setHours(0, 0, 0, 0));
  Fecha3 = new Date(this.Fecha22.setHours(24, 0, 0, 0));
  Fecha33 = new Date(this.Fecha22.setHours(0, 0, 0, 0));
  Fecha4 = new Date(this.Fecha33.setHours(24, 0, 0, 0));
  Fecha44 = new Date(this.Fecha33.setHours(0, 0, 0, 0));
  Fecha5 = new Date(this.Fecha44.setHours(24, 0, 0, 0));
  Fecha55 = new Date(this.Fecha5.setHours(0, 0, 0, 0));

  // declaración de variables para tiempo de ejecución
  newActividad = '';
  verNewActividad = false;
  cuentaActividad = 0;
  fechaActual = new Date();

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    // refresco valor de variable para interactividad con spinner circular de actividad en proceso
    setInterval(() => {
      this.fechaActual = new Date();
    }, 30000);
  }

  // función relacionada al módulo Drag and Drop
  drop(event: CdkDragDrop<Actividades[]>, fecha: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      //Utilizo funcion predefinida de (a,b) para ordenar por fecha       
      event.container.data.sort(function (a, b) {
        if (a.endDate < b.endDate) {
          return -1;
        } else if (a.endDate > b.endDate)
          return 1;
        else
          return 0;
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // aplico la fecha correspondiente a la actividad 
      let diaGet = fecha.getUTCDate();
      let mesGet = fecha.getUTCMonth();
      let yearGet = fecha.getUTCFullYear();
      let containerTemp: any[] = event.container.data;
      for (let i = 0; i < containerTemp.length; i++) {
        if (containerTemp[i].startDate != null && containerTemp[i].startDate != null) {
          let a = containerTemp[i].startDate;
          let b = containerTemp[i].endDate;
          containerTemp[i].startDate = a.setUTCDate(diaGet);
          containerTemp[i].startDate = a.setUTCMonth(mesGet);
          containerTemp[i].startDate = a.setUTCFullYear(yearGet);
          containerTemp[i].endDate = b.setUTCDate(diaGet);
          containerTemp[i].endDate = b.setUTCMonth(mesGet);
          containerTemp[i].endDate = b.setUTCFullYear(yearGet);
          containerTemp[i].startDate = new Date(containerTemp[i].startDate);
          containerTemp[i].endDate = new Date(containerTemp[i].endDate);
        } else {
          let a = containerTemp[i].startDate = fecha;
          let b = containerTemp[i].endDate = fecha;
          containerTemp[i].startDate = new Date(a);
          containerTemp[i].endDate = new Date(b);
        }
      }

      // actualizo contenedor principal de datos
      event.container.data = containerTemp;

      //Utilizo funcion predefinida de (a,b) para ordenar por fecha 
      event.container.data.sort(function (a, b) {
        if (a.endDate < b.endDate) {
          return -1;
        } else if (a.endDate > b.endDate)
          return 1;
        else
          return 0;
      });
    }

  }

  nuevaActividad() {
    this.newActividad = '';
    this.verNewActividad = true
  }

  // función para agregar nueva actividad
  nuevaActividad2(act: string) {
    this.cuentaActividad++
    let newAct: Actividades = {
      activityId: 3 + this.cuentaActividad,
      title: act,
      type: "ACTIVITY",
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(new Date().setHours(0, 0, 0, 0)),
      status: null,
    }
    this.actividades.push(newAct);
    this.getActivities(newAct);
    this.verNewActividad = false;
  }

  // funciónpara modificar fecha y horas de actividad
  getActivities(item: Actividades): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: item,
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      let arreglo = result.startDate.getUTCDate();
      let array1 = this.Fecha2.getUTCDate();
      let array2 = this.Fecha3.getUTCDate();
      let array3 = this.Fecha4.getUTCDate();
      let array4 = this.Fecha5.getUTCDate();

      // procedo a agregar y eliminar actividades según la fecha correspondiente
      if (arreglo == array1) {
        this.actividades.push(result)
        this.actividades = Array.from(this.actividades.reduce((map, obj) => map.set(obj.activityId, obj), new Map()).values());
        for (let i = 0; i < this.actividades2.length; i++) {
          let eliminar = this.actividades2.filter(item => item.activityId !== result.activityId)
          this.actividades2 = eliminar;
        }
        for (let i = 0; i < this.actividades3.length; i++) {
          let eliminar = this.actividades3.filter(item => item.activityId !== result.activityId)
          this.actividades3 = eliminar;
        }
        for (let i = 0; i < this.actividades4.length; i++) {
          let eliminar = this.actividades4.filter(item => item.activityId !== result.activityId)
          this.actividades4 = eliminar;
        }

        // Utilizo funcion predefinida de (a,b) para ordenar por fecha 
        this.actividades.sort(function (a, b) {
          if (a.endDate < b.endDate) {
            return -1;
          } else if (a.endDate > b.endDate)
            return 1;
          else
            return 0;
        });
      } else if (arreglo == array2) {
        this.actividades2.push(result)
        this.actividades2 = Array.from(this.actividades2.reduce((map, obj) => map.set(obj.activityId, obj), new Map()).values());
        for (let i = 0; i < this.actividades.length; i++) {
          let eliminar = this.actividades.filter(item => item.activityId !== result.activityId)
          this.actividades = eliminar;
        }
        for (let i = 0; i < this.actividades3.length; i++) {
          let eliminar = this.actividades3.filter(item => item.activityId !== result.activityId)
          this.actividades3 = eliminar;
        }
        for (let i = 0; i < this.actividades4.length; i++) {
          let eliminar = this.actividades4.filter(item => item.activityId !== result.activityId)
          this.actividades4 = eliminar;
        }

        // Utilizo funcion predefinida de (a,b) para ordenar por fecha 
        this.actividades2.sort(function (a, b) {
          if (a.endDate < b.endDate) {
            return -1;
          } else if (a.endDate > b.endDate)
            return 1;
          else
            return 0;
        });
      } else if (arreglo == array3) {
        this.actividades3.push(result)
        this.actividades3 = Array.from(this.actividades3.reduce((map, obj) => map.set(obj.activityId, obj), new Map()).values());
        for (let i = 0; i < this.actividades2.length; i++) {
          let eliminar = this.actividades2.filter(item => item.activityId !== result.activityId)
          this.actividades2 = eliminar;
        }
        for (let i = 0; i < this.actividades.length; i++) {
          let eliminar = this.actividades.filter(item => item.activityId !== result.activityId)
          this.actividades = eliminar;
        }
        for (let i = 0; i < this.actividades4.length; i++) {
          let eliminar = this.actividades4.filter(item => item.activityId !== result.activityId)
          this.actividades4 = eliminar;
        }

        // Utilizo funcion predefinida de (a,b) para ordenar por fecha 
        this.actividades3.sort(function (a, b) {
          if (a.endDate < b.endDate) {
            return -1;
          } else if (a.endDate > b.endDate)
            return 1;
          else
            return 0;
        });
      } else if (arreglo == array4) {
        this.actividades4.push(result)
        this.actividades4 = Array.from(this.actividades4.reduce((map, obj) => map.set(obj.activityId, obj), new Map()).values());
        for (let i = 0; i < this.actividades2.length; i++) {
          let eliminar = this.actividades2.filter(item => item.activityId !== result.activityId)
          this.actividades2 = eliminar;
        }
        for (let i = 0; i < this.actividades3.length; i++) {
          let eliminar = this.actividades3.filter(item => item.activityId !== result.activityId)
          this.actividades3 = eliminar;
        }
        for (let i = 0; i < this.actividades.length; i++) {
          let eliminar = this.actividades.filter(item => item.activityId !== result.activityId)
          this.actividades = eliminar;
        }

        // Utilizo funcion predefinida de (a,b) para ordenar por fecha 
        this.actividades4.sort(function (a, b) {
          if (a.endDate < b.endDate) {
            return -1;
          } else if (a.endDate > b.endDate)
            return 1;
          else
            return 0;
        });
      }
    });
  }

  // utilizo función para eliminar actividades
  eliminarAct(item1: Actividades) {
    for (let i = 0; i < this.actividades.length; i++) {
      let eliminar = this.actividades.filter(item => item.activityId !== item1.activityId)
      this.actividades = eliminar;
    }
    for (let i = 0; i < this.actividades2.length; i++) {
      let eliminar = this.actividades2.filter(item => item.activityId !== item1.activityId)
      this.actividades2 = eliminar;
    }
    for (let i = 0; i < this.actividades3.length; i++) {
      let eliminar = this.actividades3.filter(item => item.activityId !== item1.activityId)
      this.actividades3 = eliminar;
    }
    for (let i = 0; i < this.actividades4.length; i++) {
      let eliminar = this.actividades4.filter(item => item.activityId !== item1.activityId)
      this.actividades4 = eliminar;
    }
  }



}
