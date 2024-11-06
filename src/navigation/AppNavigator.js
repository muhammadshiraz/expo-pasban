import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import GetStartedScreen from '@screens/GetStartedScreen';
import LoginScreen from '@screens/Authentication/LoginScreen';
import SignupScreen from '@screens/Authentication/SignupScreen';
import ForgotPasswordScreen from '@screens/Authentication/ForgotPasswordScreen';
import EnterNewPasswordScreen from '@screens/Authentication/EnterNewPasswordScreen';
import ViolationScreen from '@screens/ViolationScreen';
import LTOScreen from '@screens/LTOScreen';
import ManageLTO from '@screens/ManageLTOScreen';
import ApprovedLTO from '@screens/ApprovedLTO';
import BlackPoints from '@screens/BlackPointsScreen';
import VehicleInspection from '@screens/VehicleInspection';
import DriverAssessment from '@screens/DriverAssessment';
import AdminMenu from '@screens/AdminMenu/AdminMenuScreen';
import DashboardMenu from '@screens/AdminMenu/DashboardMenuScreen';
import ProfileMenu from '@screens/AdminMenu/ProfileMenuScreen';
import VehicleManageMenu from '@screens/AdminMenu/VehicleManageMenuScreen';
import UserMenu from '@screens/UserMenu/UserMenuScreen';
import UserDashboard from '@screens/UserScreens/Dashboard';
import UserActiveQuizSession from '@screens/UserScreens/ActiveQuizSession';
import UserPastQuizSession from '@screens/UserScreens/PastQuizSession';
import RemainingTime from '@screens/UserScreens/RemainingTime';
import UserQuizResultDetails from '@screens/UserScreens/QuizResultDetails';
import GSMActiveQuizSession from '@screens/GSMScreens/ActiveQuizSession';
import GSMPastQuizSession from '@screens/GSMScreens/PastQuizSession';
import GSMQuizResultDetails from '@screens/GSMScreens/QuizResultDetails';
import QuizMenu from '@screens/UserMenu/QuizMenuScreen';
import GSMMenu from '@screens/GSMMenu/GSMMenuScreen';
import GSMQuizMenu from '@screens/GSMMenu/QuizMenuScreen';
import GSMDashboard from '@screens/GSMScreens/Dashboard';
import MyProfile from '@screens/MyProfile';
import Reports from '@screens/Reports';
import VehicleLastUpdateStatus from '@screens/Reports/VehicleLastUpdateStatus';
import VehicleLastUpdateStatusReport from '@screens/Reports/VehicleLastUpdateStatusDetail';
import LateNightExits from '@screens/Reports/LateNightExits';
import VehicleTraveling from '@screens/Reports/VehicleTraveling';
import ReportsDetailLists from '@screens/ReportsDetailLists';
import ShowEntireFleet from '@screens/ShowEntireFleet';
import TravelingHistory from '@screens/TravelingHistory';
import LiveVehicleTracking from '@screens/LiveVehicleTracking';
import VehicleInspectionReport from '@screens/Reports/VehicleInspection';
import VehicleInspectionDetailReport from '@screens/Reports/VehicleInspectionDetail';
import RoadDrivingAssessment from '@screens/Reports/RoadDrivingAssessment';
import RoadDrivingAssessmentDetailReport from '@screens/Reports/RoadDrivingAssessmentDetail';
import VehiclesMonthlyMileage from '@screens/Reports/VehiclesMonthlyMileage';
import VehiclesMonthlyMileageDetailReport from '@screens/Reports/VehiclesMonthlyMileageDetail';
import VehicleObservationReport from '@screens/VehicleObservationReport';
import DrivingObservationReport from '@screens/DrivingObservationReport';
import TrackerMaintenance from '@screens/TrackerMaintenance';
import CreateTrackerRemovalRequest from '@screens/CreateTrackerRemovalRequest';
import ViewAllTrackerRemovalRequest from '@screens/ViewAllTrackerRemovalRequest';
import ProfileManagement from '@screens/ProfileManagement/ProfileManagement';
import UserManagement from '@screens/ProfileManagement/UserManagement';
import CreateProfile from '@screens/ProfileManagement/CreateProfile';
import ViewEdit from '@screens/ProfileManagement/ViewEdit';
import EditProfile from '@screens/ProfileManagement/EditProfile';
import QuizManagement from '@screens/QuizManagement';
import EditQuiz from '@screens/QuizManagement/EditQuiz';
import AllLTO from '@screens/VehicleManagement/AllLTO';
import CancelledLTO from '@screens/VehicleManagement/CancelledLTO';
import ApprovedLTODetail from '@screens/VehicleManagement/ApprovedLTODetail';
import CancelledLTODetail from '@screens/VehicleManagement/CancelledLTODetail';
import ViewAuthLetter from '@screens/VehicleManagement/ViewAuthLetter';

