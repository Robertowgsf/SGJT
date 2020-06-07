export class FormFieldDefinition {
    name: string;
    nickname: string;
    value: any;

    constructor(name: string, nickname: string, value: any) {
        this.name = name;
        this.nickname = nickname;
        this.value = value;
    }
}