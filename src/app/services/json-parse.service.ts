import { Injectable } from '@angular/core';
import { IStaff } from '../staff-interface';


type ParseResult<T> = {parsed: T; hasError: false } |
  {parsed?: undefined; hasError: true};

@Injectable({
  providedIn: 'root'
})
export class JsonParseService {

  isArrayJson(arr: any): arr is IStaff[] {
    if(typeof arr.length === 'undefined') {return false;}
    for(let i=0; i < arr.length; i++){
      let obj = arr[i];
      if(!("id" in obj && "name" in obj && "position" in obj))
        return false;
    }
    return true;
}

safeJsonParse = <T>(guard: (o: any) => o is T) =>
    (text: string): ParseResult<T> => {
        const parsed = JSON.parse(text);
        return guard(parsed) ? {parsed, hasError: false} : {hasError: true};
    }

parseJson(text: string): IStaff[] {
    const result = this.safeJsonParse(this.isArrayJson)(text);
    if(result.hasError){
      console.log("unable to fetch staff");
      return [];
    }
    else
      return result.parsed;
}

  constructor() { }
}