const Stack = createStackNavigator();

const AppNavigator = ({ initialRouteName }) => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnterNewPassword"
        component={EnterNewPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Violation"
        component={ViolationScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="LTO"
        component={LTOScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ManageLTO"
        component={ManageLTO}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ApprovedLTO"
        component={ApprovedLTO}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BlackPoints"
        component={BlackPoints}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehicleInspection"
        component={VehicleInspection}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="DriverAssessment"
        component={DriverAssessment}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="AdminMenu"
        component={AdminMenu}
        options={{
          headerShown: false,
          gestureEnabled: false, // Disable gesture navigation for the Home screen
        }}
      />
      <Stack.Screen
        name="DashboardMenu"
        component={DashboardMenu}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ProfileMenu"
        component={ProfileMenu}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehicleManageMenu"
        component={VehicleManageMenu}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserMenu"
        component={UserMenu}
        options={{
          headerShown: false,
          gestureEnabled: false, // Disable gesture navigation for the Home screen
        }}
      />
      <Stack.Screen
        name="UserDashboard"
        component={UserDashboard}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserActiveQuizSession"
        component={UserActiveQuizSession}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserPastQuizSession"
        component={UserPastQuizSession}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="RemainingTime"
        component={RemainingTime}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserQuizResultDetails"
        component={UserQuizResultDetails}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="GSMActiveQuizSession"
        component={GSMActiveQuizSession}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="GSMPastQuizSession"
        component={GSMPastQuizSession}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="GSMQuizResultDetails"
        component={GSMQuizResultDetails}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="QuizMenu"
        component={QuizMenu}
        options={{
          headerShown: false,
          gestureEnabled: false, // Disable gesture navigation for the Home screen
        }}
      />
      <Stack.Screen
        name="GSMMenu"
        component={GSMMenu}
        options={{
          headerShown: false,
          gestureEnabled: false, // Disable gesture navigation for the Home screen
        }}
      />
      <Stack.Screen
        name="GSMQuizMenu"
        component={GSMQuizMenu}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="GSMDashboard"
        component={GSMDashboard}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehicleTraveling"
        component={VehicleTraveling}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehicleLastUpdateStatus"
        component={VehicleLastUpdateStatus}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehicleLastUpdateStatusReport"
        component={VehicleLastUpdateStatusReport}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="LateNightExits"
        component={LateNightExits}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ReportsDetailLists"
        component={ReportsDetailLists}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name="VehicleInspectionReport"
        component={VehicleInspectionReport}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehicleInspectionDetailReport"
        component={VehicleInspectionDetailReport}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="RoadDrivingAssessment"
        component={RoadDrivingAssessment}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="RoadDrivingAssessmentDetailReport"
        component={RoadDrivingAssessmentDetailReport}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehiclesMonthlyMileage"
        component={VehiclesMonthlyMileage}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehiclesMonthlyMileageDetailReport"
        component={VehiclesMonthlyMileageDetailReport}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="VehicleObservationReport"
        component={VehicleObservationReport}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="DrivingObservationReport"
        component={DrivingObservationReport}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ShowEntireFleet"
        component={ShowEntireFleet}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="TravelingHistory"
        component={TravelingHistory}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="LiveVehicleTracking"
        component={LiveVehicleTracking}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="TrackerMaintenance"
        component={TrackerMaintenance}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CreateTrackerRemovalRequest"
        component={CreateTrackerRemovalRequest}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ViewAllTrackerRemovalRequest"
        component={ViewAllTrackerRemovalRequest}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ProfileManagement"
        component={ProfileManagement}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="UserManagement"
        component={UserManagement}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ViewEdit"
        component={ViewEdit}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="QuizManagement"
        component={QuizManagement}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="EditQuiz"
        component={EditQuiz}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="AllLTO"
        component={AllLTO}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CancelledLTO"
        component={CancelledLTO}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ApprovedLTODetail"
        component={ApprovedLTODetail}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CancelledLTODetail"
        component={CancelledLTODetail}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ViewAuthLetter"
        component={ViewAuthLetter}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
