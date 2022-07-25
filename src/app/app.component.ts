import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropDataService } from './services/prop-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prop-mng';
  addPropertyModal: boolean = false;
  deletePropertyModal: boolean = false;
  currProperties: any;
  currPage: number = 1;
  id: any;
  status: string = 'LOADING...';

  properties: any;

  totalPages:any;
  addPropertyForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl(''),
    size: new FormControl('')
  });

  deletePropertyFrom = new FormGroup({
    id: new FormControl('')
  });

  pageNumberForm = new FormGroup({
    page: new FormControl('')
  });

  constructor(private propDataService: PropDataService) {
  }

  async initData(){
    this.status = 'LOADING...';
    (await this.propDataService.getData()).subscribe((data: any) => {
      this.properties = data.documents;
      this.totalPages = Math.ceil(this.properties.length/10);
      if(this.currPage>this.totalPages) {
        this.currPage = this.totalPages;
      }
      this.currProperties = this.properties.slice((this.currPage * 10)-10, (this.currPage * 10)-1);
      this.id = this.properties[this.properties.length-1].Id;
      this.status = '';
    });
  }

  async ngOnInit() {
    await this.initData();
  }

  async addPropertytoList(){
    this.status = 'ADDING...';
    (await this.propDataService.addProperty(this.id + 1,
      this.addPropertyForm.value.name,
      this.addPropertyForm.value.desc,
      this.addPropertyForm.value.size)).subscribe((data: any) => {
        console.log(data);
        this.status = '';
      });
    await this.initData();
    this.addPropertyModal = false;
    this.addPropertyForm.reset();
    this.totalPages = Math.ceil(this.properties.length/10);
    
  }

  async deleteProperty(id: number = this.deletePropertyFrom.value.id) {
    this.status = 'DELETING...';
    (await this.propDataService.deleteProperty(id)).subscribe(async (data: any) => {
      console.log(data);
      this.status = '';
      await this.initData();
    })
  }

  openModel(modal: string) {
    if(modal === 'addProperty') {
      this.addPropertyModal = true;
    } else if(modal === 'deleteProperty') {
      this.deletePropertyModal = true;
    }
  }

  gotoPage(page: number = this.pageNumberForm.value.page) {
    if(page>0 && page<=this.totalPages) {
    this.currProperties = this.properties.slice((page * 10)-10, (page * 10)-1);
    console.log(this.currProperties);
    this.currPage = page;
  }
  if(this.properties?.length==0){
    console.log('no properties');
    this.currProperties = [];
  }
  }

  closeModal(){
    this.addPropertyModal = false;
    this.deletePropertyModal = false;
    this.addPropertyForm.reset();
    this.deletePropertyFrom.reset();
  }
}
