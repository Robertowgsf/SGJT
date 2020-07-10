import { Component, OnInit } from '@angular/core';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';
import { WorkingTimeRecordService } from 'src/app/shared/services/working-time-record.service';

@Component({
  selector: 'app-apointment-report',
  templateUrl: './apointment-report.component.html',
  styleUrls: ['./apointment-report.component.scss']
})
export class ApointmentReportComponent implements OnInit {

  listDefinition = new ListDefinition();

  constructor(
    private readonly wtRecordService: WorkingTimeRecordService
  ) { }

  ngOnInit(): void {
    this.listDefinition.title = "Registros de Jornanda";
    this.listDefinition.columns = [
      new ListColumnDefinition("recordDate", "Data"),
      new ListColumnDefinition("user", "Usuário"),
      new ListColumnDefinition("type", "Tipo"),
      new ListColumnDefinition("project", "Projeto"),
      new ListColumnDefinition("description", "Descrição")
    ];

    // Obtém os registros de jornada da API.
    this.wtRecordService.get().subscribe(success => {
      this.listDefinition.dataSource = success;
    });
  }

}
