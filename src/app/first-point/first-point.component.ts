import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
declare var $: any;

@Injectable()
@Component({
  selector: 'app-first-point',
  templateUrl: './first-point.component.html',
  styleUrls: ['./first-point.component.scss']
})
export class FirstPointComponent implements OnInit {

  public id;
  public listRoles;
  public rolSerched;
  public nameRol;
  public descRol;
  public newnameRol;
  public newdescRol;
  public state;
  public modnameRol;
  public moddescRol;
  public modstate;
  public reference;
  public successSend = false;
  public successSendMessage = true;
  public successSendMeassageSuccess = true;
  public successSendMeassageError = true;
  public active;
  public inactive; 


  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleHRlcm5vIiwiaWF0IjoxNTU4MTAyMDIyLCJleHAiOjE1NTgxODg0MjJ9.klzX4BrMSm_sL7BqdzEukfEA6UB4m5VsrGlqhTOCcWKIDj66rrZPsQMsek7SD6hO9rViOky4u4Sa9-GAY9314g' 
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  consult() {
    const name = this.nameRol;
    const description = this.descRol;
    const configUrl = 'http://18.204.7.57:8080/sigmaDev/api/administracion/rol/search?descripcion=' + description + '&nombre=' + name;
    this.http.get(configUrl, this.httpOptions).subscribe(
      (items) => {
        console.log(items['content']);
        this.listRoles = items['content'];
      },
      (err) => {
        alert('El rol no existe o asegurese de haber ingresado bien el nombre y descripcion');
      }
    );
  }
  newRol() {
    if (this.state === '1') {
      this.state = true;
    } else {
      this.state = false;
    }
    const body = {
      "activo": this.state,
      "descripcion": this.newnameRol,
      "nombre": this.newdescRol
    };
    const configUrl = 'http://18.204.7.57:8080/sigmaDev/api/administracion/rol';
    this.http.post(configUrl, body, this.httpOptions).subscribe(
      (data) => {
        console.log(data);
        this.consult();
        this.successSend = true;
        this.successSendMessage = false;
        this.successSendMeassageSuccess = false;
        this.successSendMeassageError = true;
        setTimeout(() => {
          $('.close-button').click();
        }, 1000);
      },
      (err) =>  {
        console.log(err);
        this.successSend = true;
        this.successSendMessage = false;
        this.successSendMeassageSuccess = true;
        this.successSendMeassageError = false;
      }
    );
  }
  modifiedRol() {
    if (this.modstate === '1') {
      this.modstate = true;
    } else {
      this.modstate = false;
    }
    const body = {
      "id": this.id,
      "activo": this.modstate,
      "descripcion": this.modnameRol,
      "nombre": this.moddescRol
    };
    const configUrl = 'http://18.204.7.57:8080/sigmaDev/api/administracion/rol';
    this.http.put(configUrl, body, this.httpOptions).subscribe(
      (data) => {
        console.log(data);
        this.consult();
        $('.close-button').click();
      },
      (err) =>  {
        console.log(err);
      }
    );
  }
  deleteElement(i) {
    const deleteThis = this.listRoles[i].id;
    const configUrl = 'http://18.204.7.57:8080/sigmaDev/api/administracion/rol/' + deleteThis;
    this.http.delete(configUrl, this.httpOptions).subscribe(
      (items) => {
        this.consult();
      },
      (err) => {
        alert('El rol no se puede eliminar');
      }
    );

  }
  newRolButton() {
    $('#newRol').css({
      opacity: '1',
      background: 'rgba(0,0,0, 0.7)',
      'padding-top': '250px'
    });
  }
  modifiedRolButton(i) {
    $('#modifiedRol').css({
      opacity: '1',
      background: 'rgba(0,0,0, 0.7)',
      'padding-top': '250px'
    });
    this.reference = this.listRoles[i];
    this.id = this.listRoles[i].id;
    if (this.listRoles[i].state === true) {
      $('.mod-modal-options .activo').attr('selected','');
      $('.mod-modal-options .inactivo').removeAttr('selected','');
    } else {
      $('.mod-modal-options .inactivo').attr('selected','');
      $('.mod-modal-options .activo').removeAttr('selected','');
    }
  }
  clear() {
   this.listRoles = []; 
  }
}
