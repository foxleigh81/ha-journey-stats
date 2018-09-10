import * as d3 from 'd3'

// No NPM package contains the complete 'here' API so we need to import it from the DOM
let H = window.h

const APP_ID = 'DemoAppId01082013GAL'
const APP_CODE = 'AJKnXv84fjrb0KIHawS0Tg'

var queries = {
  query: {
    fileName: 'query.json',
    dataset: '561122bec90a46778e08c366ce201402',
    id: 'a631a9a873b24060b6c3c1d977757189'
  }
}

const { query } = queries

// Initialize communication with the platform, to access your own data, change the values below
// https://developer.here.com/documentation/geovisualization/topics/getting-credentials.html

// We recommend you use the CIT environment. Find more details on our platforms below
// https://developer.here.com/documentation/map-tile/common/request-cit-environment-rest.html

const platform = new H.service.Platform({
  APP_ID,
  APP_CODE,
  useCIT: true,
  useHTTPS: true
})

let svg = d3.select('svg')
let margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
}
let width = +svg.attr('width') - margin.left - margin.right
let height = +svg.attr('height') - margin.top - margin.bottom

let g = svg
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const service = platform.configure(new H.datalens.Service())
service.fetchQueryData(query.id).then(function (data) {
  let yOffset = 15
  let xRange = d3
    .scaleBand()
    .rangeRound([margin.left, width - margin.right], 0.7)
    .domain(
      data.rows.map(function (d) {
        return d[1]
      })
    )
  // define range of the y axis
  let yRange = d3
    .scaleLinear()
    .range([height - margin.top, margin.bottom])
    .domain([
      0,
      d3.max(data.rows, function (d) {
        return d[0]
      })
    ])

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + (height - yOffset) + ')')
    .call(d3.axisBottom(xRange))

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(yRange).ticks(5, '.0s'))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Timestep')

  g.selectAll('.bar')
    .data(data.rows)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {
      return xRange(d[1])
    })
    .attr('y', function (d) {
      return yRange(d[0]) - yOffset
    })
    .attr('width', xRange.bandwidth() - yOffset)
    .attr('height', function (d) {
      return height - yRange(d[0])
    })
})

export default {
  name: 'AppLogo'
}
