import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InvoiceLayout from '@components/InvoiceLayout';
import { ThemeContext } from '@context/ThemeContext';
import QuizTick from '@assets/icons/quiz_tick.svg';
import ResultTick from '@assets/icons/result_tick.svg';

const QuizResultDetails = () => {
  const { getThemeColor } = useContext(ThemeContext);

  const quizResults = [
    {
      question: 'We should stop at green signal.',
      yourAnswer: 'Wrong',
      correctAnswer: 'Wrong',
      isCorrect: true,
    },
    {
      question: 'Should you start driving on yellow light?',
      yourAnswer: 'not at all.',
      correctAnswer: 'No',
      isCorrect: false,
    },
    {
      question: 'Stopping at red light is mandatory?',
      yourAnswer: 'Yes',
      correctAnswer: 'Option1',
      isCorrect: true,
    },
    {
      question: 'We should always follow speed limits.',
      yourAnswer: 'Right',
      correctAnswer: 'Right',
      isCorrect: true,
    },
  ];

  return (
    <InvoiceLayout>
      <View style={styles.container}>
        <View
          style={[
            styles.col,
            {
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: 12,
              borderBottomWidth: 1,
              width: '100%',
              paddingBottom: 8,
              marginBottom: 8,
            },
          ]}
        >
          <QuizTick />
          <Text style={styles.quizTitle}>Quiz Result Details</Text>
        </View>
        <Text style={styles.quizDetailsTitle}>Your Quiz Answers</Text>

        {quizResults.map((result, index) => (
          <View
            key={index}
            style={[
              styles.col,
              {
                rowGap: 8,
                borderBottomWidth: 1,
                paddingBottom: 10,
                marginBottom: 8,
              },
            ]}
          >
            {/* Display Question */}
            <Text style={styles.quizQ}>{`${index + 1}. ${
              result.question
            }`}</Text>

            {/* Display Your Answer */}
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Text style={styles.quizLAns}>Your Answer:</Text>
              <Text style={styles.quizRAns}>{result.yourAnswer}</Text>
            </View>

            {/* Display Correct Answer */}
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Text style={styles.quizLAns}>Correct Answer:</Text>
              <Text style={styles.quizRAns}>{result.correctAnswer}</Text>
            </View>

            {/* Correct/Incorrect Indicator */}
            <View
              style={[
                styles.row,
                {
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  columnGap: 4,
                },
              ]}
            >
              {result.isCorrect ? <ResultTick /> : <ResultTick />}
              {/* Use different icons for correct/incorrect */}
              <Text style={styles.correct}>
                {result.isCorrect ? 'Correct' : 'Incorrect'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </InvoiceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#DEDEDE',
  },
  col: {
    flexDirection: 'column',
    borderBottomColor: '#DEDEDE',
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizDetailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 12,
  },
  quizQ: {
    fontSize: 14,
  },
  quizLAns: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  quizRAns: {
    fontSize: 12,
  },
  correct: { fontSize: 12 },
});

export default QuizResultDetails;
