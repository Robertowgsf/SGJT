import { Entity } from '../base/entity.model';
import { Team } from './team.model';

export class User extends Entity {
    name: string = "";
    dailyHours: number = 0;
    teams: Array<Team> = [];
}