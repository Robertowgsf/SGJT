import { Entity } from '../base/entity.model';

export class Project extends Entity {
    name: string = "";
    description: string = "";
    estimatedHours: number = 0;
    workedHours: number = 0;
    status: string = "";
    startDate: string = "";
    deadline: string = "";
}