import { Entity } from '../base/entity.model';
import { User } from './user.model';

export class Team extends Entity {
    name: string = "";
    users: Array<User> = [];
}