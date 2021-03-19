import React, { useState, useEffect, useRef } from "react";
import { Grid, Paper } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";

function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}

function useSize(ref) {
  const [targetSize, setTargetSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setTargetSize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height });
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  return targetSize;
}

const MyResponsiveBar = ({ data, size }) => (
  <ResponsiveBar
    data={data}
    keys={["percent"]}
    indexBy="question"
    layout="horizontal"
    colors={data.map((item) => item.color)}
    margin={{ top: 20, right: 20, bottom: 20, left: size.width > 550 ? 150 : 60 }}
    padding={0.3}
    enableGridX={true}
    labelTextColor="#fff"
    label={(data) => `${data.value}%`}
    labelFormat={(d) => {
      return <tspan style={{ fontSize: 16 }}>{d}</tspan>;
    }}
    tooltip={({ data }) => {
      return (
        <g>
          <text>
            <tspan>
              <strong>{data.question}</strong>
            </tspan>
          </text>
          <br />
          <text>
            <tspan>{` Количество - ${data.count}`}</tspan>
          </text>
          <br />
          <text>
            <tspan>{` Процент - ${data.percent}%`}</tspan>
          </text>
        </g>
      );
    }}
    axisLeft={{
      renderTick: (tick) => (
        <g transform={`translate(${tick.x},${tick.y})`}>
          <text
            alignmentBaseline={tick.textBaseline}
            textAnchor={tick.textAnchor}
            transform={`translate(${tick.textX},${tick.textY})`}>
            <tspan>{truncate(tick.value, size.width > 550 ? 16 : 5)}</tspan>
          </text>
        </g>
      ),
    }}
  />
);

function SurveyAnswerItemAnswerTypeSelection({ answerData }) {
  const wrapperRef = useRef();
  const chartSize = useSize(wrapperRef);

  const dataForChart = Object.keys(answerData.answers).map((key) => {
    return {
      question: key,
      percent: Number(((answerData.answers[key] * 100) / answerData.totalAnswersCount).toFixed(2)),
      count: answerData.answers[key],
      color: "rgb(63,81,181)",
    };
  });
  dataForChart.reverse();
  return (
    <Paper className="paper answer-paper">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div ref={wrapperRef} style={{ width: "100%", height: `${dataForChart.length * 50 + 100}px` }}>
            <MyResponsiveBar size={chartSize} data={dataForChart} />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SurveyAnswerItemAnswerTypeSelection;
