export class Note {
  constructor(
    public id: string,
    public state: string,
    public title: string,
    public text: string,
    public date: Date) { }
}
