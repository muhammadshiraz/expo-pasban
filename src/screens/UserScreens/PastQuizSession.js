import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Layout from '@components/Layout';
import { useNavigation } from '@react-navigation/native';
import LayoutCard from '@components/LayoutCard';
import SearchBox from '@components/SearchBox';
import { ThemeContext } from '@context/ThemeContext';
import QuizSession from '@assets/icons/quiz_session.svg';
import Calender from '@assets/icons/calender.svg';
import Clock from '@assets/icons/clock.svg';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const PastQuizSession = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    searchQuizSession: '',
  });

  const [filteredResults, setFilteredResults] = useState([]);

  const quizData = [
    {
      id: 1,
      title: 'MIS TEST QUIZ SESSION',
      sessionDate: 'July 15, 2024 at 10:31:00 AM',
      timeLeft: '30 h: 37m',
    },
    {
      id: 2,
      title: 'MATHS QUIZ SESSION',
      sessionDate: 'August 10, 2024 at 01:15:00 PM',
      timeLeft: '12 h: 15m',
    },
    // Add more quiz sessions here
  ];

  useEffect(() => {
    setFilteredResults(quizData);
  }, []);

  // Handle input change for search field
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });

    // If the search input is cleared, show all data again
    if (value.trim() === '') {
      setFilteredResults(quizData);
    }
  };

  const handleSearch = () => {
    if (formData.searchQuizSession.trim() === '') {
      setFilteredResults(quizData);
    } else {
      const results = quizData.filter((quiz) =>
        quiz.title
          .toLowerCase()
          .includes(formData.searchQuizSession.toLowerCase()),
      );
      setFilteredResults(results);
    }
  };

  const handleStartQuiz = (quizId) => {
    navigation.navigate('GSMQuizResultDetails', { quizId }); // Pass the quizId as a param
  };

  return (
    <Layout
      type="innerScreen"
      title="Past Quiz Session"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        {/* Search Box */}
        <SearchBox
          placeholder="Search Quiz Session"
          value={formData.searchQuizSession}
          onChangeText={(value) =>
            handleInputChange('searchQuizSession', value)
          }
          onSearch={handleSearch}
        />
        <LayoutCard>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              rowGap: 15,
              paddingHorizontal: 28,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                rowGap: 15,
                justifyContent: 'space-between',
              }}
            >
              {(filteredResults.length > 0 ? filteredResults : quizData).map(
                (quiz) => (
                  <View key={quiz.id} style={styles.quizCard}>
                    <View
                      style={[
                        styles.row,
                        {
                          marginBottom: 8,
                          borderBottomWidth: 1,
                          paddingBottom: 8,
                        },
                      ]}
                    >
                      <QuizSession />
                      <Text style={styles.quizTitle}>{quiz.title}</Text>
                    </View>

                    <View
                      style={[
                        styles.row,
                        {
                          marginBottom: 8,
                          borderBottomWidth: 1,
                          paddingBottom: 8,
                          columnGap: 30,
                        },
                      ]}
                    >
                      <View style={[styles.col]}>
                        <Text style={styles.quizDateTitle}>Session Date</Text>
                        <View style={styles.row}>
                          <Calender />
                          <Text style={styles.quizTimeTitle}>
                            {quiz.sessionDate}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.col]}>
                        <Text style={styles.quizDateTitle}>Time Left</Text>
                        <View style={styles.row}>
                          <Clock />
                          <Text style={styles.quizTimeTitle}>
                            {quiz.timeLeft}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleStartQuiz(quiz.id)}
                      style={[styles.row, { justifyContent: 'flex-end' }]}
                    >
                      <Text style={styles.quizBtn}>View Answer Sheet</Text>
                      <FontAwesome6
                        name="arrow-right-long"
                        size={18}
                        color="#388E3C"
                      />
                    </TouchableOpacity>
                  </View>
                ),
              )}
            </View>
          </View>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    rowGap: 30,
    height: '100%',
  },
  quizCard: {
    borderWidth: 1,
    borderColor: '#757575',
    flexDirection: 'column',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    borderColor: '#DEDEDE',
  },
  col: {
    flexDirection: 'column',
    rowGap: 8,
    justifyContent: 'center',
  },
  quizTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quizTimeTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  quizDateTitle: {
    color: '#757575',
    fontSize: 12,
    fontWeight: 'semibold',
  },
  quizBtn: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#388E3C',
  },
});

export default PastQuizSession;
