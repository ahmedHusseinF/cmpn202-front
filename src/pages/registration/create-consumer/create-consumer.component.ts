import { Component, OnInit ,ViewChild} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ConsumerService } from '../../../app/services/consumer.service';
import { SearchService } from '../../../app/services/search-service';
import { ProfileService } from '../../../app/services/profile.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { GlobalVariablesService } from '../../../app/services/global-variables.service';
declare var $: any;

@Component({
  selector: 'app-create-consumer',
  templateUrl: './create-consumer.component.html',
  styleUrls: ['./create-consumer.component.css'],
  providers: [ProfileService]
})
export class CreateConsumerComponent implements OnInit {
  public consumerForm: FormGroup;
  @ViewChild('img')img;
  alreadyExist: boolean = false;
  nationalId: string;
  openView: boolean;
  validationErrors: any;
  profiles: any;
  mobileNotFound: any;
  searchMobileSubscribe: any;
  message: any;
  getProfilesSubscribe: any;

  //birthday : string = this.nationalId.slice(2,10);

  constructor(
    private title: Title,
    private localStorage: LocalStorageService,
    private formbuilder: FormBuilder,
    private service: ConsumerService,
    private profileService: ProfileService,
    private globals: GlobalVariablesService,
    private searchService: SearchService
  ) {
    this.title.setTitle('Create Consumer');
  }

  uploadImage(event) {
    let file: File = event.target.files[0];
    if(file&&(file.type.split('/')[0]!=='image')){
      this.img.nativeElement.value = null;
      return this.globals.showModal('You can only upload images','danger')
    }
    this.consumerForm.controls['imageExt'].setValue(file.type.split('/')[1]);

    let myReader: FileReader = new FileReader();
    myReader.onload = readerEvt => {
      const binaryString = myReader.result;
      this.consumerForm.controls['consumerImage'].setValue(btoa(binaryString));
    };
    myReader.readAsBinaryString(file);

  }
  initForm() {
    let formvalidation = {
      mobile_number: [
        '',
        [
          <any>Validators.required,
          <any>Validators.minLength(11),
          <any>Validators.maxLength(11)
        ]
      ],
      fname: ['', [<any>Validators.required]],
      mname: ['', [<any>Validators.required]],
      lname: ['', [<any>Validators.required]],
      national_id: [
        '',
        [
          <any>Validators.required,
          <any>Validators.minLength(19),
          <any>Validators.maxLength(19)
        ]
      ],
      birthdate: ['', [<any>Validators.required]],
      gender: [''],
      profile_id: ['', [<any>Validators.required]],
      phone: [''],
      email: [''],
      address: ['', [<any>Validators.required]],
      city: ['', [<any>Validators.required]],
      license_type: ['', [<any>Validators.required]],
      license_value: ['', [<any>Validators.required]],
      marital_status: [''],
      occupation: [''],
      notes: [''],
      consumerImage: [''],
      imageExt: [''],
      serial_number: ['']
    };
    this.consumerForm = this.formbuilder.group(formvalidation);
  }

  ngOnInit() {
    // this.birthday=this.nationalId.slice(2,10);

    this.initForm();
    this.globals.unSubscribe(
      this.profileService.listProfile('Consumer').subscribe(res => {
        if (res.status == 200) this.profiles = res.data.profiles;
      })
    );
  }
  public consumer(body, valid) {
    this.validationErrors = {};
    if (!valid)
      this.globals.unSubscribe(
        this.service.consumer(body).subscribe(res => {
          console.log(res);
          if (res.status == 201) {
            this.consumerForm.reset();
            this.mobileNotFound = null;
            this.globals.showModal('Consumer created');
            window.scrollTo(0, 0);
          } else if (res.status == 300) {
            this.validationErrors = res.data.validationErrors;
          } else {
            this.globals.showModal(res.data.message,'danger');
          }
          //this.toasterService.pop('success', 'Args Title', 'Args Body');
        })
      );
  }
  public search(mobile) {
    this.mobileNotFound = null;
    this.validationErrors = null;
    this.globals.unSubscribe(
      this.searchService.checkIfRegistered(mobile).subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.mobileNotFound = !res.data.mobileFound;
        } else if (res.status == 300) {
          this.validationErrors = res.data.validationErrors;
        } else {
          this.globals.showModal(res.data.message,'danger');
        }
      })
    );
  }

  public birth() {
    this.consumerForm.patchValue({
      birthdate: this.generateBirthDateFromNationalID(this.nationalId)
    })
  }

  generateBirthDateFromNationalID(id) {
    return id.slice(5, 7) + '-' + id.slice(3, 5) + '-' + id.slice(1, 3);
  }

  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
