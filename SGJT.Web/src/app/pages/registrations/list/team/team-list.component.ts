import { Component, OnInit } from '@angular/core';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  listDefinition = new ListDefinition();

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.listDefinition.title = "Times";
    this.listDefinition.registerURL = "pages/registrations/register/team";
    this.listDefinition.columns = [
      new ListColumnDefinition("name", "Nome")
    ];
    this.listDefinition.newEntryName = "Time";

    this.teamService.get().subscribe(success => {
      this.listDefinition.dataSource = success;
    });
  }

}
