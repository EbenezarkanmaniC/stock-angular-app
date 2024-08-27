import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  addCompany(company: Company): Observable<Company> {
    if (!company.id) {
      company.id = uuidv4(); // Generate a unique id using uuid
    }
    return this.http.post<Company>(this.apiUrl, company);
  }

  updateCompany(id: string, company: Company): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, company);
  }

  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
function uuidv4(): string {
  throw new Error('Function not implemented.');
}

