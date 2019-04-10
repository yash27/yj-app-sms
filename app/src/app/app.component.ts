import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chart: Chart;
  studentName: string;
  studentProps: any = {};
  studentsData: any = [];
  isDone: boolean;
  marks: any = {};

  ngOnInit() {
    
  }

  addProperty() {
    this.studentsData.push(this.studentProps);
    this.studentProps = {};
  }

  removeProperty(subject) {
    let studentIndex: number;
    this.studentsData.forEach((element, index) => {
      if(subject == element.sub) {
        studentIndex = index;
        return;
      }
    });
    this.studentsData.splice(studentIndex, 1);
  }

  setChart() {
    let categories = [];
    let data = [];
    this.studentsData.forEach(element => {
      categories.push(element.sub);
      data.push(element.marks);
    });
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      title:{
        text: this.studentName + ' Marks Statistics'
      },
      xAxis: {
        categories: categories
      },
      series: [{
        name: this.studentName,
        data: data
      }]
    });
    let dataCpy = data;
    this.marks['total'] = dataCpy.reduce(this.​getSum);
    this.marks['avg'] = this.marks.total/data.length;
    this.marks.avg = this.marks.avg.toFixed(2);
    this.isDone = true;
    this.studentName = undefined;
    this.studentsData = [];
    this.studentProps = {};
  }

  removeChart() {
    this.chart.ref.destroy();
    this.isDone = false;
  }

  ​getSum(total, num) {
    return total + num;
  }

}
