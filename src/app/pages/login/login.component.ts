import {Component, ElementRef, Inject, InjectionToken, Input, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {
  IKeyboardLayout,
  MAT_KEYBOARD_LAYOUTS, MatKeyboardComponent,
  MatKeyboardRef,
  MatKeyboardService
} from "angular-onscreen-material-keyboard";
import {BehaviorSubject, Subscription} from "rxjs";
import {ControlValueAccessor,NG_VALUE_ACCESSOR, FormControl, FormGroup, NgControl, NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input('codeInput')
  model: any;

  _keyboardRef: MatKeyboardRef<MatKeyboardComponent> |undefined;
  @ViewChild('codeInput', { read: ElementRef })
  private _attachToElement: ElementRef|undefined;

  @ViewChild('codeInput', { read: NgModel })
  private _attachToControl: NgControl|undefined;
  private _submittedForms = new BehaviorSubject<{ control: string, value: string }[][]>([]);
  _enterSubscription: Subscription |undefined;
  layout: string |undefined;
  constructor(private _keyboardService: MatKeyboardService,) { }

  ngOnInit(): void {
  }
  // this called every time when user changed the code
  onCodeChanged(code: string) {

  }
  onCodeCompleted(code: string) {

  }
  private data = '';
  userNameControle = new FormControl({value: this.data, disabled: false});
  passwordControle = new FormControl({value: this.data, disabled: false});
  codePinControle = new FormControl({value: this.data, disabled: false});

  openKeyboard(locale:string,code:any) {
    console.log(code.currentTarget.value);
    this._keyboardRef = this._keyboardService.open(locale, {
    });
    this._enterSubscription = this._keyboardRef.instance.enterClick.subscribe(()=> {
      this.submitForm();
    });
    // reference the input element

    // if (this._attachToElement!=null) {
    //   this._keyboardRef.instance.setInputInstance(this._attachToElement);
    // }
    // // set control
    //
    // if (this._attachToControl!=null && this._attachToControl.control!=null   ) {
    //   this._keyboardRef.instance.attachControl(code.currentTarget);
    // }
   }
  submitForm(form?: NgForm |undefined ) {
    if (form) {
      const submittedForms = this._submittedForms.getValue();
      const submittedForm = Object
        .keys(form)
        .map((control: string) => ({
          control,
          value: form.value
        }));

      submittedForms.push(submittedForm);
      this._submittedForms.next(submittedForms);
    }
  }
}
