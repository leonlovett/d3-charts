import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { Subject } from "rxjs";
import { StoreService } from "../../store.service";
import { DataService } from "../../data.service";

@Component({
  selector: 'app-employee-gender',
  templateUrl: './employee-gender.component.html',
  styleUrls: ['./employee-gender.component.scss']
})
export class EmployeeGenderComponent implements AfterViewInit {

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
    this.svg = d3.select('svg#eg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.padding + ',' + -(this.padding) + ')')
  }

  drawBars() {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width - 35])
      .domain(this.store.genderDomain)
      .padding(0.3);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + (this.height) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, this.store.getGenderWinnerCount()])
      .range([this.height, 35]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    const sel = this.svg.selectAll("bars")
      .data(this.store.employeesByGender)
      .enter()
      .append("rect")
      .attr("x", d => x(d.gender))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.count))
      .attr('fill', 'white')
      
      sel
      .transition()
      .duration(1000)
      .attr("fill", d => d.gender === 'male' ? "#3f51b5" : "#ff4081")
      // .on('mouseenter', (evt, d) => {
      //   this.tooltip
      //     .style('opacity', 1)
      //     .html(`<span>There are ${d.count} ${d.gender} employees.</span>`)
      //     .style('position', 'absolute')
      //     .style('background', 'red')
      //     .style('width', '100px')
      //     .style('left', (evt.pageX - 50) + 'px')
      //     .style('top', (evt.pageY - 60) + 'px')
      //     .style('pointer-events', 'none')
      //     .style('border-radius', '10px')
      //     .style('display', 'flex')
      //     .style('justify-content', 'center')
      //     .style('align-items', 'center')
      //     .style('text-align', 'center')
      //     .style('color', 'white')
      //     .style('padding', '5px')
      // })
      // .on('mouseout', () => {
      //   this.tooltip
      //     .style('opacity', '0');
      // })

    this.svg.selectAll("bars")
    .data(this.store.employeesByGender)
    .enter()
    .append('text')
    .style("fill", "white")
    .style('font-size', '40px')
    .text(d => d.count)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .attr('dx', d => x(d.gender) + x.bandwidth() / 2)
    .attr('dy', d => this.height / 2);

  }

  async ngAfterViewInit() {
    this.elementWidth.next(this.genderCard.nativeElement.offsetWidth - 112);
    this.elementHeight.next(this.genderCard.nativeElement.offsetWidth * .6);
  }

}