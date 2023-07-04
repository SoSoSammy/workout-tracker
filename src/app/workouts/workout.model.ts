export class Workout {
  public name: string;
  public date: string; // YYYY-MM-DD
  public type: string;
  public duration: string;
  public videos: string[];
  public notes: string;

  constructor(
    name: string,
    date: string,
    type: string,
    duration: string,
    videos: string[],
    notes: string
  ) {
    this.name = name;
    this.date = date;
    this.type = type;
    this.duration = duration;
    this.videos = videos;
    this.notes = notes;
  }
}
