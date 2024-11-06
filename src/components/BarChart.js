import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Text, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

// Bar Colors
const barColors = [
  '#FF6384', // Red
  '#36A2EB', // Blue
  '#FFCE56', // Yellow
  '#4BC0C0', // Green
  '#9966FF', // Purple
  '#FF9F40', // Orange
];

// Custom Labels Component to show values on top of bars
const Labels = ({ x, y, bandwidth, data, labels, xleft, xright }) =>
  data.map((valueObj, index) => {
    const isRotated = labels.length > 5;
    const rotate = isRotated ? -45 : 0; // Rotate if there are more than 5 labels
    const labelX = x(index) + bandwidth / 2;
    const labelY = isRotated ? y(valueObj.value) + 10 : y(valueObj.value) - 5; // Adjust vertical position

    return (
      <Text
        key={index}
        x={labelX}
        y={labelY}
        fontSize={10}
        fill="black"
        alignmentBaseline="middle"
        textAnchor="middle"
        rotation={rotate}
        originX={labelX}
        originY={labelY}
      >
        {labels[index]}
      </Text>
    );
  });

// Reusable Bar Chart Component
const BarChartComponent = ({ data, labels, xleft, xright }) => {
  const processedData = data.map((value, index) => ({
    value,
    svg: {
      fill: value === 0 ? '#F0F0F0' : barColors[index % barColors.length],
    },
  }));

  const maxDataValue = Math.max(...processedData.map((item) => item.value));
  const backgroundData = processedData.map(() => ({
    value: maxDataValue,
    svg: { fill: '#F0F0F0' },
  }));

  const cornerRadius = 10;

  return (
    <View style={styles.container}>
      <View style={{ height: 215, flexDirection: 'row' }}>
        {/* Y-Axis */}
        <YAxis
          style={{ width: 15 }}
          data={processedData.map((item) => item.value)}
          contentInset={{ top: 18, bottom: 14 }}
          svg={{
            fontSize: 10,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 0.8,
          }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />
        {/* Bar Chart Container */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={StyleSheet.absoluteFill}
            data={backgroundData}
            yAccessor={({ item }) => item.value}
            contentInset={{ top: 10, bottom: 10 }}
            spacingInner={0.3}
            spacingOuter={0.1}
            gridMin={0}
          />
          <BarChart
            style={StyleSheet.absoluteFill}
            data={processedData}
            yAccessor={({ item }) => item.value}
            contentInset={{ top: 10, bottom: 10 }}
            spacingInner={0.3}
            spacingOuter={0.1}
            rx={cornerRadius}
            ry={cornerRadius}
            gridMin={0}
            svg={{ fill: 'transparent' }}
          >
            {({ x, y, bandwidth }) => (
              <>
                {processedData.map((valueObj, index) => (
                  <Rect
                    key={index}
                    x={x(index)}
                    y={y(valueObj.value)}
                    width={bandwidth}
                    height={y(0) - y(valueObj.value)}
                    rx={cornerRadius}
                    ry={cornerRadius}
                    fill={valueObj.svg.fill}
                  />
                ))}
                <Labels
                  x={x}
                  y={y}
                  bandwidth={bandwidth}
                  data={processedData}
                  labels={labels}
                />
              </>
            )}
          </BarChart>
        </View>
      </View>
      <XAxis
        style={{ marginHorizontal: -10 }}
        data={processedData}
        formatLabel={(value, index) => labels[index]}
        contentInset={{ left: xleft, right: xright }}
        svg={{
          fontSize: 10,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 0.8,
        }}
      />
    </View>
  );
};

// Prop Types
BarChartComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default BarChartComponent;
