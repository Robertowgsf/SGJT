import { Entity } from '../base/entity.model';
import { Team } from './team.model';

export class User extends Entity {
    name: string = "";
    teams: Array<Team> = [];
}