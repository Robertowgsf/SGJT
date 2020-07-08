export class FormFieldDefinition {
    name: string;
    nickname: string;
    placeholder: string;
    type: string;

    constructor(name: string, nickname: string, placeholder: string, type: string) {
        this.name = name;
        this.nickname = nickname;
        this.placeholder = placeholder;
        this.type = type;
    }
}