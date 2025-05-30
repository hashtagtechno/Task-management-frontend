import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ScreenShotService {
 constructor(private http:HttpClient){}

  async capture(type: 'screen' | 'window' = 'screen'): Promise<string | null> {
  if ((window as any).electronAPI?.captureScreen) {
    return await (window as any).electronAPI.captureScreen({ types: [type] });
  }
  return null;
}
 addScreenShot(formdata:any){

   return this.http.post(`${environment.apiUrl}/screenshots/upload-screenshot`,formdata);
  }
  getScreenshots(id:string){
     return this.http.get(`${environment.apiUrl}/screenshots/get-screenshot/${id}`);
  }

}
