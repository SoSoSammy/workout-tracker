export class Goal {
  public name: string;
  public startDate: string; // YYYY-MM-DD
  public endDate: string; // YYYY-MM-DD
  public description: string;

  constructor(
    name: string,
    startDate: string,
    endDate: string,
    description: string
  ) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}
