import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {

  getStatuses() {
    const statusObject: {status1: boolean, status2: boolean} = {
      status1: this.getRandomBooleanValue(),
      status2: this.getRandomBooleanValue()
    }

    return of(statusObject)
  }

  getRandomBooleanValue() {
    return Math.random() >= 0.5
  }
}
