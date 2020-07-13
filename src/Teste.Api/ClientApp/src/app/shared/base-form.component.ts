import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

export abstract class BaseFormComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  abstract submit();

  onSubmit(): void {
    if (this.form.valid) {
      this.submit();
    } else {
      this.verifyFormValidations(this.form);
    }
  }

  verifyFormValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const controle = formGroup.get(field);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verifyFormValidations(controle);
      }
    });
  }

  reset(): void {
    this.form.reset();
  }

  verifyRequired(field: string): boolean {
    return (this.form.get(field).hasError('required') &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  applyCssError(field: string): object {
    return {
      'is-invalid': this.verifyInvalidAndTouched(field)
    };
  }

  verifyInvalidAndTouched(field: string): boolean {
    return (
      !this.form.get(field).valid &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  disableField(field: string): void {
    Object.keys(this.form.value).forEach(prop => {
      if (prop === field) {
        this.form.get(prop).disable();
      }
    });
  }

  enableField(field: string): void {
    Object.keys(this.form.value).forEach(prop => {
      if (prop === field) {
        this.form.get(prop).enable();
      }
    });
  }

}
