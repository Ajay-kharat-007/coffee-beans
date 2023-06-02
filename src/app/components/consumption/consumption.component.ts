import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { DrinksDataService } from 'src/app/services/drinks-data.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries | any | any[] | '';
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  grid: ApexGrid | any;
  colors: string[] | any;
  legend: ApexLegend | any;
};

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {

  @ViewChild("chart") chart !: ChartComponent;
  public chartOptions !: Partial<ChartOptions>;
  morning: any[] = []
  evening:any[] = []
  data:any[] = []
  category:any[]=[]
  count:any[] = []
  title:any[] = []

  constructor(private service: DrinksDataService) {
    this.service.orderItems.subscribe((res:any)=>{
      this.morning = res
    })
    this.service.orderItemsEve.subscribe((res:any)=>{
      this.evening = res
    })
   }

  ngOnInit(): void {
    this.chartData(null,null)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let totalArray = [...this.morning, ...this.evening]
      let total = this.concatUserLists(totalArray)
      let category = total.map((res:any)=>{
        return [res.title]
      })
      let data = total.map((res:any)=>{
        return res.userList.length
      })
      this.chartData(data, category)
    }, 2000);
  }

  concatUserLists(array:any) {
    const resultMap = new Map();
    for (const obj of array) {
      const { title, userList } = obj;
      if (resultMap.has(title)) {
        resultMap.set(title, resultMap.get(title).concat(userList));
      } else {
        resultMap.set(title, userList);
      }
    }
    const resultArray = Array.from(resultMap, ([title, userList]) => ({ title, userList }));
    return resultArray;
  }

  chartData(data:any, category:any){
    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          data: data?data:[]
          // data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#D8B68E",
        "#542603",
        "#37281D",
        "#E3B13A",
        "#3D3D3D",
        "#DD6D12",
      ],
      plotOptions: {
        bar: {
          columnWidth: "65%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: category?category:[
          // ["Coffee"],
          // ["Tea"],
          // ["Black Tea"],
          // // ["Green Tea"],
          // ["Milk"],
          // ["Lemon Tea"],
          // ["Hot Water"]
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }

  loadChartDateWise(item:any){
    let totalArray = [...this.morning, ...this.evening]
      let total = this.concatUserLists(totalArray)
      let category = total.map((res:any)=>{
        return [res.title]
      })
      let data = total.map((res:any)=>{
        return res.userList.length
      })
    if(item === 'day'){
      this.chartData(data, category)
    }else if(item === 'week'){
      this.chartData(data, category)
    }else if(item === 'month'){
      this.chartData(data, category)
    }else if(item === 'custom'){
      this.chartData(data, category)
    }
  }

}
