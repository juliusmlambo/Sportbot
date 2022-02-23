import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sportbot',
  templateUrl: './sportbot.component.html',
  styleUrls: ['./sportbot.component.less']
})
export class SportbotComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      acceptTerms: [false, Validators.requiredTrue]
  });
  }

  get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.form.reset();
    }

}
