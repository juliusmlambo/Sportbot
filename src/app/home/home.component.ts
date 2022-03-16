﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormControl,
    FormGroup,
    Validators,
    FormBuilder,
    FormsModule ,
    MaxLengthValidator,
  } from '@angular/forms';

 
import { DatePipe } from '@angular/common';
import { User, Person } from '@app/_models';
import { AccountService, ApiService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    registerUser: FormGroup;
    selectedValue = '0';


    people:Person[];
    person = new Person();
    public currentDateTime;
    date=new Date();
    time=new Date();
    

    constructor(public datepipe: DatePipe,
     private accountService: AccountService,
     private router: Router,
     private fb: FormBuilder, 
     private apiService:ApiService)
        {
        this.user = this.accountService.userValue;
        let date =this.datepipe.transform((new Date), 'MM/dd/yyyy');
        let time =this.datepipe.transform((new Date), 'HH:mm');
  
        console.log(date);
        console.log(time);

    }



    navigateToSportbot() {
        this.router.navigate(['/sportbot']);
      }

      ngOnInit(): void {

        this.refreshPeople()
  
        this.registerUser = new FormGroup({
          firstname: new FormControl(null, [
          Validators.required,
           Validators.maxLength(30)]),
    
          middlename: new FormControl(null, [
            Validators.maxLength(30)]),
    
          lastname: new FormControl(null, [
            Validators.required,
             Validators.maxLength(30)]),
    
          nickname: new FormControl(null, [
            Validators.maxLength(30)]),
    
          idnumber: new FormControl(null, [
            Validators.pattern("^((\\+27-?)|0)?[0-9]{13}$"),
            Validators.required,
            Validators.minLength(13),
            Validators.maxLength(13),
          ]),
          nationality: new FormControl(null, Validators.required),
          
          mobile: new FormControl(null, [
            Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
         
          ]),
          email: new FormControl(null, [
            Validators.required,
             Validators.email]),
             
          tokenid: new FormControl(null, [
          Validators.maxLength(10)]),

          longitude: new FormControl(null, [
           ]),

            latitude: new FormControl(null, [
              ]),

              date: new FormControl(null, [
              ]),
   
              time: new FormControl(null, [
                 ]),
             
        });
    
         this.getLocation();
      }

      onSubmit() {
        console.log(this.registerUser);
        this.registerUser.reset();
      }

      countries = [
        { id: 5, name: 'South Africa' },
        { id: 1, name: 'United States' },
        { id: 2, name: 'Australia' },
        { id: 3, name: 'Canada' },
        { id: 4, name: 'Brazil' },
        { id: 6, name: 'England' },
      ];

      submit() {
        console.log(this.registerUser.value);
      }


        public lat;
        public lng;

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          
        }
      },
        //(error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
    
      callApi(Longitude: number, Latitude: number){
        const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
        //Call API
      }


      isShown: boolean = false ; // hidden by default
      isShownPass: boolean = false ; // hidden by default
      toggleShowId() {
      this.isShown = ! this.isShown;
      }

      toggleShowPass() {
        this.isShownPass = ! this.isShownPass;
        }


//talk to backend
        refreshPeople() {
          this.apiService.getPeople()
            .subscribe(data => {
              console.log(data)
              this.people=data;
            })      
       
        }

        addPerson() {
          this.apiService.addPerson(this.person)
            .subscribe(data => {
              console.log(data)
              this.refreshPeople();
            })      
        }
        


       

      
}