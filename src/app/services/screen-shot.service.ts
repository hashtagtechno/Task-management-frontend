import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ScreenShotService {
  userInfo: any;
  constructor(private http: HttpClient) {}

  async capture(type: 'screen' | 'window' = 'screen'): Promise<string | null> {
    if ((window as any).electronAPI?.captureScreen) {
      return await (window as any).electronAPI.captureScreen({ types: [type] });
    }
    return null;
  }
  addScreenShot(formdata: any) {
    return this.http.post(
      `${environment.apiUrl}/screenshots/upload-screenshot`,
      formdata
    );
  }
  getScreenshots(id: string) {
    return this.http.get(
      `${environment.apiUrl}/screenshots/get-screenshot/${id}`
    );
  }
  addWindowDetails(data: any) {
    return this.http.post(`${environment.apiUrl}/appActivityRoutes/save`, data);
  }
  addIdleDataDetails(data:any){
       console.log(data);
    return this.http.post(`${environment.apiUrl}/appActivityRoutes/save-ideal-time`, data);
  }
  getReport(id:string){
    return this.http.get(
      `${environment.apiUrl}/appActivityRoutes/get/${id}`
    );
  }
}
