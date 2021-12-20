import React, { Component } from 'react'
import GChart from "react-google-charts";

export class Chart extends Component {
    render() {

        return (
          <GChart
              chartType="ScatterChart"
            //   width="80%"
              width="400px"
              height="400px"
              data={this.props.data}
              options={this.props.options}
              legendToggle
              loader={<div>Loading Chart</div>}
              chartEvents={[
                {
                  eventName: "ready",
                  callback: ({ chartWrapper, google }) => {
                    const chart = chartWrapper.getChart();
                    google.visualization.events.addListener(
                      chart,
                      "onmouseover",
                      e => {
                        const { row, column } = e;
                        console.warn("MOUSE OVER ", { row, column });
                      }
                    );
                    google.visualization.events.addListener(
                      chart,
                      "onmouseout",
                      e => {
                        const { row, column } = e;
                        console.warn("MOUSE OUT ", { row, column });
                      }
                    );
                  }
                }
              ]}
            />
        );
      }
}

export default Chart
