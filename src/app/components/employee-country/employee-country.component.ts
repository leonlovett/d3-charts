import { Component, ElementRef, ViewChild, AfterViewInit, ɵSWITCH_IVY_ENABLED__POST_R3__ } from '@angular/core';
import * as d3 from 'd3';
import { Subject } from "rxjs";
import { StoreService } from "../../store.service";
import { DataService } from "../../data.service";

@Component({
  selector: 'app-employee-country',
  templateUrl: './employee-country.component.html',
  styleUrls: ['./employee-country.component.scss']
})
export class EmployeeCountryComponent implements AfterViewInit {

  svg;
  width: number;
  height: number = 700;
  margin: number = 50;
  padding: number = 35;
  elementWidth: Subject<number> = new Subject();
  elementHeight: Subject<number> = new Subject();

  domain: Array<any>;
  tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  @ViewChild('genderCard') genderCard: ElementRef;

  constructor(
    readonly store: StoreService,
    readonly dataService: DataService
  ) {
    this.elementWidth.subscribe(width => this.width = width);
    this.elementHeight.subscribe(height => this.height = height);
    this.store.employeesLoaded.subscribe(resp => {
      if (resp === true) {
        this.createSvg();
        this.drawBars();
      }
    })
  }

  async createSvg() {
    this.svg = d3.select('svg#ec')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + (this.padding + 50) + ',' + 0 + ')')
  }

  drawBars() {
    // Create the Y-axis band scale
    const y = d3.scaleBand()
      .range([0, this.height - 35])
      .padding(0.15)
      .domain(this.store.countryDomain)
    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("transform", "translate(0,0)")
      .style("text-anchor", "end");

    // Create the X-axis band scale
    const x = d3.scaleLinear()
      .domain([this.store.getCountryWinnerCount(), 0])
      .range([this.width - this.padding - 85, 0]);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(0, ' + (this.height - this.padding) + ')')

    // Create and fill the bars
    const sel = this.svg.selectAll("bars")
      .data(this.store.employeesByCountry)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("y", d => y(d.country))
      .attr("height", y.bandwidth())
      .attr('width', 0)

      sel
      .transition()
      .delay(500)
      .duration(1000)
      .attr("width", (d) => x(d.count))
      .attr("fill", "#3f51b5");

      sel.on('mouseover', (evt, d) => {
        this.tooltip
          .style('opacity', 1)
          .html(`<span>There are ${d.count} employees in ${d.country}.</span>`)
          .style('position', 'absolute')
          .style('background', 'red')
          .style('width', '100px')
          .style('left', (evt.pageX - 50) + 'px')
          .style('top', (evt.pageY - 60) + 'px')
          .style('pointer-events', 'none')
          .style('border-radius', '10px')
          .style('display', 'flex')
          .style('justify-content', 'center')
          .style('align-items', 'center')
          .style('text-align', 'center')
          .style('color', 'white')
          .style('padding', '5px')
      })
      .on('mouseout', () => {
        this.tooltip
          .style('opacity', '0');
      })

    // this.svg.selectAll("bars")
    //   .data(this.store.employeesByCountry)
    //   .enter()
    //   .append('text')
    //   .style("fill", "white")
    //   .style('dominant-baseline', 'central')
    //   .text(d => d.count)
    //   .attr('text-anchor', 'end')
    //   .attr('dy', d => y(d.country) + y.bandwidth() / 2)
    //   .attr('dx', d => x(d.count))
  }

  sortData() {
    const ebc = this.store.employeesByCountry.sort((a, b) => {
      return b.count - a.count;
    });

    this.store.setEmployeesByCountry(ebc);
  }

  async ngAfterViewInit() {
    this.elementWidth.next(this.genderCard.nativeElement.offsetWidth - 112);
    this.elementHeight.next(this.genderCard.nativeElement.offsetWidth * .6);
  }

}
